import React, { FC, ChangeEvent } from "react";
import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import { XQSDKContext } from "../../../context/xqsdk";
import { encryptMessage, decryptMessage } from "../../../services/xqsdk";
import { MessagingProps } from "./Messaging.types";

const Messaging: FC<MessagingProps> = ({ recipientMail }) => {
  const { sdk, algorithm } = useContext(XQSDKContext);
  const [encryptingMessage, setEncryptingMessage] = useState("");
  const [decryptingMessage, setDecryptingMessage] = useState("");
  const [locatorKey, setLocatorKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const onChangeEncryptingMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEncryptingMessage(e.target.value);
  };

  const onChangeDecryptingMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDecryptingMessage(e.target.value);
  };

  const onEncrypt = () => {
    setLoading(true);
    encryptMessage(
      encryptingMessage,
      recipientMail,
      sdk,
      algorithm,
      (message: string, locatorKey: string) => {
        if (!mounted) return;
        setDecryptingMessage(message);
        setLocatorKey(locatorKey);
        setLoading(false);
      },
      () => {
        if (!mounted) return;
        setLoading(false);
      }
    );
  };

  const onDecrypt = () => {
    setLoading(true);
    decryptMessage(
      decryptingMessage,
      locatorKey,
      sdk,
      algorithm,
      (message: string) => {
        if (!mounted) return;
        setEncryptingMessage(message);
        setLoading(false);
      },
      () => {
        if (!mounted) return;
        setLoading(false);
      }
    );
  };

  return (
    <>
      <div className="f-g">
        <textarea
          data-testid="test-encrypting-text"
          placeholder={"Input message here to be encrypted"}
          cols={40}
          rows={3}
          value={encryptingMessage}
          onChange={onChangeEncryptingMessage}
        />
        <div className="f-sb">
          <button
            data-testid="test-encrypt-button"
            aria-label="encrypt"
            disabled={loading}
            onClick={onEncrypt}
          >
            Encrypt →
          </button>
          <button
            data-testid="test-decrypt-button"
            aria-label="decrypt"
            disabled={loading || !locatorKey}
            onClick={onDecrypt}
          >
            ← Decrypt
          </button>
        </div>
        <textarea
          data-testid="test-decrypting-text"
          cols={40}
          rows={3}
          value={decryptingMessage}
          onChange={onChangeDecryptingMessage}
        />
      </div>
    </>
  );
};

Messaging.propTypes = {
  recipientMail: PropTypes.string.isRequired,
};
export default Messaging;
