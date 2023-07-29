import { useContext, createContext} from "react";

import { ContractState, CONTRACT_INITIAL_STATE } from "./model";

export const ContractContext = createContext<ContractState>(
    CONTRACT_INITIAL_STATE
);

export function useContractContext() {
    return useContext(ContractContext);
}