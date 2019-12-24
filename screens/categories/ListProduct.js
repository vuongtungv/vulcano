import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

export default class ListProduct extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            allow_more: true,
            loading: true,
            list: [],
        }

        this.arr = [];
    }

    componentDidMount() {
        
    }
    detailProduct(){
        this.props.navigation.navigate('DetailProductScreeen');
    }

	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="list_products" title={'Sản phẩm'} navigation={navigation} />
                <View style={MainStyle.filterProducts}>
                    <View style={MainStyle.filterLeft}>
                        <TouchableOpacity>
                            <Text style={MainStyle.txtFilter}>Phổ biến</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft: 35}}>
                            <Text style={MainStyle.txtFilter}>Sale</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={MainStyle.filterRight}>
                        <TouchableOpacity style={[MainStyle.hasIconFilter,{marginRight: 35}]}>
                            <Text style={MainStyle.txtFilter}>Giá
                                <Icon type="MaterialCommunityIcons" name="swap-vertical" style={{color: '#000000', fontSize: 20 }} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={MainStyle.hasIconFilter}>
                            <Text style={MainStyle.txtFilter}>Lọc sản phẩm
                                <Icon type="AntDesign" name="filter" style={{positon: 'absolute',color: '#000000', fontSize: 20 }} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={MainStyle.marginBottomFooter}> 
                    <TouchableOpacity style={MainStyle.itemProducts} onPress={()=>this.detailProduct()}> 
                        <View style={MainStyle.vImgItemPro}>
                            <Image style={{width: '100%', height:500}} source={require('../../assets/img_products.png')}/>
                        </View>
                        <View style={MainStyle.bodyItemPro}>
                            <Text style={MainStyle.nameItemProducts}>Áo sơ mi dài tay trắng 9499</Text>
                            <Text style={MainStyle.priceItemProducts}>586.000 đ</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={MainStyle.itemProducts}> 
                        <View style={MainStyle.vImgItemPro}>
                            <Image style={{width: '100%', height:500}} source={require('../../assets/img_products.png')}/>
                        </View>
                        <View style={MainStyle.bodyItemPro}>
                            <Text style={MainStyle.nameItemProducts}>Áo sơ mi dài tay trắng 9499</Text>
                            <Text style={MainStyle.priceItemProducts}>586.000 đ</Text>
                        </View>
                    </View>
                </ScrollView>
                <FooterBase navigation={navigation} page="muster"  />
            </Container>
        );
    }
}
 