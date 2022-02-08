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
  .then((res) => getResponseData(res));
};

const setUserInfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
    })
    .then(res => getResponseData(res));
  };

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => getResponseData(res));
};

const addCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data)
    })
    .then(res => getResponseData(res));
  };




export {
    getUser, 
    getCards,
    setUserInfo,
    addCard
}