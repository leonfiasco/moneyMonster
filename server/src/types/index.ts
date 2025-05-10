import { Document } from "mongoose";

// Base Income interface matching Mongoose model
export interface IIncome extends Document {
  source: string;
  amount: number;
  merchant: string;
  paymentMethod: string;
  date: Date;
  isRecurring: boolean;
  recurrencePattern?: "daily" | "weekly" | "monthly" | "yearly";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
