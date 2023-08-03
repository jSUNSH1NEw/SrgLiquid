import { useEffect, useState } from 'react';
import { ethers, JsonRpcProvider } from "ethers";

const useMarketData = () => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [volumeHistory, setVolumeHistory] = useState([]);
  const [liquidityHistory, setLiquidityHistory] = useState([]);
  const [liquidityHistoryByHours, setLiquidityHistoryByHours] = useState([]);

  useEffect(() => {

        //ANCHOR Async call for  API V1 
        //params fecth the tokenDayData
    const fetchDataV1 = async () => {
      try {
        const response = await fetch(
          "https://api.thegraph.com/subgraphs/name/somemoecoding/surgeswap-v2",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `{     
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
              }`,
            }),
          }
        );
        const data = await response.json();

        const SRGDatas = data.data.token.tokenDayData;
        const totalSupply = parseFloat(data.data.token.totalSupply);

        //////////////////////////////////////////////////////::

        const mapHourlyVolumeData = SRGDatas.flatMap((entry: any) => {
          const date = new Date(parseInt(entry.date) * 1000);
          const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          const hours = Array.from({ length: 24 }, (_, i) => i);

          return hours.map((hour) => {
            const startOfHour = new Date(startOfDay.getTime() + hour * 60 * 60 * 1000);
            const endOfHour = new Date(startOfDay.getTime() + (hour + 1) * 60 * 60 * 1000);

            // Filter entries within the current hour
            const entriesInHour = SRGDatas.filter((entry:any) => {
              const entryDate = new Date(parseInt(entry.date) * 1000);
              return entryDate >= startOfHour && entryDate < endOfHour;
            });

          // Calculate the sum of volume for the hour
          const currentVolume = entriesInHour.reduce((sum:any, entry:any) => sum + parseFloat(entry.dailyVolumeUSD), 0);

    return {
      timestamp: startOfHour.toLocaleString(),
      currentVolume,
    };
  });
});
        setLiquidityHistoryByHours(mapHourlyVolumeData)
        //////////////////////////////////////////////////////::

        const mapPriceData = SRGDatas.map((entry:any) => ({
          timestamp: new Date(parseInt(entry.date) * 1000).toLocaleString(),
          price: parseFloat(entry.dailyVolumeUSD) / totalSupply,
        }));
        setPriceHistory(mapPriceData);

        const mapMarketData = SRGDatas.map((entry: any) => ({
          timestamp: new Date(parseInt(entry.date) * 1000).toLocaleString(),
          volume: parseFloat(entry.dailyVolumeUSD),
          liquidity: parseFloat(entry.totalLiquidityUSD),
        }));
        setVolumeHistory(mapMarketData);

        const mapliquidityHistory = SRGDatas.map((entry: any) => ({
          timestamp: new Date(parseInt(entry.date) * 1000).toLocaleString(),
          liquidity: parseFloat(entry.totalLiquidityUSD),
        }));
        setLiquidityHistory(mapliquidityHistory);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }

      
    };

    fetchDataV1();

    

    //ANCHOR Async call for  API V2 
    async function fetchLiquidityHistoryByHoursV2() {
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
      //ANCHOR V2 get date
      const yesterday = new Date();
      const getYersterday = yesterday.setDate(yesterday.getDate() - 1);

      // Calculate day volume for each liquidity history entry
      const liquidityHistoryWithVolumes = liquidityHistory.map((entry: any) => {
        const currentVolume = entry.target_volume;
        const timestamp = new Date(
          currentTime - timeInterval
        ).toLocaleDateString();
        currentTime -= timeInterval;

        const currentTargetVolume = entry.target_volume;
        const dayVolume2 = currentTargetVolume - previousDayTargetVolume;

        previousDayTargetVolume = currentTargetVolume;

        return {
          ...entry,
          timestamp,
          currentVolume,
          // yesterdayVolume,
          dayVolume2,
        };
      });

      // Set the liquidity history with volumes to the state
      // setLiquidityHistoryByHours(liquidityHistoryWithVolumes);
    } catch (error) {
      console.error("Error fetching liquidity history by hours:", error);
    }
  }
    fetchLiquidityHistoryByHoursV2()



    //ANCHOR Contract creation infos for block infos
    
    const fetchContractCreationInfo = async (txHash: string) => {
    const provider = new JsonRpcProvider("https://bsc-dataseed.binance.org/");
    const contractCreationBlock = await provider.getTransactionReceipt(txHash);
    // console.log(contractCreationBlock?.blockNumber); //26087006
  };
  }, []);

  return {
    priceHistory,
    volumeHistory,
    liquidityHistory,
    liquidityHistoryByHours
  };
};

export default useMarketData;