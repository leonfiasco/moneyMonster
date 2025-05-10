import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native";
import { IconName, ICategory } from "@/types";

import styles from "./styles.module";

// Category data with colors
const defaultCategories = [
  { id: "1", name: "Food", icon: "cutlery", color: "#FF5252" },
  { id: "2", name: "Transport", icon: "bus", color: "#FF4081" },
  { id: "3", name: "Shopping", icon: "shopping-bag", color: "#E040FB" },
  { id: "4", name: "Entertainment", icon: "gamepad", color: "#7C4DFF" },
  { id: "5", name: "Other", icon: "ellipsis-h", color: "#536DFE" },
];

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [categories, setCategories] = useState(defaultCategories);
  const [transactionType, setTransactionType] = useState("expense"); // Default to expense
  const [date, setDate] = useState(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState("weekly");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#FF5252");

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

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: ICategory = {
        id: Date.now().toString(),
        name: newCategoryName,
        icon: "plus" as IconName,
        color: newCategoryColor,
      };

      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategoryName("");
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

  return (
    <LinearGradient
      colors={["#FFF5F5", "#FFEBEE"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { minHeight: "100%" }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.filterBox, { flexGrow: 1 }]}>
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
              <Ionicons name="arrow-back" size={24} color="#D32F2F" />
            </TouchableOpacity>
            <Text style={styles.header}>Add Expense</Text>
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
              onPress={() => router.push("/screens/InputIncome/input-income")}
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
              onPress={() => setTransactionType("expense")}
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

          {/* Transaction Category */}
          <Text style={styles.label}>Transaction Category</Text>
          <View style={styles.buttonRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory?.id === category.id &&
                    styles.categoryButtonSelected,
                  { borderColor: category.color },
                ]}
                onPress={() => setSelectedCategory(category as ICategory)}
              >
                <FontAwesome
                  name={category.icon as IconName}
                  size={16}
                  color={category.color}
                />

                <Text style={[styles.categoryText, { color: category.color }]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.categoryButton, styles.addCategoryButton]}
              onPress={() => setIsModalVisible(true)}
            >
              <Feather name="plus" size={16} color="#D32F2F" />
              <Text style={[styles.categoryText, { color: "#D32F2F" }]}>
                Custom
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transaction Amount */}
          <Text style={styles.label}>Transaction Amount</Text>
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
            <Text style={[styles.currency, { color: "#D32F2F" }]}>HKD</Text>
          </View>

          {/* Transaction Merchant */}
          <Text style={styles.label}>Transaction Merchant</Text>
          <View style={styles.textInputWrapper}>
            <FontAwesome name="shopping-bag" size={16} color="#999" />
            <TextInput
              style={styles.textInput}
              placeholder="Amazon Shopping"
              placeholderTextColor="#888"
              value={merchant}
              onChangeText={setMerchant}
            />
          </View>

          <>
            {/* Date Picker */}
            <Text style={styles.label}>Transaction Date</Text>
            <TouchableOpacity
              style={styles.textInputWrapper}
              onPress={() => setShowDatePicker(true)}
            >
              <FontAwesome name="calendar" size={16} color="#999" />
              <Text
                style={[styles.textInput, { color: date ? "#333" : "#888" }]}
              >
                {date ? formatDate(date) : "Select date"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                  accentColor="#D32F2F"
                />
              </View>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
                accentColor="#D32F2F"
              />
            )}

            {/* Recurring Toggle */}
            <View style={styles.toggleContainer}>
              <Text style={styles.label}>Recurring Transaction</Text>
              <Switch
                trackColor={{ false: "#FFCDD2", true: "#FFCDD2" }}
                thumbColor={isRecurring ? "#D32F2F" : "#f4f3f4"}
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
                      ]}
                      onPress={() => setRecurrencePattern(pattern)}
                    >
                      <Text
                        style={[
                          styles.recurrenceText,
                          recurrencePattern === pattern &&
                            styles.recurrenceTextSelected,
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
                dropdownIconColor="#D32F2F"
              >
                <Picker.Item label="Credit Card" value="Credit Card" />
                <Picker.Item label="Debit Card" value="Debit Card" />
                <Picker.Item label="Cash" value="Cash" />
                <Picker.Item label="Bank Transfer" value="Bank Transfer" />
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
          </>

          {/* Add Expense Button */}
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Add Expense</Text>
            <Feather
              name="plus-circle"
              size={18}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>

        {/* Add Category Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Custom Category</Text>

              <Text style={styles.label}>Category Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter category name"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />

              <Text style={styles.label}>Color</Text>
              <View style={styles.colorOptions}>
                {[
                  "#FF5252",
                  "#FF4081",
                  "#E040FB",
                  "#7C4DFF",
                  "#536DFE",
                  "#607D8B",
                ].map((color) => (
                  <Pressable
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      newCategoryColor === color && styles.selectedColorOption,
                    ]}
                    onPress={() => setNewCategoryColor(color)}
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
                  style={[styles.modalButton, styles.addButton]}
                  onPress={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                >
                  <Text style={styles.addButtonText}>Add Category</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
}
