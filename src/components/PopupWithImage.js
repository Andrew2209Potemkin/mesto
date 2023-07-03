import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__figure-image');
    this._popupCaption = this._popupSelector.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open();
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
    this._popupImage.src = link;
  }
}
