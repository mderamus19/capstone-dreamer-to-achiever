const remoteURL = "http://localhost:5002";
export default {
  get(id) {
    return fetch(`${remoteURL}/goals/${id}`).then(data => data.json());
  },
  getStep(id) {
    return fetch(`${remoteURL}/steps/${id}`).then(data => data.json());
  },
  getAllGoals() {
    return fetch(`${remoteURL}/goals?_embed=steps`).then(data => data.json());
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
  //ADDED STEP PUT
  put(editedStep) {
    return fetch(`${remoteURL}/steps/${editedStep.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedStep)
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
