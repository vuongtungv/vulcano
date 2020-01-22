import React from "react";
// import { createStackNavigator, createDrawerNavigator,  createAppContainer} from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer'; 

import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';


import Home from "./screens/Home";  
import SearchHome from "./screens/search/Home";  




// sản phẩm
import HomeProducts from "./screens/products/Home";
import SalesProducts from "./screens/products/SalesProducts";
import AllProducts from "./screens/products/AllProducts";
import ListProductsInCate from "./screens/products/ProductsInCate";  
import DetailProduct from "./screens/products/DetailProduct";  
import Cart from "./screens/products/Cart";  
import Payment from "./screens/products/Payment";  
import PaymentSuccess from "./screens/products/PaymentSuccess";  



 
// tin tức
import News from "./screens/news/Home";  
import CateNews from "./screens/news/CateNews";  
import DetailNews from "./screens/news/DetailNews";  


// videos
import HomeVideos from "./screens/videos/Home";

// showrooms
import HomeShowrooms from "./screens/showrooms/Home";


// user
import User from "./screens/user/Home";





export const VulcanoStack = createStackNavigator({
  HomeScreen: {
    screen: Home
  }, 
  SearchHomeScreen: {
    screen: SearchHome
  }, 

  // sản phẩm
  CategoriesScreen: {
    screen: HomeProducts
  },
  ListProductsInCateScreeen:{
    screen: ListProductsInCate
  },
  DetailProductScreeen:{
    screen: DetailProduct
  },
  AllProductsScreen:{
    screen: AllProducts
  },
  SalesProductsScreen:{
    screen: SalesProducts
  },
  CartScreen:{
    screen: Cart
  },
  PaymentScreen:{
    screen: Payment
  },
  PaymentSuccessScreen:{
    screen: PaymentSuccess
  },



  // tin tức
  NewsScreen: {
    screen: News
  },
  CateNewsScreen: {
    screen: CateNews
  },
  DetailNewsScreen:{
    screen: DetailNews
  },
  

  // video
  ListVideosAll:{
    screen: HomeVideos
  },


  // Showrooms
  ListShowroomsScreen:{
    screen: HomeShowrooms
  },


  // user
  UserScreen:{
    screen: User
  }


});



export const Vulcano = createDrawerNavigator({
  Vulcano: {
    screen: VulcanoStack
  }
});

/*
export const AppContainer = createAppContainer(KidsGo);

export class KidsNav extends React.Component {
    render() {
        console.log(this.state);
        return (
            <AppContainer />
        )
    }
}

import { connect } from 'react-redux';

import updateCount from './screens/api/ReduxActions';

export default connect( 
    state => {
        return {
            count : state.count,
        }
    },
    dispatch => {
        return {
            onUpdateCount: (key, value) => dispatch( updateCount(key, value) )
        }
    }
)(KidsNav);*/
