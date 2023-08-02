interface HistoricalMarketEntry {
  timestamp: string;
  price: string;
  date: string; 
  dailyVolumeToken: any
  volume: string
  liquidity: number
  reserveSRG: string
  reserveAPE: string
  currentVolume:string
  yesterdayVolume:string
  dayVolume:string
  
}

type SRGContractList = {
  chainId: number;
  SRG: string;
  PoolSrgApe: string;

};

type Chain = {
  chainId: number;
  name: string;
  allowed: boolean;
  tokens: Token[];
  defaultProvider?: string;
};

type Token = {
  symbol: string;
  name: string;
  decimals: number;
  address?: string;
  logoURI?: string;
  InoCurrency?: boolean; // needed if stableCoin for testing
};