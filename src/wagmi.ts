import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { baseSepolia, hardhat } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const primaryChain = baseSepolia;

export function getConfig() {
  return createConfig({
    chains: [baseSepolia],
    connectors: [
      coinbaseWallet(),
      // injected(),
      // walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
      // [hardhat.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
