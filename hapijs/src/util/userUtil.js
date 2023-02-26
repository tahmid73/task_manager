//adding user 
const handle = require('../util/dao')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.email_password
  }
})
var mailOptions = {
  from: process.env.email,
  to: 'tahmidislam73@gmail.com',
  subject: 'Registeration successful',
  text: 'Thanks for your registration!'
};

module.exports = {
  async usersList() {
    let query = `SELECT * FROM public.users`
    const result = await handle.handle_request(request.pg, query)
    return result.data
  },

  async addUser(pool, email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    let query = `INSERT INTO users(login_id, "name", email, "password") VALUES('${email}', '${name}', '${email}', '${hashedPassword}');`
    console.log("query", query)
    var req = await handle.handle_request(pool, query, "register")
    console.log(req)
    await transporter.sendMail(
      mailOptions = {
        from: process.env.email,
        to: 'tahmidislam73@gmail.com',
        subject: 'Registeration successful To TASK MANAGER',
        text: `Welcome ${name}, now you are a registered member of TASK MANAGER!`
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
  },

  //adding task
  async addTask(u_id, t_name, status) {
    let query = `INSERT INTO public.tasks(u_id, t_name, status) VALUES ('${u_id}', '${t_name}', '${status}')`
    console.log(query)
    await handle_request(query, "addTask")
  },
  //login user  
  async loginUser(pool, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    let query = `SELECT * FROM public.users WHERE email = '${email}'`
    const result = await handle.handle_request(pool, query, "login")
    if (result.data) {
      const isValid = await bcrypt.compare(password, result.data.password)
      if (isValid) {
        const token = await jwt.sign({
          name: result.data.name,
          id: result.data.id
        },
          process.env.JWT_KEY)
        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        var { iat } = decoded
        iat = new Date(iat * 1000).toUTCString()
        let query1 = `INSERT INTO user_logged_history(user_id, login_time, "token")VALUES(${result.data.id}, '${iat}', '${token}');`
        const result1 = await handle.handle_request(pool, query1)
      }
      return isValid
    }
    else {
      return false
    }
  }
}