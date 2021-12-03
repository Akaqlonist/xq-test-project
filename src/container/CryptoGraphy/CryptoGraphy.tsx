import React, { FC, useState } from "react";
import InputEmail from "./InputEmail";
import InputPin from "./InputPin";
import Messaging from "./Messaging";

const CryptoGraphyContainer: FC = () => {
  const [step, setStep] = useState("MAIL"); // Change the UI state using these steps: mail, pin, messaging
  const [recipientMail, setRecipientMail] = useState("");

  const handlePinSentSuccess = (mail: string) => {
    setStep("PIN_CODE");
    setRecipientMail(mail);
  };

  const handleValidateSuccess = () => {
    setStep("ENCRYPT_DECRYPT");
  };

  return (
    <div className="root-container">
      <div data-testid="greetings-container" className="container">
        {step === "MAIL" && <InputEmail onSuccess={handlePinSentSuccess} />}
        {step === "PIN_CODE" && <InputPin onSuccess={handleValidateSuccess} />}
        {step === "ENCRYPT_DECRYPT" && (
          <Messaging recipientMail={recipientMail} />
        )}
      </div>
    </div>
  );
};

export default CryptoGraphyContainer;
