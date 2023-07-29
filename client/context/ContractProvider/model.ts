import { ethers } from "ethers";

export interface ContractState {
    SRG: ethers.Contract | undefined;
    PoolSrgApe: ethers.Contract | undefined;


}

export const CONTRACT_INITIAL_STATE: ContractState = {
    SRG: undefined,
    PoolSrgApe: undefined,
};