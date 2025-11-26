const recipes = [
  {
    id: '1',
    name: 'Pasta Carbonara',
    ingredients: ['pasta', 'egg', 'pancetta', 'parmesan cheese', 'black pepper']
  },
  {
    id: '2',
    name: 'Omelette',
    ingredients: ['egg', 'milk', 'cheese', 'salt', 'pepper']
  },
  {
    id: '3',
    name: 'Tomato Soup',
    ingredients: ['tomato', 'onion', 'garlic', 'basil', 'vegetable broth']
  }
];

exports.recommendRecipes = (req, res) => {
  const ingredients = req.query.ingredients ? req.query.ingredients.split(',') : [];
  const recommendedRecipes = recipes.filter(recipe => {
    return ingredients.every(ingredient => recipe.ingredients.includes(ingredient));
  });

  res.json(recommendedRecipes);
};

exports.createRecipe = (req, res) => {
  const newRecipe = { id: String(recipes.length + 1), ...req.body };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
};

exports.getRecipe = (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  res.json(recipe);
};

exports.updateRecipe = (req, res) => {
  const recipeIndex = recipes.findIndex(r => r.id === req.params.id);
  if (recipeIndex === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  recipes[recipeIndex] = { ...recipes[recipeIndex], ...req.body };
  res.json(recipes[recipeIndex]);
};

exports.deleteRecipe = (req, res) => {
  const recipeIndex = recipes.findIndex(r => r.id === req.params.id);
  if (recipeIndex === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  recipes.splice(recipeIndex, 1);
  res.status(204).send();
};