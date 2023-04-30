let buttonOpenPopup = document.querySelector('.profile__edit-btn');
let buttonClosePopup = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-item_type_name');
let jobInput = document.querySelector('.popup__form-item_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');

let openPopup = function () {
  popup.classList.add('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
}

let closePopup = function () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = `${nameInput.value}`;
  profileSubTitle.textContent = `${jobInput.value}`;

  closePopup();
}

buttonOpenPopup.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
