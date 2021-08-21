import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (user_id: stirng, pwd: stirng) => {
  return cookies.set(user_id, pwd);
};

export const getCookie = (user_id: stirng) => {
  return cookies.get(user_id);
};
