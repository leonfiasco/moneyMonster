import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { styles } from "./styles.module";

const SummaryCards = () => {
  const summaryData = [
    {
      id: "income",
      label: "Income",
      amount: 2150,
      color: "#4CAF50",
      iconName: "money",
    },
    {
      id: "expense",
      label: "Expense",
      amount: 180,
      color: "#FF6B6B", // pastel red / coral
      iconName: "credit-card",
    },
    {
      id: "savings",
      label: "Savings",
      amount: 500,
      color: "#FFD166",
      iconName: "bank",
    },
    {
      id: "investment",
      label: "Investment",
      amount: 250,
      color: "#6C5CE7",
      iconName: "line-chart",
    },
  ];

  return (
    <View style={styles.summaryContainer}>
      {summaryData.map((item, index) => (
        <View key={item.id} style={styles.summaryCard}>
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <FontAwesome name={item.iconName as any} size={16} color="#fff" />
          </View>
          <Text style={styles.cardLabel}>{item.label}</Text>
          <Text style={styles.cardAmount}>${item.amount.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
};

export default SummaryCards;
