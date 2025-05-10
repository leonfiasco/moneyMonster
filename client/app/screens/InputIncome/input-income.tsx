import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native";
import styles from "./styles.module";
import { IconName } from "@/types";

// Income sources with colors
const defaultSources = [
  { id: "1", name: "Salary", icon: "money", color: "#4CAF50" },
  { id: "2", name: "Freelance", icon: "laptop", color: "#8BC34A" },
  { id: "3", name: "Investment", icon: "line-chart", color: "#CDDC39" },
  { id: "4", name: "Gift", icon: "gift", color: "#FFC107" },
  { id: "5", name: "Other", icon: "ellipsis-h", color: "#607D8B" },
];

export default function AddIncomeScreen() {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState(defaultSources[0]);
  const [merchant, setMerchant] = useState("");
  const [transactionType, setTransactionType] = useState("income");
  const [date, setDate] = useState(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState("monthly");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceColor, setNewSourceColor] = useState("#4CAF50");

  const router = useRouter();
  const params = useLocalSearchParams();

  const formatCurrency = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    const formattedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "HKD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(cleanValue) / 100);
    return formattedValue;
  };

  const handleAmountChange = (text: string) => {
    const formatted = formatCurrency(text);
    setAmount(formatted);
  };

  const handleAddSource = () => {
    if (newSourceName.trim()) {
      const newSource = {
        id: Date.now().toString(),
        name: newSourceName,
        icon: "plus",
        color: newSourceColor,
      };

      setSource(newSource);
      setNewSourceName("");
      setIsModalVisible(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = () => {
    const incomeData = {
      source: source.name,
      amount: parseFloat(amount.replace(/[^0-9.-]+/g, "")),
      merchant,
      paymentMethod,
      date,
      isRecurring,
      recurrencePattern: isRecurring ? recurrencePattern : undefined,
      notes,
    };
    console.log("Submitting income:", incomeData);
  };

  return (
    <LinearGradient
      colors={["#F1F8E9", "#E8F5E9"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 40 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.filterBox}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => {
                if (params.fromBudgetScreen === "true") {
                  router.push("/screens/Budget/budget");
                } else {
                  router.push("/");
                }
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#2E7D32" />
            </TouchableOpacity>
            <Text style={[styles.header, { color: "#2E7D32" }]}>
              Add Income
            </Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Transaction Type */}
          <Text style={styles.label}>Transaction Type</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                transactionType === "income" &&
                  styles.optionButtonSelectedIncome,
              ]}
            >
              <Feather
                name="arrow-down"
                size={16}
                color={transactionType === "income" ? "#388E3C" : "#666"}
              />
              <Text
                style={[
                  styles.optionText,
                  transactionType === "income" &&
                    styles.optionTextSelectedIncome,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                transactionType === "expense" &&
                  styles.optionButtonSelectedExpense,
              ]}
              onPress={() => router.push("/screens/InputExpense/input-expense")}
            >
              <Feather
                name="arrow-up"
                size={16}
                color={transactionType === "expense" ? "#D32F2F" : "#666"}
              />
              <Text
                style={[
                  styles.optionText,
                  transactionType === "expense" &&
                    styles.optionTextSelectedExpense,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
          </View>

          {/* Income Source */}
          <Text style={styles.label}>Income Source</Text>
          <View style={styles.buttonRow}>
            {defaultSources.map((src) => (
              <TouchableOpacity
                key={src.id}
                style={[
                  styles.categoryButton,
                  source?.id === src.id && styles.categoryButtonSelected,
                  { borderColor: src.color },
                ]}
                onPress={() => setSource(src)}
              >
                <FontAwesome
                  name={src.icon as IconName}
                  size={16}
                  color={src.color}
                />
                <Text style={[styles.categoryText, { color: src.color }]}>
                  {src.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.categoryButton, styles.addCategoryButton]}
              onPress={() => setIsModalVisible(true)}
            >
              <Feather name="plus" size={16} color="#2E7D32" />
              <Text style={[styles.categoryText, { color: "#2E7D32" }]}>
                Custom
              </Text>
            </TouchableOpacity>
          </View>

          {/* Income Amount */}
          <Text style={styles.label}>Income Amount</Text>
          <View style={styles.textInputWrapper}>
            <FontAwesome name="dollar" size={16} color="#999" />
            <TextInput
              style={styles.textInput}
              placeholder="$0.00"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmountChange}
            />
            <Text style={[styles.currency, { color: "#2E7D32" }]}>HKD</Text>
          </View>

          {/* Payer/Merchant */}
          <Text style={styles.label}>Payer/Merchant</Text>
          <View style={styles.textInputWrapper}>
            <FontAwesome name="building" size={16} color="#999" />
            <TextInput
              style={styles.textInput}
              placeholder="Company Name"
              placeholderTextColor="#888"
              value={merchant}
              onChangeText={setMerchant}
            />
          </View>

          {/* Date Picker */}
          <Text style={styles.label}>Income Date</Text>
          <TouchableOpacity
            style={styles.textInputWrapper}
            onPress={() => setShowDatePicker(true)}
          >
            <FontAwesome name="calendar" size={16} color="#999" />
            <Text style={[styles.textInput, { color: date ? "#333" : "#888" }]}>
              {date ? formatDate(date) : "Select date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
              accentColor="#2E7D32"
            />
          )}

          {/* Recurring Toggle */}
          <View style={styles.toggleContainer}>
            <Text style={styles.label}>Recurring Income</Text>
            <Switch
              trackColor={{ false: "#C8E6C9", true: "#C8E6C9" }}
              thumbColor={isRecurring ? "#2E7D32" : "#f4f3f4"}
              value={isRecurring}
              onValueChange={setIsRecurring}
            />
          </View>

          {/* Recurrence Pattern (Conditional) */}
          {isRecurring && (
            <>
              <Text style={styles.label}>Recurrence Pattern</Text>
              <View style={styles.buttonRow}>
                {["weekly", "monthly", "yearly"].map((pattern) => (
                  <TouchableOpacity
                    key={pattern}
                    style={[
                      styles.recurrenceButton,
                      recurrencePattern === pattern &&
                        styles.recurrenceButtonSelected,
                      {
                        borderColor: "#4CAF50", // Green border for all pills
                        backgroundColor:
                          recurrencePattern === pattern ? "#E8F5E9" : "#fff",
                      },
                    ]}
                    onPress={() => setRecurrencePattern(pattern)}
                  >
                    <Text
                      style={[
                        styles.recurrenceText,
                        recurrencePattern === pattern && { color: "#2E7D32" },
                      ]}
                    >
                      {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Payment Method */}
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.textInputWrapper}>
            <FontAwesome name="credit-card" size={16} color="#999" />
            <Picker
              selectedValue={paymentMethod}
              onValueChange={(itemValue) => setPaymentMethod(itemValue)}
              style={styles.picker}
              dropdownIconColor="#2E7D32"
            >
              <Picker.Item label="Bank Transfer" value="Bank Transfer" />
              <Picker.Item label="Check" value="Check" />
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Direct Deposit" value="Direct Deposit" />
              <Picker.Item label="Mobile Payment" value="Mobile Payment" />
            </Picker>
          </View>

          {/* Notes */}
          <Text style={styles.label}>Notes</Text>
          <View style={[styles.textInputWrapper, { height: 80 }]}>
            <TextInput
              style={[styles.textInput, { textAlignVertical: "top" }]}
              placeholder="Any additional notes..."
              placeholderTextColor="#888"
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          {/* Add Income Button */}
          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: "#2E7D32" }]}
            onPress={handleSubmit}
          >
            <Text style={styles.applyButtonText}>Add Income</Text>
            <Feather
              name="plus-circle"
              size={18}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>

        {/* Add Source Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Custom Income Source</Text>

              <Text style={styles.label}>Source Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter source name"
                value={newSourceName}
                onChangeText={setNewSourceName}
              />

              <Text style={styles.label}>Color</Text>
              <View style={styles.colorOptions}>
                {[
                  "#4CAF50",
                  "#8BC34A",
                  "#CDDC39",
                  "#FFC107",
                  "#607D8B",
                  "#009688",
                ].map((color) => (
                  <Pressable
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      newSourceColor === color && styles.selectedColorOption,
                    ]}
                    onPress={() => setNewSourceColor(color)}
                  />
                ))}
              </View>

              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#2E7D32" }]}
                  onPress={handleAddSource}
                  disabled={!newSourceName.trim()}
                >
                  <Text style={styles.addButtonText}>Add Source</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
}
