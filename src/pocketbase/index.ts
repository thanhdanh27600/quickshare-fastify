const PocketBase = require('pocketbase/cjs');
import Client from 'pocketbase';
import { POCKETBASE_URL } from '../utils/config';

const pb: Client = new PocketBase(POCKETBASE_URL);

console.log('POCKETBASE_URL', POCKETBASE_URL);

export {pb};