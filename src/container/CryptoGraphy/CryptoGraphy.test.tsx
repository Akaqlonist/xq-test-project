import { fireEvent, render } from "@testing-library/react";
import CryptoGraphyContainer from ".";
import { InputEmailProps } from "./InputEmail/InputEmail.types";
import { InputPinProps } from "./InputPin/InputPin.types";
import { MessagingProps } from "./Messaging/Messaging.types";

const testMail = "test@mail.com";

jest.mock("./InputEmail", () => {
  const mock: React.FC<InputEmailProps> = (props) => {
    return (
      <div data-testid="test-inputemail">
        <button
          data-testid="test-buttonsend"
          onClick={() => props.onSuccess(testMail)}
        >
          Send
        </button>
        {props.children}
      </div>
    );
  };
  return mock;
});
jest.mock("./InputPin", () => {
  const mock: React.FC<InputPinProps> = (props) => {
    return (
      <div data-testid="test-inputpin">
        <button
          data-testid="test-buttonvalidate"
          onClick={() => props.onSuccess()}
        >
          Validate
        </button>
        {props.children}
      </div>
    );
  };
  return mock;
});
jest.mock("./Messaging", () => {
  const mock: React.FC<MessagingProps> = (props) => {
    return <div data-testid="test-messaging">{props.children}</div>;
  };
  return mock;
});

describe("container/CryptoGraphy/CryptoGraphy", () => {
  it("mounts InputEmail", () => {
    const { getByTestId, queryByTestId } = render(<CryptoGraphyContainer />);

    // sub components are mounted correctly
    expect(getByTestId("test-inputemail")).toBeInTheDocument();
    expect(queryByTestId("test-inputpin")).toBeNull();
    expect(queryByTestId("test-messaging")).toBeNull();
  });

  it("mounts InputPin", () => {
    const { getByTestId, queryByTestId } = render(<CryptoGraphyContainer />);

    // Press send button
    const sendButton = getByTestId("test-buttonsend");
    fireEvent.click(sendButton);

    // sub components are mounted correctly
    expect(queryByTestId("test-inputemail")).toBeNull();
    expect(getByTestId("test-inputpin")).toBeInTheDocument();
    expect(queryByTestId("test-messaging")).toBeNull();
  });

  it("mounts Messaging", () => {
    const { getByTestId, queryByTestId } = render(<CryptoGraphyContainer />);

    // Press send button
    const sendButton = getByTestId("test-buttonsend");
    fireEvent.click(sendButton);

    // Press validate button
    const validateButton = getByTestId("test-buttonvalidate");
    fireEvent.click(validateButton);

    // sub components are mounted correctly
    expect(queryByTestId("test-inputemail")).toBeNull();
    expect(queryByTestId("test-inputpin")).toBeNull();
    expect(getByTestId("test-messaging")).toBeInTheDocument();
  });
});
