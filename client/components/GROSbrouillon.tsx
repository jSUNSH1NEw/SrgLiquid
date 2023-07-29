import { useState, useEffect } from "react";
import { ethers, JsonRpcProvider } from "ethers";

export const SRGentrys = () => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [volumeHistory, setVolumeHistory] = useState([]);
  const [liquidityHistory, setLiquidityHistory] = useState([]);
  const [liquidityHistoryByHours, setLiquidityHistoryByHours] = useState([]);

  //ANCHOR little spec subgraph of ticker can be only in lowercase, except for the SRG address)
  // const contractAddress = "0x43C3EBaFdF32909aC60E80ee34aE46637E743d65"; //TODO need create a config to avoid these type BRUTAL call

  // const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/"); //TODO use .env

  useEffect(() => {
    const contractAddress = "0x43C3EBaFdF32909aC60E80ee34aE46637E743d65";
    fetchContractCreationInfo(contractAddress);
  }, []);

  // useEffect(() => {
  //   fetchMarketData();
  // }, []);

  const fetchContractCreationInfo = async (contractAddress: string) => {
    const provider = new JsonRpcProvider("https://bsc-dataseed.binance.org/");
    const contractCreationBlock = await provider.getTransactionReceipt(
      contractAddress
    );
    console.log(contractCreationBlock?.blockNumber);
    // Use the contractCreationBlock.blockNumber for further processing
  };

  // const fetchMarketData = async () => {
  //   const provider = new JsonRpcProvider("https://bsc-dataseed.binance.org/");

  //   // Make the subgraph query to retrieve the historical market data
  //   const response = await fetch(
  //     "https://api.thegraph.com/subgraphs/name/surgeprotocol/surge-swap-v1-eth",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         query: `
  //       {
  //         token(id: "0x43C3EBaFdF32909aC60E80ee34aE46637E743d65") {
  //           tokenDayData {
  //             id
  //             date
  //             dailyVolumeToken
  //           }
  //         }
  //       }
  //     `,
  //       }),
  //     }
  //   );

  //   const data = await response.json();
  //   const marketData = data.data.token.tokenDayData;

  //   // Update the state variables with the fetched market data
  //   setVolumeHistory(
  //     marketData.map((entry: any) => ({
  //       timestamp: parseInt(entry.date),
  //       volume: parseFloat(entry.dailyVolumeToken),
  //     }))
  //   );
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // try {
  //     //   const genesisBlock = await provider.getBlock(0);
  //     //  console.log(genesisBlock?.number);
  //     //   // Check if genesisBlock is define before using for filter and fetch the data
  //     //   if (genesisBlock && genesisBlock.timestamp) {
  //     //     const priceResponse = await fetch(
  //     //       // TODO Call BSCScan api https://bscscan.com/address/0x43C3EBaFdF32909aC60E80ee34aE46637E743d65
  //     //       "https://thegraph.com/hosted-service/subgraph/somemoecoding/surgeswap-v1-eth"
  //     //     );
  //     //     const priceData = await priceResponse.json();
  //     //     // Filtrer les données en fonction du genesis block
  //     //     const priceHistory = priceData.result
  //     //       .filter(
  //     //         (entry: PriceEntry) =>
  //     //           parseInt(entry.timestamp) >= genesisBlock.timestamp
  //     //       )
  //     //       .map((entry: PriceEntry) => ({
  //     //         timestamp: parseInt(entry.timestamp),
  //     //         price: parseFloat(entry.price),
  //     //       }));
  //     //     setPriceHistory(priceHistory);
  //     //   }
  //     // } catch (error) {
  //     //   console.error("Error fetching price history:", error);
  //     // }

  //     try {
  //       const volumeResponse = await fetch(
  //         "https://thegraph.com/hosted-service/subgraph/somemoecoding/surgeswap-v1-eth",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             query: `
  //               {

  //                 token(id: "0x43c3ebafdf32909ac60e80ee34ae46637e743d65",block: {number_gte :0} ) {
  //                   tokenDayData {
  //                     totalLiquidityUSD
  //                   }
  //                   tradeVolumeUSD
  //                   totalSupply
  //                   id

  //                 }
  //                   tokens(block: {number:24726990}) {
  //                   id
  //                   tokenDayData {
  //                     id
  //                     dailyVolumeUSD
  //                   }

  //                 }

  //               }
  //           `,
  //           }),
  //         }
  //       );
  //       const volumeData = await volumeResponse.json();

  //       const volumeHistory = volumeData.data.tokenDayDatas.map(
  //         (entry: PriceEntry) => ({
  //           timestamp: parseInt(entry.date),
  //           volume: parseFloat(entry.dailyVolumeToken),
  //         })
  //       );
  //       setVolumeHistory(volumeHistory);
  //     } catch (error) {
  //       console.error("Error fetching volume history:", error);
  //     }

  //     try {
  //       const liquidityResponse = await fetch(
  //         "https://thegraph.com/hosted-service/subgraph/somemoecoding/surgeswap-v1-eth",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             query: `
  //                 {

  //                   token(id: "0x43c3ebafdf32909ac60e80ee34ae46637e743d65",block: {number_gte :0} ) {
  //                     tokenDayData {
  //                       totalLiquidityUSD
  //                     }
  //                     tradeVolumeUSD
  //                     totalSupply
  //                     id

  //                   }
  //                     tokens(block: {number:24726990}) {
  //                     id
  //                     tokenDayData {
  //                       id
  //                       dailyVolumeUSD
  //                     }

  //                   }
  //           `,
  //           }),
  //         }
  //       );
  //       // const liquidityData = await liquidityResponse.json();

  //       // const liquidityHistory = liquidityData.data.pairDayDatas.map(
  //       //   (entry: PriceEntry) => ({
  //       //     timestamp: parseInt(entry.date),
  //       //     liquidity: parseFloat(entry.reserve0) + parseFloat(entry.reserve1),
  //       //   })
  //       // );
  //       // setLiquidityHistory(liquidityHistory);
  //     } catch (error) {
  //       console.error("Error fetching liquidity history:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div>
        <h2>Price History</h2>
        {/* <ul>
          {priceHistory.map((entry: PriceEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Price: {entry.price}
            </li>
          ))}
        </ul> */}

        <h2>Volume History</h2>
        <ul>
          {volumeHistory.map((entry: HistoricalMarketEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Volume: {entry.volume}
            </li>
          ))}
        </ul>

        <h2>Liquidity History</h2>
        {/* <ul>
          {liquidityHistory.map((entry: PriceEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Liquidity: {entry.liquidity}
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
};
