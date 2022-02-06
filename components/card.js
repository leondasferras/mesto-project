import initialCards from "./initialCards.js";

import {  openPopup,
  closePopup,
  imagePopup,

} from './modal.js'




// Шаблон карточки.
const cardTemplate = document.querySelector("#card-template").content;
// Контейнер для карточек.
const cards = document.querySelector(".cards");
const newCardPopup = document.querySelector(".popup_type_new-card");
// Создать карточку из шаблона.
function createCardFromTemplate(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = data.cardName;

  const cardImage = cardElement.querySelector(".card__pic");
  cardImage.src = data.cardLink;
  cardImage.alt = data.cardName;

  // Добавляем клик по кнопке лайка.
  cardElement
    .querySelector(".card__like-icon")
    .addEventListener("click", (event) => {
      event.target.classList.toggle("card__like-icon_active");
    });

  // Добавляем клик по кнопке удаления.
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  // Добавляем клик по картинке.
  cardElement.querySelector(".card__pic").addEventListener("click", () => {
    const popupImage = imagePopup.querySelector(".fullscr-card__pic");
    popupImage.src = data.cardLink;
    popupImage.alt = data.cardName;

    const popupCaption = imagePopup.querySelector(".fullscr-card__caption");
    popupCaption.textContent = data.cardName;

    openPopup(imagePopup);
  });

  return cardElement;
}

// Добавить карточку в конец списка.
function addCardToEnd(data) {
  const newCard = createCardFromTemplate(data);
  cards.append(newCard);
}

// Добавить карточку в начало списка.
function addCardToStart(data) {
  const newCard = createCardFromTemplate(data);
  cards.prepend(newCard);
}



// Добавляем клик по кнопке добавить.
document.querySelector(".profile__add-button").addEventListener("click", () => {
  openPopup(newCardPopup);
});


// Находим форму в DOM
const newCardForm = newCardPopup.querySelector(".popup__form");
// Находим поля формы в DOM
const cardNameInput = newCardForm.querySelector(".popup__input_card-title");
const cardSrcInput = newCardForm.querySelector(".popup__input_card-src");

// Обработчик «отправки» формы.
function addCardFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей.
  const cardNameInputValue = cardNameInput.value;
  const cardSrcInputValue = cardSrcInput.value;

  // Карточку новую добавляем.
  addCardToStart({
    cardName: cardNameInputValue,
    cardLink: cardSrcInputValue,
  });

  // Закрываем попап с формой.
  closePopup(newCardPopup);

  // Обнуляем форму.
  newCardForm.reset();

}

initialCards.forEach((card) => {
  addCardToEnd({
    cardName: card.name,
    cardLink: card.link,
  });
});



export {
  cardTemplate,
  cards,
  createCardFromTemplate,
  addCardToEnd,
  addCardToStart,
  addCardFormSubmit,
  newCardForm,
  cardNameInput,
  cardSrcInput,
}