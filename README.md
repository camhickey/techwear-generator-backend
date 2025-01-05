# Techwear Generator
This is a personal project that generates a cohesive techwear outfit based on user preferences. The data being pulled for this project's database is retrieved using webscrapers built for specific clothing sites. The front end is built in React using TypeScript as well TailwindCSS and its sister library HeadlessUI.

You can find the fully hosted site at:
https://techweargenerator.vercel.app/

You can find the repo for the site's front end at:
https://github.com/camhickey/techwear-generator-frontend

## Information
This is a PostgreSQL backend hosted for free on [NeonTech](https://neon.tech/). Since the only data retrieval we need is to get a random piece of clothing based on user input, there is only the need for one dynamically generated route at a time. There is only one table, `clothing`, that holds all entries, and its schema is as follows:

**id**: The serialized ID of the row

**style**: The "style" of the clothing `URBAN, GREYMAN, CYBERPUNK, OUTDOORS`

**name**: The name of the clothing piece

**article**: The "type" of clothing this is `HEADWEAR, TOP, PANTS, FOOTWEAR`

**color**: The color of the clothing `BLACK, GRAY, WHITE, GREEN, BLUE, BROWN`

**price**: The price of the clothing in cents (price is displayed as `price/100` in the app to avoid storing floating points)

**link**: The link to the actual store page for the clothing

**image**: The link to the actual image of the specific piece of clothing
