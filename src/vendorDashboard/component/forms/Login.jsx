import React, {useState} from 'react'
import {API_URL} from '../../data/ApiPath'

const Login = ({showWelcomeHandler}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/vendor/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('loginToken',data.token)
        console.log('Login successful', data)
        setEmail("")
        setPassword("")
        alert('Login successful')
        showWelcomeHandler()
      }else if(response.status === 401){
        email === "" && password === "" ? alert('Please enter your email and password') : alert('Invalid email or password')
      }else{
        alert('Please check your email and password')
      }

      const vendorId = data.vendorId
      console.log("checking for vendorId",vendorId)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponse.json()
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId
        const vendorFirmName = vendorData.vendor.firm[0].firmName
        window.location.reload()
        localStorage.setItem('firmId', vendorFirmId)
        localStorage.setItem('firmName', vendorFirmName)
        
      }

    } catch (error) {
      console.error('Login failed', error)
      alert('Login failed')
    }
    
  }



  return (
    <div className="loginSection">
        <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3><br/>
            <label>Email</label><br/>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' /><br/>
            <label>Password</label><br/>
            <input type="password" name='password'value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' /><br/>
            <div className="btnSubmit">
                <button className='button' type="submit">Submit</button>
            </div>
            
        </form>
    </div>
  )
}

export default Login
