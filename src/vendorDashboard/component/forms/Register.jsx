import React, {useState} from 'react'
import {API_URL} from '../../data/ApiPath'

const Register = ({showLoginHandler}) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/vendor/register`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })
      const data = await response.json()
      if (response.ok) {
        console.log('Registration successful', data)
        setUsername("")
        setEmail("")
        setPassword("")
        alert('Registration successful')
        showLoginHandler()
      }else if(response.status === 401){
        email === "" && password === "" ? alert('Please enter your Details') : alert('Invalid Details')
      }else{
        alert('Please check your email and password')
      }
    } catch (error) {
      console.error('registration failed', error)
      alert('Registration failed')
    }
  }



  return (
    <div className="registerSection">
        <form className='registerAuthForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3><br/>
        <label>Username</label><br/>
            <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Your Username' /><br/>
            <label>Email</label><br/>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' /><br/>
            <label>Password</label><br/>
            <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' /><br/>
            <div className="btnSubmit">
                <button className='button' type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register
