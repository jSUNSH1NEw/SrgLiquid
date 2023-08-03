import { useEffect, useState } from 'react';
import { ethers, JsonRpcProvider } from "ethers";

const useMarketData = () => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [volumeHistory, setVolumeHistory] = useState([]);
  const [liquidityHistory, setLiquidityHistory] = useState([]);
  const [liquidityHistoryByHours, setLiquidityHistoryByHours] = useState([]);

  useEffect(() => {
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
        //ANCHOR get data for data object in  graphQL response
        const SRGDatas = data.data.token.tokenDayData;
        const totalSupply = parseFloat(data.data.token.totalSupply);

        //ANCHOR Map volume data
        //TODO Call utils date algo
        const mapPriceData = SRGDatas.map((entry:any) => ({
          timestamp: new Date(parseInt(entry.date) * 1000).toLocaleString(),
          price: parseFloat(entry.dailyVolumeUSD) / totalSupply,
        }));
        setPriceHistory(mapPriceData);

        //ANCHOR Map volume data
        //TODO Call utils date algo
        const mapVolumeData = SRGDatas.map((entry: any) => ({
          timestamp: new Date(parseInt(entry.date) * 1000).toLocaleString(),
          volume: parseFloat(entry.dailyVolumeUSD),
          liquidity: parseFloat(entry.totalLiquidityUSD),
        }));
        setVolumeHistory(mapVolumeData);

        //ANCHOR Map Liqudity data
        //TODO Call utils date algo
        const mapLiquidityHistory = SRGDatas.map((entry: any) => ({
          timestamp: new Date(parseInt(entry.date) * 1000).toLocaleString(),
          liquidity: parseFloat(entry.totalLiquidityUSD),
        }));
        setLiquidityHistory(mapLiquidityHistory);


        //ANCHOR Map hoursly volume data
        const mapHourlyVolumeData = SRGDatas.flatMap((entry: any) => {
          //TODO Create a algo utils into api 
          const date = new Date(parseInt(entry.date) * 1000);
          //ANCHOR calculate by adding the number of milliseconds in an hour multiplied by the hour index
          const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          //ANCHOR calculates the start and end time of each hour in a given date.
              const hours = Array.from({ length: 24 }, (_, i) => i);

          return hours.map((hour) => {
                // Adjust start of day with start and end from 0 to 23 of  hours/days (24)
                const startOfHour = new Date(startOfDay.getTime() + hour * 60 * 60 * 1000);
                const endOfHour = new Date(startOfDay.getTime() + (hour + 1) * 60 * 60 * 1000);

                //ANCHOR Filter entries within the current hour
                const entriesInHour = SRGDatas.filter((entry:any) => {
                  const entryDate = new Date(parseInt(entry.date) * 1000);//Convert date Property to proper Dates 
                  
                  return entryDate >= startOfHour && entryDate < endOfHour; //supérieur ou égal à startOfHour et inférieur à endOfHour.
                });

              //ANCHOR Calculate the sum of volume for the hour
              const currentVolume = entriesInHour.reduce((sum:any, entry:any) => sum + parseFloat(entry.dailyVolumeUSD), 0);

                //ANCHOR return the sum of currentVolume
              return {
                timestamp: startOfHour.toLocaleString(),
                currentVolume,
              };
          });
        });
        setLiquidityHistoryByHours(mapHourlyVolumeData)
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchDataV1();
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