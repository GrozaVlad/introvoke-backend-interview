import { Pool } from'pg';

export class DatabasePool{
  databasePool;

  constructor(){
    const databasePool = new Pool({
      database: 'sequel',
      user: 'sequel_admin',
      password: 'sequel',
      host: 'sequel-db',
      port: 5432,
      max: 20, // set pool max size to 20
      idleTimeoutMillis: 1000, // close idle clients after 1 second
      connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
      maxUses: 7500,
    });
      this.databasePool = databasePool;
  }

  async query(text: string, params:any) {
    const pool=this.databasePool;
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  } 

  async getClient() {
    const pool = this.databasePool;
    const client = await pool.connect()
    const query = client.query
    const release = client.release
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      // client.lastQuery = args
      return query.apply(client, args)
    }
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = query
      client.release = release
      return release.apply(client)
    }
    return client
  }
}