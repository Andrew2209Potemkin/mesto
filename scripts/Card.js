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
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;

    return this._element;
  }

  _handleLike() {
    const buttonLike = this._element.querySelector('.element__like-icon-btn');
    buttonLike.classList.toggle('element__like-icon-btn_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPopupImage() {
    openPopup(popupTypeImage);
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-icon-btn').addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.element__delete-icon-btn').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupImage();
    });
  }
};
