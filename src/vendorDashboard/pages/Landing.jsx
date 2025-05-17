import React, {useState, useEffect, useRef} from 'react'
import NavBar from '../component/NavBar'
import SideBar from '../component/SideBar'
import Login from '../component/forms/Login'
import Register from '../component/forms/Register'
import AddFirm from '../component/forms/AddFirm'
import AddProduct from '../component/forms/AddProduct'
import Welcome from '../component/Welcome'
import AllProducts from '../component/AllProducts'
import FrontPage from '../component/FrontPage'

const Landing = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setShowFirm] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [showLogOut, setShowLogOut] = useState(false)
  const [showFirmTitle, setShowFirmTitle] = useState(false)
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [showFront, setShowFront] = useState(false)
  const sideBarRef = useRef(null)


  useEffect(()=>{
    const handleClickOutside = (event)=>{
      if(sideBarRef.current && !sideBarRef.current.contains(event.target)){
        setSideBarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])


  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken')
    if (loginToken) {
      setShowLogOut(true)
      setShowWelcome(true)
    }
  }, [])

  useEffect(() => {
    const firmName = localStorage.getItem('firmName')
    const firmId = localStorage.getItem('firmId')
    if (firmName || firmId) {
      setShowFirmTitle(false)
      setShowWelcome(true)
    }
  }, [])

  const logoutHandler = () => {
    confirm("Are you sure you want to logout?")
    localStorage.removeItem('loginToken')
    localStorage.removeItem('firmName')
    localStorage.removeItem('firmId')
    setShowLogOut(false)
    setShowWelcome(false)
    setShowFirmTitle(true)
  }

  const showLoginHandler = () =>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    setSideBarOpen(false);
  }

  const showRegisterHandler = () =>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showFirmHandler = () =>{
    if(showLogOut){
    setShowFirm(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }else{
    alert("Please login to add a firm")
    setShowLogin(true)
    setShowRegister(false)
  }
  }

  const showProductHandler = () =>{
    if(showLogOut){
    setShowProduct(true)
    // setSideBarOpen(true)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }else{
    alert("Please login to add a product")
    setShowLogin(true)
    setShowRegister(false)
    // setSideBarOpen(false);    
  }
  }

  const showWelcomeHandler = () =>{
    setShowWelcome(true)
    setShowProduct(false)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowAllProducts(false)
  }

  const showFrontHandler = () =>{
    setShowFront(true)
    setShowWelcome(false)
    setShowProduct(false)
    setShowFirm(false)
    // setShowLogin(false)
    // setShowRegister(false)
    setShowAllProducts(false)
  }

  const showAllProductsHandler = ()=>{
    if(showLogOut){
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(true)
    }else{
      alert("please login")
    setShowLogin(true)
    setShowRegister(false)
    }
  }

  

  const toggleSideBar = () => {
    console.log("Toggling sidebar");
    setSideBarOpen((prev)=>!prev)
    setShowLogin(false);
    setShowRegister(false)
  }



  return (
    <>
    <section className='landingSection'>
        <NavBar 
        showLoginHandler = {showLoginHandler} 
        showRegisterHandler = {showRegisterHandler} 
        showLogOut = {showLogOut} 
        logoutHandler={logoutHandler} 
        toggleSideBar={toggleSideBar} 
        />
        <div className="collectionSection">
        <div className='bob' ref={sideBarRef}>
          <SideBar 
          showFirmHandler = {showFirmHandler} 
          showProductHandler = {showProductHandler}  
          showAllProductsHandler = {showAllProductsHandler} 
          showFirmTitle={showFirmTitle} 
          isOpen={sideBarOpen} 
          />
        </div>
          {showLogin && <Login showWelcomeHandler = {showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler = {showLoginHandler}/>}
          {showFirm && showLogOut && <AddFirm/>}
          {showProduct && showLogOut && <AddProduct/>}
          {showWelcome && <Welcome/>}
          {showAllProducts && showLogOut && <AllProducts/>}
          <FrontPage/>
        </div>
    </section>
    
    </>
  )
}

export default Landing
