import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { AppProps } from "next/app";
import { FC, useCallback, useMemo, useState } from "react";
import DispatchApp from "../components/DispatchApp";
import NavBar from "../components/NavBar";

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css");
require("@usedispatch/forum/dist/style.css");
require("../styles/globals.css");

const baseURL = "http://localhost:3000";
const forumURL = "/forum";
const topicURL = "/topic";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const [network, setNetwork] = useState(WalletAdapterNetwork.Mainnet);

  // You can also provide a custom RPC endpoint
  const getEndpoint = useCallback(() => {
    if (network === WalletAdapterNetwork.Devnet) {
      return clusterApiUrl(network);
    } else {
      return "https://special-quaint-needle.solana-mainnet.quiknode.pro/e595d0072cc6ba40bc075ed8e030b7a4c53b3ff1/";
    }
  }, [network]);
  const endpoint = useMemo(() => getEndpoint(), [getEndpoint]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <NavBar network={network} setNetwork={setNetwork} />
          <DispatchApp
            baseURL={baseURL}
            forumURL={forumURL}
            topicURL={topicURL}
            cluster={network}
          >
            <Component {...pageProps} />
          </DispatchApp>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
