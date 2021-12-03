# Context and goal

A lightweight React Single Page Application `encrypts and decrypts` text messages using `XQ Javascript SDK`

## Main technologies used

[React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/), [XQMSG](https://xqmsg.co/), [React Testing Library](https://testing-library.com/docs/react-testing-library/)

## Project structure

- _context / xqsdk.js_

  > Preserves `sdk` , `algorithm` instances in the context API

- _services / xqsdk.js_

  > Exports functions for _sending / validating_ PIN code, _encrypting / decrypting_ messages. <br/>`sendPincode` , `validatePin` , `encryptMessage` , `decryptMessage`

- _utils / helpers.js_

  > Exports helper functions for general usage. <br/>ex. `isMail`

- _container / Cryptography / InputEmail_

  > Component for input mail and send verification PIN code

- _container / Cryptography / InputPin_

  > Component for validating PIN code for authorization.

- _container / Cryptography / Messaging_
  > Component for encrypting / decrypting messages

## Testing

Unit testing is done using react-testing-library

## Environment Variables

### `General Key `and` Dashboard Key`

```
REACT_APP_XQ_API_KEY= ...
REACT_APP_DASHBOARD_API_KEY=...
```

## If I have more time, I'm going to ...

- add tests for `services/xqsdk.js`
- add e2e tests using cypress
- add store for future features
- add `node-sass` for modular scss
- make UI looks better
