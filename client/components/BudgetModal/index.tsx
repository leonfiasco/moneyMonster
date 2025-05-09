import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { styles } from "./styles.module";

interface BudgetModalProps {
  showBudgetModal: boolean;
  setShowBudgetModal: (show: boolean) => void;
  weeklyBudget: number;
  setWeeklyBudget: (amount: number) => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  showBudgetModal,
  setShowBudgetModal,
  weeklyBudget,
  setWeeklyBudget,
}) => {
  const [inputValue, setInputValue] = useState(weeklyBudget.toString());

  const handleSave = () => {
    const numericValue = parseFloat(inputValue) || 0;
    setWeeklyBudget(numericValue);
    setShowBudgetModal(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showBudgetModal}
      onRequestClose={() => setShowBudgetModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Set Weekly Budget</Text>
            <Pressable onPress={() => setShowBudgetModal(false)}>
              <FontAwesome name="close" size={24} color="#666" />
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount (HKD)</Text>
            <View style={styles.textInputWrapper}>
              <FontAwesome name="dollar" size={20} color="#B2DF01" />
              <TextInput
                style={styles.textInput}
                placeholder="0.00"
                keyboardType="numeric"
                value={inputValue}
                onChangeText={setInputValue}
                autoFocus={true}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowBudgetModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Budget</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BudgetModal;
