import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, Alert,FlatList } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import { getAllProducts } from '../../src/api/apiProducts';

export default class AllProducts extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            page: 1,
			refreshing: false,
			loading: false,
        }

        this.arr = []; 
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }
    detailProduct(id){
        this.props.navigation.navigate('DetailProductScreeen',{ id: id });
    }

    makeRemoteRequest(){
        this.setState({ loading: true });
        // console.log(this.state.page);
        getAllProducts(this.state.page)
        .then(resJSON => {
            const { list, category_name, error} = resJSON;
            
            if (error == false) {
                this.setState({
                    list: list,
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

	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="list_products" title={'Sản phẩm'} navigation={navigation} />
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
                        <View style={[MainStyle.hasIconFilter,{marginRight: 35}]}>
                            <Text style={MainStyle.txtFilter}>Giá
                                <Icon type="MaterialCommunityIcons" name="swap-vertical" style={{color: '#000000', fontSize: 20 }} />
                            </Text>
                        </View>
                        <View style={MainStyle.hasIconFilter}>
                            <Text style={MainStyle.txtFilter}>Lọc sản phẩm
                                <Icon type="AntDesign" name="filter" style={{positon: 'absolute',color: '#000000', fontSize: 20 }} />
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{paddingBottom: 120}}> 
                    <View style={MainStyle.marginBottomFooter}>
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
 