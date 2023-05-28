const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__form-error_visible'
};

const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__form-item');

const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(formObject.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(formObject.errorClass);
};

const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(formObject.inputErrorClass);
  formError.classList.remove(formObject.errorClass);
  formError.textContent = '';
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  };
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formObject) => {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(formObject.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled', false);
    buttonElement.classList.remove(formObject.inactiveButtonClass);
  };
};

enableValidation(formObject);
