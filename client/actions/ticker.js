import { eventSourceBuilder, stopEventSource } from 'restful-api-redux';
import { API_URL } from '../constant';

export const listenTicker = () => eventSourceBuilder('demoticker', `${API_URL}/demotickers/change-stream`);

export const stopTicker = () => stopEventSource('demoticker');
