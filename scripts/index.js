const elementsContainer = document.querySelector('.elements');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddProfile = document.querySelector('.profile__add-btn');
const buttonClosePopups = document.querySelectorAll('.popup__close-btn');
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

function openPopup(item) {
  item.classList.add('popup_opened');
};

function closePopup(item) {
  item.classList.remove('popup_opened');
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
  cardCreate.querySelector('.element__delete-icon-btn').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  elementImage.addEventListener('click', function () {
    openPopup(popupTypeImage);
    popupImage.src = elementImage.src;
    popupImage.alt = elementImage.alt;
    popupCaption.textContent = elementTitle.textContent;
  });
  return cardCreate;
};

function addElement(cardAdd) {
  elementsContainer.append(cardAdd);
};

initialCards.forEach(element => {
  const cardAdd = createElement(element);
  addElement(cardAdd);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputTypeEdit.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

function formSendHandler(evt) {
  evt.preventDefault();
  elementsContainer.prepend(createElement({ name: nameInputTypeCreate.value, link: urlInput.value }));
  nameInputTypeCreate.value = "";
  urlInput.value = "";
  closePopup(popupTypeCreate);
};

buttonClosePopups.forEach(element => {
  element.addEventListener('click', function (evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
  });
});

buttonEditProfile.addEventListener('click', function () {
  openPopup(popupTypeEdit);
  nameInputTypeEdit.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
});
buttonAddProfile.addEventListener('click', function () {
  openPopup(popupTypeCreate);
});
formElementTypeEdit.addEventListener('submit', handleFormSubmit);
formElementTypeCreate.addEventListener('submit', formSendHandler);
