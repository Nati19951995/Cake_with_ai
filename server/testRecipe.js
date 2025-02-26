require('dotenv').config(); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createRecipe() {
    const newRecipe = await prisma.recipe.create({
        data: {
      cakeType: 'Vanilla',
      ingredients: ['Flour', 'Sugar', 'Cocoa Powder', 'Eggs', 'Milk'],
      instructions: 'Mix ingredients and bake at 180°C for 35 minutes.',
      imageUrl: 'http://example.com/chocolate-cake.jpg'
    }
  });
  console.log(newRecipe);
}

createRecipe()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  console.log(process.env.DATABASE_URL);
