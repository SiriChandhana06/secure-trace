import React, { useState } from 'react';
import { isAddress } from 'ethers';  // Import the isAddress utility function

export default function Visualizer() {
  const jsonData = {
    walletAddresses: [
      "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      "0xAbC123456789dEf0ABC123456789DEF012345678"
    ],
    transactionHashes: [
      "0x5c1cda366d4b0b14701b96be62dbdbdacecf5b5b29c89a69f6c7a0ae1f29e32f",
      "0x8f2a559490e770d8d0de3f0e1d6fbbad5c9da96087253b39ebf8ff648c666f2a"
    ]
  };

  const [inputValue, setInputValue] = useState('');
  const [validationMessage, setValidationMessage] = useState(null);

  // Function to validate wallet address
  function validateWalletAddress(address) {
    return isAddress(address);
  }

  // Function to validate transaction hash
  function validateTransactionHash(txHash) {
    const txHashRegex = /^0x([A-Fa-f0-9]{64})$/;
    return txHashRegex.test(txHash);
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    let message = null;

    if (validateWalletAddress(value)) {
      if (jsonData.walletAddresses.includes(value)) {
        message = "Valid wallet address found in JSON!";
      } else {
        message = "Valid wallet address but not found in JSON.";
      }
    } else if (validateTransactionHash(value)) {
      if (jsonData.transactionHashes.includes(value)) {
        message = "Valid transaction hash found in JSON!";
      } else {
        message = "Valid transaction hash but not found in JSON.";
      }
    } else {
      message = "Invalid input. Please enter a valid wallet address or transaction hash.";
    }

    setValidationMessage(message);
  };

  return (
    <div className='w-full mt-10'>
      <div className='w-full my-10'>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className='border px-3 py-1 shadow-lg ml-10 w-52 sm:w-96 rounded-lg'
          placeholder='Enter wallet address or transaction hash'
        />
        {validationMessage && (
          <p className={`ml-10 mt-2 ${validationMessage.includes("Invalid") ? 'text-red-500' : 'text-green-500'}`}>
            {validationMessage}
          </p>
        )}
      </div>
    </div>
  );
}
