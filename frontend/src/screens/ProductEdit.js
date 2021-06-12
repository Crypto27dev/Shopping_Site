import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { listProductDetails } from '../actions/productActions'
import { editProduct, uploadImg } from '../actions/productActions'
import { PRODUCT_EDIT_RESET } from '../constants/ProductConstants'
const ProductEdit = ({ history, match }) => {
  const dispatch = useDispatch()
  const productId = match.params.id
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  const productEdit = useSelector((state) => state.productEdit)
  const { loading, error, success } = productEdit
  const productDetails = useSelector((state) => state.productDetails)
  const {
    loading: loadingdetails,
    error: errordetails,
    product,
  } = productDetails
  const uploadImage = useSelector((state) => state.uploadImage)
  const { loading: loadingImage, error: errorImage, Img } = uploadImage
  const [category, setCategory] = useState('')
  const [subCategory, setsubCategory] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [discount, setDiscount] = useState('')
  const [quantity, setQuantity] = useState('')
  const imgHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    dispatch(uploadImg(formData))
    setImage(Img)
    console.log('up', image)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(' HERE ', image)

    dispatch(
      editProduct(
        name,
        Img,
        brand,
        category,
        subCategory,
        description,
        discount,
        cost,
        quantity,
        productId
      )
    )
  }
  const subCategories = [
    [
      { _id: 1, name: 'Tv' },
      { _id: 2, name: 'Mobile' },
    ],
    [
      { _id: 1, name: 'Shirt' },
      { _id: 2, name: 'Paint' },
    ],
    [
      { _id: 1, name: 'Kurta' },
      { _id: 2, name: 'Saree' },
    ],
    [
      { _id: 1, name: 'Rice' },
      { _id: 2, name: 'Cereals' },
    ],
    [
      { _id: 1, name: 'Shampoo' },
      { _id: 2, name: 'Deodrants' },
    ],
  ]

  useEffect(() => {
    !userInfo && history.push('/')
    if (success) {
      dispatch({ type: PRODUCT_EDIT_RESET })
      history.push('/admin/allProducts')
    } else {
      if (!product.brandName || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.brandName)
        setBrand(product.brand)
        setDescription(product.description)
        setCategory(product.category)
        setsubCategory(product.subCategory)
        setCost(product.cost)
        setDiscount(product.discount)
        setImage(product.image)
        setQuantity(product.quantity)
      }
    }
  }, [userInfo, history, productId, dispatch, product, success])
  return (
    <div className='product-create'>
      {/* {console.log(image)} */}
      <span style={{ textAlign: 'center', padding: '5px', fontSize: '25px' }}>
        UPDATE PRODUCT
      </span>
      {error && <Message message={error} color='black' />}
      {loading && <Loading />}
      {success && (
        <Message message='Product Edited Successfully' color='green' />
      )}
      <form onSubmit={submitHandler}>
        <div className='product-create-inner'>
          <div className='product-create-left'>
            <div className='control-form'>
              <label>Enter the product Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='control-form'>
              <label>Upload an Image</label>
              <input
                type='file'
                id='img'
                name='img'
                accept='image/*'
                onChange={imgHandler}
              />
            </div>
            <div className='control-form'>
              <label>Category</label>
              <select
                name=''
                id=''
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Select the Category</option>
                <option value='Electronics'>Electronics</option>
                <option value='Men Fashion'>Men Fashion</option>
                <option value='Women Fashion'>Women Fashion</option>
                <option value='Groceries'>Groceries</option>
                <option value='Lifestyle'>Lifestyle</option>
              </select>{' '}
            </div>
            <div className='control-form'>
              <label>Sub Category</label>
              <select
                name=''
                id=''
                value={subCategory}
                onChange={(e) => setsubCategory(e.target.value)}
              >
                {console.log(category)}
                <option value=''>Select the Sub Category</option>
                {category === 'Electronics' &&
                  subCategories[0].map((data) => (
                    <option
                      key={data._id}
                      value={data.name}
                      onChange={(e) => setsubCategory(e.target.value)}
                    >
                      {data.name}
                    </option>
                  ))}
                {category === 'Men Fashion' &&
                  subCategories[1].map((data) => (
                    <option
                      key={data._id}
                      value={data.name}
                      onChange={(e) => setsubCategory(e.target.value)}
                    >
                      {data.name}
                    </option>
                  ))}
                {category === 'Women Fashion' &&
                  subCategories[2].map((data) => (
                    <option
                      key={data._id}
                      value={data.name}
                      onChange={(e) => setsubCategory(e.target.value)}
                    >
                      {data.name}
                    </option>
                  ))}

                {category === 'Groceries' &&
                  subCategories[3].map((data) => (
                    <option
                      key={data._id}
                      value={data.name}
                      onChange={(e) => setsubCategory(e.target.value)}
                    >
                      {data.name}
                    </option>
                  ))}
                {category == 'Lifestyle' &&
                  subCategories[4].map((data) => (
                    <option
                      key={data._id}
                      value={data.name}
                      onChange={(e) => setsubCategory(e.target.value)}
                    >
                      {data.name}
                    </option>
                  ))}
              </select>{' '}
            </div>
            <div className='control-form'>
              <label>Enter the Brand Name</label>
              <input
                type='text'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>
          <div className='product-create-right'>
            {' '}
            <div className='control-form'>
              <label>Enter the Cost</label>
              <input
                type='number'
                value={cost}
                min='1'
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <div className='control-form'>
              <label>Enter the Discount %</label>
              <input
                type='number'
                value={discount}
                min='0'
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className='control-form'>
              <label>Enter the Quantity</label>
              <input
                type='number'
                value={quantity}
                min='1'
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className='control-form'>
              <label>Enter the Description</label>
              <textarea
                style={{ outline: 'none', width: '100%' }}
                type=''
                value={description}
                rows='4'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          style={{ margin: 'auto', marginBottom: '10px' }}
          className='btn-product'
        >
          Update Product
        </button>
        )
      </form>
    </div>
  )
}

export default ProductEdit
