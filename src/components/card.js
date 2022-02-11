import { initialCards } from "./initialCards.js";

import {
  openPopup,
  closePopup,
} from './modal.js'

import {
  addCard,
  deleteCard,
  addLike,
  removeLike
} from "./api.js";

import { currentUserId } from "./index.js";


const imagePopup = document.querySelector(".popup_type_pic");
const popupImage = imagePopup.querySelector(".fullscr-card__pic");
const popupCaption = imagePopup.querySelector(".fullscr-card__caption");

// Шаблон карточки.
const cardTemplate = document.querySelector("#card-template").content;

// Контейнер для карточек.
const cards = document.querySelector(".cards");
const newCardPopup = document.querySelector(".popup_type_new-card");

const isCardLiked = (card) => Boolean(card.likes.find(user => user._id === currentUserId));

// Создать карточку из шаблона.
function createCardFromTemplate(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;

  const cardImage = cardElement.querySelector(".card__pic");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  cardLikeCounter.textContent = card.likes.length;

  if (isCardLiked(card)) {
    cardElement.querySelector(".card__like-icon").classList.add('card__like-icon_active')
  }

  if (currentUserId != card.owner._id) {
    cardElement.querySelector(".card__delete-button").classList.add('card__delete-button_disabled');
  }

  // Добавляем клик по кнопке лайка.
  cardElement
    .querySelector(".card__like-icon")
    .addEventListener("click", (event) => {
      if (!isCardLiked(card)) {
        addLike(card._id)
        .then(res => {
          card = res;
          cardLikeCounter.textContent = res.likes.length;
          event.target.classList.add("card__like-icon_active");
        })
      }
      else {
        removeLike(card._id)
        .then(res => {
          card = res;
          cardLikeCounter.textContent = res.likes.length;
          event.target.classList.remove("card__like-icon_active");
        })
      }

    });

  // Добавляем клик по кнопке удаления.
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {

      if (!confirm("Точно удалить?"))
        return;

      deleteCard(card._id)
        .then(cardElement.remove());
    });

  // Добавляем клик по картинке.
  cardElement.querySelector(".card__pic").addEventListener("click", () => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;

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


  addCard({
    name: cardNameInputValue,
    link: cardSrcInputValue
  }).then(res => {

    // Карточку новую добавляем.
    addCardToStart(res);

    // Закрываем попап с формой.
    closePopup(newCardPopup);

    // Обнуляем форму.
    newCardForm.reset();

    // Деактивируем кнопку
    const submitButton = newCardPopup.querySelector('.popup__submit-button');
    submitButton.setAttribute('disabled', '');
    submitButton.classList.add('popup__submit-button_disabled');
  });
}

// Заполняем карточки данными из массива.
const fillCards = (cards) => {
  cards.forEach((card) => {
    addCardToEnd(card);
  });
};


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
  fillCards
}