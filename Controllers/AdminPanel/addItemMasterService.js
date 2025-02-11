const express = require("express");
const Joi = require("joi");
const pool = require("../../dbConnection");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { env } = require("process");

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    // inventoryItemId: Joi.number().max(999999999999999).required(),
    // organizationId: Joi.number().max(999999999999999).required(),
    inventoryItemCode: Joi.string().max(40).required(),
    description: Joi.string().max(240).min(0),
    primaryUomCode: Joi.string().max(3).min(0),
    primaryUnitOfMeasure: Joi.string().max(25).min(0),
    lastUpdateDate: Joi.string().required(),
    lastUpdatedBy: Joi.number().required(),
    creationDate: Joi.string().required(),
    createdBy: Joi.number().required(),
    lastUpdateLogin: Joi.number().allow(null),
    enabledFlag: Joi.string().max(1).required(),
    startDateActive: Joi.date().allow(null, ""),
    endDateActive: Joi.date().allow(null, ""),
    buyerId: Joi.number().max(999999999).allow(null),
    segment1: Joi.string().max(40).min(0),
    segment2: Joi.string().max(40).min(0),
    segment3: Joi.string().max(40).min(0),
    segment4: Joi.string().max(40).min(0),
    segment5: Joi.string().max(40).min(0),
    purchasingItemFlag: Joi.string().max(1).required(),
    serviceItemFlag: Joi.string().max(1).required(),
    inventoryItemFlag: Joi.string().max(1).required(),
    allowItemDescUpdateFlag: Joi.string().max(1).min(0),
    inspectionRequiredFlag: Joi.string().max(1).min(0),
    receiptRequiredFlag: Joi.string().max(1).min(0),
    rfqRequiredFlag: Joi.string().max(1).min(0),
    qtyRcvTolerance: Joi.number().allow(null),
    unitOfIssue: Joi.string().max(25).min(0),
    daysEarlyReceiptAllowed: Joi.number().allow(null),
    daysLateReceiptAllowed: Joi.number().allow(null),
    receivingRoutingId: Joi.number().allow(null),
    shelfLifeCode: Joi.number().allow(null),
    shelfLifeDays: Joi.number().allow(null),
    sourceOrganizationId: Joi.number().allow(null),
    sourceSubInventory: Joi.string().max(10),
    acceptableEarlyDays: Joi.number().allow(null),
    fixedLeadTime: Joi.number().allow(null),
    variableLeadTime: Joi.number().allow(null),
    minMinmaxQuantity: Joi.number().allow(null),
    maxMinmaxQuantity: Joi.number().allow(null),
    minimumOrderQuantity: Joi.number().allow(null),
    maximumOrderQuantity: Joi.number().allow(null),
    paymentTermsId: Joi.number().allow(null),
    categoryId: Joi.number().allow(null),
  });
  const validation = schema.validate(req.body);

  if (validation.error) {
    console.log(validation.error);

    return res.status(400).send("Invalid inputs");
  }

  const {
    // inventoryItemId,
    inventoryItemCode,
    description,
    primaryUomCode,
    primaryUnitOfMeasure,
    lastUpdateDate,
    lastUpdatedBy,
    creationDate,
    createdBy,
    lastUpdateLogin,
    enabledFlag,
    startDateActive,
    endDateActive,
    buyerId,
    segment1,
    segment2,
    segment3,
    segment4,
    segment5,
    purchasingItemFlag,
    serviceItemFlag,
    inventoryItemFlag,
    allowItemDescUpdateFlag,
    inspectionRequiredFlag,
    receiptRequiredFlag,
    rfqRequiredFlag,
    qtyRcvTolerance,
    unitOfIssue,
    daysEarlyReceiptAllowed,
    daysLateReceiptAllowed,
    receivingRoutingId,
    shelfLifeCode,
    shelfLifeDays,
    sourceOrganizationId,
    sourceSubInventory,
    acceptableEarlyDays,
    fixedLeadTime,
    variableLeadTime,
    minMinmaxQuantity,
    maxMinmaxQuantity,
    minimumOrderQuantity,
    maximumOrderQuantity,
    paymentTermsId,
    categoryId,
  } = req.body;

  try {
    const primaryKey = await pool.query(
      "SELECT public.fn_new_seq_id('inventory_item_id', 'mtl_system_items')"
    );
    const inventoryItemId = primaryKey.rows[0].fn_new_seq_id;

    const result = await pool.query(
      "INSERT INTO mtl_system_items(category_id, inventory_item_id, organization_id, inventory_item_code, description, primary_uom_code, primary_unit_of_measure, last_update_date, last_updated_by, creation_date, created_by, last_update_login, enabled_flag, start_date_active, end_date_active, buyer_id, segment1, segment2, segment3, segment4, segment5, purchasing_item_flag, service_item_flag, inventory_item_flag, allow_item_desc_update_flag, inspection_required_flag, receipt_required_flag, rfq_required_flag, qty_rcv_tolerance, unit_of_issue, days_early_receipt_allowed, days_late_receipt_allowed, receiving_routing_id, shelf_life_code, shelf_life_days, source_organization_id, source_subinventory, acceptable_early_days, fixed_lead_time, variable_lead_time, min_minmax_quantity, max_minmax_quantity, minimum_order_quantity, maximum_order_quantity, payment_terms_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45) RETURNING inventory_item_id, organization_id, category_id, primary_uom_code;",
      [
        categoryId,
        inventoryItemId,
        2,
        inventoryItemCode,
        description,
        primaryUomCode,
        primaryUnitOfMeasure,
        lastUpdateDate,
        lastUpdatedBy,
        creationDate,
        createdBy,
        lastUpdateLogin,
        enabledFlag,
        startDateActive,
        endDateActive,
        buyerId,
        segment1,
        segment2,
        segment3,
        segment4,
        segment5,
        purchasingItemFlag,
        serviceItemFlag,
        inventoryItemFlag,
        allowItemDescUpdateFlag,
        inspectionRequiredFlag,
        receiptRequiredFlag,
        rfqRequiredFlag,
        qtyRcvTolerance,
        unitOfIssue,
        daysEarlyReceiptAllowed,
        daysLateReceiptAllowed,
        receivingRoutingId,
        shelfLifeCode,
        shelfLifeDays,
        sourceOrganizationId,
        sourceSubInventory,
        acceptableEarlyDays,
        fixedLeadTime,
        variableLeadTime,
        minMinmaxQuantity,
        maxMinmaxQuantity,
        minimumOrderQuantity,
        maximumOrderQuantity,
        paymentTermsId,
      ]
    );

    return res
      .status(200)
      .json({ message: "Successfully added!", headerInfo: result.rows });
  } catch (error) {
    console.error(error);
    return next(error);
  }

  // pool.query(
  //   "SELECT COUNT(*) FROM mtl_system_items WHERE inventory_item_id = $1",
  //   [inventoryItemId],
  //   (error, result) => {
  //     const countExistUserId = result.rows[0].count;

  //     if (countExistUserId === "0") {
  //       for (let index = 1; index < 6; index++) {
  //         pool.query(
  //           "INSERT INTO mtl_system_items(inventory_item_id, organization_id, inventory_item_code, description, primary_uom_code, primary_unit_of_measure, last_update_date, last_updated_by, creation_date, created_by, last_update_login, enabled_flag, start_date_active, end_date_active, buyer_id, segment1, segment2, segment3, segment4, segment5, purchasing_item_flag, service_item_flag, inventory_item_flag, allow_item_desc_update_flag, inspection_required_flag, receipt_required_flag, rfq_required_flag, qty_rcv_tolerance, unit_of_issue, days_early_receipt_allowed, days_late_receipt_allowed, receiving_routing_id, shelf_life_code, shelf_life_days, source_organization_id, source_subinventory, acceptable_early_days, fixed_lead_time, variable_lead_time, min_minmax_quantity, max_minmax_quantity, minimum_order_quantity, maximum_order_quantity, payment_terms_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44);",
  //           [
  //             inventoryItemId,
  //             index,
  //             inventoryItemCode,
  //             description,
  //             primaryUomCode,
  //             primaryUnitOfMeasure,
  //             lastUpdateDate,
  //             lastUpdatedBy,
  //             creationDate,
  //             createdBy,
  //             lastUpdateLogin,
  //             enabledFlag,
  //             startDateActive,
  //             endDateActive,
  //             buyerId,
  //             segment1,
  //             segment2,
  //             segment3,
  //             segment4,
  //             segment5,
  //             purchasingItemFlag,
  //             serviceItemFlag,
  //             inventoryItemFlag,
  //             allowItemDescUpdateFlag,
  //             inspectionRequiredFlag,
  //             receiptRequiredFlag,
  //             rfqRequiredFlag,
  //             qtyRcvTolerance,
  //             unitOfIssue,
  //             daysEarlyReceiptAllowed,
  //             daysLateReceiptAllowed,
  //             receivingRoutingId,
  //             shelfLifeCode,
  //             shelfLifeDays,
  //             sourceOrganizationId,
  //             sourceSubInventory,
  //             acceptableEarlyDays,
  //             fixedLeadTime,
  //             variableLeadTime,
  //             minMinmaxQuantity,
  //             maxMinmaxQuantity,
  //             minimumOrderQuantity,
  //             maximumOrderQuantity,
  //             paymentTermsId,
  //           ]
  //         );
  //       }
  //       return res.status(200).json({ message: "Successfully added!" });
  //     } else {
  //       return res.status(400).json({ message: "Bad request!" });
  //     }
  //   }
  // );
});

