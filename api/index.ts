require('dotenv').config();

const express = require('express');
const app = express();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const bodyParser = require('body-parser');
const path = require('path');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/:style/:color/:article', async (req, res) => {
  const { style, color, article } = req.params;
	try {
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
		}
	catch (error) {
		console.error(error);
		res.status(500).send('Error retrieving clothing');
	}
});

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;