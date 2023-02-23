const index = require('../index')

const { Client,Pool } = require('pg');
module.exports = {
  async handle_request (pool,query,type) {
    
    pool.connect((err, client, done) => {
      console.log('connected')
    })
  
    pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err)
      process.exit(-1)
    })
    let res = await pool.query(query).catch(e => console.log(e.stack))
    switch(type){
      case 'login':return {data: res.rows[0]}
      case 'register':return "registration successful"
      default: return {data: res.rows}
    }
    
   }
  }