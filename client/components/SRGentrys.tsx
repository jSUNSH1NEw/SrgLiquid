import { useState, useEffect } from "react";
import { ethers, JsonRpcProvider } from "ethers";

export const SRGentrys = () => {
  const [graphdata, setgraphData] = useState<HistoricalMarketEntry[]>([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [volumeHistory, setVolumeHistory] = useState([]);
  const [liquidityHistory, setLiquidityHistory] = useState([]);
  const [liquidityHistoryByHours, setLiquidityHistoryByHours] = useState([]);

  //TODO create hook with config contrat and call it there
  const contractAddress = "0x43C3EBaFdF32909aC60E80ee34aE46637E743d65";

  useEffect(() => {
    const txHash =
      "0x0f4f0e6f39cd46115bf2759f205a1abd9d11cfffa1f7b167e56c6646a595f981";
    fetchContractCreationInfo(txHash);
  }, []);

  useEffect(() => {
    fetchMarketData();
    fetchLiquidityHistoryByHours();
  }, []);

  const fetchContractCreationInfo = async (txHash: string) => {
    const provider = new JsonRpcProvider("https://bsc-dataseed.binance.org/");
    const contractCreationBlock = await provider.getTransactionReceipt(txHash);
    // console.log(contractCreationBlock?.blockNumber); //26087006
  };

  const fetchMarketData = async () => {
    const response = await fetch(
      "https://api.thegraph.com/subgraphs/name/somemoecoding/surgeswap-v2",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
                {     
                  token(id: "0x43c3ebafdf32909ac60e80ee34ae46637e743d65") { 
                    tokenDayData {
                      totalLiquidityUSD
                      id
                      date
                      dailyTxns
                      dailyVolumeUSD
                    }
                    liquidityUSD
                    tradeVolumeUSD
                    totalSupply
                  } 
                  }        
      `,
        }),
      }
    );
    const data = await response.json();
    // console.log(data); // First object from graph need to be hydrated
    const SRGDatas = data.data.token.tokenDayData;
    const totalSupply = parseFloat(data.data.token.totalSupply);

    const mapPriceData = SRGDatas.map((entry: any) => ({
      timestamp: new Date(parseInt(entry.date) * 1000).toLocaleString(),
      price: parseFloat(entry.dailyVolumeUSD) / totalSupply,
    }));
    setPriceHistory(mapPriceData as any);

    const mapMarketData = SRGDatas.map((entry: any) => ({
      timestamp: new Date(parseInt(entry.date) * 1000).toLocaleString(),
      volume: parseFloat(entry.dailyVolumeUSD),
      liquidity: parseFloat(entry.totalLiquidityUSD),
    }));
    setVolumeHistory(mapMarketData as any);

    const mapliquidityHistory = SRGDatas.map((entry: any) => ({
      timestamp: new Date(parseInt(entry.date) * 1000).toLocaleString(),
      liquidity: parseFloat(entry.totalLiquidityUSD),
    }));
    setLiquidityHistory(mapliquidityHistory as any);
  };

  async function fetchLiquidityHistoryByHours() {
    try {
      // Fetch the liquidity history by hours using the provided API and query
      const response = await fetch(
        "https://api.thegraph.com/subgraphs/name/somemoecoding/surgeswap-v1-cg-bsc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
          {
            tickers(id: "0x43c3ebafdf32909ac60e80ee34ae46637e743d65") {
              liquidity_in_usd
              target_volume
            }
          }
        `,
          }),
        }
      );

      const data = await response.json();
      const liquidityHistory = data.data.tickers;

      // Calculate the desired time interval (24 hours)
      const timeInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      // Initialize the previous day's target volume
      let previousDayTargetVolume = 0;

      // Calculate the timestamp for each liquidity history entry
      let currentTime = Date.now();

      // ANCHOR CG Api do not got timestamp
      // Calculate yesterday's date
      const yesterday = new Date();
      const getYersterday = yesterday.setDate(yesterday.getDate() - 1);


      // Calculate day volume for each liquidity history entry
      const liquidityHistoryWithVolumes = liquidityHistory.map((entry: any) => {
        const currentVolume = entry.target_volume;
        const yesterdayEntry = liquidityHistory.find(
          (e: any) => new Date(e.timestamp) < yesterday
        );
        const yesterdayVolume = yesterdayEntry
          ? yesterdayEntry.target_volume
          : 0;
        const dayVolume = currentVolume - yesterdayVolume;
        const currentTimestamp = new Date(currentTime);
        const timestamp = new Date(currentTime - timeInterval).toLocaleDateString();
        currentTime -= timeInterval;

        const currentTargetVolume = entry.target_volume;
        const dayVolume2 = currentTargetVolume - previousDayTargetVolume;

        previousDayTargetVolume = currentTargetVolume;

        return {
          ...entry,
          timestamp,
          currentVolume,
          yesterdayVolume,
          dayVolume2,
        };
      });

      // Set the liquidity history with volumes to the state
      setLiquidityHistoryByHours(liquidityHistoryWithVolumes);
    } catch (error) {
      console.error("Error fetching liquidity history by hours:", error);
    }
  }

  return (
    <>
      <div>
        <h2>Price History API V2</h2>
        <ul>
          {priceHistory.map((entry: HistoricalMarketEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Price: {entry.price}
            </li>
          ))}
        </ul>

        <h2>Volume History API V2</h2>
        <ul>
          {volumeHistory.map((entry: HistoricalMarketEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Volume: {entry.volume} : liquidity:{" "}
              {entry.liquidity}
            </li>
          ))}
        </ul>

        <h2>Liquidity History API V2</h2>
        <ul>
          {liquidityHistory.map((entry: HistoricalMarketEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Liquidity: {entry.liquidity}
            </li>
          ))}
        </ul>

        <h2>Liquidity History by hours API CG</h2>
        <ul>
          {liquidityHistoryByHours.map((entry: HistoricalMarketEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, CurrentVolume: {entry.currentVolume}
              , Yesterday: {entry.yesterdayVolume} , dailyLiqudiity :{" "}
              {entry.dailyVolumeToken}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
