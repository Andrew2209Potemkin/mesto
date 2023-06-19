import { formObject, initialCards } from '../scripts/constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
export { popupTypeImage, popupImage, popupCaption, openPopup, };

const elementsContainer = document.querySelector('.elements');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddProfile = document.querySelector('.profile__add-btn');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeCreate = document.querySelector('.popup_type_create');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__figure-image');
const popupCaption = document.querySelector('.popup__caption');
const formElementTypeEdit = document.querySelector('.popup__form_type_edit');
const formElementTypeCreate = document.querySelector('.popup__form_type_create');
const nameInputTypeEdit = document.querySelector('.popup__form-item_type_name');
const nameInputTypeCreate = document.querySelector('.popup__form-item_type_name-place');
const jobInput = document.querySelector('.popup__form-item_type_job');
const urlInput = document.querySelector('.popup__form-item_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const popups = document.querySelectorAll('.popup');

const formTypeCreateValidation = new FormValidator(formObject, formElementTypeCreate);
formTypeCreateValidation.enableValidation();

const formTypeEditValidation = new FormValidator(formObject, formElementTypeEdit);
formTypeEditValidation.enableValidation();

function createElement(data) {
  const card = new Card(data, '#element');
  const cardElement = card.generateCard();
  return cardElement;
};

function addInitialElement(card) {
  elementsContainer.append(card);
};

initialCards.forEach(element => {
  const card = createElement(element);
  addInitialElement(card);
});

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKey);
};

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKey);
};

function closePopupKey(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

function handleFormTypeEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputTypeEdit.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

function handleFormTypeCreateSubmit(evt) {
  evt.preventDefault();
  const inputValue = { name: nameInputTypeCreate.value, link: urlInput.value };
  elementsContainer.prepend(createElement(inputValue));
  formElementTypeCreate.reset();
  closePopup(popupTypeCreate);
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    };
  });
});

buttonEditProfile.addEventListener('click', function () {
  openPopup(popupTypeEdit);
  nameInputTypeEdit.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
  formTypeEditValidation.clearFormErrors();
});

buttonAddProfile.addEventListener('click', function () {
  openPopup(popupTypeCreate);
  formTypeCreateValidation.clearFormErrors();
});

formElementTypeEdit.addEventListener('submit', handleFormTypeEditSubmit);
formElementTypeCreate.addEventListener('submit', handleFormTypeCreateSubmit);
