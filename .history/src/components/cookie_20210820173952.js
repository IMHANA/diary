import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (user_id, pwd) => {
  return cookies.set(user_id, pwd);
};

export const getCookie = (user_id) => {
  return cookies.get(user_id);
};
