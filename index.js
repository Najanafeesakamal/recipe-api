const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get all recipes
app.get("/recipes", (req, res) => {
  const data = fs.readFileSync("recipes.json");
  const recipes = JSON.parse(data);
  res.json(recipes);
});

// Add a new recipe
app.post("/recipes", (req, res) => {
  const data = fs.readFileSync("recipes.json");
  const recipes = JSON.parse(data);

  const newRecipe = {
    id: recipes.length + 1,
    ...req.body
  };

  recipes.push(newRecipe);
  fs.writeFileSync("recipes.json", JSON.stringify(recipes, null, 2));

  res.status(201).json(newRecipe);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
