import { ethers } from "hardhat";

/* GENERIC DROP PARAMETERS */
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MINT_PRICE = 0.5;
export const PRICE = ethers.utils.parseEther(MINT_PRICE.toString());
export const SUPPLY = 90;
export const ROYALTY_SHARE = 10000;
export const RIGHTHOLDER_FEE = 950000;

export const MINT_QUANTITY_3 = 3;
export const OPTIONS_3 = { value: PRICE.mul(MINT_QUANTITY_3) };

export const SUPPLY_10 = 10;

export const PHASE_0_START = 1000000000;
export const PHASE_0_MAX_MINT = 1;

export const PHASE_1_START = 1500000000;
export const PHASE_1_MAX_MINT = 2;

export const PHASE_2_START = 2500000000;
export const PHASE_2_MAX_MINT = 3;
