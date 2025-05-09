import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Box } from "@gluestack-ui/themed";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

interface MonthlyTabsProps {
  onDateChange: (date: Date) => void;
}

const MonthlyTabs = ({ onDateChange }: MonthlyTabsProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Update all date change handlers to call the callback
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    onDateChange(newDate); // Add this line
  };

  const selectMonth = (selectedMonth) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(selectedMonth);
    setCurrentDate(newDate);
    onDateChange(newDate); // Add this line
    setShowMonthModal(false);
  };

  const selectYear = (selectedYear) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(selectedYear);
    setCurrentDate(newDate);
    onDateChange(newDate); // Add this line
    setShowYearModal(false);
  };

  return (
    <Box
      style={styles.container}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      px="$4"
      my="$2"
      width="100%"
    >
      {/* Month Navigation */}
      <TouchableOpacity onPress={() => navigateMonth("prev")}>
        <MaterialIcons name="chevron-left" size={24} color="#4CAF50" />
      </TouchableOpacity>

      <View style={styles.dateContainer}>
        <TouchableOpacity
          onPress={() => setShowMonthModal(true)}
          style={styles.dateButton}
        >
          <Text style={styles.monthText}>{months[month]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowYearModal(true)}
          style={styles.dateButton}
        >
          <Text style={styles.yearText}>{year}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigateMonth("next")}>
        <MaterialIcons name="chevron-right" size={24} color="#4CAF50" />
      </TouchableOpacity>

      {/* Month Selection Modal */}
      <Modal visible={showMonthModal} transparent={true} animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowMonthModal(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {months.map((m, i) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.monthItem, i === month && styles.selectedItem]}
                  onPress={() => selectMonth(i)}
                >
                  <Text
                    style={[
                      styles.monthItemText,
                      i === month && styles.selectedItemText,
                    ]}
                  >
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* Year Selection Modal */}
      <Modal visible={showYearModal} transparent={true} animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowYearModal(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {years.map((y) => (
                <TouchableOpacity
                  key={y}
                  style={[styles.yearItem, y === year && styles.selectedItem]}
                  onPress={() => selectYear(y)}
                >
                  <Text
                    style={[
                      styles.yearItemText,
                      y === year && styles.selectedItemText,
                    ]}
                  >
                    {y}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  dateButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  yearText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
    maxHeight: Dimensions.get("window").height * 0.6,
  },
  scrollContainer: {
    alignItems: "center",
  },
  monthItem: {
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  yearItem: {
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  monthItemText: {
    fontSize: 16,
    color: "#333",
  },
  yearItemText: {
    fontSize: 16,
    color: "#333",
  },
  selectedItem: {
    backgroundColor: "#E8F5E9",
    borderRadius: 5,
  },
  selectedItemText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default MonthlyTabs;
