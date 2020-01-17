import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, Alert, FlatList } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import { getProductsInCate } from '../../src/api/apiProducts';

export default class ProductsInCate extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            allow_more: true,
            loading: true,
            page: 1,
            list: [],
            isOrderPrice: true, // tăng dần
            products_sort: 0,
        }

        this.arr = []; 
    }

    componentDidMount() {
        const { id, type } = this.props.navigation.state.params;
        this.makeRemoteRequest();
        
    }

    makeRemoteRequest = () => {
        this.arr = [];
        this.setState({ loading: true });
        const { id, type } = this.props.navigation.state.params;
        getProductsInCate(id, type, this.state.products_sort, this.state.page)
            .then(resJSON => {
                const { list, category_name, error} = resJSON;
                
                if (error == false) {
                    this.setState({
                        list: list,
                        category_name : category_name,
                        refreshing: false,
                        loading: false,
                    });
                
                }
            }).catch(err => {
                // this.setState({ loaded: true });  
        }); 
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

    setOrderPrice(){
        this.setState({
            isOrderPrice: !this.state.isOrderPrice,   
        });
        if(this.state.isOrderPrice == true){
            this.setState({
                products_sort: 1, // tăng dần
            });
        }else{
            this.setState({
                products_sort: 2, // tăng dần
            });   
        }
        this.makeRemoteRequest();
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="list_products" title={this.state.category_name} navigation={navigation} />
                <View style={MainStyle.filterProducts}>
                    <View style={MainStyle.filterLeft}>
                        <View>
                            <Text style={MainStyle.txtFilter}>Phổ biến</Text>
                        </View>
                        <View style={{marginLeft: 35}}>
                            <Text style={MainStyle.txtFilter}>Sale</Text>
                        </View>
                    </View>
                    <View style={MainStyle.filterRight}>
                        <TouchableOpacity style={[MainStyle.hasIconFilter,{marginRight: 35}]} onPress={()=>this.setOrderPrice()}>
                            <Text style={MainStyle.txtFilter}>Giá
                                <Icon type="MaterialCommunityIcons" name="swap-vertical" style={{color: '#000000', fontSize: 20 }} />
                            </Text>
                        </TouchableOpacity>
                        <View style={MainStyle.hasIconFilter}>
                            <Text style={MainStyle.txtFilter}>Lọc sản phẩm
                                <Icon type="AntDesign" name="filter" style={{positon: 'absolute',color: '#000000', fontSize: 20 }} />
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{paddingBottom: 120}}>
                    <View style={MainStyle.marginBottomFooter}> 
                        {/* {this.state.list.map((item, index) => {return (
                            <TouchableOpacity key={item.id} style={MainStyle.itemProducts} onPress={()=>this.detailProduct(item.id)}> 
                                <View style={MainStyle.vImgItemPro}>
                                    <Image style={{width: '100%', height:500}}  source={{uri: item.image}} />
                                </View>
                                <View style={MainStyle.bodyItemPro}>
                                    <Text style={MainStyle.nameItemProducts}>{item.name}</Text>
                                    <Text style={MainStyle.priceItemProducts}>{item.price} đ</Text>
                                </View>
                            </TouchableOpacity>
                        )})}   */}
                        <FlatList style={MainStyle.defaultContainerNew}
                            data={this.state.list}
                            renderItem={({ item }) => (
                                <TouchableOpacity key={item.id} style={MainStyle.itemProducts} onPress={()=>this.detailProduct(item.id)}> 
                                    <View style={MainStyle.vImgItemPro}>
                                        <Image style={{width: '100%', height:500}}  source={{uri: item.image}} />
                                    </View>
                                    <View style={MainStyle.bodyItemPro}>
                                        <Text style={MainStyle.nameItemProducts}>{item.name}</Text>
                                        <Text style={MainStyle.priceItemProducts}>{item.price} đ</Text>
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
                    </View>
                </View>
                

                <FooterBase navigation={navigation} page="muster"  />
            </Container>
        );
    }
}
 