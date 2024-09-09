export enum VALIDATION_ERROR {
  required = 'required',
  minlength = 'minlength',
  maxlength = 'maxlength',
  empty = 'empty',
  UserNotActive = 'UserNotActive',
  UserNotFound = 'UserNotFound',
  token = 'tokenExpired',
  email = 'email',
  passwordMismatch = 'passwordMismatch',
  passwordStrength = 'passwordStrength',
  exactLength = 'exactLength'
}
