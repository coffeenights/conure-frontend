# Errors returned by the API

The API returns errors in the following format:


```json
{
  "code": "error_code",
  "error": "error_message"
}
```

The status code of the response will be between 400 and 599 depending on the error.


## Error codes

### Authentication errors

Erros between 1000 and 1999 are related to authentication.

- `1000 - unauthorized`: The request is unauthorized.
- `1001 - invalid_token`: The token is invalid.
- `1002 - jwt_key_error`: There was an error while trying to generate the JWT key.
- `1003 - crypto_error`: There was an error while trying to encrypt or decrypt the token.
- `1004 - invalid_credentials`: The credentials are invalid.
- `1005 - old_password_invalid`: The old password is invalid.
- `1006 - wrong_authentication_system`: The authentication system is not supported.
- `1007 - not_allowed`: The user is not allowed to perform the action.


### Request errors

Errors between 2000 and 2999 are related to the request.

- `2001 - invalid_request`: The request is invalid.
- `2002 - object_not_found`: The object was not found.
- `2003 - object_already_exists`: The object already exists.
- `2003 - email_already_exists`: The email already exists.
- `2004 - invalid_email`: The email is invalid.
- `2005 - invalid_password`: The password is invalid.
- `2006 - password_confirmation_mismatch`: The password confirmation does not match the password.
- `2007 - invalid_field_value`: The value of the following fields are not correct.


### Server errors

Errors between 3000 and 3999 are related to the server.

- `3001 - internal_error`: There was an internal error.
- `3002 - database_error`: There was an error while trying to access the database.
- `3003 - network_error`: There was an error while trying to access the network.


### Internal errors

Errors between 4000 and 4999 are related to the internal system.

- `4001 - provider_not_supported`: The provider is not supported.
- `4002 - component_not_found`: The component was not found.
- `4003 - application_already_exists`: The application already exists.
- `4004 - application_not_deployed`: The application hasn't been deployed.
