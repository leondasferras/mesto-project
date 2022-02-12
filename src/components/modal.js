
import {
  addCardFormSubmit,
  newCardForm,
} from './card.js'

import {
  openPopup,
  closePopup,
  changeButtonTitle,
  disableButton
} from './utils.js'

import { setUserInfo, setUserAvatar } from "./api.js";


const popupsArray = Array.from(document.querySelectorAll('.popup'));
const profileEditPopup = document.querySelector(".popup_type_profile-edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const avatarEditPopup = document.querySelector(".popup_type_avatar-edit");




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

//Добавляем клик по аватару.
document.querySelector(".profile__avatar-wrapper").addEventListener("click", () => {
  openPopup(avatarEditPopup);
} )



    //Закрываем попапы кликом на оверлей и кнопку
  popupsArray.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains("popup__close-button") || evt.target.classList.contains("popup") ){ 
        closePopup(popup)
      }
    })
    
  })

// Находим формы в DOM
const profileForm = profileEditPopup.querySelector(".popup__form");
const avatarForm = avatarEditPopup.querySelector(".popup__form");

const avatarSubmitButton = avatarForm.querySelector(".popup__submit-button")

// Находим поля форм в DOM
const nameInput = profileForm.querySelector(".popup__input_profile-name");
const jobInput = profileForm.querySelector(".popup__input_profile-description");
const avatarUrlInput = avatarEditPopup.querySelector("#avatar-url-input")

// Выбираем элементы профиля.
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");

//Заполняем инофрмацию о профиле
const fillUserInfo = (user) => {
  profileSubtitle.textContent = user.about;
  profileTitle.textContent = user.name;
  profileAvatar.src = user.avatar;
  profileAvatar.alt = user.name;
};
//Меняем аватар
const changeAvatar = (user) => {
  profileAvatar.src = user.avatar;
}


// Обработчик «отправки» формы редактирования профиля.
function handleformProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  changeButtonTitle(profileForm, "Сохранение...")
  // Получаем значение полей jobInput и nameInput.
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  setUserInfo({
    name: nameInputValue,
    about: jobInputValue
  })
  .then(res => {
    fillUserInfo(res);
   })
  .then (res => {
    closePopup(profileEditPopup)
  })
  .catch(() => console.log("Произошла ошибка!"))
  .finally(() => changeButtonTitle(profileForm, "Сохранить"))
}

// Обработчик отправки формы смены аватара
function handleFormAvatarEditSubmit(evt) {
  evt.preventDefault();
  changeButtonTitle(avatarForm, "Сохранение...")
  //Получаем значение поля url автара
  const avatarUrl = avatarUrlInput.value;

  setUserAvatar({
    avatar: avatarUrl
    })
  .then((res) => {
    changeAvatar(res);
  })
  .then( res => {
    avatarForm.reset();
    disableButton(avatarSubmitButton)
    closePopup(avatarEditPopup);
  })
  .catch(() => console.log("Произошла ошибка"))
  .finally (() => changeButtonTitle(avatarForm, "Сохранить"))
}

// Прикрепляем обработчик к форме профиля:
profileForm.addEventListener("submit", handleformProfileSubmit);

// Прикрепляем обработчик к форме карточек:
newCardForm.addEventListener("submit", addCardFormSubmit);

//Прикрепляем обработчик к форме смены аватара:
avatarForm.addEventListener("submit", handleFormAvatarEditSubmit)


// Открыть редактирование профиля.
function openProfilePopup() {

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  // 3аполняем поля формы.
  openPopup(profileEditPopup);
}

export {
  fillUserInfo,
}