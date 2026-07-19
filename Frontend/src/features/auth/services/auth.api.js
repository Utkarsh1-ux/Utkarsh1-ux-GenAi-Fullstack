import axios from 'axios'; 


export async function register({username, email, password}){
  try{
   const response = await axios.post('http://localhost:3000/api/auth/register',{
        username,
        email,
        password
    } , {
        withCredentials: true  // server can set cookies in the browser or read them from the browser
    })

    return response.data; // Return the response data from the server

} catch(err){
    console.error('Error during registration:', err);
  }

}


export async function login({email, password}){
    try{
        const response = await axios.post('http://localhost:3000/api/auth/login',{
            email,
            password
        } , {
            withCredentials: true  // server can set cookies in the browser or read them from the browser
        })              
        return response.data; // Return the response data from the server
    } catch(err){
        console.error('Error during login:', err);
      }
}


export async function logout(){
    try{
        const response = await axios.post('http://localhost:3000/api/auth/logout', {}, {
            withCredentials: true  // server can set cookies in the browser or read them from the browser
        })              
        return response.data; // Return the response data from the server
    } catch(err){
        console.error('Error during logout:', err);
    }
}