import { ethers } from 'hardhat';


export const URI = 'TEST_DATA_TOKEN_URI'
/* GENERIC DROP PARAMETERS */ 
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MINT_PRICE = 0.5
export const PRICE = ethers.utils.parseEther(MINT_PRICE.toString());   
export const TOKEN_COUNT = 30;                                          
export const SUPPLY = 90;                                              
export const ROYALTY_SHARE = 10000;                                     
export const RIGHTHOLDER_FEE = 950000;                                   
export const MAX_PRIVATE_SALE = 1;
export const MAX_PUBLIC_SALE = 1;
export const PRIVATE_SALE_TIME = 1591006175;
export const PUBLIC_SALE_TIME = 2524651199;

export const MINT_QUANTITY = 1;
export const MINT_QUANTITY_3 = 3;
export const MINT_QUANTITY_5 = 5;


export const TOKEN_COUNT_1 = 1;
export const SUPPLY_10 = 10;
export const MAX_PRIVATE_SALE_6 = 6;
export const MAX_PUBLIC_SALE_6 = 6;
