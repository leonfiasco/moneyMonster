import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { ITransaction } from "@/types";

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

interface MonthlyTransactionBreakdownProps {
  date: Date;
  transactions: ITransaction[];
  monthlyBudget: number;
}

const MonthlyTransactionBreakdown = ({
  date,
  transactions,
  monthlyBudget,
}: MonthlyTransactionBreakdownProps) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const getDaySpendingData = () => {
    const dailyData: { [key: number]: { amount: number; color: string } } = {};

    daysArray.forEach((day) => {
      dailyData[day] = { amount: 0, color: "#E0E0E0" };
    });

    transactions.forEach((tx) => {
      if (tx.type === "expense") {
        const txDate = new Date(tx.date);
        if (txDate.getFullYear() === year && txDate.getMonth() === month) {
          const day = txDate.getDate();
          dailyData[day].amount += tx.amount;
        }
      }
    });

    const dailyBudget = monthlyBudget / daysInMonth;

    Object.keys(dailyData).forEach((day) => {
      const numericDay = Number(day);
      const ratio = dailyData[numericDay].amount / dailyBudget;

      if (dailyData[numericDay].amount === 0) {
        dailyData[numericDay].color = "#E0E0E0";
      } else if (ratio < 0.5) {
        dailyData[numericDay].color = "#4CAF50";
      } else if (ratio < 1) {
        dailyData[numericDay].color = "#FFC107";
      } else {
        dailyData[numericDay].color = "#F44336";
      }
    });

    return dailyData;
  };

  const dailyData = getDaySpendingData();
  const screenWidth = Dimensions.get("window").width;
  // Reduced dot size and adjusted spacing
  const dotSize = (screenWidth - 40) / 7 - 13; // Increased padding from 32 to 40 and reduced dot spacing

  const monthlyExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const monthlyRatio = monthlyExpense / monthlyBudget;
  const monthColor =
    monthlyExpense === 0
      ? "#E0E0E0"
      : monthlyRatio < 0.8
      ? "#4CAF50"
      : monthlyRatio < 1
      ? "#FFC107"
      : "#F44336";

  const calendarCells = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<View key={`empty-${i}`} style={styles.emptyCell} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const color = dailyData[day]?.color || "#E0E0E0";
    calendarCells.push(
      <View key={`day-${day}`} style={styles.dayContainer}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: color,
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
            },
          ]}
        />
        <Text style={styles.dayNumber}>{day}</Text>
      </View>
    );
  }

  const weeks = [];
  let i = 0;
  while (i < calendarCells.length) {
    const week = calendarCells.slice(i, i + 7);
    if (i + 7 > calendarCells.length) {
      while (week.length < 7) {
        week.push(
          <View key={`pad-${i + week.length}`} style={styles.emptyCell} />
        );
      }
    }
    weeks.push(
      <View key={`week-${weeks.length}`} style={styles.weekRow}>
        {week}
      </View>
    );
    i += 7;
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.monthHeader, { backgroundColor: `${monthColor}20` }]}
      >
        <Text style={styles.monthTitle}>
          {date.toLocaleString("default", { month: "long" })} Summary
        </Text>
        <Text style={[styles.monthAmount, { color: monthColor }]}>
          ${monthlyExpense.toFixed(2)} / ${monthlyBudget?.toFixed(2)}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.calendarGrid}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.dayNamesRow}>
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <Text key={day} style={styles.dayName}>
              {day}
            </Text>
          ))}
        </View>

        {weeks}
      </ScrollView>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#4CAF50" }]} />
          <Text style={styles.legendText}>Under</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#FFC107" }]} />
          <Text style={styles.legendText}>Near</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#F44336" }]} />
          <Text style={styles.legendText}>Over</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  monthAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  calendarGrid: {
    paddingBottom: 8,
  },
  dayNamesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayName: {
    width: (Dimensions.get("window").width - 60) / 7, // Adjusted to match new padding
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: (Dimensions.get("window").width - 40) / 7, // Adjusted to match new padding
  },
  dot: {
    marginBottom: 2, // Reduced from 4
    opacity: 0.85,
  },
  dayNumber: {
    fontSize: 10,
    color: "#666",
    marginTop: 2, // Added small margin between dot and number
  },
  emptyCell: {
    width: (Dimensions.get("window").width - 40) / 7,
    height: 32,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
});

export default MonthlyTransactionBreakdown;
