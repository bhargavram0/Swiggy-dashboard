import React, {useState, useEffect} from 'react'
import {API_URL} from '../data/ApiPath'


const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [visibleCount, setVisibleCount] = useState(3); 
    const [isExpanded, setIsExpanded] = useState(false);


    const productsHandler = async () => {
        const firmId = localStorage.getItem('firmId')
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products/`)
            const newProductsData = await response.json()
            setProducts(newProductsData.products)
        
        } catch (error) {
            console.error('Error fetching products:', error)
            alert('Error fetching products')
        }
    }

    useEffect(() => {
        productsHandler()
    }, [])


    const deleteProductById = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/product/${productId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                setProducts(products.filter((product) =>product._id !== productId))
                confirm("are you sure you want to delete this product?")
                alert('Product deleted successfully')
            }
        } catch (error) {
            console.error('Failed to delete product');
            alert('Failed to delete product')
        }
        
    }




  return (
    <div className='productSection'>
        {products.length === 0 ? (
            <p className='pro'>No products added</p>
        ) : (
            <>
            <div className="table-wrapper">
                <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.slice(0, visibleCount).map((item)=>{
                            return (
                                // <>
                                    <tr key={item._id}>
                                        <td>{item.productName}</td>
                                        <td>₹{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <img src={`${API_URL}/uploads/${item.image}`} 
                                            alt={item.productName}
                                            style={{ width: '50px', height:'50px'  }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={()=>deleteProductById(item._id)}
                                        className='button'
                                        >Delete</button>
                                    </td>
                                    </tr>
                                // </>
                            )
                    })}
                </tbody>
                </table>
            </div>

            {visibleCount < products.length && (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button
                onClick={() => setVisibleCount(products.length)}
                className="button12"
              >
                See More
              </button>
            </div>
          )}
            </>
         )}
    </div>
  )
}

export default AllProducts


