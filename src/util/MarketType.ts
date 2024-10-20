export type MarketType = {
  contractAddress: string;
  id: bigint;
  inviter: string;
  profile: string;
  provider: number;
  totalSupply: bigint;
  fee: bigint;
  claimed: boolean;
  profileOwner: string;
};
