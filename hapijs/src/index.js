'use strict';

const Hapi = require('@hapi/hapi');
const { Client, Pool } = require('pg');
const env = require('dotenv').config({ path: './src/env/.env' })
const Path = require('path');

const pool = new Pool({
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})

const start = async () => {

  const server = Hapi.server({
    port: 3000,
    routes: {
      cors: {
        origin: ['*'],
      },
    }
  });

  await server.register({
    plugin: require('hapi-auto-route'),
    options: {
      routes_dir: Path.join(__dirname, 'routes')
    }
  });



  server.ext('onRequest', async (request, h) => {
    request.pg = pool
    return h.continue
  })


  await server.start();

  console.log('server running at: ' + server.info.uri);
};

start();