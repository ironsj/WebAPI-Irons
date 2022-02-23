// Define the type User to match the JSON structure from https://randomuser.me/api
type Token = {
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  image: string;
};

type TokenStats = {
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  name: string;
  symbol: string;
  market_data: {
    current_price: {
      usd: number;
    };
    ath: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
};

export { Token, TokenStats };