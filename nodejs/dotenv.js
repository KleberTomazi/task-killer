const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log(path.resolve(__dirname, '.env'));