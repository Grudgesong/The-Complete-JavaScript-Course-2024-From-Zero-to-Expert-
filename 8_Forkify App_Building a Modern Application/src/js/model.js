import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';
import recipeView from './views/recipeView';

// State object to manage application state
export const state = {
  recipe: {}, // Object to store recipe data
  search: {
    query: '', // Query string for search
    results: [], // Array to store search results
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
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

    // Check if any bookmark in the state's bookmark array has the same ID as the provided ID
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
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
    //Reset the page to 1 when user search for new recipe
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

// Function to get search results for a specific page
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page; // Update the current page in the state
  const start = (page - 1) * state.search.resultsPerPage; //0 // Calculate the starting index of the results for the given page
  const end = page * state.search.resultsPerPage; //9 // Calculate the ending index of the results for the given page
  return state.search.results.slice(start, end); // Return the results for the given page
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt=oldQt * newServings / oldSercings
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  //Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
