const profileEditPopupSelector = document.querySelector("#profile-edit-popup");

// Открыть "Редактировать профиль".
function openProfileEditPopup() {
  const popup = profileEditPopupSelector;
  popup.classList.add("popup_opened");
}

// Закрыть "Редактировать профиль".
function closeProfileEditPopup() {
  const popup = profileEditPopupSelector;
  popup.classList.remove("popup_opened");
}

// Добавляем клик по кнопке редактировать.
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openProfileEditPopup();
  });

// Добавляем клик по кнопке закрыть попап.
profileEditPopupSelector
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    closeProfileEditPopup();
  });

// Находим форму в DOM
const formElement = profileEditPopupSelector.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');

// Обработчик «отправки» формы.
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput.
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  // Выбираем элементы, куда должны быть вставлены значения полей.
  const profileTitle = document.querySelector(".profile__title");
  const profileSubtitle = document.querySelector(".profile__subtitle");

  // Вставляем новые значения с помощью textContent.
  profileTitle.textContent = nameInputValue;
  profileSubtitle.textContent = jobInputValue;

  // Закрываем попап с формой.
  closeProfileEditPopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);

// Начальный список карточек.
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Шаблон карточки.
const cardTemplate = document.querySelector("#card-template").content;
// Контейнер для карточек.
const cards = document.querySelector(".cards");

// Создать карточку из шаблона.
function createCardFromTemplate(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardName;

  const cardPic = cardElement.querySelector(".card__pic");
  cardPic.src = cardLink;
  cardPic.alt = cardName;

  cardElement
    .querySelector(".card__like-icon")
    .addEventListener("click", (event) => {
      event.target.classList.toggle("card__like-icon_active");
    });

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  return cardElement;
}

// Добавить карточку в конец списка.
function addCardToEnd(cardName, cardLink) {
  const newCard = createCardFromTemplate(cardName, cardLink);
  cards.append(newCard);
}

// Добавить карточку в начало списка.
function addCardToStart(cardName, cardLink) {
  const newCard = createCardFromTemplate(cardName, cardLink);
  cards.prepend(newCard);
}

// Add init cards.
initialCards.forEach((card) => {
  addCardToEnd(card.name, card.link);
});

const addCardPopupSelector = document.querySelector("#add-card-popup");

// Открыть "Добавить новое место".
function openAddCardPopup() {
  const popup = addCardPopupSelector;
  popup.classList.add("popup_opened");
}

// Закрыть "Добавить новое место".
function closeAddCardPopup() {
  const popup = addCardPopupSelector;
  popup.classList.remove("popup_opened");

  // Обнуляем value формы
  cardNameInput.value = "";
  cardSrcInput.value = "";
}

// Добавляем клик по кнопке добавить.
document.querySelector(".profile__add-button").addEventListener("click", () => {
  openAddCardPopup();
});

// Добавляем клик по кнопке закрыть попап.
addCardPopupSelector
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    closeAddCardPopup();
  });

// Находим форму в DOM
const addCardForm = addCardPopupSelector.querySelector(".popup__form");
// Находим поля формы в DOM
const cardNameInput = addCardForm.querySelector('input[name="card-title"]');
const cardSrcInput = addCardForm.querySelector('input[name="card-src"]');

// Обработчик «отправки» формы.
function addCardFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей.
  const cardNameInputValue = cardNameInput.value;
  const cardSrcInputValue = cardSrcInput.value;

  // Карточку новую добавляем.
  addCardToStart(cardNameInputValue, cardSrcInputValue);

  // Закрываем попап с формой.
  closeAddCardPopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addCardForm.addEventListener("submit", addCardFormSubmit);
