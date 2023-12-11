const express = require("express");
const pool = require("../../dbConnection");

const router = express.Router();

router.get("/", async (req, res, next) => {
  await pool.query(
    "SELECT * FROM public.oe_order_headers_all ORDER BY header_id ASC;",
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

router.get("/:header_id", async (req, res, next) => {
  const headerId = req.params.header_id;

  await pool.query(
    "SELECT * FROM public.oe_order_headers_all WHERE header_id=$1;",
    [headerId],
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

module.exports = router;