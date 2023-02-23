const Joi = require('joi');
const handle_request = require('../util/dao')
const user = require('../util/userUtil')
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      console.log('request received')
      let res = await handle_request.handle_request(request.pg, 'SELECT * FROM public.users')
      return h.response({ data: res.data })
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
      return h.response({ data: res.data })
    }
  },
  {
    method: 'POST',
    path: '/api/register',
    handler: async (request, h) => {
      console.log('request received')
      let res = await addUser(request.payload.email, request.payload.password, request.payload.name)
      console.log("show")
      return h.response({ data: res })
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
      console.log('request received', request.payload.username, request.payload.password)
      let res = await user.loginUser(request.pg, request.payload.username, request.payload.password)
      if (res == true) {
        return h.response({ data: "login successful" })
      }
      else {
        return h.response({ data: "login failed" })
      }
    }
  },
  {
    method: 'POST',
    path: '/api/addTask',
    handler: async (request, h) => {
      let res = await addTask(request.payload.u_id, request.payload.t_name, "pending")
      return h.response({ data: res })
    }
  }
]