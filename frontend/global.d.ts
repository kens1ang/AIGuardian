interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string }) => Promise<any>;
    };
  }
  