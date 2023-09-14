const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Restaurants API listening on port ${port}`);
});

app.get("/:language", async (req, res) => {
    const query = "SELECT * FROM foodtype WHERE language = ?";
    pool.query(query, [req.params.language], (error, results) => {
      if (error) {
        res.json({ status: "Error occurred!" });
      } else {
        if (results.length === 0) {
          res.json({ status: "Not found!" });
        } else {
          res.json(results);
        }
      }
    });
  });
  
  app.get("/:foodtype", async (req, res) => {
    const query = "SELECT * FROM foodtype WHERE foodtype = ?";
    pool.query(query, [req.params.foodtype], (error, results) => {
      if (error) {
        res.json({ status: "Error occurred!" });
      } else {
        if (results.length === 0) {
          res.json({ status: "Not found!" });
        } else {
          res.json(results);
        }
      }
    });
  });
  
  app.get("/:foodtype/:id", async (req, res) => {
    const query = "SELECT * FROM foodtype WHERE foodtype = ? AND id = ?";
    pool.query(query, [req.params.foodtype, req.params.id], (error, results) => {
      if (error) {
        res.json({ status: "Error occurred!" });
      } else {
        if (results.length === 0) {
          res.json({ status: "Not found!" });
        } else {
          res.json(results);
        }
      }
    });
  });
  
  app.get("", async (req, res) => {
    const query = "SELECT * FROM foodtype"; // SQL query to retrieve all restaurants
    pool.query(query, (error, results) => {
      if (error) {
        res.json({ status: "Error occurred!" });
      } else {
        res.json(results);
      }
    });
  });
  

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`, // Use backticks (`) instead of single quotes (')
});


app.post("/", async (req, res) =>{
    const data = {
        name: req.body.name,
        address: req.body.address,
        discount: req.body.discount,
        time: req.body.time,
        foodtype: req.body.foodtype,
        url: req.body.url,
        language: req.body.language,
        id: req.body.id
    }
    const query = "INSERT INTO foodtype VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    pool.query(query, Object.values(data), (error) => {
        if (error) {
            res.json({status: "failure", reason: error.code});
        }else{
            res.json({status: "success", data: data});
        }
    });
});

app.delete("/:foodtype/:id", async (req, res) => {
    const query = "DELETE FROM foodtype WHERE foodtype = ? AND id = ?";
    pool.query(query, [req.params.foodtype, req.params.id], (error, results) => {
        if (error) {
            res.json({ status: "failure", reason: error.code });
        } else {
            if (results.affectedRows === 0) {
                res.json({ status: "Not found!" });
            } else {
                res.json({ status: "success", message: "Data deleted successfully" });
            }
        }
    });
});

