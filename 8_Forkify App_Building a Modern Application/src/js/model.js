import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY, TIMEOUT_SEC } from './config';
// import { getJSON, sentJSON } from './helpers';
import { AJAX } from './helpers';
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

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), // Check if key exists
  }; // Restructuring the recipe data
};

// Async function to load recipe data by ID
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`); // Fetching recipe data from API
    // Extracting recipe data from the response
    const { recipe } = data.data; //data.data.recipe

    // Storing recipe data in the state object
    state.recipe = createRecipeObject(data);

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
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`); // Fetching search results from API based on the query
    console.log(data);

    // Mapping the retrieved data to a format compatible with the state object
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }), // Check if key exists
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

//Storing bookmarks with local storage
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  //Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// clearBookmarks();

// Define an asynchronous function named uploadRecipe, which takes newRecipe as an argument.
export const uploadRecipe = async function (newRecipe) {
  try {
    // Extract and transform ingredients from the newRecipe object. The ingredients must start with 'ingredient' and not be an empty string.
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // For each ingredient, remove spaces and split it into an array by commas.
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        // If the split array does not have exactly 3 elements, throw an error indicating the wrong format.
        if (ingArr.length !== 3)
          throw new Error(
            ' Wrong ingredient format!! Please use the correct format'
          );
        // Destructure the array into quantity, unit, and description, converting quantity to a number (or null if it's not specified).
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // Construct a recipe object with the processed information and additional details from newRecipe.
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // Send the recipe object to a server using a function sentJSON (not defined in this snippet) with the API URL and a user's API key.
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // Process the response to create a recipe object (createRecipeObject is not defined in this snippet) and set it to some state variable.
    state.recipe = createRecipeObject(data);
    // Add the newly uploaded recipe to bookmarks (addBookmark is not defined in this snippet).
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
