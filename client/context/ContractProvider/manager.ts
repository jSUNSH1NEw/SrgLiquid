import { useEffect, useState } from "react";
import { CONTRACT_INITIAL_STATE } from "./model";
import { contractAddresses } from "../../config";
import { ethers } from "ethers";
import PoolSrgApeJSON from "../../artifact/SurgeApe.json";
// import SRGToken from "../../artifact/SRG.json";

const useContractManager = () => {
    const [state, setState] = useState(CONTRACT_INITIAL_STATE);
    const [addresses, setAddresses] = useState<SRGContractList | undefined>();

    useEffect(() => {
        if (addresses) {
            setState({
                ...state,
                PoolSrgApe: new ethers.Contract(
                    addresses.PoolSrgApe as string,
                    PoolSrgApeJSON.abi,
                )
            });
            // if (addresses.PoolSrgApe) {
            //     setState((state) => ({
            //         ...state,
            //         stable: new ethers.Contract(
            //             addresses.SRG as string,
            //             // SRGJSON.abi,
            //         ),
            //     }));
            // }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresses]);
    return state;
};

export default useContractManager;