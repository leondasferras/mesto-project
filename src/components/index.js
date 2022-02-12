import "../index.css";

import { fillUserInfo } from "./modal.js";

import { enableValidation, formObject } from "./validate.js";

import { fillCards } from "./card.js";

import { getUser, getCards } from "./api.js";

//Включаем валидацию

enableValidation(formObject);

const getAppInfo = () => {
  return Promise.all([getUser(), getCards()]);
};


let currentUserId;

getAppInfo()
  .then(([user, cards]) => {
    currentUserId = user._id;
    fillUserInfo(user);
    fillCards(cards);
  })
  .catch(() => console.log("Произошла ошибка!"))


export {
  currentUserId
}