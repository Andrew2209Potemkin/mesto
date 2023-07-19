export class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete, handleCardLike, myId) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  //Клонирование разметки, получение шаблона карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  //Возвращение наполненного элемента карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this.showTheNumberOfLikes(this._likes);
    this._hasOwnerId();

    return this._element;
  }

  _hasOwnerId() {
    if (this._ownerId !== this._myId) {
      this._buttonDeleteCard.classList.add('element__delete-icon-btn_inactive');
    }
  }

  //Проверка лайков
  hasLiked() {
    return this._likes.some((data) => data._id === this._myId);
  }

  //Счетчик лайков
  showTheNumberOfLikes(likes) {
    this._likes = likes;
    this._numberOfLikes = this._element.querySelector('.element__number-like');
    this._numberOfLikes.textContent = this._likes.length;
    if (this.hasLiked()) {
      this._buttonLike.classList.add('element__like-icon-btn_active');
    } else {
      this._buttonLike.classList.remove('element__like-icon-btn_active');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.element__like-icon-btn');
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike(this._cardId);
    });

    this._buttonDeleteCard = this._element.querySelector('.element__delete-icon-btn');
    this._buttonDeleteCard.addEventListener('click', () => {
      this._handleCardDelete(this._cardId);
    });

    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
};
