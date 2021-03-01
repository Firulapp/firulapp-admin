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
      logout: "/user/logout",
      user: "/user/type?userType=ADMIN"
    },
    getCredentials: ({ username, encryptedPassword, loguedIn }) => {
      return {
        username: username,
        encryptedPassword,
        loguedIn
      };
    },
    getName: u => u.name,
    getEmail: u => u.username,
    getPermissions: u => u.roles,
    ...params
  };

  let { routes, getCredentials, getName, getEmail, getPermissions } = params;

  return {
    [LOGIN]: async ({ username, encryptedPassword, loguedIn }) => {
      let response = await axios.post(
        routes.login,
        getCredentials({ username, encryptedPassword, loguedIn })
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return Promise.resolve();
    },
    [LOGOUT]: async () => {
      await axios.post(routes.logout);
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
      let response = await axios.get(routes.user);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      if (response.data.list[0].loguedIn) {
        return Promise.resolve({
          data: {
            name: response.data.list[0].username
          }
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
