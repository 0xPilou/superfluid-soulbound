import { ethers } from "hardhat";

export const URI = "TEST_DATA_TOKEN_URI";
/* GENERIC DROP PARAMETERS */
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MINT_PRICE = 0.5;
export const PRICE = ethers.utils.parseEther(MINT_PRICE.toString());
export const TOKEN_COUNT = 30;
export const SUPPLY = 90;
export const ROYALTY_SHARE = 10000;
export const RIGHTHOLDER_FEE = 950000;

export const MINT_QUANTITY = 1;
export const MINT_QUANTITY_3 = 3;
export const MINT_QUANTITY_5 = 5;

export const TOKEN_COUNT_1 = 1;
export const SUPPLY_10 = 10;

export const PHASE_0_START = 1000000000;
export const PHASE_0_MAX_MINT = 1;

export const PHASE_1_START = 1500000000;
export const PHASE_1_MAX_MINT = 2;

export const PHASE_2_START = 2500000000;
export const PHASE_2_MAX_MINT = 3;
