const elementsContainer = document.querySelector('.elements');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddProfile = document.querySelector('.profile__add-btn');
const elementTemplate = document.querySelector('#element').content;
const elementCard = elementTemplate.querySelector('.element');
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
const inputList = Array.from(formElementTypeEdit.querySelectorAll('.popup__form-item'));
const buttonEditSubmit = formElementTypeEdit.querySelector('.popup__submit-btn');
const buttonCreateSubmit = formElementTypeCreate.querySelector('.popup__submit-btn');
const popups = document.querySelectorAll('.popup');

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

function createElement(element) {
  const cardCreate = elementCard.cloneNode(true);
  const elementImage = cardCreate.querySelector('.element__image');
  const elementTitle = cardCreate.querySelector('.element__title');
  elementTitle.textContent = element.name;
  elementImage.src = element.link;
  elementImage.alt = element.name;
  cardCreate.querySelector('.element__like-icon-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-icon-btn_active');
  });
  cardCreate.querySelector('.element__delete-icon-btn').addEventListener('click', function () {
    cardCreate.remove();
  });
  elementImage.addEventListener('click', function () {
    openPopup(popupTypeImage);
    popupImage.src = elementImage.src;
    popupImage.alt = elementImage.alt;
    popupCaption.textContent = elementTitle.textContent;
  });
  return cardCreate;
};

function addInitialElement(cardAdd) {
  elementsContainer.append(cardAdd);
};

initialCards.forEach(element => {
  const cardAdd = createElement(element);
  addInitialElement(cardAdd);
});

function handleFormTypeEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputTypeEdit.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

function handleFormTypeCreateSubmit(evt) {
  evt.preventDefault();
  elementsContainer.prepend(createElement({ name: nameInputTypeCreate.value, link: urlInput.value }));
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
  inputList.forEach(() => {
    isValid(formElementTypeEdit, formInput);
    toggleButtonState(inputList, buttonEditSubmit, formObject);
  });
});

buttonAddProfile.addEventListener('click', function () {
  openPopup(popupTypeCreate);
  buttonCreateSubmit.classList.add('popup__submit-btn_disabled');
  buttonCreateSubmit.setAttribute('disabled', true);
});

formElementTypeEdit.addEventListener('submit', handleFormTypeEditSubmit);
formElementTypeCreate.addEventListener('submit', handleFormTypeCreateSubmit);
