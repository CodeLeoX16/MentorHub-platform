const { Schema, model } = require("mongoose");

const financeSchema = new Schema(
  {
    amount: {
      type: Schema.Types.Number,
      required: true,
      min: [0.01, "Amount must be greater than 0"],
    },
    type: {
      type: Schema.Types.String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    date: {
      type: Schema.Types.Date,
      required: true,
    },
    notes: {
      type: Schema.Types.String,
      default: "",
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deletedAt: {
      type: Schema.Types.Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for common query patterns
financeSchema.index({ date: -1 });
financeSchema.index({ type: 1, category: 1 });
financeSchema.index({ deletedAt: 1 });

const FinanceModel = model("FinancialRecord", financeSchema);
module.exports = FinanceModel;
