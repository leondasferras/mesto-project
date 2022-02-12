
// Закрывам попап на Esc
export function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
// Открыть попап.
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
}

// Закрыть попап.
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener ('keydown', closeByEsc);
}

//Меняем название кнопки отправки формы
export function changeButtonTitle(form, buttonTitle) {
  form.querySelector('.popup__submit-button').textContent = buttonTitle;
}

//Декативация кнопки 
export const disableButton = (button) => {
  button.setAttribute('disabled', '');
  button.classList.add('popup__submit-button_disabled')
}