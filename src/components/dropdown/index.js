// components/CustomDropdown.js
import React, { useState, useRef,forwardRef,useImperativeHandle } from "react";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import {styles} from './styles'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ITEM_HEIGHT = 46;
const DROPDOWN_MAX_HEIGHT = 200;

 const CustomDropdown = forwardRef(({
  options = [],
  value,
  onChange,
  placeholder = "Select",
  style,
  dropdownStyle,
}, ref) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 160, dropUp: false, dropHeight: 0 });
  const btnRef = useRef(null);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    close: () => setOpen(false),
    open: () => openDropdown()
  }));

  const selected = options.find((o) => o.value === value);

  const openDropdown = () => {
    const node = findNodeHandle(btnRef.current);
    if (!node) {
      setOpen(true);
      return;
    }

    const desiredHeight = Math.min(DROPDOWN_MAX_HEIGHT, options.length * ITEM_HEIGHT);

    if (UIManager && UIManager.measureInWindow) {
      UIManager.measureInWindow(node, (x, y, width, height) => {
        const spaceBelow = SCREEN_HEIGHT - (y + height);
        const shouldDropUp = spaceBelow < desiredHeight;
        const top = shouldDropUp ? Math.max(8, y - desiredHeight) : y + height;

        setPos({ top, left: Math.max(4, x), width: Math.min(width || 160, SCREEN_WIDTH - 8), dropUp: shouldDropUp, dropHeight: desiredHeight });
        setOpen(true);
      });
    } else if (btnRef.current && btnRef.current.measureInWindow) {
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

  const handleOptionSelect = (itemValue) => {
    onChange(itemValue);
    close();
  };

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
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={13} color="#333" />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="none" onRequestClose={close}>
        <TouchableWithoutFeedback onPress={close}>
          <View style={styles.modalOverlay}>
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
                    onPress={() => handleOptionSelect(item.value)}
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
});

export default CustomDropdown