import React, { useState, useEffect } from 'react'
import ImageCarousel from '../components/ImageCarousel'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import { listProducts } from '../actions/productActions'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
const Home = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [])
  return (
    <div className=''>
      <ImageCarousel />
      {loading ? (
        <Loading />
      ) : (
        <div className='container'>
          <p className='top-picks'>Top picks for you</p>
          <div className='shopping-items'>
            {products &&
              products.length > 0 &&
              products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </div>
        </div>
      )}
      {/* <div className='loadmorebutton'>
        {' '}
        <button onClick={onLoadMore}>Load More</button>
      </div> */}
      {/* <Footer /> */}
    </div>
  )
}

export default Home
