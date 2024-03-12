import View from './view.js';
import icons from '../../img/icons.svg';

// Creating a subclass AddRecipeView which extends the View class
class AddRecipeView extends View {
  // Selecting DOM elements and assigning them to variables
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super(); // Calling the constructor of the parent class
    // Attaching event handlers for showing and hiding the modal window
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  // Method for toggling the visibility of the modal window and overlay
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  // Method to add event listener for opening the modal window
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  // Method to add event listeners for closing the modal window
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  // Method to add event listener for form submission
  addHandlerUpload(handler) {
    // Attaching a submit event listener to the parent element
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // Converting form data to an array
      const data = Object.fromEntries(dataArr); // Converting array to object
      handler(data); // Calling the handler function with the form data
    });
  }

  // Method to generate HTML markup (not implemented in this subclass)
  _generateMarkup() {}
}

export default new AddRecipeView();
