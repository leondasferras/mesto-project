const profileEditPopup = document.querySelector(".popup_type_profile-edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_pic");

// Открыть попап.
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Закрыть попап.
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Добавляем клик по кнопке редактировать.
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openProfilePopup();
  });

// Добавляем клик по кнопке закрыть попап редактирования.
profileEditPopup
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    closePopup(profileEditPopup);
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
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener("submit", formProfileSubmitHandler);

// Шаблон карточки.
const cardTemplate = document.querySelector("#card-template").content;
// Контейнер для карточек.
const cards = document.querySelector(".cards");

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

// Add init cards.
initialCards.forEach((card) => {
  addCardToEnd({
    cardName: card.name,
    cardLink: card.link,
  });
});

// Добавляем клик по кнопке добавить.
document.querySelector(".profile__add-button").addEventListener("click", () => {
  openPopup(newCardPopup);
});

// Добавляем клик по кнопке закрыть попап добавления карточки.
newCardPopup
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    closePopup(newCardPopup);
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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
newCardForm.addEventListener("submit", addCardFormSubmit);

// Добавляем клик по кнопке закрыть попап.
imagePopup
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    closePopup(imagePopup);
  });

// Открыть редактирование профиля.
function openProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  // 3аполняем поля формы.
  openPopup(profileEditPopup);
}




//Делаем валидацию форм


// Объект формы добавления карточки
const validationParametres = {
  formSelector: document.querySelectorAll('.popup__form');
  inputSelector: document
}