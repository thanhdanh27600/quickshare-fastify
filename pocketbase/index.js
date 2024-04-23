import PocketBase from 'pocketbase';
import { POCKETBASE_URL } from '../utils/config.js';

const pb = new PocketBase(POCKETBASE_URL);

console.log('POCKETBASE_URL', POCKETBASE_URL);

export {pb};