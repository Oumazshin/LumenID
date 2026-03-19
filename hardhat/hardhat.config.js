import '@nomicfoundation/hardhat-ethers';
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '.env') });

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const RPC_URL     = process.env.RPC_URL     || '';

const config = {
  solidity: '0.8.20',
  networks: {
    amoy: {
      type:     'http',
      url:      RPC_URL,
      accounts: [PRIVATE_KEY.startsWith('0x') ? PRIVATE_KEY : `0x${PRIVATE_KEY}`],
    },
  },
};

export default config;