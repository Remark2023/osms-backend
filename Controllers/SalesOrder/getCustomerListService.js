const express = require("express");
const pool = require("../../dbConnection");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const primarySalesrepCode = req.id;

  await pool.query(
    "SELECT cust_account_id, account_number, full_name, ship_to_address FROM hz_cust_accounts where primary_salesrep_code=$1;",
    [primarySalesrepCode],
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

router.get("/:cust_group_id", async (req, res, next) => {
  const customerGroupId = req.params.cust_group_id;

  await pool.query(
    "SELECT cust_account_id, account_number, full_name, ship_to_address FROM hz_cust_accounts where cust_group_id=$1;",
    [customerGroupId],
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

router.get("/customerGroup/list", async (req, res, next) => {
  await pool.query(
    "SELECT cust_group_id, cust_group_name FROM hz_cust_group;",
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
// router.get("/customerGroup/list", async (req, res, next) => {
//   await pool.query(
//     "SELECT DISTINCT customer_group FROM hz_cust_accounts;",
//     (error, result) => {
//       try {
//         if (error) throw error;

//         res.status(200).json(result.rows);
//       } catch (err) {
//         next(err);
//       }
//     }
//   );
// });

module.exports = router;
