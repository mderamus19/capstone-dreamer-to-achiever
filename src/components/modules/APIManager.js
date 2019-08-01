const remoteURL = "http://localhost:5002";
export default {
  get(id) {
    return fetch(`${remoteURL}/goals/${id}`).then(data => data.json());
  },
  getAll() {
    return fetch(`${remoteURL}/goals`).then(data => data.json());
  },

  put(editedGoal) {
    return fetch(`${remoteURL}/goals/${editedGoal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedGoal)
    }).then(data => data.json());
  },

  // manages login
  get(username) {
    return fetch(`${remoteURL}/users?username=${username}`).then(e => e.json());
  },

  post(resourceObj,resources) {
    return fetch(`${remoteURL}/${resources}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resourceObj)
    }).then(results => results.json());
  }
};