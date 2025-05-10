import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: [true, "Source is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be positive"],
    },
    merchant: {
      type: String,
      required: [true, "Merchant is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
    },
    date: {
      type: Date,
      default: Date.now, // Default to current date
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurrencePattern: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: function () {
        return this.isRecurring;
      },
    },
    notes: String,
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt
  }
);

// No need for the pre-save hook since we're using timestamps
const IncomeModel = mongoose.model("Income", incomeSchema);

export default IncomeModel;
