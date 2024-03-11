import View from './view';
import previewView from './previewView';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No bookmarks yet. Please find a nice recipe and bookmark it!!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  // Method to generate the HTML markup for the results
  _generateMarkup() {
    // Mapping over the data array and generating markup for each result, then joining them together
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
