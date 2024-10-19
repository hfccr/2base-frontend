import { parseEther } from "viem";

export const INVITE_FEE_STRING_IN_ETH = "0.001";
export const INVITE_FEE_LABEL = INVITE_FEE_STRING_IN_ETH + "ETH";
export const INVITE_FEE = parseEther(INVITE_FEE_STRING_IN_ETH);
