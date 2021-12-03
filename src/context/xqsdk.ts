import React from "react";
import { XQSDK } from "@xqmsg/jssdk-core";

export const sdk = new XQSDK({
  XQ_API_KEY: process.env.REACT_APP_XQ_API_KEY ?? "",
  DASHBOARD_API_KEY: process.env.REACT_APP_DASHBOARD_API_KEY ?? "",
});

export const algorithm = sdk.getAlgorithm("OTPv2");

export const XQSDKContext = React.createContext({ sdk, algorithm });
