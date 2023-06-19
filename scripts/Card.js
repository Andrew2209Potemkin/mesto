import { popupTypeImage, popupImage, popupCaption, openPopup, } from '../scripts/index.js';
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    return this._element;
  }

  _handleLike() {
    this._buttonLike.classList.toggle('element__like-icon-btn_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _openPopupImage() {
    openPopup(popupTypeImage);
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.element__like-icon-btn');
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.element__delete-icon-btn').addEventListener('click', () => {
      this._deleteCard();
    });
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.addEventListener('click', () => {
      this._openPopupImage();
    });
  }
};
