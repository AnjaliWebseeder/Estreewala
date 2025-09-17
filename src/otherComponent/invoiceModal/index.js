import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, Platform, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { styles } from './styles';
import appColors from '../../theme/appColors';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';

const InvoiceModal = ({ visible, onClose, order, onDownload }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample invoice data
  const invoiceData = {
    invoiceNumber: 'INV-2023-001',
    invoiceDate: '20 Jun, 2023',
    dueDate: '25 Jun, 2023',
    items: [
      { id: 1, name: "Frock", service: "Wash & Iron", qty: 1, price: 25 },
      { id: 2, name: "T-Shirt", service: "Wash & Iron", qty: 1, price: 15 },
    ],
    subtotal: 40,
    tax: 3.20,
    deliveryFee: 1.00,
    total: 44.20
  };

  // Generate HTML content for PDF
  const generateHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice ${invoiceData.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .invoice-number { font-size: 24px; font-weight: bold; }
          .section { margin-bottom: 20px; }
          .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .detail-row { display: flex; margin-bottom: 5px; }
          .detail-label { width: 120px; font-weight: bold; }
          .table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .table th { background-color: #f2f2f2; }
          .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
          .total-row { font-weight: bold; font-size: 16px; margin-top: 10px; border-top: 2px solid #ddd; padding-top: 10px; }
          .terms-section { margin-top: 30px; font-size: 12px; }
          .logo { font-size: 20px; font-weight: bold; color: ${appColors.primary}; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="invoice-number">Invoice #${invoiceData.invoiceNumber}</div>
            <div>Date: ${invoiceData.invoiceDate}</div>
            <div>Due Date: ${invoiceData.dueDate}</div>
          </div>
          <div class="logo">QuickClean</div>
        </div>

        <div class="section">
          <div class="section-title">Order Details</div>
          <div class="detail-row">
            <div class="detail-label">Order ID:</div>
            <div>#${order?.orderId || 'N/A'}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Status:</div>
            <div>${order?.status || 'N/A'}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Pickup Date:</div>
            <div>11 Jan 2020, 10:30 AM</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Delivery Date:</div>
            <div>13 Jan 2020, 10:30 AM</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Customer Details</div>
          <div class="detail-row">
            <div class="detail-label">Name:</div>
            <div>George Anderson</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Address:</div>
            <div>B101, Nirvana Point, Hemilton</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Phone:</div>
            <div>+911234567890</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Items</div>
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items.map(item => `
                <tr>
                  <td>
                    <div>${item.name}</div>
                    <div style="font-size: 12px; color: #666;">${item.service}</div>
                  </td>
                  <td>${item.qty}</td>
                  <td>₹${item.price}</td>
                  <td>₹${item.price * item.qty}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="summary-row">
            <div>Subtotal:</div>
            <div>₹${invoiceData.subtotal}</div>
          </div>
          <div class="summary-row">
            <div>Tax (8%):</div>
            <div>₹${invoiceData.tax}</div>
          </div>
          <div class="summary-row">
            <div>Delivery Fee:</div>
            <div>₹${invoiceData.deliveryFee}</div>
          </div>
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
            • No returns or exchanges on laundry services
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Create and download PDF
  const createPDF = async () => {
    setIsGenerating(true);
    
    try {
      // Generate PDF options - use a simpler approach
      const options = {
        html: generateHTML(),
        fileName: `Invoice_${invoiceData.invoiceNumber}_${Date.now()}`,
        // Use Documents directory which doesn't require special permissions
        directory: Platform.OS === 'ios' ? 'Documents' : 'Download',
      };

      // Create PDF file
      const file = await RNHTMLtoPDF.convert(options);
      
      if (file.filePath) {
        // Show success message with option to open the file
        Alert.alert(
          "Success", 
          "PDF downloaded successfully!",
          [
            { 
              text: "Open PDF", 
              onPress: () => {
                if (Platform.OS === 'ios') {
                  // For iOS, we can use a different approach
                  Linking.openURL(file.filePath).catch(err => {
                    Alert.alert("Error", "Cannot open PDF file");
                  });
                } else {
                  // For Android, use the file URI
                  const fileUri = `file://${file.filePath}`;
                  Linking.openURL(fileUri).catch(err => {
                    Alert.alert("Error", "Cannot open PDF file");
                  });
                }
              }
            },
            { text: "OK", style: "cancel" }
          ]
        );
        
        // Call the onDownload callback if provided
        if (onDownload) {
          onDownload(file.filePath);
        }
      } else {
        throw new Error("File path not returned");
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      
      // Try alternative approach if the first one fails
      try {
        const alternativeOptions = {
          html: generateHTML(),
          fileName: `Invoice_${invoiceData.invoiceNumber}_${Date.now()}.pdf`,
        };
        
        const file = await RNHTMLtoPDF.convert(alternativeOptions);
        
        if (file.filePath) {
          Alert.alert(
            "Success", 
            "PDF downloaded successfully!",
            [{ text: "OK" }]
          );
          
          if (onDownload) {
            onDownload(file.filePath);
          }
        }
      } catch (secondError) {
        console.error("Second PDF generation error:", secondError);
        Alert.alert(
          "Error", 
          "Failed to generate PDF. Please try again.",
          [{ text: "OK" }]
        );
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
     <Modal
      visible={visible}
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
            {/* Invoice Header */}
            <View style={styles.invoiceHeader}>
              <View>
                <Text style={styles.invoiceNumber}>Invoice #{invoiceData.invoiceNumber}</Text>
                <Text style={styles.invoiceDate}>Date: {invoiceData.invoiceDate}</Text>
                <Text style={styles.invoiceDate}>Due Date: {invoiceData.dueDate}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>QuickClean</Text>
              </View>
            </View>

            {/* Order Details */}
            <View style={[styles.section,{marginBottom:6}]}>
              <Text style={[styles.sectionTitle]}>Order Details</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Order ID:</Text>
                <Text style={styles.detailValue}>#{order?.orderId}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={styles.detailValue}>{order?.status}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pickup Date:</Text>
                <Text style={styles.detailValue}>11 Jan 2020, 10:30 AM</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Delivery Date:</Text>
                <Text style={styles.detailValue}>13 Jan 2020, 10:30 AM</Text>
              </View>
            </View>

            {/* Customer Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Details</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>George Anderson</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Address:</Text>
                <Text style={styles.detailValue}>B101, Nirvana Point, Hemilton</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailValue}>+911234567890</Text>
              </View>
            </View>

            {/* Items Table */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Items</Text>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.tableHeaderText, {flex: 2}]}>Item</Text>
                <Text style={[styles.tableCell, styles.tableHeaderText]}>Qty</Text>
                <Text style={[styles.tableCell, styles.tableHeaderText]}>Price</Text>
                <Text style={[styles.tableCell, styles.tableHeaderText]}>Total</Text>
              </View>
              {invoiceData.items.map((item, index) => (
                <View key={item.id} style={styles.tableRow}>
                  <View style={[styles.tableCell, {flex: 2}]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemService}>{item.service}</Text>
                  </View>
                  <Text style={styles.tableCell}>{item.qty}</Text>
                  <Text style={styles.tableCell}>₹{item.price}</Text>
                  <Text style={styles.tableCell}>₹{item.price * item.qty}</Text>
                </View>
              ))}
            </View>

            {/* Summary */}
            <View style={styles.summarySection}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>₹{invoiceData.subtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax (8%):</Text>
                <Text style={styles.summaryValue}>₹{invoiceData.tax}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee:</Text>
                <Text style={styles.summaryValue}>₹{invoiceData.deliveryFee}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>₹{invoiceData.total}</Text>
              </View>
            </View>

            {/* Terms */}
            <View style={styles.termsSection}>
              <Text style={styles.termsTitle}>Terms & Conditions</Text>
              <Text style={styles.termsText}>
                • Payment due within 7 days of invoice date{'\n'}
                • Late fees may apply for overdue payments{'\n'}
                • All prices include applicable taxes{'\n'}
                • No returns or exchanges on laundry services
              </Text>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.footerButton, styles.downloadButton, isGenerating && styles.disabledButton]} 
              onPress={onClose}
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
  );
};

export default InvoiceModal;