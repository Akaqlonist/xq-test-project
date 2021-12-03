import { act, render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Messaging from ".";
import { EncryptionAlgorithm, XQSDK } from "@xqmsg/jssdk-core";
import * as XQSDKService from "../../../services/xqsdk";

let realUseContext: jest.Mock;
let useContextMock: jest.Mock;
const mockMail = "test@mail.com";
const mockEncryptMessage = "encrypt this";
const mockDecryptMessage = "decrypt this";

jest.mock("../../../services/xqsdk", () => {
  return {
    encryptMessage: jest
      .fn()
      .mockImplementation(
        (
          encryptingMessage: string,
          recipientMail: string,
          sdk: XQSDK,
          algorithm: EncryptionAlgorithm,
          onSuccess: (encryptedText: string, locatorKey: string) => void,
          onFail: () => void
        ) => {
          expect(encryptingMessage).toBe(mockEncryptMessage);
          onSuccess(mockDecryptMessage, "locator");
        }
      ),
    decryptMessage: jest
      .fn()
      .mockImplementation(
        (
          decryptingMessage: string,
          locatorKey: string,
          sdk: XQSDK,
          algorithm: EncryptionAlgorithm,
          onSuccess: (decryptedText: string) => void,
          onFail: () => void
        ) => {
          expect(decryptingMessage).toBe(mockDecryptMessage);
        }
      ),
  };
});

beforeEach(() => {
  realUseContext = React.useContext as jest.Mock;
  useContextMock = React.useContext = jest.fn();
  useContextMock.mockReturnValue({
    sdk: {},
  });
});

afterEach(() => {
  React.useContext = realUseContext;
});

describe("container/CryptoGraphy/Messaging", () => {
  it("mounts correctly", () => {
    const { getByTestId } = render(<Messaging recipientMail={mockMail} />);
    expect(getByTestId("test-encrypting-text")).toBeInTheDocument();
    expect(getByTestId("test-decrypting-text")).toBeInTheDocument();
    expect(getByTestId("test-encrypt-button")).toBeInTheDocument();
    expect(getByTestId("test-decrypt-button")).toBeInTheDocument();
  });

  it("encrypt and decrypt", () => {
    const { getByTestId } = render(<Messaging recipientMail={mockMail} />);

    // Type message
    const testEncryptingMessage = getByTestId(
      "test-encrypting-text"
    ) as HTMLTextAreaElement;
    fireEvent.change(testEncryptingMessage, {
      target: { value: mockEncryptMessage },
    });
    expect(testEncryptingMessage.value).toBe(mockEncryptMessage);

    const testDecryptButton = getByTestId("test-decrypt-button");
    expect(testDecryptButton).toBeDisabled();

    // Click Encrypt
    const testEncryptButton = getByTestId("test-encrypt-button");
    act(() => {
      fireEvent.click(testEncryptButton);
    });

    // encryptMessage is called
    expect(XQSDKService.encryptMessage).toBeCalled();
  });
});
