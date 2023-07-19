import { Popup } from "./Popup";

export class PopupWithoutInputs extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupSelector.querySelector('.popup__form');
  }

  handleFormSubmit(newHandleFormSubmit) {
    this._handleFormSubmit = newHandleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
  }
}
