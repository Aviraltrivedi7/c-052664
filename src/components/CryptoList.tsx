
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const fetchCryptoData = async () => {
  console.log('Fetching crypto list data...');
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false');
  
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment.');
    }
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  
  console.log('Crypto list data fetched successfully');
  return response.json();
};

const CryptoList = () => {
  const { data: cryptos, isLoading, error } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptoData,
    refetchInterval: 120000, // Refetch every 2 minutes instead of 30 seconds
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return <div className="glass-card rounded-lg p-6 animate-pulse">Loading...</div>;
  }

  if (error) {
    return (
      <div className="glass-card rounded-lg p-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-6">Top Cryptocurrencies</h2>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load cryptocurrency data'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">Top Cryptocurrencies</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground">
              <th className="pb-4">Name</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">24h Change</th>
              <th className="pb-4">Volume</th>
            </tr>
          </thead>
          <tbody>
            {cryptos?.map((crypto) => (
              <tr key={crypto.symbol} className="border-t border-secondary">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium">{crypto.name}</p>
                      <p className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">${crypto.current_price.toLocaleString()}</td>
                <td className="py-4">
                  <span
                    className={`flex items-center gap-1 ${
                      crypto.price_change_percentage_24h >= 0 ? "text-success" : "text-warning"
                    }`}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <ArrowUpIcon className="w-3 h-3" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3" />
                    )}
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </td>
                <td className="py-4">${(crypto.total_volume / 1e9).toFixed(1)}B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
