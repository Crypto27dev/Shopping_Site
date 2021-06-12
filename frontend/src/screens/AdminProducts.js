import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import ClearIcon from '@material-ui/icons/Clear'
import { listProducts } from '../actions/productActions'
import { deleteProduct } from '../actions/productActions'
const AdminProducts = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete
  useEffect(() => {
    !userInfo && history.push('/')
    dispatch(listProducts())
  }, [userInfo, history, loadingDelete])
  const EditHandler = (id) => {
    history.push(`/admin/productEdit/${id}`)
  }
  const DeleteHandler = (id) => {
    dispatch(deleteProduct(id))
  }
  return (
    <div className='adminOrdersouter'>
      {errorDelete && <Message message={errorDelete} color='black' />}
      {loading || loadingDelete ? (
        <Loading />
      ) : (
        <div className='adminOrder-inner'>
          {products && products.length > 0 ? (
            <table>
              <tr>
                <th>Product ID</th>
                <th>Image</th>

                <th>Name</th>

                <th>Category</th>
                <th>Sub Category</th>
                <th>Brand Name</th>
                <th>Discount</th>
                <th>Cost</th>
                <th>Product Created</th>

                <th style={{ textAlign: 'center' }}>Edit</th>
                <th>Delete</th>
              </tr>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <img
                      style={{ width: '50px', height: '50px' }}
                      src={product.image}
                      alt=''
                    />
                  </td>
                  <td>{product.brandName}</td>
                  <td>{product.category}</td>
                  <td>{product.subCategory}</td>

                  <td> {product.brand}</td>
                  <td>
                    {' '}
                    {product.discount ? (
                      ` ${product.discount}%`
                    ) : (
                      <ClearIcon
                        style={{
                          color: 'red',
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      />
                    )}
                  </td>

                  <td>Rs. {product.discountedCost}</td>

                  <td>{product.createdAt.substring(0, 10)}</td>
                  <td
                    style={{
                      color: 'white',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                    onClick={() => EditHandler(product._id)}
                  >
                    <i className='fas fa-edit'></i>
                  </td>
                  <td
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                    onClick={() => DeleteHandler(product._id)}
                  >
                    <i class='fas fa-trash'></i>{' '}
                  </td>
                </tr>
              ))}
            </table>
          ) : (
            <Message message={error} color='red' />
          )}
        </div>
      )}
    </div>
  )
}

export default AdminProducts
