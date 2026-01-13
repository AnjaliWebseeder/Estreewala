import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import appColors from '../../theme/appColors';

const LocationRequiredModal = ({ visible, onManageAddress }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: '85%',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#111',
                            textAlign: 'center',
                        }}
                    >
                        Location Required
                    </Text>

                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 14,
                            color: '#555',
                            textAlign: 'center',
                        }}
                    >
                        To view vendor profiles, location access is required. Please add your address.
                    </Text>

                    <TouchableOpacity
                        onPress={onManageAddress}
                        style={{
                            marginTop: 20,
                            backgroundColor: appColors.blue,
                            paddingVertical: 12,
                            borderRadius: 8,
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            Manage Address
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default LocationRequiredModal;
