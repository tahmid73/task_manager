'use strict';

const Hapi = require('@hapi/hapi');
const { Client,Pool } = require('pg');
const Joi = require('joi');
// const cors=require('cors');
 
const client = () => {
  const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'tahmid',
    password:'123',
    database: 'task_manager'
  })
  return pool;
}

const handle_request = async (query,type) => {

  let data = '';

  let pool = client();
  pool.connect((err, client, done) => {
    console.log('connected')
  })

  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
  let res = await pool.query(query).then("done")
  switch(type){
    case 'login':return {data: res.rows[0]}
    default: return {data: res.rows}
  }
  
 }

//adding user 
const addUser = async (email, password, name) => {
  let query= `INSERT INTO users(login_id, "name", email, "password") VALUES('${email}', '${name}', '${email}', '${password}');`  
  console.log(query)
  await handle_request(query)
}

//adding task
const addTask = async (u_id, t_name,status) => {
  let query= `INSERT INTO public.tasks(u_id, t_name, status) VALUES ('${u_id}', '${t_name}', '${status}')`
  console.log(query)
  await handle_request(query)
}
//login user  
const loginUser =async (username, password) => {
  let query = `SELECT username, password FROM public.user WHERE username = '${username}' AND password = '${password}'`
  const result= await handle_request(query)
  console.log(result.data)
  console.log(username, password)
  if(result.data==[]){
    console.log("no user found")
    return false
  }
  else if(result.data.username == username && result.data.password == password){
    return true
  }
  else{
    return false
  }
}

const start = async () => {

    const server = Hapi.server({ port: 3000 ,        
          routes: {
              cors: {
                  origin: ['*'],
              },
          }
        });
    server.route([{
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
          console.log('request received')
          let res = await handle_request('SELECT id FROM public.user')
          return h.response({data: res.data})
          }
      },
      {
        method: 'GET',
        path: '/api/users',
        // options:{
        //   cors: true
        // },
        handler: async (request, h) => {
          console.log('request received')
          let res = await handle_request('SELECT * FROM public.users')
          return h.response({data: res.data})
          }
        },
        {
          method: 'POST',
          path: '/api/register',
          handler: async (request, h) => {
            console.log('request received')
            let res = await addUser(request.payload.email, request.payload.password,request.payload.name)
            return h.response({data: res.data})
            // console.log(request.payload.email, request.payload.password,request.payload.name)
            // return "hello"
          },
          options: {
            validate: {
                payload: Joi.object({
                    email: Joi.required(),
                    password: Joi.string().min(6).max(100).required(),
                    name: Joi.string().required()
                })
            }
        }
        },
        {
          method: 'POST',
          path: '/api/login',
          handler: async (request, h) => {
            console.log('request received')
            let res = await loginUser(request.payload.username, request.payload.password)
            if(res == true){
              return h.response({data: "login successful"})
            }
            else{
              return h.response({data: "login failed"})
            }
          }
        },
        {
          method: 'POST',
          path: '/api/addTask',
          handler: async (request, h) => {
            let res = await addTask(request.payload.u_id, request.payload.t_name,"pending")
            return h.response({data: res})
          }
        }
    ]);

    await server.start();

    console.log('server running at: ' + server.info.uri);
};

start();