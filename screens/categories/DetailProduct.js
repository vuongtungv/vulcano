import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView ,TextInput} from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import Swiper from "react-native-swiper";
import { Container, Content, CheckBox, Icon } from "native-base";

export default class DetailProduct extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
        }

        this.arr = [];
    }

    componentDidMount() {
        
    }
    gotoBack(){
        this.props.navigation.goBack();
    }

	 
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                {/* <HeaderBase page="list_products" title={'Sản phẩm'} navigation={navigation} /> */}
                <ScrollView>
                    <View style={MainStyle.slideImageProduct}>
                        <View style={MainStyle.taskDetailP}>
                            <TouchableOpacity style={[MainStyle.btnRa50,MainStyle.backDetailP]} onPress={() => this.gotoBack()}>
                                <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{color: '#FFFFFF',fontSize:35}]} />
                            </TouchableOpacity> 
                            <TouchableOpacity style={[MainStyle.btnRa50,MainStyle.addDetailP]}>
                                <Icon type="SimpleLineIcons" name="handbag" style={{ color: '#FFFFFF', fontSize: 27 }} />
                            </TouchableOpacity>
                        </View>
                        <Swiper>
                            <Image style={MainStyle.itemsSlideDetailProduct} source={require("../../assets/img_detail_product.png")} />
                            <Image style={MainStyle.itemsSlideDetailProduct} source={require("../../assets/img_detail_product.png")} />
                        </Swiper>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <Text style={MainStyle.titleProduct}>Áo sơ mi ngắn tay</Text>
                        <Text style={MainStyle.titleHDetailProduct}>Giá tiền: <Text style={[MainStyle.txtBlack, MainStyle.colorPriceProducts]}>XSCSK90945097</Text></Text>
                        <Text style={MainStyle.titleHDetailProduct}>Mã sản phẩm: <Text style={[MainStyle.txtBlack]}>XSCSK90945097</Text></Text>
                        <Text style={MainStyle.titleHDetailProduct}>Kiểu dáng: <Text style={MainStyle.txtBlack}>Regular-slim-fit</Text></Text>
                        <Text style={MainStyle.titleHDetailProduct}>Chất liệu: <Text style={MainStyle.txtBlack}>Bamsilk-Microfiber-Sanpakx</Text></Text>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <Text style={MainStyle.headerSlo}>Chọn kiểu dáng: <Text style={MainStyle.colorPriceProducts}>Slim-fit</Text></Text>
                        <View style={MainStyle.vStyleProduct}>
                            <Text style={MainStyle.btnStylePro}>Regular</Text>
                            <Text style={MainStyle.btnStylePro}>Slim-fit</Text>
                            <Text style={MainStyle.btnStylePro}>Regular</Text>
                            <Text style={MainStyle.btnStylePro}>Slim-fit</Text>
                            <Text style={MainStyle.btnStylePro}>Slim-fit</Text>
                        </View>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <Text style={MainStyle.headerSlo}>Chọn kích cỡ: <Text style={MainStyle.colorPriceProducts}>Chọn kích cỡ</Text></Text>
                        <View style={MainStyle.vStyleProduct}>
                            <Text style={MainStyle.btnStylePro}>S</Text>
                            <Text style={MainStyle.btnStylePro}>M</Text>
                            <Text style={MainStyle.btnStylePro}>L</Text>
                            <Text style={MainStyle.btnStylePro}>XM</Text>
                        </View>
                        <View style={MainStyle.hdSize}><Text style={MainStyle.txtHD }>Hướng dẫn chọn kích cỡ</Text></View>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <View style={MainStyle.vNumberProduct}>
                            <View>
                                <Text style={[MainStyle.headerSlo,{height: 30, lineHeight: 30,}]}>Số lượng cần mua: </Text>
                            </View>
                            <View style={MainStyle.touchNumbers}>
                                <TouchableOpacity style={MainStyle.minusNumbers}><Text>-</Text></TouchableOpacity>
                                <TextInput
                                    style={{height: 30, textAlign: 'center', width: 30, borderWidth: 1, borderColor: '#ff0700', borderRadius: 3}}
                                    placeholder="1"
                                    onChangeText={(text) => this.setState({text})}
                                    />  
                                <TouchableOpacity style={MainStyle.minusNumbers}><Text>+</Text></TouchableOpacity>
                            </View>

                        </View>
                        <Text style={[MainStyle.headerSlo,{lineHeight: 45,}]}>
                            <Image style={{marginRight: 15}} source={require('../../assets/icon_car.png')}/>
                                Miễn phí vận chuyển cho đơn hàng từ <Text style={MainStyle.colorPriceProducts}>400.000 đ</Text>
                            </Text>
                    </View>
                    <View style={MainStyle.vHeaderOtherNews}>
                        <Text style={MainStyle.txtOtherNews}>Sản phẩm cùng loại</Text>
                        <View style={[MainStyle.brBottomOther,{width: 150}]}></View>
                    </View>
                    <View style={[MainStyle.otherDProducts,{marginTop: 20}]}>
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
                    </View>
                    <View style={MainStyle.quickTaskBottom}>
                        <TouchableOpacity style={MainStyle.quickTouch}>
                            <Text style={[MainStyle.quickTouchText]}>Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.quickTouch,{backgroundColor: '#000000'}]}>
                            <Text style={[MainStyle.quickTouchText]}>Mua ngay</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
 