require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const bodyParser = require("body-parser");
const path = require("path");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app.get("/:style/:color/:article", async (req, res) => {
  const { style, color, article } = req.params;
  try {
    const clothing = await sql`
      SELECT name, price, image, link
      FROM clothing
      WHERE style = ${style} AND color = ${color} AND article = ${article}
      ORDER BY RANDOM() LIMIT 1`;
    return res.json(clothing);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving clothing");
  }
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
