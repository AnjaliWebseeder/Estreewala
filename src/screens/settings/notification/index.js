import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../../components/header";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markNotificationRead } from '../../../redux/slices/notificationSlice';

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
    console.log("notification list", list);
  }, []);


  const handlePress = (item) => {
    if (!item.read) {
      dispatch(markNotificationRead(item.id));
    }
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon
        name="notifications-off-outline"
        size={48}
        color={appColors.subTitle}
      />
      <Text style={styles.emptyText}>
        No notifications yet
      </Text>
    </View>
  );


  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => handlePress(item)}
      style={[
        styles.card,
        item.read ? styles.readCard : styles.unreadCard,
      ]}
    >
      {/* LEFT STRIP */}
      {!item.read && <View style={styles.unreadStrip} />}

      {/* ICON */}
      <View
        style={[
          styles.iconWrapper,
        ]}
      >
        <Icon
          name={item.icon || "notifications"}
          size={20}
          color={item.read ? "#C7C7C7" : appColors.lightBlue}
        />
      </View>

      {/* TEXT */}
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              !item.read && styles.unreadTitle,
            ]}
            numberOfLines={2}
          >
            {item.title || item.message}
          </Text>

          {!item.read && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.time}>
          {item.time || new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notification" onBackPress={() => navigation.goBack()} />

      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={() => dispatch(fetchNotifications())}
        ListEmptyComponent={
          !loading ? <EmptyState /> : null
        }
        contentContainerStyle={
          list?.length === 0 && !loading
            ? { flex: 1 }
            : null
        }
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appColors.menuCard,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 15
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.InterMedium,
    color: appColors.font,
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    fontFamily: fonts.InterRegular,
    color: appColors.subTitle,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: fonts.InterMedium,
    color: appColors.subTitle,
  },
  readCard: {
    backgroundColor: "#F4F4F4",
  },

  unreadCard: {
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 4,
    borderLeftColor: "#4F8AF2",
  },

  unreadStrip: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#4F8AF2",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  unreadTitle: {
    fontWeight: "700",
    color: "#111",
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4F8AF2",
    marginLeft: 8,
  },

  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

});

export default Notification;
