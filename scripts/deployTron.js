import TronWeb from 'tronweb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const privateKey = process.env.TRON_PRIVATE_KEY;
    
    if (!privateKey) {
        console.error('ERROR: Set TRON_PRIVATE_KEY environment variable');
        process.exit(1);
    }

    // Fix: Check how TronWeb is exported
    const TronWebClass = TronWeb.default || TronWeb;
    
    const tronWeb = new TronWebClass({
        fullHost: 'https://api.trongrid.io',
        privateKey: privateKey
    });

    console.log('Connected account:', tronWeb.defaultAddress.base58);

    const contractJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../artifacts/contracts/USDTTransferTron.sol/USDTTransferTron.json'), 'utf8')
    );
    
    console.log('✅ Contract compiled successfully!');
    console.log('Bytecode:', contractJson.bytecode.substring(0, 50) + '...');
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
