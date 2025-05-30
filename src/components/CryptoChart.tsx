
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PriceData {
  time: string;
  price: number;
}

const fetchBitcoinData = async (): Promise<PriceData[]> => {
  console.log('Fetching Bitcoin chart data...');
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=hourly'
  );
  
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment before refreshing.');
    }
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  
  const data = await response.json();
  console.log('Bitcoin chart data fetched successfully');
  
  return data.prices.map((price: [number, number]) => ({
    time: new Date(price[0]).toLocaleDateString(),
    price: Math.round(price[1])
  }));
};

const CryptoChart = () => {
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ['bitcoin-chart'],
    queryFn: fetchBitcoinData,
    refetchInterval: 600000, // Refetch every 10 minutes instead of 5
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Bitcoin Price</h2>
        </div>
        <div className="h-[400px] w-full flex items-center justify-center">
          <div className="text-muted-foreground">Loading chart data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Bitcoin Price</h2>
        </div>
        <div className="h-[400px] w-full flex items-center justify-center">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof Error ? error.message : 'Failed to load chart data'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Bitcoin Price (7 Days)</h2>
        <div className="text-sm text-muted-foreground">
          {chartData && chartData.length > 0 && (
            <span>${chartData[chartData.length - 1].price.toLocaleString()}</span>
          )}
        </div>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time" 
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#f97316" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: '#f97316', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoChart;
