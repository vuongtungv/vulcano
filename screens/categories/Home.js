import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            class_id: 50,
            teacher_id: 55,
            allow_more: true,
            loading: true,
            list: [],
        }

        this.arr = [];
    }

    componentDidMount() {
        
    }
    listProduct(){
        this.props.navigation.navigate('ListProductScreeen');
    }

	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="categories" title={'Danh mục sản phẩm'} navigation={navigation} />
                <View style={MainStyle.pageCategories}>
                    <View style={MainStyle.tabListCategories}>
                        <View style={[MainStyle.itemsTabCategories]}>
                            <Text style={MainStyle.textTabCategories}>Sản phẩm</Text>
                        </View>
                        <View style={[MainStyle.itemsTabCategories,MainStyle.activeItemsTabCategories]}>
                            <Text style={MainStyle.textTabCategories}>Hot sales</Text>
                        </View>
                        <View style={[MainStyle.itemsTabCategories]}>
                            <Text style={MainStyle.textTabCategories}>All items</Text>
                        </View>
                    </View>
                    <ScrollView style={MainStyle.listCategories}>
                        <TouchableOpacity style={MainStyle.itemsCate} onPress={()=>this.listProduct()} >
                            <View style={MainStyle.imgCate}>
                                <Image style={MainStyle.wImgCate} source={require('../../assets/img_cate.png')}/>
                            </View>
                            <View style={MainStyle.vNameCate}>
                                <Text style={MainStyle.nameCate}>Áo sơ mi dài tay</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={MainStyle.itemsCate}>
                            <View style={MainStyle.imgCate}>
                                <Image style={MainStyle.wImgCate} source={require('../../assets/img_cate.png')}/>
                            </View>
                            <View style={MainStyle.vNameCate}>
                                <Text style={MainStyle.nameCate}>Áo khoác - Jacket</Text>
                            </View>
                        </View>
                        <View style={MainStyle.itemsCate}>
                            <View style={MainStyle.imgCate}>
                                <Image style={MainStyle.wImgCate} source={require('../../assets/img_cate.png')}/>
                            </View>
                            <View style={MainStyle.vNameCate}>
                                <Text style={MainStyle.nameCate}>Veston</Text>
                            </View>
                        </View>
                        <View style={MainStyle.itemsCate}>
                            <View style={MainStyle.imgCate}>
                                <Image style={MainStyle.wImgCate} source={require('../../assets/img_cate.png')}/>
                            </View>
                            <View style={MainStyle.vNameCate}>
                                <Text style={MainStyle.nameCate}>Áo giữ nhiệt</Text>
                            </View>
                        </View>
                        <View style={MainStyle.itemsCate}>
                            <View style={MainStyle.imgCate}>
                                <Image style={MainStyle.wImgCate} source={require('../../assets/img_cate.png')}/>
                            </View>
                            <View style={MainStyle.vNameCate}>
                                <Text style={MainStyle.nameCate}>Áo sơ mi dài tay</Text>
                            </View>
                        </View>
                        <View style={MainStyle.itemsCate}>
                            <View style={MainStyle.imgCate}>
                                <Image style={MainStyle.wImgCate} source={require('../../assets/img_cate.png')}/>
                            </View>
                            <View style={MainStyle.vNameCate}>
                                <Text style={MainStyle.nameCate}>Áo khoác - Jacket</Text>
                            </View>
                        </View>
                        <View style={MainStyle.itemsCate}>
                            <View style={MainStyle.imgCate}>
                                <Image style={MainStyle.wImgCate} source={require('../../assets/img_cate.png')}/>
                            </View>
                            <View style={MainStyle.vNameCate}>
                                <Text style={MainStyle.nameCate}>Veston</Text>
                            </View>
                        </View>
                        <View style={MainStyle.itemsCate}>
                            <View style={MainStyle.imgCate}>
                                <Image style={MainStyle.wImgCate} source={require('../../assets/img_cate.png')}/>
                            </View>
                            <View style={MainStyle.vNameCate}>
                                <Text style={MainStyle.nameCate}>Áo giữ nhiệt</Text>
                            </View>
                        </View>
                    </ScrollView> 
                </View>
                <FooterBase navigation={navigation} page="muster"  />
            </Container>
        );
    }
}
 