export enum ROOT_ROUTE {
  auth = 'auth',
  seller = 'seller',
  management = 'management',
  error = 'error',
}

export enum AUTH_ROUTE {
  login = 'login',
  registration = 'registration',
  confirmation = 'confirmation',
  recover = 'recover',
  support = 'support',
  conditions = 'conditions',
}

export enum AUTH_QUERY {
  email = 'email',
  isResetPassword = 'isResetPassword',
}

export enum ERROR_ROUTE {
  notFound = 'notFound',
  accessDenied = 'accessDenied',
}
