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
import Shipping from './screens/Shipping'
import Payment from './screens/Payment'
import OrderScreen from './screens/OrderScreen'
import MyOrders from './screens/MyOrders'
import AdminOrders from './screens/AdminOrders'
import OrderDetails from './screens/OrderDetails'
import AdminProducts from './screens/AdminProducts'
import AdminUsers from './screens/AdminUsers'
import ProductCreate from './screens/ProductCreate'
import ProductEdit from './screens/ProductEdit'
import UserAccountScreen from './screens/UserAccountScreen'
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
        <Route path='/shipping' component={Shipping} />
        <Route path='/payment' component={Payment} />
        <Route path='/placeorder' component={OrderScreen} />
        <Route path='/myorders/:id' component={MyOrders} />
        <Route path='/admin/allOrders' exact component={AdminOrders} />
        <Route path='/orderDetails/:id' component={OrderDetails} />
        <Route path='/admin/allProducts' exact component={AdminProducts} />
        <Route path='/admin/allUsers' exact component={AdminUsers} />
        <Route path='/admin/ProductCreate' exact component={ProductCreate} />
        <Route path='/admin/ProductEdit/:id' exact component={ProductEdit} />
        <Route path='/my-account/:id' exact component={UserAccountScreen} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
