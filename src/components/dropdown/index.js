// components/CustomDropdown.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  UIManager,
  findNodeHandle,
  Dimensions,
  TouchableWithoutFeedback,

} from "react-native";
// if you use Expo change import to: import { Ionicons } from '@expo/vector-icons';
import Ionicons from "react-native-vector-icons/Ionicons";
import {styles} from './styles'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ITEM_HEIGHT = 46;
const DROPDOWN_MAX_HEIGHT = 200;

export default function CustomDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select",
  style,
  dropdownStyle,
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 160, dropUp: false, dropHeight: 0 });
  const btnRef = useRef(null);

  const selected = options.find((o) => o.value === value);

  const openDropdown = () => {
    const node = findNodeHandle(btnRef.current);
    if (!node) {
      setOpen(true);
      return;
    }

    // compute desired dropdown height based on options (so we can flip if not enough space)
    const desiredHeight = Math.min(DROPDOWN_MAX_HEIGHT, options.length * ITEM_HEIGHT);

    // measure absolute position on screen
    if (UIManager && UIManager.measureInWindow) {
      UIManager.measureInWindow(node, (x, y, width, height) => {
        // space below button
        const spaceBelow = SCREEN_HEIGHT - (y + height);
        const shouldDropUp = spaceBelow < desiredHeight;
        const top = shouldDropUp ? Math.max(8, y - desiredHeight) : y + height;

        setPos({ top, left: Math.max(4, x), width: Math.min(width || 160, SCREEN_WIDTH - 8), dropUp: shouldDropUp, dropHeight: desiredHeight });
        setOpen(true);
      });
    } else if (btnRef.current && btnRef.current.measureInWindow) {
      // fallback
      btnRef.current.measureInWindow((x, y, width, height) => {
        const spaceBelow = SCREEN_HEIGHT - (y + height);
        const shouldDropUp = spaceBelow < desiredHeight;
        const top = shouldDropUp ? Math.max(8, y - desiredHeight) : y + height;
        setPos({ top, left: Math.max(4, x), width: Math.min(width || 160, SCREEN_WIDTH - 8), dropUp: shouldDropUp, dropHeight: desiredHeight });
        setOpen(true);
      });
    } else {
      setOpen(true);
    }
  };

  const close = () => setOpen(false);

  return (
    <View>
      <TouchableOpacity
        ref={btnRef}
        activeOpacity={0.85}
        style={[styles.input, style]}
        onPress={() => (open ? close() : openDropdown())}
      >
        <Text numberOfLines={1} style={styles.text}>
          {selected?.label ?? placeholder}
        </Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} color="#333" />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="none" onRequestClose={close}>
        {/* clicking outside closes */}
        <TouchableWithoutFeedback onPress={close}>
          <View style={styles.modalOverlay}>
            {/* dropdown container positioned absolute using measured coords */}
            <View
              style={[
                styles.dropdown,
                dropdownStyle,
                {
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  maxHeight: pos.dropHeight || DROPDOWN_MAX_HEIGHT,
                },
              ]}
            >
              <FlatList
                data={options}
                keyExtractor={(i) => i.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.opt}
                    onPress={() => {
                      onChange(item.value);
                      close();
                    }}
                  >
                    <Text style={styles.optText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.sep} />}
                bounces={false}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}


