export class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._data.inputSelector));
    this._buttonElement = formElement.querySelector(this._data.submitButtonSelector);
  }

  _showInputError(formInput, errorMessage) {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._data.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._data.errorClass);
  }

  _hideInputError(formInput) {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._data.inputErrorClass);
    formError.classList.remove(this._data.errorClass);
    formError.textContent = '';
  }

  _isValid(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._isValid(formInput);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }

  clearFormErrors() {
    this._inputList.forEach((formInput) => {
      this._hideInputError(formInput);
      this._toggleButtonState();
    });
  }

  _showButtonError() {
    this._buttonElement.classList.add(this._data.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _hideButtonError() {
    this._buttonElement.classList.remove(this._data.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', false);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._showButtonError();
    } else {
      this._hideButtonError();
    }
  }
};
