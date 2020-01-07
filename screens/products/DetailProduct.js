import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView ,TextInput,Dimensions,Modal, Alert} from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import Swiper from "react-native-swiper";
import { Container, Content, CheckBox, Icon } from "native-base";
import {getDetailProducts} from './../../src/api/apiProducts';

const { width } = Dimensions.get('window');
const { heigth } = Dimensions.get('window');


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
            detail: '',
            modalVisible: false,
            imageWidth: width - 30,
            imageHeight: 0,
            arr_kieu_dang: [],
            arr_size: [],
            arr_image: [],
            otherProducts: [],
        }

        this.arr = [];
        global.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.navigation.state.params;
        getDetailProducts(id)
            .then(resJSON => {
                const { detail,kieu_dang,chat_lieu,arr_kieu_dang,arr_size,arr_image,otherProducts, error} = resJSON;
                
                if (error == false) {
                    this.setState({
                        detail: detail,
                        kieu_dang: kieu_dang,
                        chat_lieu: chat_lieu,
                        arr_kieu_dang: arr_kieu_dang,
                        arr_size: arr_size,
                        arr_image: arr_image,
                        loaded: true,
                        otherProducts: otherProducts,
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
        const image = this.state.arr_image[index].image.replace('/original/', '/original/');
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
    onRefresh() {
        this.arr = [];
        this.setState({
            listRest: []
        });
    }

	 
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                {/* <HeaderBase page="list_products" title={'Sản phẩm'} navigation={navigation} /> */}
                <ScrollView>
                    <View style={MainStyle.slideImageProduct}>
                            <TouchableOpacity style={[MainStyle.btnRa50,MainStyle.backDetailP]} onPress={() => this.gotoBack()}>
                                <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{color: '#FFFFFF',fontSize:35}]} />
                            </TouchableOpacity> 
                            <TouchableOpacity style={[MainStyle.btnRa50,MainStyle.addDetailP]}>
                                <Icon type="SimpleLineIcons" name="handbag" style={{ color: '#FFFFFF', fontSize: 27 }} />
                            </TouchableOpacity>
                        {/* <View style={MainStyle.taskDetailP}>
                            <TouchableOpacity style={[MainStyle.btnRa50,MainStyle.backDetailP]} onPress={() => this.gotoBack()}>
                                <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{color: '#FFFFFF',fontSize:35}]} />
                            </TouchableOpacity> 
                            <TouchableOpacity style={[MainStyle.btnRa50,MainStyle.addDetailP]}>
                                <Icon type="SimpleLineIcons" name="handbag" style={{ color: '#FFFFFF', fontSize: 27 }} />
                            </TouchableOpacity>
                        </View> */}
                        <Swiper>
                            {this.state.arr_image.map((item, index) => {return (
                                <TouchableOpacity key={item.id} onPress={() => this.showImages(index)}>
                                    <Image style={MainStyle.itemsSlideDetailProduct} source={{ uri:item.image}} />    
                                </TouchableOpacity>
                            )})} 
                        </Swiper>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <Text style={MainStyle.titleProduct}>{this.state.detail.name}</Text>
                        <Text style={MainStyle.titleHDetailProduct}>Giá: <Text style={[MainStyle.txtBlack, MainStyle.colorPriceProducts]}>{this.state.detail.price} đ</Text></Text>
                        <Text style={MainStyle.titleHDetailProduct}>Mã sản phẩm: <Text style={[MainStyle.txtBlack]}>{this.state.detail.code}</Text></Text>
                        <Text style={MainStyle.titleHDetailProduct}>Kiểu dáng: <Text style={MainStyle.txtBlack}>{this.state.kieu_dang}</Text></Text>
                        <Text style={MainStyle.titleHDetailProduct}>Chất liệu: <Text style={MainStyle.txtBlack}>{this.state.chat_lieu}</Text></Text>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <Text style={MainStyle.headerSlo}>Chọn kiểu dáng: <Text style={MainStyle.colorPriceProducts}>Slim-fit</Text></Text>
                        <View style={MainStyle.vStyleProduct}>
                            <Text style={[MainStyle.btnStylePro,MainStyle.btnBorderActive]}>12345</Text>
                            {this.state.arr_kieu_dang.map((item, index) => {return (
                                <Text key={index} style={MainStyle.btnStylePro}>{item.name}</Text>
                            )})}
                        </View>
                    </View>
                    <View style={MainStyle.tDetailProduct}>
                        <Text style={MainStyle.headerSlo}>Chọn kích cỡ: <Text style={MainStyle.colorPriceProducts}>Chọn kích cỡ</Text></Text>
                        <View style={MainStyle.vStyleProduct}>
                            {this.state.arr_size.map((item, index) => {return (
                                <Text key={index} style={MainStyle.btnStylePro}>{item.name}</Text>
                            )})}
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
                        <View style={{flexDirection: 'row'}}>
                            <Image style={{marginRight: 15}} source={require('../../assets/icon_car.png')}/>
                            <Text style={[MainStyle.headerSlo,{lineHeight: 45,}]}>
                                Miễn phí vận chuyển cho đơn hàng từ <Text style={MainStyle.colorPriceProducts}>400.000 đ</Text>
                            </Text>
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
                    <View style={MainStyle.quickTaskBottom}>
                        <TouchableOpacity style={MainStyle.quickTouch}>
                            <Text style={[MainStyle.quickTouchText]}>Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyle.quickTouch,{backgroundColor: '#000000'}]}>
                            <Text style={[MainStyle.quickTouchText]}>Mua ngay</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Modal 
                    presentationStyle="overFullScreen"
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}>
                    <View style={MainStyle.tContainerImgModal}>
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
            </Container>
        );
    }
}
 