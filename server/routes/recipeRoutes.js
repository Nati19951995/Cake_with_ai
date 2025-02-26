const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await prisma.recipe.findUnique({
        where: { id: parseInt(id) }
      });
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }})



    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
          await prisma.recipe.delete({
            where: { id: parseInt(id) }
          });
          res.status(204).send(); //      
        } catch (error) {
          res.status(500).json({ error: error.message });
        }})
    

router.post('/create', async (req, res) => {
  const { cakeType, ingredients, instructions, imageUrl } = req.body;

  try {
    const newRecipe = await prisma.recipe.create({
      data: { cakeType, ingredients, instructions, imageUrl }
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cakeType, ingredients, instructions, imageUrl } = req.body;

  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id: parseInt(id) },
      data: { cakeType, ingredients, instructions, imageUrl }
    });

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
