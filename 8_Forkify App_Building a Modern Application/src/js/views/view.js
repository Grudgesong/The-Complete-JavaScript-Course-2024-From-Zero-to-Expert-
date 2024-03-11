import icons from '../../img/icons.svg';

export default class View {
  _data;

  // Method to render recipe onto the DOM
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup(); // Generate markup for recipe
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Insert recipe markup into DOM
  }

  // Method to clear the parent element
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Function to render a spinner inside a specified parent element
  renderSpinner() {
    // Creating markup for the spinner
    const markup = `
  <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

    // Clearing the parent element and inserting the spinner markup
    this._clear;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Method to render an error message
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Method to render a success message
  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
