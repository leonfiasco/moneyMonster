import { Request, Response, NextFunction } from "express";
import Income from "../../models/income/income.model";
import CustomError from "../../errors/CustomError";
import asyncErrorHandler from "../../utils/AsyncErrorHandler";

export const add_income = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("add_income called with body:", req.body);

    const {
      source,
      amount,
      merchant,
      paymentMethod,
      date, // This is now optional
      isRecurring = false,
      recurrencePattern,
      notes,
    } = req.body;

    // Validation (removed date from required fields)
    if (!source || !amount || !merchant || !paymentMethod) {
      console.log("Missing required fields:", {
        source,
        amount,
        merchant,
        paymentMethod,
      });
      throw new CustomError(
        "Please provide all required fields (source, amount, merchant, paymentMethod)",
        400
      );
    }

    if (isRecurring && !recurrencePattern) {
      throw new CustomError(
        "Recurrence pattern is required for recurring incomes",
        400
      );
    }

    const newIncome = new Income({
      source,
      amount: Number(amount),
      merchant,
      paymentMethod,
      // Use provided date or default to current date
      date: date ? new Date(date) : new Date(),
      isRecurring,
      ...(isRecurring && { recurrencePattern }),
      notes,
    });

    await newIncome.save();
    res.status(201).json({
      success: true,
      income: newIncome,
    });
  }
);

// export const get_incomes = asyncErrorHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const incomes = await Income.find().sort({ date: -1 });
//       res.status(200).json({
//         count: incomes.length,
//         incomes,
//       });
//     } catch (error) {
//       console.error("Error occurred while fetching incomes:", error);
//       next(error);
//     }
//   }
// );

// export const get_income = asyncErrorHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const income = await Income.findById(req.params.id);

//       if (!income) {
//         throw new CustomError("Income not found", 404);
//       }

//       res.status(200).json({ income });
//     } catch (error) {
//       console.error("Error occurred while fetching income:", error);
//       next(error);
//     }
//   }
// );

// export const update_income = asyncErrorHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//       });

//       if (!income) {
//         throw new CustomError("Income not found", 404);
//       }

//       res.status(200).json({ income });
//     } catch (error) {
//       console.error("Error occurred while updating income:", error);
//       next(error);
//     }
//   }
// );

// export const delete_income = asyncErrorHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const income = await Income.findByIdAndDelete(req.params.id);

//       if (!income) {
//         throw new CustomError("Income not found", 404);
//       }

//       res.status(200).json({
//         message: "Income deleted successfully",
//         id: income._id,
//       });
//     } catch (error) {
//       console.error("Error occurred while deleting income:", error);
//       next(error);
//     }
//   }
// );
