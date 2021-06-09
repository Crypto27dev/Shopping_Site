import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './screens/Home'
import Footer from './components/Footer'
import CategoryDetails from './screens/CategoryDetails'
import Register from './screens/Register'
import SubCategoryDetails from './screens/SubCategoryDetails'
import ProductScreen from './screens/ProductScreen'
import Login from './screens/Login'
import CartScreen from './screens/CartScreen'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route
          path='/categories/:categoryName'
          exact
          component={CategoryDetails}
        />
        <Route
          path='/category/:subcategoryName'
          exact
          component={SubCategoryDetails}
        />
        <Route
          path='/category/:subcategory/:brand/:id'
          component={ProductScreen}
          exact
        />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <Route path='/cart/:id?' component={CartScreen} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
