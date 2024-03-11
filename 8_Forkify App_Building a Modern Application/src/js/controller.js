import * as model from './model';
import recipeView from './views/recipeView';

// Importing 'core-js/stable' polyfill for ECMAScript features that are not natively supported by the browser
import 'core-js/stable';
// Importing 'regenerator-runtime/runtime' polyfill for generator functions and async/await syntax
import 'regenerator-runtime/runtime';

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

// controlRecipes(); // Invoking the controlRecipes function to fetch and display the recipe

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
