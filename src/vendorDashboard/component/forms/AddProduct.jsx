import React, {useState} from 'react'
import {API_URL} from '../../data/ApiPath'


const AddProduct = () => {

    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState([])
    const [bestSeller, setBestSeller] = useState(false)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)


    const handleCategoryChange = (event) => {
        const value = event.target.value
        if(category.includes(value)){
           setCategory(category.filter((item) => item !== value)) 
        } else {
           setCategory([...category, value])
        }
    }

    const handleBestSeller = (event) => {
        const value = event.target.value === 'true' 
            setBestSeller(value)
    }

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0]
        setImage(selectedImage)
    }

    const handleAddProduct = async(e) => {
        e.preventDefault()
        try {
            const loginToken = localStorage.getItem('loginToken')
            const firmId = localStorage.getItem('firmId')

            if (!loginToken || !firmId) {
                console.error('User Not Logged In')
            }

            const formData = new FormData()
            formData.append('productName', productName)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('bestSeller', bestSeller)
            formData.append('image', image)

            category.forEach((value) => {
                formData.append('category', value)    
            })

            const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
                method: 'POST',
                body: formData
            })
            const data = await response.json()

            if (response.ok) {
                console.log('Product added successfully', data)
                alert('Product added successfully')
                setProductName('')
                setPrice('')
                setCategory([])
                setBestSeller(false)
                setDescription('')
                setImage('')
            }
            


        } catch (error) {
            alert('Error adding product')
        }
        
        
    }




  return (
    <div className='productSection'>
        <form className="productForm" onSubmit={handleAddProduct}>
        <h2>Add Product</h2><br/>
            <label>Product Name</label><br/>
            <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)}/><br/>
            <label>Price</label><br/>
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} /><br/>
            <div className="check-important">
                <label>Category</label><br/>
                <div className="checkContainer">
                    <div className="checkBoxContainer">
                          <label>Veg</label><br/>
                          <input type="checkbox" checked = {category.includes('veg')} value= "veg" onChange={handleCategoryChange}/><br/>
                    </div>
                    <div className="checkBoxContainer">
                          <label>Non-Veg</label><br/>
                          <input type="checkbox" checked = {category.includes('non-veg')} value= "non-veg"  onChange={handleCategoryChange}/><br/>
                    </div>
                </div>

            </div>

            <div className="Product-check-important">
                <label>Bestseller</label><br/>
                <div className="Product-checkContainer">
                    <div className="Product-checkBoxContainer">
                          <label>Yes</label><br/>
                          <input type="radio" value= "true" checked = {bestSeller === true} onChange={handleBestSeller}/><br/>
                    </div>
                    <div className="Product-checkBoxContainer">
                          <label>No</label><br/>
                          <input type="radio" value= "false" checked = {bestSeller === false}  onChange={handleBestSeller}/><br/>
                    </div>
                </div>

            </div>
            <label>Description</label><br/>
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
            <label>Product Image</label><br/>
            <input type="file" onChange={handleImageUpload}/><br/>
            <div className="btnSubmit">
                <button className='button' type="submit">Submit</button>
            </div>
        </form>
      </div>
  )
}

export default AddProduct
