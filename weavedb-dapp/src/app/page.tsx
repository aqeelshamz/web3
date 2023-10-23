"use client";
import { useEffect, useState } from "react";
import WeaveDB from "weavedb-sdk";

export default function Home() {
  const [data, setData] = useState<string>("");
  const [db, setDB] = useState<WeaveDB>();
  const [user, setUser] = useState<string>("");

  const connectWallet = async () => {
    if (window.ethereum == null) {
      alert("Install MetaMask");
    }
    else {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUser(accounts[0]);
    }
  }

  const initDB = async () => {
    const db = new WeaveDB({ contractTxId: "_qJcXgNobdndZnCPZ_EhdjPUn7XijaC885865BxJGv4" });
    await db.init();
    setDB(db);
  }

  const saveData = async (e: any) => {
    e.preventDefault();
    const journal = { data: data, user: "1234567890" };
    await db.add(journal, "journals");
    alert("Journal saved!");
  }

  const getJournals = async () => {
    const journals = await db.get("journals");
    console.log(journals);
  }

  const getMyJournals = async () => {
    const journals = await db.get("journals", ["user", "==", user]);
    console.log(journals);
  }

  useEffect(() => {
    initDB();
  }, [])

  return (
    <main>
      <h1>WeaveDB dApp</h1>
      {user ? <h2>User: {user}</h2> : ""}
      {!user ? <button onClick={connectWallet}>Connect Wallet</button> : db ?
        <form onSubmit={saveData}>
          <p>Journal</p>
          <textarea id="journal" onChange={(x) => setData(x.target.value)} value={data}></textarea><br />
          <button type="submit">Save Journal</button><br />
          <button onClick={getJournals} type="button">Get All Journals</button>
          <button onClick={getMyJournals} type="button">Get My Journals</button>
        </form> : "Connecting DB..."}
    </main>
  )
}
