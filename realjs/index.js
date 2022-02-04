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


//Закрываем попапы на кнопку и оверлей
popupsArray.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("popup__close-button") || evt.target.classList.contains("popup") ){ 
      closePopup(popup)
    }
  })
  popup.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' ) {
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


// Открыть редактирование профиля.
function openProfilePopup() {

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  // 3аполняем поля формы.
  openPopup(profileEditPopup);
}




//Делаем валидацию форм

const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorMessageClass: 'popup__error-message_active'
}

const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings );
  } 
  else {
    hideInputError(formElement, inputElement, settings);
  }
}; 

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorMessageClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorMessageClass);
  errorElement.textContent = '';
}; 


const setEventListeners = (formElement, settings) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, settings)
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}; 

const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, settings);
  });
};

//Активность кнопки
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, settings) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(settings.disabledButtonClass);
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(settings.disabledButtonClass);
  }
}; 




