import React from 'react';
import { useWallet } from './WalletContext'; // Updated import path

const ConnectButton = () => {
  const { address, connectWallet, disconnectWallet } = useWallet();

  return (
    <button
      onClick={address ? disconnectWallet : connectWallet}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {address ? `Disconnect (${address.slice(0, 6)}...)` : 'Connect Wallet'}
    </button>
  );
};

export default ConnectButton;