const dotenv = require("dotenv");
const { Pool } = require('pg');

dotenv.config();
class Database {
  constructor() {
    let config = this.getDBConfig();
    if (Database.instance) {
      return Database.instance;
    }
    this.pool = new Pool(config);
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
    Database.instance = this;
  }

  static getInstance(config) {
    if (!Database.instance) {
      Database.instance = new Database(config);
    }
    return Database.instance;
  }

  async query(text, params) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(text, params);
      return res;
    } finally {
      client.release();
    }
  }

  getDBConfig(){
    const config = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };

    return config
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = Database;
