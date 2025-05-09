import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 16,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingRight: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  filtersContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    maxHeight: 700,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  filterLabel: {
    width: 100,
    fontSize: 14,
    color: "#666",
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
  },
  dateSeparator: {
    marginHorizontal: 8,
  },
  categoryPicker: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryOption: {
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  selectedCategory: {
    backgroundColor: "#B2DF01",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  amountRangeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  amountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
  },
  rangeSeparator: {
    marginHorizontal: 8,
  },
  transactionList: {
    padding: 16,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
  },
  selectedItem: {
    backgroundColor: "#E8F5E9",
  },
  checkboxContainer: {
    marginRight: 16,
  },
  transactionIcon: {
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionCategory: {
    fontSize: 14,
    color: "#666",
  },
  transactionDate: {
    fontSize: 12,
    color: "#999",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  incomeAmount: {
    color: "#4CAF50",
  },
  expenseAmount: {
    color: "#F44336",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
  },
  bulkActionsBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  selectedCount: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  bulkActionButton: {
    marginLeft: 16,
  },
  closeSelectButton: {
    marginLeft: 8,
  },
});

export default styles;
