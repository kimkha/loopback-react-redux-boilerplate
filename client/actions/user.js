import { apiActionBuilder, apiRestBuilder, apiProfileBuilder, apiLoginBuilder } from 'restful-api-redux';
import { API_URL } from '../constant';

export const profileApi = () => apiProfileBuilder(`${API_URL}/users/me`);
export const loginApi = (username, password) => apiLoginBuilder(`${API_URL}/users/login?username=${username}&password=${password}`, 'loginTrack');
export const signupApi = (username, email, password, name) => apiActionBuilder(`${API_URL}/users/login?username=${username}&password=${password}`, 'signupTrack');

export const queryUsers = (query, group, shouldAppend) => apiRestBuilder('users', `${API_URL}/users`, group, shouldAppend);
