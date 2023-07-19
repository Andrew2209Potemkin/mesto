export class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  //Применение колбэка ко всем элементам массива
  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }

  //Добавление элемента в разметку
  addItem(element) {
    this._container.prepend(element);
  }
}
