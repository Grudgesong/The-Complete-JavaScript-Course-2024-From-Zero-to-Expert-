import View from './view';
import icons from '../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!!';
  _message = '';

  // Method to generate the HTML markup for the results
  _generateMarkup() {
    // Mapping over the data array and generating markup for each result, then joining them together
    return this._data.map(this._generateMarkupPreview).join('');
  }

  // Method to generate HTML markup for a single preview/result
  _generateMarkupPreview(result) {
    // Extracting the id from the URL hash
    const id = window.location.hash.slice(1);
    // Generating HTML markup for a single result preview
    return `<li class="preview">
    <a class="preview__link ${
      result.id === id ? 'preciew__link--active' : ''
    }" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}

export default new ResultView();
