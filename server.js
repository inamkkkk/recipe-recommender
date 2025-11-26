const express = require('express');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/recipes', recipeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});