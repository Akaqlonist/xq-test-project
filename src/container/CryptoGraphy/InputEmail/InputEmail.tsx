import React, { ChangeEvent, FC } from "react";
import { useState, useContext, useEffect } from "react";
import { XQSDKContext } from "../../../context/xqsdk";
import { sendPincode } from "../../../services/xqsdk";
import { isEmail } from "../../../utils/helpers";
import { InputEmailProps } from "./InputEmail.types";

const InputEmail: FC<InputEmailProps> = ({ onSuccess }) => {
  const { sdk } = useContext(XQSDKContext);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState(
    "Please input your recipient mail address, verification PIN code will be sent"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleChangeRecipientMail = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
    setValidated(isEmail(e.target.value));
  };

  const handleSendPincode = () => {
    setLoading(true);
    sendPincode(sdk, mail, onSuccess, (message: string) => {
      if (!mounted) return;
      setMessage(message);
    });
  };

  return (
    <>
      <p className="t-c">{message}</p>
      <div className="m-a">
        <input
          type="text"
          data-testid="test-email"
          aria-label="email"
          value={mail}
          onChange={handleChangeRecipientMail}
          className="text-input"
        />
        <button
          data-testid="test-sendpin"
          aria-label="send pincode"
          disabled={loading || !validated}
          onClick={handleSendPincode}
        >
          Send PIN code
        </button>
      </div>
    </>
  );
};

export default InputEmail;
