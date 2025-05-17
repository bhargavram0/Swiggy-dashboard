import React, {useState} from 'react'

const NavBar = ({showLoginHandler, showRegisterHandler, showLogOut,logoutHandler, toggleSideBar}) => {
  
  const firmName = localStorage.getItem('firmName')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
    toggleSideBar()
  }


  return (
    <div className="navSection">
        <div className="company">
<span className="hamburger" onClick={handleMenuClick}>
&#9776;
</span>
            <div className='hr'>
            Dashboard
            </div>
        </div>
        <div className="firmName">
            <h4 className='heading '>{firmName}</h4>
        </div>
        <div className="userAuth">
          {!showLogOut ? <>
          <button className='but' onClick={showLoginHandler}>Login </button>
          <button className='but' onClick={showRegisterHandler}>Register</button>
          </>  :   <span onClick={logoutHandler} className='but'>Logout</span>  }
           
        </div>
    </div>
  )
}

export default NavBar