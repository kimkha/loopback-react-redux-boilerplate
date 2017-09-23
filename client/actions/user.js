import { apiActionBuilder, apiRestBuilder, apiProfileBuilder, apiLoginBuilder, apiLogoutBuilder } from 'restful-api-redux';
import { API_URL } from '../constant';

export const profileApi = () => apiProfileBuilder(`${API_URL}/users/me`);
export const loginApi = (username, password) => apiLoginBuilder(`${API_URL}/users/login`, 'loginTrack', {
  body: JSON.stringify({
    username,
    password,
  }),
  method: 'POST',
});

export const logoutApi = (username, password) => apiLogoutBuilder(`${API_URL}/users/logout`, 'logoutTrack', {
  method: 'POST',
});

export const signupApi = (username, email, password, name) => apiRestBuilder('users', `${API_URL}/users`, null, false, 'signupTrack', {
  body: JSON.stringify({
    username,
    password,
    email,
    name,
  }),
  method: 'POST',
});

export const queryUsers = (query, group, shouldAppend) => apiRestBuilder('users', `${API_URL}/users`, group, shouldAppend);
