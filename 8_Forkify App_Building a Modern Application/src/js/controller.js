// Selecting the HTML element with class 'recipe'
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  // Defining a function that returns a promise, rejecting it after a specified time
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Fetching a recipe data from the Forkify API
const showRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    ); // Sending a GET request to the API endpoint
    const data = await res.json(); // Parsing the JSON response

    // Checking if the response is not ok, throwing an error if it is not
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Extracting recipe data from the response
    let { recipe } = data.data; //data.data.recipe
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    }; // Restructuring the recipe data

    console.log(recipe);
  } catch (err) {
    // Alerting an error if there is any problem with fetching or processing the data
    alert(err);
  }
};

showRecipe(); // Invoking the showRecipe function to fetch and display the recipe
