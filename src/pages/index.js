import { formObject } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import './index.css';
import { PopupWithoutInputs } from '../components/PopupWithoutInputs.js';

const elementsContainer = '.elements';
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddProfile = document.querySelector('.profile__add-btn');
const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
const formElementTypeAvatar = document.querySelector('.popup__form_type_avatar');
const formElementTypeEdit = document.querySelector('.popup__form_type_edit');
const formElementTypeCreate = document.querySelector('.popup__form_type_create');
const nameInputTypeEdit = document.querySelector('.popup__form-item_type_name');
const jobInput = document.querySelector('.popup__form-item_type_job');

//Инициализация Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: 'f5593e6a-e81b-4046-bd40-347703da0d21',
    'Content-Type': 'application/json'
  }
});

let myId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([res, cards]) => {
    myId = res._id;
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAavatar(res.avatar);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  })

//Валидация форм попапов
const formTypeCreateValidation = new FormValidator(formObject, formElementTypeCreate);
formTypeCreateValidation.enableValidation();

const formTypeEditValidation = new FormValidator(formObject, formElementTypeEdit);
formTypeEditValidation.enableValidation();

const formTypeAvatarValidation = new FormValidator(formObject, formElementTypeAvatar);
formTypeAvatarValidation.enableValidation();

//Инициализация попапа с картинкой
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

//Инициализация попапа без инпутов
const popupDeleteCard = new PopupWithoutInputs('.popup_type_delete');
popupDeleteCard.setEventListeners();

//Инициализация ЮзерИнфо
const userInfo = new UserInfo({ name: '.profile__title', job: '.profile__subtitle', avatar: '.profile__avatar-image' });

//Колбек попапа с картинкой
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//Колбэк создания и отрисовки элемента карточки
function createElement(item) {
  const card = new Card(item, '#element', handleCardClick, (id) => {
    popupDeleteCard.open();
    popupDeleteCard.handleFormSubmit(() => {
      api.deleteCard(id)
        .then((res) => {
          card.deleteCard(res);
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }, (id) => {
    if (card.hasLiked()) {
      api.deleteTheNumberOfLikes(id)
        .then((res) => {
          card.showTheNumberOfLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.putTheNumberOfLikes(id)
        .then((res) => {
          card.showTheNumberOfLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, myId);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

//Инициализация Section
const cardList = new Section({ renderer: createElement }, elementsContainer);

//Инициализация попапа редактирования профиля
const popupTypeEditWithForm = new PopupWithForm('.popup_type_edit', (data) => {
  api.editProfile(data.name, data.info)
    .then((res) => {
      popupTypeEditWithForm.renderLoading(true);
      userInfo.setUserInfo(res.name, res.about);
      popupTypeEditWithForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
});

popupTypeEditWithForm.setEventListeners();
popupTypeEditWithForm.close();

//Инициализация попапа создания новой карточки
const popupTypeCreateWithForm = new PopupWithForm('.popup_type_create', (data) => {
  api.addNewCard(data.name, data.link)
    .then((res) => {
      popupTypeCreateWithForm.renderLoading(true);
      createElement(res);
      popupTypeCreateWithForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
});

popupTypeCreateWithForm.setEventListeners();
popupTypeCreateWithForm.close();

//Инициализация попапа редактирования аватара
const popupTypeAvatarWithForm = new PopupWithForm('.popup_type_avatar', (data) => {
  api.updateUserAvatar(data.link)
    .then((res) => {
      popupTypeAvatarWithForm.renderLoading(true);
      userInfo.setUserAavatar(res.avatar);
      popupTypeAvatarWithForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
});

popupTypeAvatarWithForm.setEventListeners();
popupTypeAvatarWithForm.close();

//Кнопка открытия попапа редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  popupTypeEditWithForm.open();
  const { name, job } = userInfo.getUserInfo();
  nameInputTypeEdit.value = name;
  jobInput.value = job;
  formTypeEditValidation.clearFormErrors();
});

//Кнопка открытия попапа создания карточки
buttonAddProfile.addEventListener('click', function () {
  popupTypeCreateWithForm.open();
  formTypeCreateValidation.clearFormErrors();
});

//Кнопка открытия попапа редактирования аватара
buttonEditAvatar.addEventListener('click', function () {
  popupTypeAvatarWithForm.open();
  formTypeAvatarValidation.clearFormErrors();
});
