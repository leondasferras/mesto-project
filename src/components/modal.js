
import {
  addCardFormSubmit,
  newCardForm,
} from './card.js'

import { setUserInfo } from "./api.js";


const popupsArray = Array.from(document.querySelectorAll('.popup'));
const profileEditPopup = document.querySelector(".popup_type_profile-edit");
const newCardPopup = document.querySelector(".popup_type_new-card");


// Открыть попап.
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
}

// Закрыть попап.
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener ('keydown', closeByEsc);
}

// Добавляем клик по кнопке редактировать.
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openProfilePopup();
  });

// Добавляем клик по кнопке добавить.
document.querySelector(".profile__add-button").addEventListener("click", () => {
  openPopup(newCardPopup);
});

  // Закрывам попап на Esc
  function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }

    //Закрываем попапы кликом на оверлей и кнопку
  popupsArray.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains("popup__close-button") || evt.target.classList.contains("popup") ){ 
        closePopup(popup)
      }
    })
    
  })

// Находим форму в DOM
const profileForm = profileEditPopup.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = profileForm.querySelector(".popup__input_profile-name");
const jobInput = profileForm.querySelector(".popup__input_profile-description");

// Выбираем элементы профиля.
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");

const fillUserInfo = (user) => {
  profileSubtitle.textContent = user.about;
  profileTitle.textContent = user.name;
  profileAvatar.src = user.avatar;
  profileAvatar.alt = user.name;
};


// Обработчик «отправки» формы.
function handleformProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput.
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  setUserInfo({
    name: nameInputValue,
    about: jobInputValue
  }).then(res => {
    fillUserInfo(res);
    // Закрываем попап с формой.
    closePopup(profileEditPopup);
  });
}

// Прикрепляем обработчик к форме профиля:
profileForm.addEventListener("submit", handleformProfileSubmit);

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
  handleformProfileSubmit,
  openProfilePopup,
  newCardPopup,
  popupsArray,
  profileEditPopup,
  profileForm,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  closeByEsc,
  fillUserInfo
}