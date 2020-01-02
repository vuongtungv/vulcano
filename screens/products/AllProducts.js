import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';
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
            allow_more: true,
            loading: true,
            list: [],
        }

        this.arr = []; 
    }

    componentDidMount() {
        getAllProducts()
            .then(resJSON => {
                const { list, category_name, error} = resJSON;
                
                if (error == false) {
                    this.setState({
                        list: list,
                        loaded: true,
                    });
                
                }
            }).catch(err => {
                // this.setState({ loaded: true });  
            }); 
    }
    detailProduct(id){
        this.props.navigation.navigate('DetailProductScreeen',{ id: id });
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
                    {this.state.list.map((item, index) => {return (
                        <TouchableOpacity key={item.id} style={MainStyle.itemProducts} onPress={()=>this.detailProduct(item.id)}> 
                            <View style={MainStyle.vImgItemPro}>
                                <Image style={{width: '100%', height:500}}  source={{uri: item.image}} />
                            </View>
                            <View style={MainStyle.bodyItemPro}>
                                <Text style={MainStyle.nameItemProducts}>{item.name}</Text>
                                <Text style={MainStyle.priceItemProducts}>{item.price} đ</Text>
                            </View>
                        </TouchableOpacity>
                    )})}  
                </ScrollView>

                <FooterBase navigation={navigation} page="muster"  />
            </Container>
        );
    }
}
 