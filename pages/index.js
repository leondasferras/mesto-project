// Открыть "Редактировать профиль".
function openPopup() {
  const popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");
}

// Закрыть "Редактировать профиль".
function closePopup() {
  const popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}

// Добавляем клик по кнопке редактировать.
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openPopup();
  });

// Добавляем клик по кнопке закрыть попап.
document.querySelector(".popup__close-button").addEventListener("click", () => {
  closePopup();
});

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');

// Обработчик «отправки» формы.
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput.
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  // Выбираем элементы, куда должны быть вставлены значения полей.
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  // Вставляем новые значения с помощью textContent.
  profileTitle.textContent = nameInputValue;
  profileSubtitle.textContent = jobInputValue;

  // Закрываем попап с формой.
  closePopup();
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);









// Добавляем клик на лайки.
document.querySelectorAll(".element__like-icon").forEach(likeIcon =>
  likeIcon.addEventListener("click", (event) => {
    event.target.classList.toggle("element__like-icon_active");
  })
);