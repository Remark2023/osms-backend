const express = require("express");
const pool = require("../../dbConnection");
const router = express.Router();

router.get("/", async (req, res, next) => {
  await pool.query(
    "SELECT * FROM mtl_system_items ORDER BY inventory_item_id ASC, organization_id ASC ",
    (error, result) => {
      try {
        if (error) throw error;

        const response = {
          columnHeaders: Object.keys(result.rows[0]),
          results: result.rows,
        };
        res.status(200).json(response);
      } catch (err) {
        next(err);
      }
    }
  );
});

router.get("/inventory_item_id", async (req, res, next) => {
  await pool.query(
    "SELECT inventory_item_id, inventory_item_code, description, primary_uom_code, unit_price FROM public.mtl_system_items_V;",
    (error, result) => {
      try {
        if (error) throw error;

        res.status(200).json(result.rows);
      } catch (err) {
        next(err);
      }
    }
  );
});

module.exports = router;
