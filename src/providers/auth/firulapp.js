import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS
} from "./actions";

export default (axios, params = {}) => {
  params = {
    routes: {
      login: "/user/login",
      logout: "/user/logout"
    },
    getCredentials: ({ username, encryptedPassword, loguedIn }) => {
      return {
        username: username,
        encryptedPassword,
        loguedIn
      };
    },
    getAppSessionDto: ({ id, userId, deviceId }) => {
      return {
        id: id,
        userId: userId,
        deviceId: deviceId
      };
    },
    getName: u => u.name,
    getEmail: u => u.username,
    getPermissions: u => u.roles,
    ...params
  };

  let {
    routes,
    getCredentials,
    getAppSessionDto,
    getName,
    getEmail,
    getPermissions
  } = params;

  return {
    [LOGIN]: async ({ username, encryptedPassword, loguedIn }) => {
      let response = await axios.post(
        routes.login,
        getCredentials({ username, encryptedPassword, loguedIn })
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      // Put the object into storage
      localStorage.setItem("loggedUser", JSON.stringify(response.data.dto));
      return Promise.resolve();
    },
    [LOGOUT]: async () => {
      let loggedUser = localStorage.getItem("loggedUser");
      loggedUser = JSON.parse(loggedUser);
      let id = loggedUser["id"];
      let userId = loggedUser["userId"];
      let deviceId = loggedUser["deviceId"];
      await axios.post(
        routes.logout,
        getAppSessionDto({ id, userId, deviceId })
      );

      localStorage.removeItem("loggedUser");
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
      let loggedUser = localStorage.getItem("loggedUser");
      loggedUser = JSON.parse(loggedUser);
      if (loggedUser["userId"]) {
        return Promise.resolve({
          data: true
        });
      }
      return Promise.reject();
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
    [GET_NAME]: user => getName(user),
    [GET_EMAIL]: user => getEmail(user),
    [GET_PERMISSIONS]: user => getPermissions(user)
  };
};
