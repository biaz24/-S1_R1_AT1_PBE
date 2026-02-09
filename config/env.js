import dotenv from  "dotenv";

dotenv.config();

const env = {
    port: process.env.PORT || 3000,
    
    db:{
    port: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.NAME || "loja_db",
    },

};

export default env;
