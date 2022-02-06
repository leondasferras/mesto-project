
import '../index.css';



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

import {enableValidation,
        formObject } from './validate';






//Включаем валидацию

enableValidation(formObject);