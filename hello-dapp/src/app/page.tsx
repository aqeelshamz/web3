"use client";
import { ethers, Contract } from "ethers";
import { useEffect, useState } from "react";
import Hello_abi from "../contracts/Hello_abi.json";

export default function Home() {
  const [contract, setContract] = useState<Contract>();

  const [value, setValue] = useState<number>(0);

  const connectEthereum = async () => {
    if (window.ethereum == null) {
      alert("Please install MetaMask");
    }
    else {
      try {
        updateContract();
      }
      catch (err) {
        alert(err);
      }
    }
  }

  const updateContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract("0x33477C837098c7651A7e5965eD67794AB503f8f5", Hello_abi, signer);
    setContract(contract);
    console.log("Contract loaded: ", contract);
  }

  const getValue = async () => {
    const val = await contract.getValue();
    setValue(parseInt(val));
  }

  const storeValue = async (val: number) => {
    try {
      await contract.store(val);
      alert("Transaction complete!");
    }
    catch (err) {
      alert(err);
    }
  }

  const submitValue = async (e: any) => {
    e.preventDefault();
    const val = e.target.val.value;
    storeValue(val);
  }

  return (
    <main>
      <h1>Hello dApp</h1>
      <h2>Current value: {value}</h2>
      {contract ? "" : <button onClick={connectEthereum}>Connect</button>}
      {contract ? <>
        <button onClick={getValue}>Get Value</button><br />
        <form onSubmit={submitValue}>
          <input id="val" type="number" min={0} placeholder="Enter value to store" /><br />
          <button type="submit">Store Value</button>
        </form>
      </> : ""}
    </main>
  )
}
