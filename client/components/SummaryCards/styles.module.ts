import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginTop: 10,
  },

  summaryCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16, // Slightly reduced from 20
    padding: 12, // Reduced from 16
    marginBottom: 10, // Reduced from 12
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    height: 90, // Added fixed height for consistency
  },

  iconContainer: {
    width: 32, // Reduced from 40
    height: 32, // Reduced from 40
    borderRadius: 16, // Half of new dimension
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6, // Reduced from 8
  },

  cardLabel: {
    fontSize: 13, // Reduced from 14
    color: "#555",
    marginBottom: 2, // Added for better spacing
  },

  cardAmount: {
    fontSize: 16, // Reduced from 18
    fontWeight: "bold",
    color: "#333",
  },
});
