const config = {
  baseUrl: `https://nomoreparties.co/v1/plus-cohort-6`,
  headers: {
    Authorization: "319fd72a-99f7-4a7d-8ebb-df65d493a1a6",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then((res) => getResponseData(res))
  .catch(() => console.log("Произошла ошибка!"))
};

const setUserInfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
    })
    .then(res => getResponseData(res))
    .catch(() => console.log("Произошла ошибка!"))
  };

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => getResponseData(res))
  .catch(() => console.log("Произошла ошибка!"))
};

const addCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then(res => getResponseData(res))
  .catch(() => console.log("Произошла ошибка!"))
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res))
  .catch(() => console.log("Произошла ошибка!"))
};

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => getResponseData(res))
  .catch(() => console.log("Произошла ошибка!"))
};

const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res))
  .catch(() => console.log("Произошла ошибка!"))
};

const setUserAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then(res => getResponseData(res))
  .catch(() => console.log("Произошла ошибка!"))
};

export {
    getUser, 
    getCards,
    setUserInfo,
    addCard,
    deleteCard,
    addLike,
    removeLike,
    setUserAvatar
}