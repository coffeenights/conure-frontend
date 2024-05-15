const globalErrors: { [key: number]: string } = {
  1000: 'The request is unauthorized.',
  1001: 'The token is invalid.',
  1002: 'There was an error while trying to generate the JWT key.',
  1003: 'There was an error while trying to encrypt or decrypt the token.',
  1004: 'The credentials are invalid.',
  1005: 'The old password is invalid.',
  1006: 'The authentication system is not supported.',
  1007: 'The user is not allowed to perform the action.',
  2001: 'The request is invalid.',
  2002: 'The object was not found.',
  2003: 'The object already exists.',
  2004: 'The email is invalid.',
  2005: 'The password is invalid.',
  2006: 'The password confirmation does not match the password.',
  2007: 'The value of the following fields are not correct.',
  2008: 'The email already exists.',
  3001: 'There was an internal error.',
  3002: 'There was an error while trying to access the database.',
  3003: 'There was an error while trying to access the network.',
  4001: 'The provider is not supported.',
  4002: 'The component was not found.',
  4003: 'The application already exists.',
}

export const getErrorMessage = (code: number): string => {
  return globalErrors[code] || 'An error occurred.'
}

export const getErrorCode = (error: any): number => {
  if (error.response?.data?.code) {
    return error.response.data.code
  }
  return 0
}

export const getError = (error: any): string => {
  return getErrorMessage(getErrorCode(error))
}
