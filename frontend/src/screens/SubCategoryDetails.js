import React, { useState, useEffect } from 'react'
import Slider from 'react-rangeslider'
import ProductCard from '../components/ProductCard'
import 'react-rangeslider/lib/index.css'
import { useDispatch, useSelector } from 'react-redux'

import { listsubCategoryDetails } from '../actions/productActions'
import Loading from '../components/Loading'
const CategoryDetails = ({ match }) => {
  const dispatch = useDispatch()
  const productsubCategory = useSelector((state) => state.productsubCategory)
  const { loading, products, error } = productsubCategory

  const [value, setValue] = useState(10000)
  const [minValue, setMinValue] = useState(100)
  const categoryId = match.params.subcategoryName

  const handleChange = (value) => {
    setValue(value)
  }

  useEffect(() => {
    dispatch(listsubCategoryDetails(categoryId, value))
  }, [categoryId, value])

  return (
    <div className='category-outermost'>
      <div className='category'>
        <div className='filter-options'>
          <span>PRICE</span>
          <div className='slider-filter'>
            <Slider
              className='manageslider'
              value={value}
              min={100}
              max={200000}
              orientation='horizontal'
              onChange={handleChange}
            />
          </div>
          <div className='rangeNumber'>
            <span>
              <span> Min Rs.</span>
              <input type='number' value={minValue} />
            </span>
            <span>
              <span> Max Rs.</span>

              <input
                type='number'
                value={value}
                onChange={(e) => {
                  setValue(value)
                }}
              />
            </span>
          </div>
          <br />
        </div>
        {loading && <Loading />}

        <div className='category-content'>
          {products.length > 0 &&
            products.map((filter) => (
              <ProductCard key={filter._id} product={filter} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryDetails
