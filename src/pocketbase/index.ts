const PocketBase = require('pocketbase/cjs');
import { POCKETBASE_URL } from '../utils/config';

const pb = new PocketBase(POCKETBASE_URL);

console.log('POCKETBASE_URL', POCKETBASE_URL);

export {pb};