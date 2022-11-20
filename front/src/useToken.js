import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  function getUser() {
    const userInfo = localStorage.getItem('user');
    return userInfo && userInfo;
  }

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  function saveToken(userToken, userInfo) {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', userInfo);
    setToken(userToken);
    setUser(userInfo);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem('user');
    setUser(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
    user,
  }

}

export default useToken;