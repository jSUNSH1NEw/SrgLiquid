// import { contractAddresses } from "./contracts";

export const chains: Chain[] = [
    {
        chainId: 56,
        name: "Bsc Mainnet",
        allowed: true,
        //factorySRG20
        tokens: [
            {
                symbol: "SRG20",
                name: "SRGAPE",
                address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                decimals: 10,
                logoURI:
                    "https://tokens.1inch.io/",
            },
        ],
    }
    //ANCHOR testnet Purpose 
    // {
    //     chainId: 97,
    //     name: "Testnet network name",
    //     allowed: true,
    //     tokens: [
    //         {
    //             symbol: "SRG20",
    //             name: "SRGtoken",
    //             decimals: 6,
    //             address: contractAddresses.find((data) => data.chainId === 97)
    //                 ?.stable as string,
    //             logoURI:
    //                 "https://tokens.1inch.io/",
    //         },
    //     ],
    // },
];