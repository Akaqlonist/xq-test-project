import React, { ChangeEvent, FC } from "react";
import { useState, useContext, useEffect } from "react";
import { XQSDKContext } from "../../../context/xqsdk";
import { validatePin } from "../../../services/xqsdk";
import { InputPinProps } from "./InputPin.types";

const InputPin: FC<InputPinProps> = ({ onSuccess }) => {
  const { sdk } = useContext(XQSDKContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Verification code sent");
  const [pincode, setPincode] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const onChangePincode = (e: ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value);
  };

  const onValidateCode = () => {
    setLoading(true);
    validatePin(sdk, pincode, onSuccess, (message: string) => {
      if (!mounted) return;
      setMessage(message);
      setLoading(false);
    });
  };

  return (
    <>
      <p className="t-c">{message}</p>
      <div className="m-a">
        <input
          type="text"
          data-testid="test-pin"
          aria-label="input pincode"
          placeholder={"Input PIN code here"}
          value={pincode}
          onChange={onChangePincode}
          className="text-input"
        />
        <button
          data-testid="test-validate"
          aria-label="validate pincode"
          disabled={loading}
          onClick={onValidateCode}
        >
          Validate PIN code
        </button>
      </div>
    </>
  );
};

export default InputPin;
