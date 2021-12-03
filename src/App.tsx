import CryptoGraphyContainer from "./container/CryptoGraphy";
import { sdk, algorithm, XQSDKContext } from "./context/xqsdk";
import './global.css'

const App = () => {
  return (
    <XQSDKContext.Provider value={{ sdk, algorithm }}>
      <CryptoGraphyContainer />
    </XQSDKContext.Provider>
  );
};

export default App;
