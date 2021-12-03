import {
  Authorize,
  ServerResponse,
  CodeValidator,
  Decrypt,
  Encrypt,
  EncryptionAlgorithm,
  XQSDK,
} from "@xqmsg/jssdk-core";

export const sendPincode = (
  sdk: XQSDK,
  mail: string,
  onSuccess: (email: string) => void,
  onFail: (error: string) => void
) => {
  new Authorize(sdk)
    .supplyAsync({
      [Authorize.USER]: mail,
    })
    .then(function (response) {
      switch (response.status) {
        case ServerResponse.OK: {
          onSuccess(mail);
          break;
        }
        case ServerResponse.ERROR: {
          onFail("PIN code delivery failed");
          break;
        }
        default:
          break;
      }
    });
};

export const validatePin = (
  sdk: XQSDK,
  pincode: string,
  onSuccess: () => void,
  onFail: (error: string) => void
) => {
  new CodeValidator(sdk)
    .supplyAsync({ [CodeValidator.PIN]: pincode })
    .then(function (validationResponse) {
      switch (validationResponse.status) {
        case ServerResponse.OK: {
          onSuccess();
          break;
        }
        case ServerResponse.ERROR: {
          onFail("PIN code delivery failed");
          break;
        }
        default:
          break;
      }
    });
};

export const encryptMessage = (
  encryptingMessage: string,
  recipientMail: string,
  sdk: XQSDK,
  algorithm: EncryptionAlgorithm,
  onSuccess: (encryptedText: string, locatorKey: string) => void,
  onFail: () => void
) => {
  const payload = {
    [Encrypt.TEXT]: encryptingMessage,
    [Encrypt.RECIPIENTS]: [recipientMail],
    [Encrypt.EXPIRES_HOURS]: 24,
  };
  new Encrypt(sdk, algorithm).supplyAsync(payload).then((response) => {
    switch (response?.status) {
      case ServerResponse.OK: {
        const data = response.payload;
        const locatorKey = data[Encrypt.LOCATOR_KEY];
        const encryptedText = data[Encrypt.ENCRYPTED_TEXT];
        onSuccess(encryptedText, locatorKey);
        break;
      }
      case ServerResponse.ERROR: {
        onFail();
        break;
      }
      default:
        break;
    }
    return response;
  });
};

export const decryptMessage = (
  decryptingMessage: string,
  locatorKey: string,
  sdk: XQSDK,
  algorithm: EncryptionAlgorithm,
  onSuccess: (decryptedText: string) => void,
  onFail: () => void
) => {
  new Decrypt(sdk, algorithm)
    .supplyAsync({
      [Decrypt.ENCRYPTED_TEXT]: decryptingMessage,
      [Decrypt.LOCATOR_KEY]: locatorKey,
    })
    .then(function (decryptResponse) {
      switch (decryptResponse?.status) {
        case ServerResponse.OK: {
          const data = decryptResponse.payload;
          const decryptedText = data[EncryptionAlgorithm.DECRYPTED_TEXT];
          onSuccess(decryptedText);
          break;
        }
        case ServerResponse.ERROR: {
          onFail();
          break;
        }
        default:
          break;
      }
    });
};
