import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

// Importing 'core-js/stable' polyfill for ECMAScript features that are not natively supported by the browser
import 'core-js/stable';
// Importing 'regenerator-runtime/runtime' polyfill for generator functions and async/await syntax
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// Selecting the HTML element with class 'recipe'
const recipeContainer = document.querySelector('.recipe');

// controlRecipes(); // Invoking the controlRecipes function to fetch and display the recipe

// Fetching a recipe data from the Forkify API
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //Update results view to mark selected search result
    resultView._update(model.getSearchResultsPage());

    //Updating bookmarks view
    bookmarksView._update(model.state.bookmarks);

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

    //Render the initial pagination class
    paginationView.render(model.state.search);
  } catch (err) {}
};

const controlPagination = function (goToPage) {
  //render new results
  resultView.render(model.getSearchResultsPage(goToPage)); // Render the search results for the current page

  //Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings(in state)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView._update(model.state.recipe);
};

const controlAddBookmark = function () {
  //Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //Update recipe view
  recipeView._update(model.state.recipe);

  //Render the bookmark tab
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  //Upload the new recipe data
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
