import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useRouter } from "expo-router";
import {
  CategoryDoughnut,
  MonthlyTabs,
  RecentTransactions,
  SummaryCards,
} from "@/components";
import { ITransaction } from "@/types";

import { styles } from "./styles.module";
import { weeklyBudget } from "@/data/budgetdata";

// Sample transaction data - replace with your actual data source
const sampleTransactions: ITransaction[] = [
  {
    id: "1",
    type: "expense",
    amount: 50,
    category: "Food",
    date: "2023-05-01",
    name: "Lunch at KFC",
    icon: "utensils", // example icon string
  },
  {
    id: "2",
    type: "income",
    amount: 2000,
    category: "Salary",
    date: "2023-05-01",
    name: "Monthly Pay",
    icon: "money-bill",
  },
  {
    id: "3",
    type: "expense",
    amount: 100,
    category: "Transport",
    date: "2023-05-02",
    name: "Train Pass",
    icon: "bus",
  },
  {
    id: "4",
    type: "expense",
    amount: 30,
    category: "Entertainment",
    date: "2023-05-03",
    name: "Netflix",
    icon: "film",
  },
  {
    id: "5",
    type: "income",
    amount: 150,
    category: "Freelance",
    date: "2023-05-04",
    name: "Freelance Payment",
    icon: "laptop-code",
  },
];

const TransactionScreen = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(sampleTransactions);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [useDateFilter, setUseDateFilter] = useState(false);
  const [selectedWeeks, setSelectedWeeks] = useState([]); // array of week numbers or dates

  // Available categories
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "Food", name: "Food" },
    { id: "Transport", name: "Transport" },
    { id: "Entertainment", name: "Entertainment" },
    { id: "Salary", name: "Salary" },
    { id: "Freelance", name: "Freelance" },
  ];

  // Apply filters
  useEffect(() => {
    let filtered = [...transactions];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((t) =>
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by date range
    filtered = filtered.filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate >= new Date(startDate.toDateString()) &&
        transactionDate <= new Date(endDate.toDateString())
      );
    });

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    // Filter by amount range
    if (minAmount) {
      filtered = filtered.filter((t) => t.amount >= parseFloat(minAmount));
    }
    if (maxAmount) {
      filtered = filtered.filter((t) => t.amount <= parseFloat(maxAmount));
    }

    setFilteredTransactions(filtered);
  }, [
    searchQuery,
    startDate,
    endDate,
    selectedCategory,
    minAmount,
    maxAmount,
    transactions,
  ]);

  // Toggle transaction selection
  const toggleTransactionSelection = (id) => {
    setSelectedTransactions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Delete selected transactions
  const deleteSelectedTransactions = () => {
    Alert.alert(
      "Delete Transactions",
      `Are you sure you want to delete ${selectedTransactions.length} transactions?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTransactions((prev) =>
              prev.filter((t) => !selectedTransactions.includes(t.id))
            );
            setSelectedTransactions([]);
            setIsSelectMode(false);
          },
        },
      ]
    );
  };

  // Export to CSV
  const exportToCSV = async () => {
    let csv = "Type,Amount,Category,Date,Description \n";

    filteredTransactions.forEach((t) => {
      csv += `${t.type},${t.amount},${t.category},${t.date}n`;
    });

    const filename =
      FileSystem.documentDirectory +
      `transactions_${new Date().toISOString().split("T")[0]}.csv`;

    try {
      await FileSystem.writeAsStringAsync(filename, csv, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (Platform.OS === "android") {
        const contentUri = await FileSystem.getContentUriAsync(filename);
        await Sharing.shareAsync(contentUri);
      } else {
        await Sharing.shareAsync(filename);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to export transactions");
      console.error(error);
    }
  };

  // Render transaction item
  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        isSelectMode &&
          selectedTransactions.includes(item.id) &&
          styles.selectedItem,
      ]}
      onPress={() => {
        if (isSelectMode) {
          toggleTransactionSelection(item.id);
        } else {
          // Navigate to edit screen or show details
          //   router.push(`/edit-transaction/${item.id}`);
        }
      }}
      onLongPress={() => setIsSelectMode(true)}
    >
      {isSelectMode && (
        <View style={styles.checkboxContainer}>
          {selectedTransactions.includes(item.id) ? (
            <FontAwesome name="check-square" size={24} color="#4CAF50" />
          ) : (
            <FontAwesome name="square-o" size={24} color="#ccc" />
          )}
        </View>
      )}

      <View style={styles.transactionIcon}>
        <FontAwesome
          name={item.type === "income" ? "money" : "shopping-bag"}
          size={24}
          color={item.type === "income" ? "#4CAF50" : "#F44336"}
        />
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionCategory}>{item.category}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          item.type === "income" ? styles.incomeAmount : styles.expenseAmount,
        ]}
      >
        {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <MaterialIcons name="arrow-back" size={28} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity onPress={exportToCSV}>
          <MaterialIcons name="file-download" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <MonthlyTabs />

      <SummaryCards />
      <View style={styles.filtersContainer}>
        <CategoryDoughnut
          transactions={[
            { type: "expense", amount: 300, category: "Food" },
            { type: "expense", amount: 120, category: "Transport" },
            { type: "expense", amount: 180, category: "Shopping" },
            { type: "expense", amount: 90, category: "Entertainment" },
            { type: "expense", amount: 60, category: "Other" },
          ]}
        />
      </View>
      {/* Transaction List */}
      <View>
        <RecentTransactions
          transactions={transactions}
          weeklyBudget={weeklyBudget}
        />
      </View>
      {/* Bulk Actions Bar */}
      {isSelectMode && (
        <View style={styles.bulkActionsBar}>
          <Text style={styles.selectedCount}>
            {selectedTransactions.length} selected
          </Text>
          <TouchableOpacity
            style={styles.bulkActionButton}
            onPress={deleteSelectedTransactions}
          >
            <MaterialIcons name="delete" size={24} color="#F44336" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bulkActionButton}
            onPress={() => {
              // Implement bulk edit functionality
              console.log("Edit selected:", selectedTransactions);
            }}
          >
            <MaterialIcons name="edit" size={24} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeSelectButton}
            onPress={() => {
              setIsSelectMode(false);
              setSelectedTransactions([]);
            }}
          >
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default TransactionScreen;
