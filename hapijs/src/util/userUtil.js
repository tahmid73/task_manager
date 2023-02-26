//adding user 
const handle = require('../util/dao')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host:'smtp.zoho.com',
  port:465,
  secure:true,
  auth: {
    user:process.env.email,
    pass:process.env.email_password
  }
})
var mailOptions ={
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

  async addUser(pool,email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    let query = `INSERT INTO users(login_id, "name", email, "password") VALUES('${email}', '${name}', '${email}', '${hashedPassword}');`
    console.log("query",query)
    var req=await handle.handle_request(pool,query, "register")
    console.log(req)
    await transporter.sendMail(
      mailOptions={
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
    console.log(hashedPassword)
    let query = `SELECT password FROM public.users WHERE email = '${email}'`
    console.log(query)
    const result = await handle.handle_request(pool, query,"login")
    console.log(result.data)
    // console.log(email, password)
    if(result.data){
    const isValid=await bcrypt.compare(password,result.data.password) 
    console.log(isValid)
    return isValid
  }
  else{
    return false
  }
    

    // if (result.data == []) {
    //   console.log("no user found")
    //   return false
    // }
    // else if (result.data.email == email && result.data.password == password) {
    //   return true
    // }
    // else {
    //   return false
    // }
  }
}