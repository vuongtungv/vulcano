import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image,FlatList, ScrollView ,TextInput,Dimensions,Modal, Alert, Linking} from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import Swiper from 'react-native-swiper';

import { Container, Content, CheckBox, Icon } from "native-base";
import {getDetailProducts} from './../../src/api/apiProducts';
import HTML from 'react-native-render-html';
const { width } = Dimensions.get('window');
const { heigth } = Dimensions.get('window');
import AutoHeightWebView from 'react-native-autoheight-webview';

import saveStorage from './../api/saveStorage';
import getStorage from './../api/getStorage';


import * as MediaLibrary from 'expo-media-library'; 
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import global from './../api/global';

export default class DetailProduct extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            renderArray: [true, false, false, false],
            detail: '',
            amount: '1',
            modalVisible: false,
            modalVisibleSize: false,
            imageWidth: width - 30,
            imageHeight: 0,
            arr_kieu_dang: [],
            arr_size: [],
            arr_image: [],
            otherProducts: [],
            size_guide: '',
            default_style: 0,
            default_size: 0,
            default_name_style: 0,
            default_name_size: 0,
            id_style: 0,
            id_size: 0,
            loading: false,
        }

        this.arr = [];
        global.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.navigation.state.params;
        getDetailProducts(id)
            .then(resJSON => {
                const { detail,kieu_dang,chat_lieu,arr_kieu_dang,arr_size,arr_image,otherProducts,size_guide, default_name_style, default_name_size,id_style,id_size, error} = resJSON;
                if (error == false) {
                    this.setState({
                        detail: detail,
                        kieu_dang: kieu_dang,
                        chat_lieu: chat_lieu,
                        arr_kieu_dang: arr_kieu_dang,
                        arr_size: arr_size,
                        arr_image: arr_image,
                        size_guide: size_guide,
                        default_name_size: default_name_size,
                        default_name_style: default_name_style,
                        id_size: id_size,
                        id_style: id_style,
                        loaded: true,
                        otherProducts: otherProducts,
                        loading: true,
                    }); 
                }
            }).catch(err => {
                // this.setState({ loaded: true });  
            }); 
    }
    gotoBack(){
        this.props.navigation.goBack();
    }
    onRefresh() {
        this.arr = [];
        this.setState({
            listRest: []
        });
    }

    showImages(index){
        const image = this.state.arr_image[index].image.replace('/large/', '/original/');
        Image.getSize(image, (w, h) => {
            var imageWidth = width - 40;
            var imageHeight = imageWidth*h/w;
            this.setState({
                imageWidth, imageHeight
            });
        });
        this.setState({ image, modalVisible: true });   
    }
   
    imgModalSave(){
        const uri = this.state.image;
        var filename = uri.substring(uri.lastIndexOf('/')+1);
        let fileUri = FileSystem.documentDirectory + filename;
        FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
            this.saveFile(uri);
            Alert.alert('Thông báo', 'Lưu ảnh thành công');
        })
        .catch(error => {
            console.error(error);
        })
    }

    saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    }


    detailProduct(id){
        this.props.navigation.goBack();
        global.onRefresh();
        this.props.navigation.navigate('DetailProductScreeen',{ id: id });
    }

    minus(){
        if(parseInt(this.state.amount)<=1){
            var a = 1;
        }else{
            a = parseInt(this.state.amount)-1;
        }
        var min = a.toString();
        
        this.setState({
            'amount' : min
        });
        console.log(a);
    }
    plus(){ 
        a = parseInt(this.state.amount)+1;
        var add = a.toString();
        this.setState({
            'amount' : add
        });
        console.log(a);
    }
    setAmount=(value, index)=>{
        var min = value.toString();
        this.setState(
          {
            "amount": min
          },
          () => {
            // here is our callback that will be fired after state change.
            // Alert.alert(this.state.city);
            // this.getDistricts();
            // this.getAllShowrooms();
          }
        );
    }
    
    setChooseStyle(index, id, value){
        this.setState({
            'default_style' : index,
            'default_name_style': value,
            'id_style' : id,
        });
    }
    setChooseSize(index, id, value){
        this.setState({
            'default_size' : index,
            'default_name_size': value,
            'id_size' : id,
        });
    }


    setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
        })
    }
    setModalVisibleSize(visible) {
        this.setState({
            modalVisibleSize: visible,
        })
    }



    addCart(){
		if(this.state.id_size == 0){
			Alert.alert('Thông báo', 'Bạn vui lòng chọn size!');
			return false;
        }
        if(this.state.id_style == 0){
			Alert.alert('Thông báo', 'Bạn vui lòng chọn kiểu dáng!');
			return false;
        }
        

		if(this.state.amount < 1){
			Alert.alert('Thông báo', 'Bạn vui lòng nhập số lượng!');
			return false;
        }
        // Alert.alert(this.state.detail.id);

		getStorage('cart')
        .then(cart => {
			var tmp = [];
			var existID = false;
            if(cart != ''){
				var arrCart = JSON.parse(cart);
				arrCart.map(c => {
					if(c.id == this.state.id){
						c.quantity = parseInt(c.quantity) + parseInt(this.state.quantity);
						existID = true;
					}
					tmp.push(c);
				})
			}
			if(existID == false){
				tmp.push({
					id: this.state.detail.id,
					size: this.state.id_size,
                    style: this.state.id_style,
                    amount: this.state.amount,
				});
			}
			saveStorage('cart', JSON.stringify(tmp));
			this.gotoCart();
        })
        .catch(err => console.log(err));
	}

    gotoCart(){
        this.props.navigation.navigate('CartScreen');
    }
    
    buyNow(){
        saveStorage('cart', '');
        this.addCart();
    }

      
	 
    render() {
        const {navigation} = this.props;
    
        return(  
            <Container>
                {/* <HeaderBase page="list_products" title={'Sản phẩm'} navigation={navigation} /> */} 
                <ScrollView>
                    <View style={[MainStyle.slideImageProduct]}>
                        <TouchableOpacity style={[MainStyle.btnRa50,MainStyle.backDetailP]} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{color: '#FFFFFF',fontSize:35}]} />
                        </TouchableOpacity> 
                        <TouchableOpacity style={[MainStyle.btnRa50,MainStyle.addDetailP]} onPress={()=>this.gotoCart()}>
                            <Icon type="SimpleLineIcons" name="handbag" style={{ color: '#FFFFFF', fontSize: 25 }} />
                        </TouchableOpacity>
                        {this.state.loading && <Swiper 
                            index = {0}
                            onIndexChanged = {(index) => this.setState({position: index})} 
                            loop={true}
                            bounces={true}>
                            {this.state.arr_image.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => this.showImages(index)} style={[MainStyle.itemsSlideDetailProduct,{width:width, height: width*480/360}]}>
                                    <Image style={[MainStyle.itemsSlideDetailProduct,{width:width, height: width*480/360}]} source={{ uri:item.image}} />    
                                </TouchableOpacity> 
                            ))}
                        </Swiper>}
                        {/* <Swiper>
                            {this.state.arr_image.map((item, index) => {return (
                                <TouchableOpacity key={index} onPress={() => this.showImages(index)} style={[MainStyle.itemsSlideDetailProduct,{width:width, height: width*480/360}]}>
                                    <Image style={[MainStyle.itemsSlideDetailProduct,{width:width, height: width*480/360}]} source={{ uri:item.image}} />    
                                </TouchableOpacity> 
                            )})} 
                        </Swiper> */}
                        
                        
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <Text style={MainStyle.titleProduct}>{this.state.detail.name}</Text>
                        <Text style={MainStyle.titleHDetailProduct}>Giá: <Text style={[MainStyle.txtBlack, MainStyle.colorPriceProducts]}>{this.state.detail.price} đ</Text></Text>
                        <Text style={MainStyle.titleHDetailProduct}>Mã sản phẩm: <Text style={[MainStyle.txtBlack]}>{this.state.detail.code}</Text></Text>
                        <Text style={MainStyle.titleHDetailProduct}>Kiểu dáng: <Text style={MainStyle.txtBlack}>{this.state.kieu_dang}</Text></Text>
                        <Text style={MainStyle.titleHDetailProduct}>Chất liệu: <Text style={MainStyle.txtBlack}>{this.state.chat_lieu}</Text></Text>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <Text style={MainStyle.headerSlo}>Chọn kiểu dáng: <Text style={MainStyle.colorPriceProducts}>{this.state.default_name_style}</Text></Text>
                        <View style={MainStyle.vStyleProduct}>
                            {/* <Text style={[MainStyle.btnStylePro,MainStyle.btnBorderActive]}>12345</Text> */}
                            {this.state.arr_kieu_dang.map((item, index) => {return (
                                <TouchableOpacity key={index} onPress={()=>this.setChooseStyle(index,item.id,item.name)}>
                                    <Text key={index} style={[MainStyle.btnSizePro, { borderColor: this.state.default_style == index ? '#ff0700' : '#FFFFFF', borderWidth: 1 }]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )})}
                        </View>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <Text style={MainStyle.headerSlo}>Chọn kích cỡ: <Text style={MainStyle.colorPriceProducts}>{this.state.default_name_size}</Text></Text>
                        <View style={MainStyle.vStyleProduct}>
                            {this.state.arr_size.map((item, index) => {return (
                                <TouchableOpacity key={index} onPress={()=>this.setChooseSize(index,item.id,item.name)}>
                                    <Text key={index} style={[MainStyle.btnSizePro,{ borderColor: this.state.default_size == index ? '#ff0700' : '#FFFFFF', borderWidth: 1 }]}>{item.name}</Text>
                                </TouchableOpacity>
                            )})}
                        </View>
                        <TouchableOpacity onPress={()=>this.setModalVisibleSize()} style={MainStyle.hdSize}><Text style={MainStyle.txtHD }>Hướng dẫn chọn kích cỡ</Text></TouchableOpacity>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <View style={MainStyle.vNumberProduct}>
                            <View>
                                <Text style={[MainStyle.headerSlo,{height: 30, lineHeight: 30,}]}>Số lượng cần mua: </Text>
                            </View>
                            <View style={MainStyle.touchNumbers}>
                                <TouchableOpacity onPress={()=> this.minus()} style={MainStyle.minusNumbers}><Text>-</Text></TouchableOpacity>
                                <TextInput
                                    style={{height: 30, textAlign: 'center', width: 30, borderWidth: 1, borderColor: '#ff0700', borderRadius: 3}}
                                    placeholder='1'
                                    value={this.state.amount}
                                    onChangeText={text => this.setAmount(text)}
                                    keyboardType={'numeric'}
                                    />  
                                <TouchableOpacity onPress={()=> this.plus()} style={MainStyle.minusNumbers}><Text>+</Text></TouchableOpacity>
                            </View> 

                        </View> 
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Image style={{marginRight: 15,}} source={require('../../assets/icon_car.png')}/>
                            <Text style={[MainStyle.headerSlo,{lineHeight: 30}]}>
                                Miễn phí vận chuyển cho đơn hàng từ <Text style={[MainStyle.colorPriceProducts,MainStyle.headerSlo,{lineHeight: 30}]}> 400.000 đ</Text>
                            </Text>
                        </View>
                    </View>  
                    <View style={MainStyle.tDetailProduct}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            <AutoHeightWebView
                                customScript={`document.body.style.background = 'transparent';`}
                                style={{ width: width-40 }}
                                files={[{
                                    href: global.BASE_URL+'/templates/default/css/app.css?v=333',
                                    type: 'text/css',
                                    rel: 'stylesheet'
                                }]}
                                source={{ html: this.state.detail.description }}
                                zoomable={false}
                            />
                        </View>
                    </View>
                    
                    <View style={MainStyle.vHeaderOtherNews}>
                        <Text style={MainStyle.txtOtherNews}>Sản phẩm cùng loại</Text>
                        <View style={[MainStyle.brBottomOther,{width: 150}]}></View>
                    </View>
                    <View style={[MainStyle.otherDProducts,{marginTop: 20}]}>
                        {this.state.otherProducts.map((item, index) => {return (
                            <TouchableOpacity key={item.id} style={MainStyle.itemProducts} onPress={()=>this.detailProduct(item.id)}> 
                                <View style={MainStyle.vImgItemPro}>
                                    <Image style={{width: width-40, height: (width-40)*1.5}} source={{ uri: item.image}}/>
                                </View>
                                <View style={MainStyle.bodyItemPro}>
                                    <Text style={MainStyle.nameItemProducts}>{item.name}</Text>
                                    <Text style={MainStyle.priceItemProducts}>{item.price} đ</Text>
                                </View>
                            </TouchableOpacity> 
                        )})} 
                    </View>
                    
                </ScrollView>
                <View style={MainStyle.quickTaskBottom}>
                        <TouchableOpacity style={MainStyle.quickTouch} onPress={()=>this.addCart()}>
                            <Text style={[MainStyle.quickTouchText]}>Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.quickTouch,{backgroundColor: '#000000'}]} onPress={()=>this.buyNow()}>
                            <Text style={[MainStyle.quickTouchText]}>Mua ngay</Text>
                        </TouchableOpacity>
                    </View>
                <Modal 
                    presentationStyle="overFullScreen"
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}>
                    <View style={[MainStyle.tContainerImgModal,MainStyle.modalBgBlack]}>
                        <View style={[MainStyle.tModalBody, { width: width - 40,marginLeft: 20,marginBottom: 25,alignItems: 'center'}]}> 
                            <ScrollView>
                                <Image style={{width: this.state.imageWidth, height: this.state.imageHeight, alignItems: 'center',}} source={{ uri: this.state.image }} />
                            </ScrollView>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: "row", width: width-40, marginLeft: 20,}}>
                            <TouchableOpacity style={MainStyle.tBtnModalSave}
                                onPress={()=>this.imgModalSave()}>
                                <Text style={[MainStyle.txtModal,MainStyle.txtModalB]}>Lưu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={MainStyle.tBtnModal}
                                onPress={()=>this.setState({modalVisible:false})}>
                                <Text style={[MainStyle.txtModal,MainStyle.txtModalW]}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </Modal> 


                {/* Popup hướng dẫn chọn size */}
                <Modal 
                    presentationStyle="overFullScreen"
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisibleSize}
                    onRequestClose={() => {}}>
                    <View style={[MainStyle.modalSizeGuide]}> 
                        <TouchableOpacity onPress={()=>this.setState({modalVisibleSize:false})} style={MainStyle.bgPopupScreen}></TouchableOpacity>
                        <ScrollView style={MainStyle.visibalPop}>
                            <AutoHeightWebView
                                customScript={`document.body.style.background = 'transparent';`}
                                style={{ width: width-80 }}
                                files={[{
                                    href: global.BASE_URL+'/templates/default/css/app.css?v=333',
                                    type: 'text/css',
                                    rel: 'stylesheet'
                                }]}
                                source={{ html: this.state.size_guide }}
                                zoomable={false}
                            />
                            {/* <HTML html={this.state.size_guide} imagesMaxWidth={Dimensions.get('window').width -80} /> */}
                            {/* <TouchableOpacity style={MainStyle.tBtnModal} onPress={()=>this.setState({modalVisibleSize:false})}>
                                <Text style={[MainStyle.txtModal,MainStyle.txtModalW]}>Đóng</Text>
                            </TouchableOpacity> */}
                        </ScrollView>
                    </View>
                </Modal>

            </Container>
        );
    }
}
 
 