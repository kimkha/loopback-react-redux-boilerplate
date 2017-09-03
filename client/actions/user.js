import { apiActionBuilder, apiRestBuilder, apiLoginBuilder } from 'restful-api-redux';
import { API_URL } from '../constant';

export const loginApi = (username, password) => apiLoginBuilder(`${API_URL}/users/login?username=${username}&password=${password}`, 'loginTrack');

export const queryUsers = (query, group, shouldAppend) => apiActionBuilder('users', `${API_URL}/users`, group, shouldAppend);
