import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PrivateKeyDisplay } from "./PrivateKeyDisplay";
import { Wallet, HDNodeWallet } from "ethers";

export function CreateWallet({ mnemonic, walletType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solanaKeys, setSolanaKeys] = useState([]);
  const [ethereumKeys, setEthereumKeys] = useState([]);

  async function addWalletSolana() {
    const seed = await mnemonicToSeed(mnemonic);
    //checking which path to use
    const path = `m/44'/501'/${currentIndex}'/0'`;

    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

    const keypair = Keypair.fromSecretKey(secret);
    const pubKey = keypair.publicKey.toBase58();
    const privateKey = bs58.encode(secret);
    setCurrentIndex(currentIndex + 1);
    setSolanaKeys((keys) => [...keys, { pubKey, priKey: privateKey }]);
  }
  async function addWalletEthereum() {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setEthereumKeys((keys) => [
      ...keys,
      { pubKey: wallet.address, priKey: privateKey },
    ]);
  }

  function addWallet() {
    if (walletType === "Solana") {
      addWalletSolana();
    } else if (walletType === "Ethereum") {
      addWalletEthereum();
    }
  }

  function removeWallet() {
    if (walletType === "Solana") {
      setSolanaKeys([]);
    } else if (walletType === "Ethereum") {
      setEthereumKeys([]);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between ">
        <p className="text-4xl font-bold">{walletType}</p>
        <div className="space-x-2">
          <Button onClick={addWallet}>Add Wallet</Button>
          <Button variant="destructive" onClick={removeWallet}>
            Remove Wallet
          </Button>
        </div>
      </div>

      {walletType === "Solana" &&
        solanaKeys.map((p, index) => (
          <Card key={index} className="">
            <CardHeader>
              <CardTitle className="flex justify-between">
                Wallet {index + 1}
                <div className="">$100</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4 space-y-6 bg-gray-800 rounded-lg">
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
      {walletType === "Ethereum" &&
        ethereumKeys.map((p, index) => (
          <Card key={index} className="">
            <CardHeader>
              <CardTitle>Wallet {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="py-4 space-y-6 bg-gray-800 rounded-lg">
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
