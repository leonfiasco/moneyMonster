import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SummaryCards = () => {
  const summaryData = {
    income: 2150.0,
    expense: 180.0,
    savings: 500.0,
    investment: 250.0,
  };

  return (
    <View style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <SummaryCard
          label="Income"
          amount={summaryData.income}
          icon="money"
          color="#4CAF50"
        />
        <SummaryCard
          label="Expense"
          amount={summaryData.expense}
          icon="credit-card"
          color="#F44336"
        />
      </View>
      <View style={styles.summaryRow}>
        <SummaryCard
          label="Savings"
          amount={summaryData.savings}
          icon="bank"
          color="#FFC107"
        />
        <SummaryCard
          label="Investment"
          amount={summaryData.investment}
          icon="line-chart"
          color="#2196F3"
        />
      </View>
    </View>
  );
};

const SummaryCard = ({ label, amount, icon, color }) => (
  <View style={[styles.card, { backgroundColor: `${color}20` }]}>
    <View style={styles.cardHeader}>
      <FontAwesome name={icon} size={16} color={color} />
      <Text style={[styles.cardLabel, { color }]}>{label}</Text>
    </View>
    <Text style={styles.cardAmount}>${amount.toFixed(2)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  viewAllText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "500",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  cardAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 12,
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 6,
  },
});

export default SummaryCards;
