
import bscAddresses from "./deployedContract/bsc.json";

export const contractAddresses: SRGContractList[] = [
    {
        chainId: 56,
        SRG: bscAddresses["SRG"],
        PoolSrgApe: bscAddresses["PoolSrgApe"]
    }
    // {
    // ANCHOR for testnet purpose 
    // }
]