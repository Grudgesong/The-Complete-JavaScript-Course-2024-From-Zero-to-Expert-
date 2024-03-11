import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';

// Importing 'core-js/stable' polyfill for ECMAScript features that are not natively supported by the browser
import 'core-js/stable';
// Importing 'regenerator-runtime/runtime' polyfill for generator functions and async/await syntax
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// Selecting the HTML element with class 'recipe'
const recipeContainer = document.querySelector('.recipe');

// Fetching a recipe data from the Forkify API
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //Loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    //Rendering the recipe--------------------------------------------------------
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();

    if (!query) return;

    //Load Search results
    await model.loadSearchResults(query);

    //render results
    resultView.render(model.getSearchResultsPage()); // Render the search results for the current page
  } catch (err) {}
};

// controlRecipes(); // Invoking the controlRecipes function to fetch and display the recipe

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
