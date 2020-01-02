import React, { Component } from 'react';
import { 
    Text, View, Image, Dimensions , Alert,TouchableOpacity, FlatList
} from 'react-native';
import MainStyle from './../../styles/MainStyle';
import { Icon } from "native-base";
  
let ScreenWidth = Dimensions.get("window").width;



export default class HeaderBase extends Component {
    constructor(props) {
        super(props);
        this.state={
            ListCateNewsHeader: false,
        }
    } 

    componentDidMount() {

    }

    HomeProducts(){
        this.props.navigation.navigate('CategoriesScreen');
    }
    SalesProducts(){
        this.props.navigation.navigate('SalesProductsScreen');
    }
    AllProducts(){
        this.props.navigation.navigate('AllProductsScreen');
    }


    render() {
        const { navigation, page, title, heading } = this.props;
        switch(page){
            case 'tab_home_products':
                return(
                    <View>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories,MainStyle.activeItemsTabCategories]} onPress ={()=> this.HomeProducts()} >
                            <Text style={MainStyle.textTabCategories}>Sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories]} onPress ={()=> this.SalesProducts()}>
                            <Text style={MainStyle.textTabCategories}>Hot sales</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories]} onPress ={()=> this.AllProducts()}>
                            <Text style={MainStyle.textTabCategories}>All items</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'tab_sales_products':
                return(
                    <View>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories]} onPress ={()=> this.HomeProducts()}>
                            <Text style={MainStyle.textTabCategories}>Sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories,MainStyle.activeItemsTabCategories]} onPress ={()=> this.SalesProducts()}>
                            <Text style={MainStyle.textTabCategories}>Hot sales</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories]} onPress ={()=> this.AllProducts()}>
                            <Text style={MainStyle.textTabCategories}>All items</Text>
                        </TouchableOpacity>
                    </View>
                );
            default: 
                return(
                    <View>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories]} onPress ={()=> this.HomeProducts()}>
                            <Text style={MainStyle.textTabCategories}>Sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories]} onPress ={()=> this.SalesProducts()}>
                            <Text style={MainStyle.textTabCategories}>Hot sales</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories,MainStyle.activeItemsTabCategories]} onPress ={()=> this.AllProducts()}>
                            <Text style={MainStyle.textTabCategories}>All items</Text>
                        </TouchableOpacity>
                    </View>
                );
        }
    }
}
