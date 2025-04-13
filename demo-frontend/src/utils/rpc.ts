type RPCParams = {
  market_id?: number;
  user_id?: string;
  q?: number[];
  alpha?: number;
  question?: string;
  labels?: string[];
  market_type?: string;
  tick_size?: number;
  rules?: string;
  estimated_close_date?: string;
  // Binary market specific params
  spread?: number;
  initial_liquidity?: number;
  // Rules generator specific params
  loopholes?: Record<string, unknown>[];
  loophole?: Record<string, unknown>; // For single loophole fix
  detect_loopholes?: boolean;
  recommend_sources?: boolean;
};

export async function callRPC(method: string, params: RPCParams) {
  const body = {
    jsonrpc: '2.0',
    method,
    params,
    id: 1
  };
  console.log('RPC Request:', body);
  
  const response = await fetch('http://localhost:5001', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  console.log('RPC Response:', data);
  
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.result;
}

export type MarketType = 'numeric' | 'categorical' | 'binary';

// Only including functions needed for Create Market page
export async function getBalance(userId: string = "default-user"): Promise<number> {
  return callRPC('get_balance', { user_id: userId });
}
