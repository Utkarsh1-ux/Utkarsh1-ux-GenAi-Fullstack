import axios from 'axios'; 


const api = axios.create({
    baseURl: 'http://localhost:3000',
    withCredentials: true 
})

export async function register({username, email, password}){
  try{
   const response = await api.post('/api/auth/register',{
        username,
        email,
        password
    })

    return response.data; // Return the response data from the server

} catch(err){
    console.error('Error during registration:', err);
  }

}


export async function login({email, password}){
    try{
        const response = await api.post('/api/auth/login',{
            email,
            password
        } ,)              
        return response.data; // Return the response data from the server
    } catch(err){
        console.error('Error during login:', err);
        throw err; // Rethrow the error to be handled by the caller
      }
}


export async function logout(){
    try{
        const response = await api.post('/api/auth/logout')              
        return response.data; // Return the response data from the server
    } catch(err){
        console.error('Error during logout:', err);
    }
}

export async function getMe(){
    try{
        const response = await api.get('/api/auth/get-me')              
        return response.data; // Return the response data from the server
    } catch(err){
        console.error('Error during getMe:', err);
    }
} 