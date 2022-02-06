
import './index.css';



import {
  openPopup,
  closePopup,
  formProfileSubmitHandler,
  openProfilePopup,
  newCardPopup,
  popupsArray,
  profileForm,
} from '../components/modal.js';


import {
  addCardFormSubmit,
  newCardForm,
} from '../components/card.js';







// Добавляем клик по кнопке добавить.
document.querySelector(".profile__add-button").addEventListener("click", () => {
  openPopup(newCardPopup);
});


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


// Прикрепляем обработчик к форме профиля:

profileForm.addEventListener("submit", formProfileSubmitHandler);

// Прикрепляем обработчик к форме карточек:

newCardForm.addEventListener("submit", addCardFormSubmit);
