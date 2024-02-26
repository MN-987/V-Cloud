import '@/styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'
import { lightTheme } from '@rainbow-me/rainbowkit';


import { useEffect } from "react";
import Layout from '@/Components/Layout/Layout';
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  sepolia,
  polygon,
  goerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
  [
    mainnet,
    sepolia,
    goerli,
    polygon,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My Alchemy DApp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {
  const contractAddress = '0xE27492F82C21467F0882EeD9574fDE8f02a9033b'
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
        theme={lightTheme({
          accentColor: '#1f3a5f',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
        })}
				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
			>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;