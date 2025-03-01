import {React, useState} from 'react';
import '../styles/Exchange.css';


export const Exchange = () => {
  const [sendCurrency, setSendCurrency] = useState('BTC');
  const [receiveCurrency, setReceiveCurrency] = useState('ETH');
  const [walletAddress, setWalletAddress] = useState('');

  const handleExchange = () => {
    // Implement exchange logic here
  };

  return (
    <div>
      <h2>Exchange Crypto</h2>
      <div>
        <label>You Send</label>
        <select value={sendCurrency} onChange={(e) => setSendCurrency(e.target.value)}>
          {/* Populate options with supported cryptocurrencies */}
        </select>
      </div>
      <div>
        <label>You Receive</label>
        <select value={receiveCurrency} onChange={(e) => setReceiveCurrency(e.target.value)}>
          {/* Populate options with supported cryptocurrencies */}
        </select>
      </div>
      <div>
        <label>Receiving Wallet Address</label>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
      </div>
      <button onClick={handleExchange}>Exchange</button>
    </div>
  );
};