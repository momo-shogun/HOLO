import { useState } from "react";
import { CreateWallet } from "./CreateWallet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import MnemonicCont from "./MnemonicCont";

function ChooseNetwork({ giveMnemonic, mnemonic }) {
  const [walletType, setWalletType] = useState("Solana");

  const handleWalletChange = (value) => {
    setWalletType(value);
  };

  return (
    <>
      <div className="mt-5 bg-base-200 px-36 min-h-[75vh]">
        <Card className=" max-w-full p-8">
          <h1 className="text-5xl font-bold mb-4">Select Network</h1>
          <p className="text-lg mb-6 ">
            <span className="font-bold">HOLO</span> supports multiple
            blockchains. Which do you want to use?
          </p>
          <div className="flex space-x-4">
            <Button onClick={giveMnemonic} className=" mb-4">
              Change Mnemonic
            </Button>
            <div className="flex justify-center">
              <Select
                onValueChange={handleWalletChange}
                defaultValue={walletType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Solana">Solana</SelectItem>
                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <MnemonicCont mnemonic={mnemonic}></MnemonicCont>
        </Card>
        <Card className="max-w-full p-8 mt-5">
          <div>
            {walletType !== "" && (
              <CreateWallet mnemonic={mnemonic} walletType={walletType} />
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default ChooseNetwork;
