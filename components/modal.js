
import {
  addCardFormSubmit,
  newCardForm,
} from './card.js'

import { enableValidation,
  formObject
} from './validate.js'

const popupsArray = Array.from(document.querySelectorAll('.popup'));
const profileEditPopup = document.querySelector(".popup_type_profile-edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_pic");

// Открыть попап.
function openPopup(popup) {
  popup.classList.add("popup_opened");
  enableValidation(formObject); 
}

// Закрыть попап.
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  enableValidation(formObject)
}

// Добавляем клик по кнопке редактировать.
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openProfilePopup();
  });







// Находим форму в DOM
const profileForm = profileEditPopup.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = profileForm.querySelector(".popup__input_profile-name");
const jobInput = profileForm.querySelector(".popup__input_profile-description");

// Выбираем элементы профиля.
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Обработчик «отправки» формы.
function formProfileSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput.
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  // Вставляем новые значения с помощью textContent.
  profileTitle.textContent = nameInputValue;
  profileSubtitle.textContent = jobInputValue;


  
  // Закрываем попап с формой.
  closePopup(profileEditPopup);
  enableValidation(formObject)
}

// Прикрепляем обработчик к форме профиля:

profileForm.addEventListener("submit", formProfileSubmitHandler);

// Прикрепляем обработчик к форме карточек:

newCardForm.addEventListener("submit", addCardFormSubmit);


// Открыть редактирование профиля.
function openProfilePopup() {

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  // 3аполняем поля формы.
  openPopup(profileEditPopup);
}


export {
  openPopup,
  closePopup,
  formProfileSubmitHandler,
  openProfilePopup,
  newCardPopup,
  imagePopup,
  popupsArray,
  profileEditPopup,
  profileForm,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  

}