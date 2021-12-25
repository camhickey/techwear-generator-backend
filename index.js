const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body
//LISTENING
app.listen(process.env.PORT || 5000, () => {
  console.log("server has started on port 5000");
});

//ROUTES

//Get clothing based on color, style, and article type

app.get("/techwear/:color/:style/:article", async (req, res) => {
  try {
    const { color, style, article } = req.params;
    const techwear = await pool.query(
      "SELECT * FROM techwear WHERE (color=$1 AND style=$2 AND article=$3) ORDER BY RANDOM() LIMIT 1",
      [color, style, article]
    );
    res.json(techwear.rows);
  } catch (err) {
    console.error(err.message);
  }
});