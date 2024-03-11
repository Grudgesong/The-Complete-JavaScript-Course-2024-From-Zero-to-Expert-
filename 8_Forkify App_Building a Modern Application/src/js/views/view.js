import icons from '../../img/icons.svg';

export default class View {
  _data;

  // Method to render recipe onto the DOM
  render(data, render = true) {
    // Check if data is empty or undefined
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    // Store the new data
    this._data = data;
    // Generate new markup based on the data
    const markup = this._generateMarkup(); // Generate markup for recipe

    if (!render) return markup; // Used for bookmark

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Insert recipe markup into DOM
  }

  _update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //Convert markup to dom object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // Convert DOM object into array of elements
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Iterate through each new element
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed text if it's different from the current element's text content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes if they're different from the current element's attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
