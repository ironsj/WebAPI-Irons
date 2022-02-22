type RankByMarketCap = {
  results: Array<Token>;
};

// Define the type User to match the JSON structure from https://randomuser.me/api
type Token = {
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  image: string;
};

export { RankByMarketCap, Token };