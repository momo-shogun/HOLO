import Header from "./components/shared/Header";
import ChooseNetwork from "./components/shared/ChooseNetwork";
import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";
import Footer from "./components/shared/Footer";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  async function giveMnemonic() {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  }
  useEffect(() => {
    giveMnemonic();
  }, []);
  return (
    <>
      <Header></Header>
      <ChooseNetwork
        giveMnemonic={giveMnemonic}
        mnemonic={mnemonic}
      ></ChooseNetwork>
      <Footer> </Footer>
    </>
  );
}

export default App;
