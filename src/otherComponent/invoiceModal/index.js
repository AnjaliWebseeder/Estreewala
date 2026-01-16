import React, { useState, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, Platform, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import { styles } from './styles';
import appColors from '../../theme/appColors';
import moment from 'moment';

const InvoiceModal = ({ visible, onClose, order, onDownload }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const webViewRef = useRef(null);

  // Generate dynamic invoice data from order
  const getInvoiceData = () => {
    if (!order) return null;

    const subtotal = order.items?.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 1);
    }, 0) || order.totalAmount;

    const deliveryFee = 0;
    const tax = 0;

    return {
      invoiceNumber: `INV-${order.id?.slice(-8)?.toUpperCase() || 'ORDER'}`,
      invoiceDate: moment(order.createdAt).utcOffset("+05:30").format("DD MMM, YYYY"),
      dueDate: moment(order.deliveryDate).format("DD MMM, YYYY"),
      items: order.items?.map(item => ({
        id: item._id,
        name: item.item,
        service: item.service,
        qty: item.quantity,
        price: item.price || Math.round(order.totalAmount / (item.quantity || 1))
      })) || [],
      subtotal: subtotal,
      tax: tax,
      deliveryFee: deliveryFee,
      total: order.totalAmount
    };
  };

  const invoiceData = getInvoiceData();

  if (!invoiceData) {
    return null;
  }

  // Generate HTML content for PDF with enhanced print styling
 const generateHTML = () => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice ${invoiceData.invoiceNumber}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #ffffff;
        color: #333333;
        margin: 0;
        padding: 20px;
        line-height: 1.5;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 3px solid #2c5aa0;
        padding-bottom: 15px;
        margin-bottom: 25px;
      }

      .invoice-number {
        font-size: 20px;
        font-weight: bold;
        color: #2c5aa0;
      }

      .logo {
        font-size: 20px;
        font-weight: bold;
        color: #2c5aa0;
      }

      .section {
        margin-bottom: 25px;
        padding: 15px;
        background: #f9f9f9;
        border-radius: 8px;
      }

      .section-title {
        font-size: 16px;
        font-weight: bold;
        color: #2c5aa0;
        margin-bottom: 12px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
      }

      .detail-row {
        display: flex;
        margin-bottom: 8px;
      }

      .detail-label {
        width: 140px;
        font-weight: bold;
        color: #333;
      }

      .detail-text {
        flex: 1;
        color: #555;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }

      .table th, .table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        font-size: 14px;
      }

      .table th {
        background: #f2f2f2;
        font-weight: bold;
        color: #2c5aa0;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 15px;
      }

      .total-row {
        font-weight: bold;
        font-size: 16px;
        border-top: 2px solid #ddd;
        padding-top: 10px;
        margin-top: 10px;
      }

      .terms-section {
        background: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        font-size: 13px;
        color: #555;
        line-height: 1.4;
      }

      @media print {
        body { padding: 10px; }
        .print-actions { display: none !important; }
        .section { background: #fff; border: 1px solid #ddd; }
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <div class="invoice-number">Invoice #${invoiceData.invoiceNumber}</div>
        <div>Date: ${invoiceData.invoiceDate}</div>
        <div>Due Date: ${invoiceData.dueDate}</div>
      </div>
      <div class="logo">${order?.vendor?.businessName || 'QuickClean'}</div>
    </div>

    <div class="section">
      <div class="section-title">Order Details</div>
      <div class="detail-row">
        <div class="detail-label">Status:</div>
        <div class="detail-text">${order?.status || 'N/A'}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Pickup Date:</div>
        <div class="detail-text">${moment(order?.pickupDate).format("DD MMM YYYY")}</div>
      </div>
      ${!["cancelled", "rejected"].includes(order?.status)
        ? `<div class="detail-row">
            <div class="detail-label">${order?.status === "completed" ? "Delivered:" : "Expected Delivery:"}</div>
            <div class="detail-text">${
              order?.status === "completed"
                ? moment(order?.timeline?.completedAt).format("DD MMM YYYY")
                : moment(order?.timeline?.deliveryDateTime).format("DD MMM YYYY")
            }</div>
          </div>`
        : ""}
    </div>

    <div class="section">
      <div class="section-title">Customer Details</div>
      <div class="detail-row">
        <div class="detail-label">Name:</div>
        <div class="detail-text">${order?.contactDetails?.fullName || 'N/A'}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Address:</div>
        <div class="detail-text">${order?.deliveryAddress?.fullAddress || 'N/A'}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Phone:</div>
        <div class="detail-text">${order?.contactDetails?.mobile || 'N/A'}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Vendor Details</div>
      <div class="detail-row">
        <div class="detail-label">Business:</div>
        <div class="detail-text">${order?.vendor?.name || 'N/A'}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Address:</div>
        <div class="detail-text">${order?.vendor?.address || 'N/A'}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Phone:</div>
        <div class="detail-text">${order?.vendor?.phone || 'N/A'}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Items</div>
      <table class="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Service</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items.map(item => {
            const itemTotal = item.price * item.qty;
            return `
              <tr>
                <td>${item.name}</td>
                <td>${item.service}</td>
                <td>${item.qty}</td>
                <td>₹${item.price}</td>
                <td>₹${itemTotal}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="summary-row">
        <div>Subtotal:</div>
        <div>₹${invoiceData.subtotal}</div>
      </div>
      ${invoiceData.tax > 0 ? `
        <div class="summary-row">
          <div>Tax:</div>
          <div>₹${invoiceData.tax}</div>
        </div>` : ''}
      ${invoiceData.deliveryFee > 0 ? `
        <div class="summary-row">
          <div>Delivery Fee:</div>
          <div>₹${invoiceData.deliveryFee}</div>
        </div>` : ''}
      <div class="summary-row total-row">
        <div>Total:</div>
        <div>₹${invoiceData.total}</div>
      </div>
    </div>

    <div class="terms-section">
      <div class="section-title">Terms & Conditions</div>
      <div>
        • Payment due within 7 days of invoice date<br>
        • Late fees may apply for overdue payments<br>
        • All prices include applicable taxes<br>
        • No returns or exchanges on laundry services<br>
        • Special instructions: ${order?.instructions || 'None'}
      </div>
    </div>
  </body>
  </html>
  `;
};


  // Handle PDF creation
  const createPDF = async () => {
    if (!order) {
      Alert.alert("Error", "No order data available");
      return;
    }

    try {
      setIsGenerating(true);

      // Use the onDownload prop if provided
      if (onDownload) {
        await onDownload();
      }

      // Always show WebView for PDF generation
      setShowWebView(true);

    } catch (error) {
      console.error('PDF download failed:', error);
      Alert.alert("Error", "Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Trigger print from WebView
  const triggerPrint = () => {
    if (webViewRef.current) {
      const printScript = `
        window.print();
        true;
      `;
      webViewRef.current.injectJavaScript(printScript);
    }
  };


  return (
    <>
      {/* Original Preview Modal */}
      <Modal
        visible={visible && !showWebView}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Invoice Preview</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={appColors.font} />
              </TouchableOpacity>
            </View>


            <ScrollView style={styles.modalContent}>
              {/* Your existing preview content remains the same */}
              <View style={styles.invoiceHeader}>
                <View>
                  <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>{order?.vendor?.businessName || 'Laundry Service'}</Text>
                  </View>
                  <Text style={styles.invoiceNumber}>Invoice #{invoiceData.invoiceNumber}</Text>
                  <Text style={styles.invoiceDate}>Date: {invoiceData.invoiceDate}</Text>
                </View>
              </View>

              {/* Order Details */}
              <View style={[styles.section, { marginBottom: 6 }]}>
                <Text style={styles.sectionTitle}>Order Details</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Order ID:</Text>
                  <Text style={styles.detailValue}>#{'ORD-' + (order?.id || order?._id || '').slice(-5).toUpperCase()}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status:</Text>
                  <Text style={[styles.detailValue, {
                    color: order?.status === 'completed' ? '#4CAF50' :
                      order?.status === 'cancelled' ? '#FF3B30' :
                        order?.status === 'pending' ? '#FF9800' : appColors.font
                  }]}>
                    {order?.status?.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Pickup Date:</Text>
                  <Text style={styles.detailValue}>
                    {moment(order?.pickupDate).format("DD MMM YYYY")} {order?.pickupTime}
                  </Text>
                </View>
                {!["cancelled", "rejected"].includes(order?.status) && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                      {order?.status === "completed" ? "Delivered:" : "Expected Delivery:"}
                    </Text>
                    <Text style={styles.detailValue}>
                      {order?.status === "completed"
                        ? moment(order?.timeline?.completedAt).format("DD MMM YYYY")
                        : moment(order?.timeline?.deliveryDateTime).format("DD MMM YYYY")}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.footerButton, styles.downloadButton, isGenerating && styles.disabledButton]}
                onPress={createPDF}
                disabled={isGenerating}
              >
                <MaterialIcons name="file-download" size={20} color={appColors.white} />
                <Text style={styles.downloadButtonText}>
                  {isGenerating ? 'Generating...' : 'Download PDF'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* WebView Modal for PDF Generation */}
      <Modal
        visible={showWebView}
        animationType="slide"
        onRequestClose={() => setShowWebView(false)}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.webViewHeader}>
            <TouchableOpacity
              onPress={() => setShowWebView(false)}
              style={styles.webViewBackButton}
            >
              <Ionicons name="arrow-back" size={24} color={appColors.white} />
              <Text style={styles.webViewBackText}>Back to Preview</Text>
            </TouchableOpacity>


          </View>

          <WebView
            ref={webViewRef}
            source={{ html: generateHTML() }}
            style={{ flex: 1 }}
            startInLoadingState={true}
            onLoadEnd={() => {
              console.log("Invoice ready for printing");
              // Auto-trigger print on Android for better UX
              if (Platform.OS === 'android') {
                setTimeout(triggerPrint, 1500);
              }
            }}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default InvoiceModal;