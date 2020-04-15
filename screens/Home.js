import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  Dimensions
} from "react-native";
import { Container, Icon, CheckBox } from "native-base";
import Swiper from "react-native-swiper";
import MainStyle from "../styles/MainStyle.js";
import { ScrollView } from "react-native-gesture-handler";
import FooterBase from './template/FooterBase';
import HeaderBase from './template/HeaderBase';
import {getSlidesHome, getOneBanner, getCateIdHome, cateBigHome} from './../src/api/apiHome';
import {getTotalNotifications} from './../src/api/apiUser';
import { ProductsInCate } from './../src/api/apiProducts';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;


import saveStorage from './api/saveStorage';
import getStorage from './api/getStorage';


export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
 
  constructor(props) { 
    super(props);
    this.state = {
      user_id: '',
      listSlide: [],
      oneBanner: [],
      listCate: [],
      img_top_sales: '',
      listCateBig: '',
      heightSwiper: '',
      countNotify: '',
      // token:'',
      // keyboardAvoidingViewKey:'keyboardAvoidingViewKey'
  };  

  }

  gotoNews(){
    this.props.navigation.navigate('NewsScreen');
  }
  componentDidMount(){
    this.getSlides();
    this.getOneBanner();
    this.getCateIdHome(); 
    this.cateBigHome(); // áo, quần, bộ quần áo
  }

  


  
  
  getSlides = () => {
    // this.setState({ loading: true });
    getSlidesHome()
    .then(resJSON => {
        const { list, error,widthSwiper,heightSwiper } = resJSON;
        if (error == false) {
            this.setState({
              listSlide: list,  
              error: false || null,  
              heightSwiper: heightSwiper/widthSwiper,
            });  
        } else {
            this.setState({ loading: false, refreshing: false });
        }

    }).catch(err => {
        // this.setState({ loading: false }); 
    });
  }

  getOneBanner = () => {
    getOneBanner()
    .then(resJSON => {
        const { list, error } = resJSON;
        if (error == false) {
            this.setState({
              oneBanner: list,  
              error: false || null,  
            });    
        } else {
            this.setState({ loading: false, refreshing: false });
        }

    }).catch(err => {
        // this.setState({ loading: false }); 
    });
  }
  getCateIdHome= () => {
    getCateIdHome()
    .then(resJSON => {
        const { list, error,img_top_sales } = resJSON;
        if (error == false) {
            this.setState({  
              listCate: list,  
              img_top_sales: img_top_sales,
              error: false || null,  
            });
        } else {
            this.setState({ loading: false, refreshing: false });
        }

    }).catch(err => {
        // this.setState({ loading: false }); 
    });
  }
  cateBigHome= () => {
    cateBigHome()
    .then(resJSON => {
        const { list, error } = resJSON;
        if (error == false) {
            this.setState({
              listCateBig: list,  
              error: false || null,  
            });  
        } else {
            this.setState({ loading: false, refreshing: false });
        }
 
    }).catch(err => {

    });
  }

  listProductsInCate(id, name, id_material, id_style){
    var type = 'all';
    this.props.navigation.navigate('ListProductsInCateScreeen',{ id: id, name: name,id_material: id_material, id_style:id_style, type: type });
  }
  gotoProducts(){
    this.props.navigation.navigate('AllProductsScreen');
  }
  gotoVideos(){
    this.props.navigation.navigate('ListVideosAll');
  }
  gotoShowrooms(){
    this.props.navigation.navigate('ListShowroomsScreen');
  }
  SalesProducts(){
    this.props.navigation.navigate('SalesProductsScreen');
  }
  sellingProducts(){
    this.props.navigation.navigate('SalesProductsScreen');
  }






  render() { 
    const { navigation, page, title, heading } = this.props;

    return (
      <Container>
        <HeaderBase page="home" title={'Trang chủ'} navigation={navigation} />
        <ScrollView>
          <View style={[MainStyle.slideHome,{width: ScreenWidth, height:ScreenWidth*this.state.heightSwiper}]}>
              <Swiper autoplay={true} autoplayTimeout={4}>
                  {this.state.listSlide.map((item, index) => {return (
                    <View key={index}>
                      <Image key={index} style={[MainStyle.itemsSlideHome,{ width: ScreenWidth, height: ScreenWidth*item.heightImage/item.widthImage}]} source={{uri: item.image}} />
                    </View>
                  )})}
                {/* <Image style={MainStyle.itemsSlideHome} source={require("../assets/image_slide.png")} /> */}
              </Swiper> 
          </View> 
         
          <View style={MainStyle.cateHome} >
              <TouchableOpacity style={MainStyle.itemCateHome} onPress={()=> this.gotoProducts()}>
                <View style={MainStyle.iconCenter}>
                  <Image style={MainStyle.iconCateHome} source={require("../assets/icon_products.png")} />
                </View>
                <Text style={MainStyle.textCateHome}>Sản phẩm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={MainStyle.itemCateHome} onPress ={()=> this.SalesProducts()}>
                <View style={MainStyle.iconCenter}>
                  <Image style={MainStyle.iconCateHome} source={require("../assets/icon_sale.png")} />
                </View>
                <Text style={MainStyle.textCateHome}>Giảm giá</Text>
              </TouchableOpacity>
              <TouchableOpacity style={MainStyle.itemCateHome} onPress={()=>this.gotoShowrooms()}> 
                <View style={MainStyle.iconCenter}>
                  <Image style={MainStyle.iconCateHome} source={require("../assets/icon_showrooms.png")} />
                </View>
                <Text style={MainStyle.textCateHome}>Cửa hàng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={MainStyle.itemCateHome} onPress={()=>this.gotoVideos()}>
                <View style={MainStyle.iconCenter}>
                  <Image style={MainStyle.iconCateHome} source={require("../assets/icon_youtube.png")} />
                </View>
                <Text style={MainStyle.textCateHome}>Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={MainStyle.itemCateHome} onPress={()=>this.gotoNews()}>
                <View style={MainStyle.iconCenter}>
                  <Image style={MainStyle.iconCateHome} source={require("../assets/icon_news.png")} />
                </View>
                <Text style={MainStyle.textCateHome}>Tin tức</Text>
              </TouchableOpacity>
          </View>

          {this.state.oneBanner.map((item, index) => {return (
            <View key={index} style={[MainStyle.bannerHome,{width: ScreenWidth, height:ScreenWidth*item.heightImage/item.widthImage }]}>
              {/* <Image style={MainStyle.itemsBannerHome} source={require("../assets/banner_home.png")} /> */}
              <Image style={[MainStyle.itemsBannerHome,{width: ScreenWidth, height:ScreenWidth*item.heightImage/item.widthImage }]} source={{uri: item.image}} />
            </View>
          )})}


          <View style={[MainStyle.cateSmallHome]}>
            {this.state.listCate.map((item, index) => {return (
                <TouchableOpacity key={index} style={[MainStyle.itemsCateSmallHome]} onPress={()=>this.listProductsInCate(item.id,item.name,item.id_material, item.id_style)}>
                  <View style={MainStyle.viewSmallHome}>
                    {/* <Image style={MainStyle.imgSmallHome} source={require("../assets/image_cate_small.png")} /> */}
                    <Image style={[MainStyle.imgSmallHome]} source={{uri: item.image}} />
                  </View>
                  <View style={MainStyle.bodySmallHome}>
                    <Text style={MainStyle.titleSmall}>{item.name}</Text>
                    <Text style={MainStyle.viewAll}>Xem tất cả sản phẩm ></Text>
                  </View>
                </TouchableOpacity>
            )})}
            
            <TouchableOpacity style={MainStyle.itemsCateSmallHome} onPress={()=>this.sellingProducts()}>
              <View style={MainStyle.viewSmallHome}>
                { 
                  this.state.img_top_sales !='' ? 
                  <Image style={MainStyle.imgSmallHome} source={{uri: this.state.img_top_sales}} />
                
                  :
                  <Image style={MainStyle.imgSmallHome} source={require("../assets/image_cate_small.png")} />
                }
                
              </View>
              <View style={MainStyle.bodySmallHome}>
                <Text style={MainStyle.titleSmall}>Top bán chạy</Text>
                <Text style={MainStyle.viewAll}>Xem tất cả sản phẩm ></Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={MainStyle.lineBlack}>
            <View style={MainStyle.itemsLine}></View>
            <View style={MainStyle.itemsLine}></View>
          </View>

          <View style={[MainStyle.cateBigHome,{marginBottom: 65}]}>
            
            <FlatList  
                    data={this.state.listCateBig}   
                    renderItem={({ item }) => (
                      <View key={item.id} style={MainStyle.itemBigHome} >
                        <View style={[MainStyle.imgBigHome,{width: ScreenWidth, height:ScreenWidth*item.heightImage/item.widthImage }]}>
                          {/* <Image style={MainStyle.imgBigHome} source={require("../assets/image_cate_big.png")} /> */}
                          <Image style={[MainStyle.imgBigHome,{width: ScreenWidth, height:ScreenWidth*item.heightImage/item.widthImage }]} source={{ uri: item.image}} />
                        </View>
                        <View style={MainStyle.bodyBigHome}>
                          <Text style={MainStyle.titleBig}>{item.name} Vulcano</Text>
                          <TouchableOpacity onPress={()=>this.listProductsInCate(item.id,item.name)}><Text style={MainStyle.viewNow}>Xem thêm</Text></TouchableOpacity>
                        </View>
                      </View>
                    )}
                    keyExtractor={item => item.id}
                  />
            
              {/* <View style={MainStyle.itemBigHome}>
                <View style={MainStyle.imgBigHome}>
                  <Image style={MainStyle.imgBigHome} source={require("../assets/image_cate_big.png")} />
                </View>
                <View style={MainStyle.bodyBigHome}>
                  <Text style={MainStyle.titleBig}>Top bán chạy</Text>
                  <Text style={MainStyle.viewNow}>Xem thêm</Text>
                </View>
              </View> */}
          </View>
        </ScrollView>
        <FooterBase page="home" navigation={navigation}/>
      </Container>


    );
  }
}
