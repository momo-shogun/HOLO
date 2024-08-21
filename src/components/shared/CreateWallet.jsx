import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrivateKeyDisplay } from "./PrivateKeyDisplay";

export function CreateWallet({ mnemonic, walletType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keys, setKeys] = useState([]);

  function addWallet() {
    const seed = mnemonicToSeed(mnemonic);
    //checking which path to use
    const path =
      walletType === "Solana"
        ? `m/44'/501'/${currentIndex}'/0'`
        : `m/44'/60'/${currentIndex}'/0'`;

    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

    const keypair = Keypair.fromSecretKey(secret);
    const pubKey = keypair.publicKey.toBase58();
    const privateKey = bs58.encode(secret);
    setCurrentIndex(currentIndex + 1);
    setKeys((keys) => [...keys, { pubKey, priKey: privateKey }]);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center ">
        <p className="text-4xl font-bold">{walletType}</p>
        <div className="space-x-2">
          <Button onClick={addWallet}>Add Wallet</Button>
          <Button variant="destructive">Remove Wallet</Button>
        </div>
      </div>
      {keys.map((p, index) => (
        <Card key={index} className="">
          <CardHeader>
            <CardTitle>Wallet {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="bg-gray-800 rounded-lg py-4 space-y-6">
            <div className="space-y-1">
              <p className="text-lg font-medium">Public Key:</p>
              <p>{p.pubKey}</p>
            </div>
            <div>
              <PrivateKeyDisplay privateKey={p.priKey} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
