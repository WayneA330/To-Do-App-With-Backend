type stateProp = {
  isLoggedIn: boolean;
  token: string;
  refreshToken: string;
  user: any;
  isShell: boolean;
};

type actionProp = {
  setLogginState: Function;
  logIn: Function;
  logout: Function;
  checkLoggin: Function;
};

export { stateProp, actionProp };
