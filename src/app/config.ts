import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    NODE_ENV : process.env.NODE_ENV,
    port : process.env.PORT,
    db_url : process.env.MONGO_DB_URL,
    default_password : process.env.DEFAULT_PASSWORD
}

