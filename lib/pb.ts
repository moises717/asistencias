import Pocketbase from 'pocketbase';
const PRO_URL = 'https://informes-db.up.railway.app';
//const DEV_URL = 'http://localhost:8090';

export const pb = new Pocketbase(PRO_URL);
