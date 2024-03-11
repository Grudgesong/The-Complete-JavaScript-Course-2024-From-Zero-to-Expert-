import View from './view';
import previewView from './previewView';

import icons from '../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!!';
  _message = '';

  // Method to generate the HTML markup for the results
  _generateMarkup() {
    // Mapping over the data array and generating markup for each result, then joining them together
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
