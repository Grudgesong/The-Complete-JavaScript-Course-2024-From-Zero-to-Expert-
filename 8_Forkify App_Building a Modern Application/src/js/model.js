import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    ); // Sending a GET request to the API endpoint
    const data = await res.json(); // Parsing the JSON response

    // Checking if the response is not ok, throwing an error if it is not
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Extracting recipe data from the response
    const { recipe } = data.data; //data.data.recipe
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    }; // Restructuring the recipe data
  } catch (err) {
    alert(err);
  }
};
