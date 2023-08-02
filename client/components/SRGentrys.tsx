import { useState, useEffect } from "react";
import { ethers, JsonRpcProvider } from "ethers";

export const SRGentrys = () => {
  const [graphdata, setgraphData] = useState<HistoricalMarketEntry[]>([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [volumeHistory, setVolumeHistory] = useState([]);
  const [liquidityHistory, setLiquidityHistory] = useState([]);
  // const [liquidityHistoryByHours, setLiquidityHistoryByHours] = useState([]);

  //TODO create hook with config contrat and call it there
  const contractAddress = "0x43C3EBaFdF32909aC60E80ee34aE46637E743d65";

  useEffect(() => {
    const txHash =
      "0x0f4f0e6f39cd46115bf2759f205a1abd9d11cfffa1f7b167e56c6646a595f981";
    fetchContractCreationInfo(txHash);
  }, []);

  useEffect(() => {
    fetchMarketData();
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
    console.log(liquidityHistory);
    setLiquidityHistory(mapliquidityHistory as any);
  };

  return (
    <>
      <div>
        <h2>Price History</h2>
        <ul>
          {priceHistory.map((entry: HistoricalMarketEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Price: {entry.price}
            </li>
          ))}
        </ul>

        <h2>Volume History</h2>
        <ul>
          {volumeHistory.map((entry: HistoricalMarketEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Volume: {entry.volume} : liquidity:{" "}
              {entry.liquidity}
            </li>
          ))}
        </ul>

        <h2>Liquidity History</h2>
        <ul>
          {liquidityHistory.map((entry: HistoricalMarketEntry) => (
            <li key={entry.timestamp}>
              Timestamp: {entry.timestamp}, Liquidity: {entry.liquidity}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
