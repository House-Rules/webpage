const urlBase = 'https://house-rules-jgwrbs.herokuapp.com/api/';

const loginBaseURL = 'https://user-auth-test.herokuapp.com';
const api = (path) => loginBaseURL + path;

const services = {
  login: (fields) => {
    return fetch(api('/login'), {
      method: "POST",
      body: JSON.stringify({email: fields.email, password: fields.password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    })
  },
  register: (fields) => {
    return fetch(api('/register'), {
      method: "POST",
      body: JSON.stringify({email: fields.email, password: fields.password, full_name: fields.username, message: 'Hi ' + fields.username + '!'}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    })
  },
  fetchGameList: () => {
    return fetch(urlBase + 'gameList')
    .then(response => {
      return response.json()
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    })
  },
  deleteGame: (gameId) => {
    fetch(`${urlBase}game/${gameId}/delete`, {
      method: "DELETE"
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    })
  },
  deleteHouseRules: (gameId, rulesId) => {
    fetch(`${urlBase}game/${gameId}/alternate/${rulesId}/delete`, {
      method: "DELETE"
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    })
  },
  fetchSingleGame: (id) => {
     return fetch(`${urlBase}game/${id}`)
    .then(results => {
      return results.json()
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    })
  },
  addHouseRules: (body) => {
    return fetch(`${urlBase}game/${body.id}/alternate`, {
      method: "POST",
      body: JSON.stringify(body.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      return data;
    }).catch(error => {
      return error;
    })
  },
  addGame: (gameItem) => {
    return fetch(`${urlBase}/game/new`,
      {
        method: "POST",
        body: gameItem,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      return response.json();
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}

export default services;
