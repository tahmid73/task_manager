//adding user 
const handle= require('../util/dao')

module.exports = {
  async usersList(){
    let query = `SELECT * FROM public.users`
    const result= await handle.handle_request(request.pg,query)
    return result.data
  },

    async addUser(email, password, name) {
    let query= `INSERT INTO users(login_id, "name", email, "password") VALUES('${email}', '${name}', '${email}', '${password}');`  
    console.log(query)
    await handle_request(query,"register")
  },
  
  //adding task
  async addTask(u_id, t_name,status) {
    let query= `INSERT INTO public.tasks(u_id, t_name, status) VALUES ('${u_id}', '${t_name}', '${status}')`
    console.log(query)
    await handle_request(query,"addTask")
  },
  //login user  
   async loginUser (pool,email, password){
    let query = `SELECT email, password FROM public.users WHERE email = '${email}' AND password = '${password}'`
    const result= await handle.handle_request(pool,query)
    console.log(result.data)
    console.log(email, password)
    if(result.data==[]){
      console.log("no user found")
      return false
    }
    else if(result.data.email == email && result.data.password == password){
      return true
    }
    else{
      return false
    }
  }
}