import { render, fireEvent } from "@testing-library/react";
import { XQSDK } from "@xqmsg/jssdk-core";
import React from "react";
import InputEmail from ".";
import * as XQSDKService from "../../../services/xqsdk";

jest.mock("../../../services/xqsdk", () => {
  return {
    sendPincode: jest
      .fn()
      .mockImplementation(
        (
          sdk: XQSDK,
          mail: string,
          onSuccess: (mail: string) => void,
          onFail: (error: string) => void
        ) => {
          expect(mail).toBe(mockMail);
        }
      ),
  };
});

let realUseContext: jest.Mock;
let useContextMock: jest.Mock;
const mockMail = "test@mail.com";

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

describe("container/CryptoGraphy/InputEmail", () => {
  it("mounts correctly", () => {
    const { getByTestId } = render(<InputEmail onSuccess={() => {}} />);
    expect(getByTestId("test-email")).toBeInTheDocument();
    expect(getByTestId("test-sendpin")).toBeInTheDocument();
  });

  it("calls sendPincode", () => {
    const { getByTestId } = render(<InputEmail onSuccess={() => {}} />);

    // Type email
    const testEmailInput = getByTestId("test-email") as HTMLInputElement;
    fireEvent.change(testEmailInput, { target: { value: mockMail } });
    expect(testEmailInput.value).toBe(mockMail);

    // Click send button
    const testSendButton = getByTestId("test-sendpin");
    fireEvent.click(testSendButton);

    // sendPincode is called
    expect(XQSDKService.sendPincode).toBeCalled();
  });
});
