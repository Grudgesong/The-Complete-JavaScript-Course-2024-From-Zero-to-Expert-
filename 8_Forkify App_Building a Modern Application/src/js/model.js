import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';
import recipeView from './views/recipeView';

// State object to manage application state
export const state = {
  recipe: {}, // Object to store recipe data
  search: {
    query: '', // Query string for search
    results: [], // Array to store search results
  },
};

// Async function to load recipe data by ID
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`); // Fetching recipe data from API
    // Extracting recipe data from the response
    const { recipe } = data.data; //data.data.recipe

    // Storing recipe data in the state object
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
    //Temp error handling
    console.error(err);
    throw err;
  }
};

// Async function to load search results
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query; // Updating the search query in the state object
    const data = await getJSON(`${API_URL}?search=${query}`); // Fetching search results from API based on the query
    console.log(data);

    // Mapping the retrieved data to a format compatible with the state object
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};
