// import { ca } from 'date-fns/locale'
import React, {useState} from 'react'
import {API_URL} from '../../data/ApiPath'
// import {ThreeCircles} from 'react-loader-spinner'

const AddFirm = () => {

    const [firmName, setFirmName] = useState('')
    const [area, setArea] = useState('')
    const [category, setCategory] = useState([])
    const [region, setRegion] = useState([])
    const [offer, setOffer] = useState('')
    const [file, setFile] = useState(null)


    const handleCategoryChange = (event) => {
        const value = event.target.value
        if(category.includes(value)){
           setCategory(category.filter((item) => item !== value)) 
        } else {
           setCategory([...category, value])
        }
    }

    const handleRegionChange = (event) => {
        const  value = event.target.value
        if(region.includes(value)){
           setRegion(region.filter((item) => item !== value)) 
        } else {
           setRegion([...region, value])
        }
    }

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0]
        setFile(selectedImage)
    }



    const handleFirmSubmit = async (e) => {
        e.preventDefault()
        try {
            const loginTokenFirm = localStorage.getItem('loginToken')
            if (!loginTokenFirm) {
                console.log('User Not Logged In')
            }

            const formData = new FormData()
            formData.append('firmName', firmName)
            formData.append('area', area)
            formData.append('offer', offer)
            formData.append('image', file)

            category.forEach((value) => {
                formData.append('category', value)    
            })
            region.forEach((value) => {
                formData.append('region', value)    
            })

            const response = await fetch(`${API_URL}/firm/add-firm`,{
                method: 'POST',
                headers: {
                    'token': `${loginTokenFirm}`
                },
                body: formData
            });
            const data = await response.json()
            if (response.ok) {
                console.log(data);
                setFirmName('')
                setArea('')
                setCategory([])
                setRegion([])
                setOffer('')
                setFile('')
                alert('Firm Added Successfully')
            }else if(data.message === "vendor can have one firm") {
                alert('Firm exists. only one firm can be added')
            }else{
                alert('Error adding firm')
            }
            console.log('Firm ID:', data.firmId)
            const firmId = data.firmId
            const vendorRestaurant = data.vendorFirmName
            localStorage.setItem('firmId', firmId)
            localStorage.setItem('firmName', vendorRestaurant)
            window.location.reload()

        } catch (error) {
            console.error('Error adding firm:', error)
            alert('Error adding firm')
        }
    }



  return (
    <div className='firmSection'>
        <form className="firmForm" onSubmit={handleFirmSubmit}>
        <h2>Add Firm</h2><br/>
            <label>Firm Name</label><br/>
            <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)} /><br/>
            <label>Area</label><br/>
            <input type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)} /><br/>



            <div className="check-important">
                <label>Category</label><br/>
                <div className="checkContainer">
                    <div className="checkBoxContainer">
                          <label>Veg</label><br/>
                          <input type="checkbox" checked = {category.includes('veg')} value = "veg" onChange={handleCategoryChange}/><br/>
                    </div>
                    <div className="checkBoxContainer">
                          <label>Non-Veg</label><br/>
                          <input type="checkbox" checked = {category.includes('non-veg')} value = "non-veg" onChange={handleCategoryChange}/><br/>
                    </div>
                </div>
            </div>


            <div className="Region-check-important">
                <label>Region</label><br/>
                <div className="Region-checkContainer">
                    <div className="Region-checkBoxContainer">
                          <label>South Indian</label><br/>
                          <input type="checkbox" checked = {region.includes('south-indian')}  value = "south-indian"  onChange={handleRegionChange} /><br/>
                    </div>
                    <div className="Region-checkBoxContainer">
                          <label>North Indian</label><br/>
                          <input type="checkbox" checked = {region.includes('north-indian')} value= "north-indian" onChange={handleRegionChange}/><br/>
                    </div>
                    <div className="Region-checkBoxContainer">
                          <label>Chinese</label><br/>
                          <input type="checkbox" checked = {region.includes('chinese')} value= "chinese" onChange={handleRegionChange}/><br/>
                    </div>
                    <div className="Region-checkBoxContainer">
                          <label>Bakery</label><br/>
                          <input type="checkbox" checked = {region.includes('bakery')} value= "bakery" onChange={handleRegionChange}/><br/>
                    </div>
                </div>

            </div>
            <label>Offer</label><br/>
            <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/><br/>
            <label>Firm Image</label><br/>
            <input type="file" onChange={handleImageUpload}/><br/>
            <div className="btnSubmit">
                <button className='button' type="submit">Submit</button>
            </div>
        </form>
      </div>
  )
}

export default AddFirm
