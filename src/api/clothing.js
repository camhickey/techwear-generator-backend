const express = require("express");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const router = express.Router();

/*Postgres doesn't allow passing the table name as a parameter,
so we have to use a switch statement to select the table based on the category parameter.
I could have used a single table with a category column, but I wanted to keep the tables separate.*/

router.get("/:style/:color/:article", async (req, res, next) => {
  try {
    const { style, color, article } = req.params;
    switch (style) {
      case "urban":
        const urban = await sql`
          SELECT name, price, image, link
          FROM urban
          WHERE color = ${color} AND article = ${article}
          ORDER BY RANDOM() LIMIT 1`;
        return res.json(urban);
      case "greyman":
        const greyman = await sql`
          SELECT name, price, image, link
          FROM greyman
          WHERE color = ${color} AND article = ${article}
          ORDER BY RANDOM() LIMIT 1`;
        return res.json(greyman);
      case "cyberpunk":
        const cyberpunk = await sql`
          SELECT name, price, image, link
          FROM cyberpunk
          WHERE color = ${color} AND article = ${article}
          ORDER BY RANDOM() LIMIT 1`;
        return res.json(cyberpunk);
      case "outdoors":
        const outdoors = await sql`
          SELECT name, price, image, link
          FROM outdoors
          WHERE color = ${color} AND article = ${article}
          ORDER BY RANDOM() LIMIT 1`;
        return res.json(outdoors);
      default:
        return res.status(404).json({ error: "Style not found" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
