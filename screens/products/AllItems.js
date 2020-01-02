import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';
import TabProductsBase from './../template/TabProductsBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import {getCateLv1} from './../../src/api/apiProducts';

export default class AllItems extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            listCateLv1: [],
        }

        this.arr = [];
    }

    componentDidMount() {
        this.getCateLv1();
    }

    getCateLv1 = () => {
        this.setState({ loading: true });
        getCateLv1()
        .then(resJSON => {
            const { list, error } = resJSON;
            if (error == false) {
                this.setState({
                    listCateLv1: list,  
                    error: false || null,  
                });  
            } else {
                this.setState({ loading: false, refreshing: false });
            }
    
        }).catch(err => {
            // this.setState({ loading: false }); 
        });
    }

    listProductsInCate(id){
        this.props.navigation.navigate('ListProductsInCateScreeen',{ id: id });
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="categories" title={'Danh mục sản phẩm'} navigation={navigation} />
                <View style={MainStyle.pageCategories}>
                    <View style={MainStyle.tabListCategories}>
                        {/* <TouchableOpacity style={[MainStyle.itemsTabCategories,MainStyle.activeItemsTabCategories]}>
                            <Text style={MainStyle.textTabCategories}>Sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories]}>
                            <Text style={MainStyle.textTabCategories}>Hot sales</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.itemsTabCategories]}>
                            <Text style={MainStyle.textTabCategories}>All items</Text>
                        </TouchableOpacity> */}
                        <TabProductsBase navigation={navigation} page="tab_all_items"/>
                    </View>
                    <ScrollView style={MainStyle.listCategories}>
                        {this.state.listCateLv1.map((item, index) => {return (
                            <TouchableOpacity key={item.id} style={MainStyle.itemsCate} onPress={()=>this.listProductsInCate(item.id)} >
                                <View style={MainStyle.imgCate}>
                                {
                                    item.image !='' ?  
                                    <Image style={MainStyle.wImgCate} source={{uri: item.image}} />
                                    :
                                    <Image style={{width: '100%', height: 45}}  source={require("../../assets/logo.png")} />     
                                }
                                </View>
                                <View style={MainStyle.vNameCate}>
                                    <Text style={MainStyle.nameCate}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )})}  
                    </ScrollView> 
                </View>
                <FooterBase navigation={navigation} page="muster"  />
            </Container>
        );
    }
}
 