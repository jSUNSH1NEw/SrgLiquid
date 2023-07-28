import React from "react";
import { ethers, JsonRpcProvider } from "ethers";

const WassupSRG = () => {
  const [priceHistory, setPriceHistory] = React.useState([]);
  const [volumeHistory, setVolumeHistory] = React.useState([]);
  const [liquidityHistory, setLiquidityHistory] = React.useState([]);

  const tokenAddress = "0x43C3EBaFdF32909aC60E80ee34aE46637E743d65"; //need create a config to avoid these type BRUTAL call  

  const provider = new JsonRpcProvider(
    "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"
  );

  async function getGenesisBlockNumber() {
    const genesisBlock = await provider.getBlock(0);
    console.log(genesisBlock?.number); //IF nul on type make ? to be sure its my provider
  }
  getGenesisBlockNumber();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const genesisBlock = await provider.getBlock(0); // Récupérer le bloc de genèse

        // Check if genesisBlock is define before using for filter and fetch the data
        if (genesisBlock && genesisBlock.timestamp) {
          const priceResponse = await fetch(
            "https://api.etherscan.io/api?module=stats&action=tokensupplyhistory&contractaddress=0x43C3EBaFdF32909aC60E80ee34aE46637E743d65"
          );
          const priceData = await priceResponse.json();
          // Filtrer les données en fonction du bloc de genèse
          const priceHistory = priceData.result
            .filter(
              (entry: PriceEntry) =>
                parseInt(entry.timestamp) >= genesisBlock.timestamp
            )
            .map((entry: PriceEntry) => ({
              timestamp: parseInt(entry.timestamp),
              price: parseFloat(entry.price),
            }));
          setPriceHistory(priceHistory);
        }

        // if (priceData.status === "1") {
        //   const priceHistory = priceData.result.map(
        //     (entry: PriceEntry) => ({
        //       timestamp: parseInt(entry.timestamp),
        //       price: parseFloat(entry.price),
        //     })
        //   );
        //   setPriceHistory(priceHistory);
        // } else {
        //   console.error("Error fetching price history:", priceData.message);
        // }
      } catch (error) {
        console.error("Error fetching price history:", error);
      }

      try {
        const volumeResponse = await fetch(
          "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
              {
                tokenDayDatas(
                  where: { token: "0x43C3EBaFdF32909aC60E80ee34aE46637E743d65" }
                  orderBy: date
                  orderDirection: desc
                ) {
                  date
                  dailyVolumeToken
                }
              }
            `,
            }),
          }
        );
        const volumeData = await volumeResponse.json();

        const volumeHistory = volumeData.data.tokenDayDatas.map(
          (entry: PriceEntry) => ({
            timestamp: parseInt(entry.date),
            volume: parseFloat(entry.dailyVolumeToken),
          })
        );
        setVolumeHistory(volumeHistory);
      } catch (error) {
        console.error("Error fetching volume history:", error);
      }

      try {
        const liquidityResponse = await fetch(
          "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
              {
                pairDayDatas(
                  where: { token0: "0x43C3EBaFdF32909aC60E80ee34aE46637E743d65" }
                  orderBy: date
                  orderDirection: desc
                ) {
                  date
                  reserve0
                  reserve1
                }
              }
            `,
            }),
          }
        );
        const liquidityData = await liquidityResponse.json();

        const liquidityHistory = liquidityData.data.pairDayDatas.map(
          (entry: PriceEntry) => ({
            timestamp: parseInt(entry.date),
            liquidity: parseFloat(entry.reserve0) + parseFloat(entry.reserve1),
          })
        );
        setLiquidityHistory(liquidityHistory);
      } catch (error) {
        console.error("Error fetching liquidity history:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>Price History</h2>
        <ul>
          {priceHistory.map((entry: PriceEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Price: {entry.price}
            </li>
          ))}
        </ul>

        <h2>Volume History</h2>
        <ul>
          {volumeHistory.map((entry: PriceEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Volume: {entry.volume}
            </li>
          ))}
        </ul>

        <h2>Liquidity History</h2>
        <ul>
          {liquidityHistory.map((entry: PriceEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Liquidity: {entry.liquidity}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
