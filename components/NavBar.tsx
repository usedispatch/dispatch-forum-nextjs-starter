import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export default function NavBar(props: any) {
  const network = props.network;
  const setNetwork = props.setNetwork;
  console.log(network);
  return (
    <div>
      <div className="networkSelector">
        <label className="networkLabel">Connected to {network}</label>
        <ul className="networkSelectorContent">
          <li>
            <button
              className={`networkButton ${
                network === WalletAdapterNetwork.Devnet ? "selected" : ""
              }`}
              onClick={() => setNetwork(WalletAdapterNetwork.Devnet)}
            >
              {WalletAdapterNetwork.Devnet}
            </button>
          </li>
          <li>
            <button
              className={`networkButton ${
                network === WalletAdapterNetwork.Mainnet ? "selected" : ""
              }`}
              onClick={() => setNetwork(WalletAdapterNetwork.Mainnet)}
            >
              {WalletAdapterNetwork.Mainnet}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
