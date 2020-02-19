import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList ,Picker,TextInput} from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import { getSearchProducts } from '../../src/api/apiProducts';

export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            search : '',
            page : 1,
        }

        this.arr = [];
    }
 
    componentDidMount() {
        this.makeRemoteRequest()
    }

    makeRemoteRequest = () => {
        getSearchProducts(this.state.page, this.state.search)
            .then(resJSON => {
                const { list,count, error} = resJSON;
                if (error == false) {
                    this.setState({
                        list: list,
                        refreshing: false,
                        loading: false,
                        count: count,
                    });
                
                }else{
                    this.setState({
                        count: 0,
                    });
                }
            }).catch(err => {
                // this.setState({ loaded: true });  
        }); 
    }

    setSearch=(value, index)=>{
        var search = value.toString();
        this.setState(
          {
            "search": search,
            "page": 1,
          },
          () => {
            // here is our callback that will be fired after state change.
            this.makeRemoteRequest();
          }
        );
    }


    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        },
        () => {
            this.makeRemoteRequest();
        });
        // console.log(this.state.page);
    };
    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    
    detailProduct(id){
        this.props.navigation.navigate('DetailProductScreeen',{ id: id });
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="search" title={'Tìm kiếm'} navigation={navigation} />
                <View style={MainStyle.boxSearch}>
                    <View style={MainStyle.vInpSearch}>
                        <TouchableOpacity style={MainStyle.iconTouchSearch}>
                            <Icon type="FontAwesome" name="search" style={[{fontSize:25, color: '#777777'}]} />
                        </TouchableOpacity>
                        {/* <TextInput
                            style={MainStyle.inputSearch}
                            onChangeText={text => onChangeText(text)}
                            value=''
                        /> */}
                        <TextInput
                            style={MainStyle.inputSearch}
                            placeholder='Nhập sản phẩm cần tìm kiếm'
                            // onChangeText={(search) => this.setState({search})}
                            onChangeText={search => this.setSearch(search)}
                            value={this.state.search}
                        />
                    </View>
                </View>
                <View style={[MainStyle.pageShowrooms]}>
                    <View style={{paddingBottom: 88}}> 
                        <View style={MainStyle.marginBottomFooter}>
                            { this.state.count > 0 ? 
                                <FlatList style={MainStyle.defaultContainerNew}
                                    data={this.state.list}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity key={item.id} onPress={()=>this.detailProduct(item.record_id)}> 
                                            <View style={MainStyle.infoItemCart}>
                                                <View style={MainStyle.imgItemCart}>
                                                    {/* <Image style={MainStyle.imgCart} source={require("../../assets/cart_img_product.png")} /> */}
                                                    <Image style={MainStyle.imgCart} source={{uri:item.image }} />
                                                </View>
                                                <View style={[MainStyle.rightInfoItem]}>
                                                    <View style={[MainStyle.lineTopItemCart,{marginBottom: 25}]}>
                                                        <View style={{width: '70%'}}><Text style={MainStyle.tProductItemCart}>{item.name}</Text></View>
                                                        <View style={{width: '30%',alignItems: 'flex-end'}}><Text style={[MainStyle.fPriceItemCart]}>{item.price} đ</Text></View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    // numColumns={6}
                                    contentContainerStyle={MainStyle.containerListProducts}
                                    ListFooterComponent={this.renderFooter}     
                                    refreshing={this.state.refreshing}
                                    keyExtractor={item => item.id}
                                    onEndReached={this.handleLoadMore}
                                    onEndReachedThreshold={0.5}
                                />
                                :
                                <View><Text></Text></View>
                            }
                        </View>
                    </View>
                </View>
                <FooterBase navigation={navigation} page="muster" />
            </Container>
        );
    }
}
 