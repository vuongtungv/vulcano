import React from "react";
// import { createStackNavigator, createDrawerNavigator,  createAppContainer} from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer'; 

import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';


import Home from "./screens/Home";  

// sản phẩm
import Categories from "./screens/products/Home";
import ListProductsInCate from "./screens/products/ProductsInCate";  
import DetailProduct from "./screens/products/DetailProduct";  


 
// tin tức
import News from "./screens/news/Home";  
import CateNews from "./screens/news/CateNews";  
import DetailNews from "./screens/news/DetailNews";  



export const VulcanoStack = createStackNavigator({
  HomeScreen: {
    screen: Home
  }, 

  // sản phẩm
  CategoriesScreen: {
    screen: Categories
  },
  ListProductsInCateScreeen:{
    screen: ListProductsInCate
  },
  DetailProductScreeen:{
    screen: DetailProduct
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
