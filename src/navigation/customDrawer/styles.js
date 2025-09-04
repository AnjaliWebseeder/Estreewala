
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // light theme background
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  profileSection: {
    alignItems: "flex-start",
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  userLocation: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginLeft: 15,
  },
  signOut: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#E53935",
    marginLeft: 15,
  },
});