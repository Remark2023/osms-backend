const express = require("express");
const Joi = require("joi");
const pool = require("../../dbConnection");
const router = express.Router();

router.post("/add", async (req, res, next) => {
  const schema = Joi.object({
    customerBankAccountId: Joi.number().allow(null),
    customerBankBranchId: Joi.number().allow(null),
    receiptNumber: Joi.string().min(0),
    receiptDate: Joi.string().min(0),
    depositDate: Joi.string().min(0),
    amount: Joi.string().min(0),
    remittanceBankAccountId: Joi.number().allow(null),
    legalEntityId: Joi.number().allow(null),
    ledgerId: Joi.number().allow(null),
    currencyCode: Joi.string().min(0).max(15),
    payFromCustomer: Joi.string().min(0),
    receiptMethodId: Joi.string().min(0),
    docSequenceValue: Joi.string().min(0),
    docSequenceId: Joi.number().allow(null),
    status: Joi.string().min(0).max(30),
    anticipatedClearingDate: Joi.string().min(0),
    lastUpdatedBy: Joi.number().allow(null),
    // lastUpdateDate: Joi.string().min(0),
    createdBy: Joi.number().allow(null),
    // creationDate: Joi.string().min(0),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    console.log(validation.error);

    return res.status(400).send("Invalid inputs");
  }

  const {
    customerBankAccountId,
    customerBankBranchId,
    receiptNumber,
    receiptDate,
    depositDate,
    amount,
    remittanceBankAccountId,
    legalEntityId,
    ledgerId,
    currencyCode,
    payFromCustomer,
    receiptMethodId,
    docSequenceValue,
    docSequenceId,
    status,
    anticipatedClearingDate,
    lastUpdatedBy,
    // lastUpdateDate,
    createdBy,
    // creationDate,
  } = req.body;

  const date = new Date();

  await pool.query(
    "INSERT INTO public.ar_cash_receipts_all(customer_bank_account_id, customer_bank_branch_id, receipt_number, receipt_date, deposit_date, amount, remittance_bank_account_id, legal_entity_id, ledger_id, currency_code, pay_from_customer, receipt_method_id, doc_sequence_value, doc_sequence_id, status, anticipated_clearing_date, last_updated_by, last_update_date, created_by, creation_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20);",
    [
      customerBankAccountId,
      customerBankBranchId,
      receiptNumber,
      receiptDate,
      depositDate,
      amount,
      remittanceBankAccountId,
      legalEntityId,
      ledgerId,
      currencyCode,
      payFromCustomer,
      receiptMethodId,
      docSequenceValue,
      docSequenceId,
      status,
      anticipatedClearingDate,
      lastUpdatedBy,
      date,
      createdBy,
      date,
    ],
    (error, result) => {
      try {
        if (error) throw error;

        return res.status(200).json({ message: "Successfully added!" });
      } catch (err) {
        next(err);
      }
    }
  );
});

router.get("/get/:cash_receipt_id", async (req, res, next) => {
  const cashReceiptId = req.params.cash_receipt_id;

  await pool.query(
    "SELECT * FROM public.ar_cash_receipts_all WHERE cash_receipt_id=$1;",
    [cashReceiptId],
    (error, result) => {
      try {
        if (error) throw error;
        res.status(200).send(result.rows[0]);
      } catch (err) {
        next(err);
      }
    }
  );
});

router.delete("/delete/:cash_receipt_id", async (req, res, next) => {
  const cashReceiptId = req.params.cash_receipt_id;
  await pool.query(
    "DELETE FROM ar_cash_receipts_all WHERE cash_receipt_id = $1",
    [cashReceiptId],
    (error, result) => {
      try {
        if (error) throw error;

        res.status(200).json({ message: "Successfully Deleted" });
      } catch (err) {
        next(err);
      }
    }
  );
});

router.put("/update/:cash_receipt_id", async (req, res, next) => {
  const cashReceiptId = req.params.cash_receipt_id;

  const schema = Joi.object({
    customerBankAccountId: Joi.number().allow(null),
    customerBankBranchId: Joi.number().allow(null),
    receiptNumber: Joi.string().min(0),
    receiptDate: Joi.string().min(0),
    depositDate: Joi.string().min(0),
    amount: Joi.string().min(0),
    remittanceBankAccountId: Joi.number().allow(null),
    legalEntityId: Joi.number().allow(null),
    ledgerId: Joi.number().allow(null),
    currencyCode: Joi.string().min(0).max(15),
    payFromCustomer: Joi.string().min(0),
    receiptMethodId: Joi.string().min(0),
    docSequenceValue: Joi.string().min(0),
    docSequenceId: Joi.number().allow(null),
    status: Joi.string().min(0).max(30),
    anticipatedClearingDate: Joi.string().min(0),
    lastUpdatedBy: Joi.number().allow(null),
    // lastUpdateDate: Joi.string().min(0),
    createdBy: Joi.number().allow(null),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    console.log(validation.error);

    return res.status(400).send("Invalid inputs");
  }

  const {
    customerBankAccountId,
    customerBankBranchId,
    receiptNumber,
    receiptDate,
    depositDate,
    amount,
    remittanceBankAccountId,
    legalEntityId,
    ledgerId,
    currencyCode,
    payFromCustomer,
    receiptMethodId,
    docSequenceValue,
    docSequenceId,
    status,
    anticipatedClearingDate,
    lastUpdatedBy,
  } = req.body;

  const date = new Date();

  await pool.query(
    "UPDATE public.ar_cash_receipts_all SET customer_bank_account_id=$1, customer_bank_branch_id=$2, receipt_number=$3, receipt_date=$4, deposit_date=$5, amount=$6, remittance_bank_account_id=$7, legal_entity_id=$8, ledger_id=$9, currency_code=$10, pay_from_customer=$11, receipt_method_id=$12, doc_sequence_value=$13, doc_sequence_id=$14, status=$15, anticipated_clearing_date=$16, last_updated_by=$17, last_update_date=$18 WHERE cash_receipt_id=$19;",
    [
      customerBankAccountId,
      customerBankBranchId,
      receiptNumber,
      receiptDate,
      depositDate,
      amount,
      remittanceBankAccountId,
      legalEntityId,
      ledgerId,
      currencyCode,
      payFromCustomer,
      receiptMethodId,
      docSequenceValue,
      docSequenceId,
      status,
      anticipatedClearingDate,
      lastUpdatedBy,
      date,
      cashReceiptId,
    ],
    (error, result) => {
      try {
        if (error) throw error;

        return res.status(200).json({ message: "Successfully added!" });
      } catch (err) {
        next(err);
      }
    }
  );
});

module.exports = router;