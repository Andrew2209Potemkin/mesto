let buttonOpenPopap = document.querySelector('.profile__edit-btn');
let buttonClosePopap = document.querySelector('.popup__close-btn');
let popap = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-item_type_name');
let jobInput = document.querySelector('.popup__form-item_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');

let PopupFunction = function () {
  popap.classList.toggle('popup_opened');
}

buttonOpenPopap.addEventListener('click', PopupFunction);
buttonClosePopap.addEventListener('click', PopupFunction);

nameInput.value = profileTitle.textContent;
jobInput.value = profileSubTitle.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = `${nameInput.value}`;
  profileSubTitle.textContent = `${jobInput.value}`;

  PopupFunction();
}

formElement.addEventListener('submit', handleFormSubmit);
