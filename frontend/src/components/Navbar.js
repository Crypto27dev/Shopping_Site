import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productsSearch } from '../actions/productActions'
import Loading from './Loading'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
  const dispatch = useDispatch()

  const showList = () => {
    document.getElementById('extraitems').classList.toggle('show-list')
  }
  const Logout = () => {
    dispatch(logout())
    showAuthOptions()
  }
  const [text, setText] = useState(undefined)
  const productSearch = useSelector((state) => state.productSearch)
  const { loading, products, error } = productSearch
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  useEffect(() => {
    dispatch(productsSearch(text))
  }, [text])
  const showAuthOptions = () => {
    document.getElementById('showOptions').classList.toggle('showOptionsList')
  }
  return (
    <div className='nav'>
      <div className='navbar'>
        <div className='bars'>
          <i className='fas fa-bars' onClick={showList}></i>
        </div>

        <Link to='/'>
          <h3>DhamalaShop</h3>
        </Link>
        <div className='search-form'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <i className='fas fa-search'></i>
          <div className='search-results'>
            {loading && <Loading />}
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <div className='searched'>
                  <div className='searchedItem' key={product._id}>
                    <Link
                      to={`/category/${product.category}/${product.subCategory}/${product._id}`}
                    >
                      {' '}
                      <img src={product.image} alt='' />
                    </Link>
                    <div className='searchItem-inner'>
                      <span>{product.brandName}</span>
                      <span>
                        <span className='brandName'>Brand</span> {product.brand}
                      </span>
                    </div>
                  </div>
                  <div className='underline'></div>
                </div>
              ))}
          </div>
        </div>
        {/* </div> */}
        <div className='shopping'>
          <Link to={`/cart/cartItems/?qty`}>
            <i className='fas fa-shopping-cart'>
              {' '}
              {cartItems.length > 0 && <span>{cartItems.length}</span>}
            </i>
          </Link>
        </div>
        <div className='my-account' id='my-account'>
          <i className='far fa-user'></i>
          <div className='my-account-text' onClick={showAuthOptions}>
            <span>
              Namaste{' '}
              {userInfo && userInfo.isAdmin
                ? 'Admin'
                : userInfo && userInfo.name}
            </span>
            <div className='account-detail'>
              {' '}
              <span>My Account </span>
              <i className='fas fa-chevron-down'></i>
            </div>
          </div>
          <div className='showOptions' id='showOptions'>
            {!userInfo ? (
              <>
                <Link to='/login' onClick={showAuthOptions}>
                  Sign In
                </Link>
                <span className='new-customer'>New Customer?</span>
                <Link to='/register' onClick={showAuthOptions}>
                  Register
                </Link>{' '}
              </>
            ) : (
              <div className='weird'>
                <Link
                  to={`/my-account/${userInfo._id}`}
                  onClick={showAuthOptions}
                >
                  My Account
                </Link>
                <div className='underline'></div>
                <Link
                  to={`/myorders/${userInfo._id}`}
                  onClick={showAuthOptions}
                >
                  My Orders
                </Link>
                <div className='underline'></div>
                {userInfo.isAdmin && (
                  <>
                    {' '}
                    <Link to={`/admin/allProducts`} onClick={showAuthOptions}>
                      All Products
                    </Link>
                    <div className='underline'></div>
                    <Link to={`/admin/allOrders`} onClick={showAuthOptions}>
                      All Orders
                    </Link>
                    <div className='underline'></div>
                    <Link to={`/admin/allUsers`} onClick={showAuthOptions}>
                      All Users
                    </Link>
                    <div className='underline'></div>
                    <Link to={`/admin/ProductCreate`} onClick={showAuthOptions}>
                      Create a new Product
                    </Link>
                    <div className='underline'></div>
                  </>
                )}
                <button className='logout' onClick={Logout}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='search-form-small'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <i className='fas fa-search'></i>
        <div className='search-results'>
          {loading && <Loading />}
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <div className='searched'>
                <div className='searchedItem' key={product._id}>
                  <Link
                    to={`/category/${product.category}/${product.subCategory}/${product._id}`}
                  >
                    {' '}
                    <img src={product.image} alt='' />
                  </Link>
                  <div className='searchItem-inner'>
                    <span>{product.brandName}</span>
                    <span>
                      <span className='brandName'>Brand</span> {product.brand}
                    </span>
                  </div>
                </div>
                <div className='underline'></div>
              </div>
            ))}
        </div>
      </div>
      <div className='extra-items' id='extraitems'>
        <div className='category-shop'>
          <h3>Shop By Category</h3>
          <i className='fas fa-times' onClick={showList}></i>
        </div>
        <ul className='shopping-categories'>
          <li className='inline-items'>
            <Link to='/categories/Electronics'>Electronics</Link>
            <ul className='inline-list'>
              <li>
                <Link className='category-item' to='/category/Tv'>
                  TV
                </Link>
              </li>
              <li>
                <Link to='/category/Mobile'>Mobile</Link>
              </li>
            </ul>
          </li>
          <li className='inline-items'>
            <Link to='/categories/Men Fashion'>Mens Fashion</Link>
            <ul className='inline-list'>
              <li>
                <Link to='/category/Shirt'>Shirt</Link>
              </li>
              <li>
                <Link to='/category/Paint'>Paint</Link>
              </li>
            </ul>
          </li>
          <li className='inline-items'>
            <Link to='/categories/Women Fashion'>Womens Fashion</Link>
            <ul className='inline-list'>
              <li>
                <Link to='/category/Kurta'>Kurta</Link>
              </li>
              <li>
                <Link to='/category/Saree'>Saree</Link>
              </li>
            </ul>
          </li>
          <li className='inline-items'>
            <Link to='/categories/Groceries'>Groceries</Link>
            <ul className='inline-list'>
              <li>
                <Link to='/category/Rice'>Rice</Link>
              </li>
              <li>
                <Link to='/category/Cereals'>Cereals</Link>
              </li>
            </ul>
          </li>
          <li className='inline-items'>
            <Link to='/categories/Lifestyle'>Lifestyle</Link>
            <ul className='inline-list'>
              <li>
                <Link to='/category/Shampoo'>Shampoo</Link>
              </li>
              <li>
                <Link to='/category/Deodrants'>Deodrants</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
