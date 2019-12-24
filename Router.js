import React from "react";
// import { createStackNavigator, createDrawerNavigator,  createAppContainer} from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer'; 

import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';


import Home from "./screens/Home";  

// sản phẩm
import Categories from "./screens/categories/Home";  
import ListProduct from "./screens/categories/ListProduct";  
import DetailProduct from "./screens/categories/DetailProduct";  

 
// tin tức
import News from "./screens/news/Home";  
import DetailNews from "./screens/news/DetailNews";  



export const VulcanoStack = createStackNavigator({
  HomeScreen: {
    screen: Home
  }, 

  // sản phẩm
  CategoriesScreen: {
    screen: Categories
  },
  ListProductScreeen:{
    screen: ListProduct
  },
  DetailProductScreeen:{
    screen: DetailProduct
  },



  // tin tức
  NewsScreen: {
    screen: News
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
