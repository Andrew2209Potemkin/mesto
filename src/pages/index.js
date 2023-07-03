import { formObject, initialCards } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

const elementsContainer = '.elements';
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddProfile = document.querySelector('.profile__add-btn');
const formElementTypeEdit = document.querySelector('.popup__form_type_edit');
const formElementTypeCreate = document.querySelector('.popup__form_type_create');
const nameInputTypeEdit = document.querySelector('.popup__form-item_type_name');
const jobInput = document.querySelector('.popup__form-item_type_job');

const formTypeCreateValidation = new FormValidator(formObject, formElementTypeCreate);
formTypeCreateValidation.enableValidation();

const formTypeEditValidation = new FormValidator(formObject, formElementTypeEdit);
formTypeEditValidation.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ name: '.profile__title', job: '.profile__subtitle' });

function createElement(item) {
  const card = new Card(item, '#element', (name, link) => {
    popupWithImage.open(name, link);
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const cardList = new Section({
  data: initialCards,
  renderer: createElement
}, elementsContainer);

cardList.renderItems();

const popupTypeEditWithForm = new PopupWithForm('.popup_type_edit', (data) => {
  userInfo.setUserInfo(data);
  popupTypeEditWithForm.close();
});

popupTypeEditWithForm.setEventListeners();
popupTypeEditWithForm.close();

const popupTypeCreateWithForm = new PopupWithForm('.popup_type_create', (data) => {
  createElement(data);
  popupTypeCreateWithForm.close();
});

popupTypeCreateWithForm.setEventListeners();
popupTypeCreateWithForm.close();

buttonEditProfile.addEventListener('click', function () {
  popupTypeEditWithForm.open();
  const { name, job } = userInfo.getUserInfo();
  nameInputTypeEdit.value = name;
  jobInput.value = job;
  formTypeEditValidation.clearFormErrors();
});

buttonAddProfile.addEventListener('click', function () {
  popupTypeCreateWithForm.open();
  formTypeCreateValidation.clearFormErrors();
});