router.post("/child", async (req, res, next) => {
  const schema = Joi.object({
    // inventory_item_id integer NOT NULL DEFAULT nextval('mtl_system_items_inventory_item_id_seq'::regclass),
    organizationId: Joi.number().required(),
    parentInventoryItemId: Joi.number().required(),
    inventoryItemCode: Joi.string().max(40).required(),
    description: Joi.string().max(240).min(0),
    primaryUomCode: Joi.string().max(3).min(0),
    primaryUnitOfMeasure: Joi.string().max(25).min(0),
    lastUpdateDate: Joi.string().required(),
    lastUpdatedBy: Joi.number().required(),
    creationDate: Joi.string().required(),
    createdBy: Joi.number().required(),
    lastUpdateLogin: Joi.number().allow(null),
    enabledFlag: Joi.string().max(1).required(),
    startDateActive: Joi.date().allow(null, ""),
    endDateActive: Joi.date().allow(null, ""),
    buyerId: Joi.number().max(999999999).allow(null),
    segment1: Joi.string().max(40).min(0),
    segment2: Joi.string().max(40).min(0),
    segment3: Joi.string().max(40).min(0),
    segment4: Joi.string().max(40).min(0),
    segment5: Joi.string().max(40).min(0),
    purchasingItemFlag: Joi.string().max(1).required(),
    serviceItemFlag: Joi.string().max(1).required(),
    inventoryItemFlag: Joi.string().max(1).required(),
    allowItemDescUpdateFlag: Joi.string().max(1).min(0),
    inspectionRequiredFlag: Joi.string().max(1).min(0),
    receiptRequiredFlag: Joi.string().max(1).min(0),
    rfqRequiredFlag: Joi.string().max(1).min(0),
    qtyRcvTolerance: Joi.number().allow(null),
    unitOfIssue: Joi.string().max(25).min(0),
    daysEarlyReceiptAllowed: Joi.number().allow(null),
    daysLateReceiptAllowed: Joi.number().allow(null),
    receivingRoutingId: Joi.number().allow(null),
    shelfLifeCode: Joi.number().allow(null),
    shelfLifeDays: Joi.number().allow(null),
    sourceOrganizationId: Joi.number().allow(null),
    sourceSubInventory: Joi.string().max(10),
    acceptableEarlyDays: Joi.number().allow(null),
    fixedLeadTime: Joi.number().allow(null),
    variableLeadTime: Joi.number().allow(null),
    minMinmaxQuantity: Joi.number().allow(null),
    maxMinmaxQuantity: Joi.number().allow(null),
    minimumOrderQuantity: Joi.number().allow(null),
    maximumOrderQuantity: Joi.number().allow(null),
    paymentTermsId: Joi.number().allow(null),
    categoryId: Joi.number().allow(null),
    uploadedFilename: Joi.string().min(0),
  });
  const validation = schema.validate(req.body);

  if (validation.error) {
    console.log(validation.error);

    return res.status(400).send("Invalid inputs");
  }

  const {
    // inventoryItemId,
    parentInventoryItemId,
    organizationId,
    inventoryItemCode,
    description,
    primaryUomCode,
    primaryUnitOfMeasure,
    lastUpdateDate,
    lastUpdatedBy,
    creationDate,
    createdBy,
    lastUpdateLogin,
    enabledFlag,
    startDateActive,
    endDateActive,
    buyerId,
    segment1,
    segment2,
    segment3,
    segment4,
    segment5,
    purchasingItemFlag,
    serviceItemFlag,
    inventoryItemFlag,
    allowItemDescUpdateFlag,
    inspectionRequiredFlag,
    receiptRequiredFlag,
    rfqRequiredFlag,
    qtyRcvTolerance,
    unitOfIssue,
    daysEarlyReceiptAllowed,
    daysLateReceiptAllowed,
    receivingRoutingId,
    shelfLifeCode,
    shelfLifeDays,
    sourceOrganizationId,
    sourceSubInventory,
    acceptableEarlyDays,
    fixedLeadTime,
    variableLeadTime,
    minMinmaxQuantity,
    maxMinmaxQuantity,
    minimumOrderQuantity,
    maximumOrderQuantity,
    paymentTermsId,
    categoryId,
    uploadedFilename,
  } = req.body;

  try {
    const result = await pool.query(
      "SELECT public.fn_new_seq_id('inventory_item_id', 'mtl_system_items_child')"
    );
    const inventoryItemId = result.rows[0].fn_new_seq_id;

    await pool.query(
      "INSERT INTO mtl_system_items_child(category_id, inventory_item_id, organization_id, parent_inventory_item_id, inventory_item_code, description, primary_uom_code, primary_unit_of_measure, last_update_date, last_updated_by, creation_date, created_by, last_update_login, enabled_flag, start_date_active, end_date_active, buyer_id, segment1, segment2, segment3, segment4, segment5, purchasing_item_flag, service_item_flag, inventory_item_flag, allow_item_desc_update_flag, inspection_required_flag, receipt_required_flag, rfq_required_flag, qty_rcv_tolerance, unit_of_issue, days_early_receipt_allowed, days_late_receipt_allowed, receiving_routing_id, shelf_life_code, shelf_life_days, source_organization_id, source_subinventory, acceptable_early_days, fixed_lead_time, variable_lead_time, min_minmax_quantity, max_minmax_quantity, minimum_order_quantity, maximum_order_quantity, payment_terms_id, uploaded_filename) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $46);",
      [
        categoryId,
        inventoryItemId,
        organizationId,
        parentInventoryItemId,
        inventoryItemCode,
        description,
        primaryUomCode,
        primaryUnitOfMeasure,
        lastUpdateDate,
        lastUpdatedBy,
        creationDate,
        createdBy,
        lastUpdateLogin,
        enabledFlag,
        startDateActive,
        endDateActive,
        buyerId,
        segment1,
        segment2,
        segment3,
        segment4,
        segment5,
        purchasingItemFlag,
        serviceItemFlag,
        inventoryItemFlag,
        allowItemDescUpdateFlag,
        inspectionRequiredFlag,
        receiptRequiredFlag,
        rfqRequiredFlag,
        qtyRcvTolerance,
        unitOfIssue,
        daysEarlyReceiptAllowed,
        daysLateReceiptAllowed,
        receivingRoutingId,
        shelfLifeCode,
        shelfLifeDays,
        sourceOrganizationId,
        sourceSubInventory,
        acceptableEarlyDays,
        fixedLeadTime,
        variableLeadTime,
        minMinmaxQuantity,
        maxMinmaxQuantity,
        minimumOrderQuantity,
        maximumOrderQuantity,
        paymentTermsId,
        uploadedFilename,
      ]
    );

    return res.status(200).json({ message: "Successfully added!" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/call/procedure", async (req, res, next) => {
  const schema = Joi.object({
    inventoryItemCode: Joi.string().max(40).required(),
    description: Joi.string().max(240).required(),
    primaryUomCode: Joi.string().max(3).min(0),
    startDateActive: Joi.date().allow(null, ""),
    // endDateActive: Joi.date().allow(null, ""),
    categoryId: Joi.number().required(),
    pUploadedFilename: Joi.string().min(0),
  });
  const validation = schema.validate(req.body);

  if (validation.error) {
    console.log(validation.error);

    return res.status(400).send("Invalid inputs");
  }

  const {
    inventoryItemCode,
    description,
    primaryUomCode,
    startDateActive,
    categoryId,
    pUploadedFilename,
  } = req.body;

  const userName = req.id;
  const today = new Date();

  await pool.query(
    "CALL public.proc_manage_mtl_system_items($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
    [
      2,
      inventoryItemCode,
      description,
      primaryUomCode || "PC",
      "Y",
      startDateActive || today,
      "Y",
      "Y",
      "Y",
      categoryId,
      userName,
      pUploadedFilename || "",
    ],
    (error, result) => {
      try {
        if (error) throw error;

        res.status(200).send("Successfully added!");
      } catch (err) {
        next(err);
      }
    }
  );
});

router.put("/update/parent", async (req, res, next) => {
  // const schema = Joi.object({
  //   inventoryItemId: Joi.number().required(),
  //   inventoryItemCode: Joi.string().max(40).required(),
  //   description: Joi.string().max(240).required(),
  //   primaryUomCode: Joi.string().max(3).min(0),
  //   startDateActive: Joi.date().allow(null, ""),
  //   endDateActive: Joi.date().allow(null, ""),
  //   categoryId: Joi.number().required(),
  //   pUploadedFilename: Joi.string().min(0),
  // });
  // const validation = schema.validate(req.body);

  // if (validation.error) {
  //   console.log(validation.error.message);
  //   res.status(400).send("Invalid inputs");
  // }
  // console.log(req.body);

  const {
    inventoryItemId,
    inventoryItemCode,
    description,
    primaryUomCode,
    startDateActive,
    endDateActive,
    categoryId,
    pUploadedFilename,
  } = req.body;

  await pool.query(
    "UPDATE mtl_system_items SET inventory_item_code = $1, description = $2, primary_uom_code=$3, start_date_active=$4, end_date_active=$5, category_id=$6, uploaded_filename=$7 WHERE inventory_item_id=$8;",
    [
      inventoryItemCode,
      description,
      primaryUomCode,
      startDateActive,
      endDateActive,
      categoryId,
      pUploadedFilename,
      inventoryItemId,
    ],
    (error, result) => {
      try {
        if (error) throw error;

        res.status(200).send("Successfully updated!");
      } catch (err) {
        next(err);
      }
    }
  );
});

const coverStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, process.env.ITEM_MASTER_PATH));
  },
  filename(req, file, cb) {
    console.log(file);

    cb(null, `items_${file.originalname}`);
  },
});

const coverUpload = multer({ storage: coverStorage });

router.post("/upload", coverUpload.single("file"), async (req, res, next) => {
  const fileInfo = req.file;

  if (fileInfo) {
    try {
      res
        .status(200)
        .send({ message: "Uploaded successfully!", value: fileInfo.filename });
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  } else {
    res.status(400).send({ message: "File not provided or upload failed!" });
  }
});

router.post("/download", (req, res) => {
  const location = process.env.ITEM_MASTER_PATH;
  const filename = req.body.fileName;

  console.log(location, " + ", filename);

  const filePath = path.join(__dirname, location, filename);
  // res.download(`${location}${filename}`, filename);
  res.download(filePath, filename);
});

router.delete("/delete", (req, res) => {
  const location = process.env.ITEM_MASTER_PATH;
  const filename = req.body.fileName;

  const filePath = path.join(__dirname, location, filename);

  if (!filePath) {
    return res.status(400).json({ error: "File path is required" });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: "Unable to delete file" });
    }
    res.status(200).json({ message: "File deleted successfully" });
  });
});

module.exports = router;
