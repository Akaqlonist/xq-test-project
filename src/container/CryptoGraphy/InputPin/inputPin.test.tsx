import { render, fireEvent } from "@testing-library/react";
import { XQSDK } from "@xqmsg/jssdk-core";
import React from "react";
import InputPin from ".";
import * as XQSDKService from "../../../services/xqsdk";

jest.mock("../../../services/xqsdk", () => {
  return {
    validatePin: jest
      .fn()
      .mockImplementation(
        (
          sdk: XQSDK,
          pincode: string,
          onSuccess: () => void,
          onFail: (error: string) => void
        ) => {
          expect(pincode).toBe(mockPin);
        }
      ),
  };
});

let realUseContext: jest.Mock;
let useContextMock: jest.Mock;
const mockPin = "123456";

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

describe("container/CryptoGraphy/InputPin", () => {
  it("mounts correctly", () => {
    const { getByTestId } = render(<InputPin onSuccess={() => {}} />);
    expect(getByTestId("test-pin")).toBeInTheDocument();
    expect(getByTestId("test-validate")).toBeInTheDocument();
  });

  it("calls validatePincode", () => {
    const { getByTestId } = render(<InputPin onSuccess={() => {}} />);

    // Type pin
    const testPinInput = getByTestId("test-pin") as HTMLInputElement;
    fireEvent.change(testPinInput, { target: { value: mockPin } });
    expect(testPinInput.value).toBe(mockPin);

    // Click validate
    const testValidateButton = getByTestId("test-validate");
    fireEvent.click(testValidateButton);

    // validatePincode is called
    expect(XQSDKService.validatePin).toBeCalled();
  });
});
