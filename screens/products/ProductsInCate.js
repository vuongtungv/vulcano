import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, Alert, FlatList,Modal } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import { getProductsInCate, filterArray } from '../../src/api/apiProducts';
import { addListener } from 'expo/build/Updates/Updates';
import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';

export default class ProductsInCate extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            allow_more: true,
            loading: true,
            type : '',
            page: 1,
            list: [],
            isOrderPrice: true, // tăng dần
            products_sort: 0,
            modalFilter: false,
            listNameCateLevel1: [],
            listStyles: [],
            listColors: [],
            listMaterials: [],
            listSizes: [],
            listPrice: [],
            fill_id_cate: '',
            fill_id_material: '',
            fill_id_style: '',
            fill_id_color: '',
            fill_id_size: '',
            fill_id_price: '',
            fill_sales: false,
            fill_famous: false,
        }

        this.arr = [];
        global.onRefresh = this.onRefresh.bind(this);
    }

    componentWillMount(){
        const { id,name,id_material, id_style, type } = this.props.navigation.state.params;
        
        if(id_material!='' && this.state.fill_id_material==''){
        
            this.setState({ fill_id_material: id_material });
        }else{
            this.setState({ fill_id_material: '' });
        }
    
        if(id_style!='' && this.state.fill_id_style==''){
            this.setState({ fill_id_style: id_style }); 
        }else{
            this.setState({ fill_id_style: '' }); 
        }
    }

    componentDidMount() {
        this.makeRemoteRequest();
        this.filterArray();
        
    }

    filterArray = () => {
        this.arr = [];
        this.setState({ loading: true });
        const { id,name,id_material, id_style, type } = this.props.navigation.state.params;

        this.setState({ type: type});
        // console.log(this.state.type);
        filterArray(id)
            .then(resJSON => {
                const { listNameCateLevel1,listStyles,listColors,listMaterials,listSizes, listPrice, error} = resJSON;
                
                if (error == false) {
                    this.setState({
                        listNameCateLevel1: listNameCateLevel1,
                        listStyles: listStyles,
                        listColors: listColors,
                        listMaterials: listMaterials,
                        listSizes: listSizes,
                        listPrice: listPrice,
                        refreshing: false,
                        loading: false,
                    });
                
                }
            }).catch(err => {
                // this.setState({ loaded: true });  
        }); 
    }
    
    makeRemoteRequest = () => {
        this.arr = [];
        this.setState({ loading: true });
        const { id,name,id_material, id_style, type } = this.props.navigation.state.params;
    
    
        products_sort = this.state.products_sort;


        var id_cate= this.state.fill_id_cate;
        var id_material_last= this.state.fill_id_material;
        var id_style_last= this.state.fill_id_style;
        var id_color= this.state.fill_id_color;
        var id_size= this.state.fill_id_size;
        var id_price= this.state.fill_id_price;
        var fill_sales = this.state.fill_sales;
        var fill_famous = this.state.fill_famous;

        getProductsInCate(id, type, products_sort, this.state.page, id_cate,id_material_last, id_style_last, id_color, id_size, id_price, fill_sales, fill_famous )
            .then(resJSON => {
                const { list,count, error} = resJSON;
                
                if (error == false) {
                    this.setState({
                        list: list,
                        category_name : name,
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
    
    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        },
        () => {
            this.makeRemoteRequest();
        });
        console.log(this.state.page);
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
                products_sort: 2, // giảm dần
            });   
        }
        this.makeRemoteRequest();
    }


    setModalFilter(visible) {
        this.setState({
            modalFilter: visible,
        })
    }


    setStateCate(id){
        this.setState({
            fill_id_cate: id,
        })
    }
    setStateMaterial(id){
        this.setState({
            fill_id_material: id,
        })
    }
    setStateStyle(id){
        this.setState({
            fill_id_style: id,
        })
    }
    setStateColor(id){
        this.setState({
            fill_id_color: id,
        })
    }
    setStateSize(id){
        this.setState({
            fill_id_size: id,
        })
    }
    setStatePrice(id){
        this.setState({
            fill_id_price: id,
        })
    }
    resetFilter(){
        this.setState({
            fill_id_cate: '',
            fill_id_material: '',
            fill_id_style: '',
            fill_id_color: '',
            fill_id_size: '',
            fill_id_price: '',
        })
    }
    applyFilter(){
        // this.props.navigation.goBack();
        this.setState({
            page: 1,
        })
        global.onRefresh();
        this.setState({modalFilter:false});
        // console.log(this.state.page);
        // this.props.navigation.navigate('ListProductsInCateScreeen', {id: id, type: type, products_sort: products_sort,page: page, id_cate : id_cate, id_material:id_material, id_style:id_style, id_color:id_color, id_size:id_size, id_price:id_price });
        this.makeRemoteRequest();
    }

    onRefresh() {
        this.arr = [];
    }

    setSales(){
        this.setState({
            fill_sales: !this.state.fill_sales,
        });
        this.makeRemoteRequest();
    }
    setFamous(){
        this.setState({
            fill_famous: !this.state.fill_famous,
        });
        this.makeRemoteRequest();
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="list_products" title={this.state.category_name} navigation={navigation} />
                <View style={{paddingBottom:55}}>
                    <View style={MainStyle.filterProducts}>
                        <View style={MainStyle.filterLeft}>
                            {
                                this.state.type == 'sales'
                                ? 
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity onPress={()=>this.setFamous()}>
                                        <Text style={MainStyle.txtFilter}>Phổ biến</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity style={{marginLeft: 35}} onPress={()=>this.setSales()}>
                                        <Text style={MainStyle.txtFilter}>Sale</Text>
                                    </TouchableOpacity> */}
                                </View>
                                :
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity onPress={()=>this.setFamous()}>
                                        <Text style={MainStyle.txtFilter}>Phổ biến</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft: 35}} onPress={()=>this.setSales()}>
                                        <Text style={MainStyle.txtFilter}>Sale</Text>
                                    </TouchableOpacity>
                                </View>
                            } 
                            
                        </View>
                        <View style={MainStyle.filterRight}>
                            <TouchableOpacity style={[MainStyle.hasIconFilter,{marginRight: 35}]} onPress={()=>this.setOrderPrice()}>
                                <Text style={MainStyle.txtFilter}>Giá
                                    <Icon type="MaterialCommunityIcons" name="swap-vertical" style={{color: '#000000', fontSize: 20 }} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={MainStyle.hasIconFilter} onPress={()=>this.setModalFilter()}>
                                <Text style={MainStyle.txtFilter}>Lọc sản phẩm
                                    <Icon type="AntDesign" name="filter" style={{positon: 'absolute',color: '#000000', fontSize: 20 }} />
                                </Text>
                            </TouchableOpacity>
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
                            { this.state.count >0 ?
                                <FlatList style={MainStyle.defaultContainerNew}
                                    data={this.state.list}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity key={item.id} style={MainStyle.itemProducts} onPress={()=>this.detailProduct(item.record_id)}> 
                                            <View style={MainStyle.vImgItemPro}>
                                                <Image style={{width: '100%', height:500}}  source={{uri: item.image}} />
                                                { item.is_sales == true ? 
                                                    <View style={{position: 'absolute', bottom: 20, left:20}}>
                                                        <Text style={MainStyle.bgSales}>{item.giam}</Text>
                                                    </View>
                                                    :
                                                    <View><Text></Text></View>
                                                }
                                                
                                            </View>
                                            <View style={MainStyle.bodyItemPro}>
                                                <Text style={MainStyle.nameItemProducts}>{item.name}</Text>
                                                { item.is_sales == true ? 
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Text style={[MainStyle.priceItemProducts, {textDecorationLine: 'line-through'}]}>{item.price_old} đ</Text>
                                                        <Text style={[MainStyle.priceItemProducts, {marginLeft: 20, color: '#ff0700'}]}>{item.price} đ</Text>
                                                    </View>  
                                                    :
                                                    <View><Text style={MainStyle.priceItemProducts}>{item.price} đ</Text></View>
                                                }
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
                    


                    {/* Modal filter */}
                    <Modal 
                        presentationStyle="overFullScreen"
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalFilter}
                        onRequestClose={() => {}}>
                        <View style={[MainStyle.modalSizeGuide]}> 
                            <TouchableOpacity onPress={()=>this.setState({modalFilter:false})} style={MainStyle.bgPopupScreen}></TouchableOpacity>
                            <ScrollView style={MainStyle.popFilter}>
                                <ScrollView style={MainStyle.heightScrollFilter}>
                                    { this.state.listNameCateLevel1 !='' ?
                                        <View style={{marginBottom: 10}}>
                                            <Text style={MainStyle.titleFilter}>Nhóm sản phẩm:</Text>
                                            <View style={MainStyle.listSelectItemFilter}>
                                                {this.state.listNameCateLevel1.map((item, index) => {return (
                                                    <TouchableOpacity key={index} style={[MainStyle.itemFilter,{ backgroundColor: this.state.fill_id_cate==item.id ? '#000000' : '#FFFFFF' }]} onPress={()=>this.setStateCate(item.id)}>
                                                        <Text style={[MainStyle.txtNameFilter,{ color: this.state.fill_id_cate==item.id ? '#FFFFFF' : '#000000' }]}>{item.name}</Text>
                                                    </TouchableOpacity>
                                                )})}
                                            </View>
                                        </View>
                                        :
                                        <View><Text></Text></View>
                                    }
                                    { this.state.listMaterials !='' ?
                                        <View style={{marginBottom: 10}}>
                                            <Text style={MainStyle.titleFilter}>Chất liệu:</Text>
                                            <View style={MainStyle.listSelectItemFilter}>
                                                {this.state.listMaterials.map((item, index) => {return (
                                                    <TouchableOpacity key={index} style={[MainStyle.itemFilter,{ backgroundColor: this.state.fill_id_material==item.id ? '#000000' : '#FFFFFF' }]} onPress={()=>this.setStateMaterial(item.id)}>
                                                        <Text style={[MainStyle.txtNameFilter,{ color: this.state.fill_id_material==item.id ? '#FFFFFF' : '#000000' }]}>{item.name}</Text>
                                                    </TouchableOpacity>
                                                )})}
                                            </View>
                                        </View>
                                        :
                                        <View><Text></Text></View>
                                    }
                                    { this.state.listStyles !='' ?
                                        <View style={{marginBottom: 10}}>
                                            <Text style={MainStyle.titleFilter}>Kiểu dáng:</Text>
                                            <View style={MainStyle.listSelectItemFilter}>
                                                {this.state.listStyles.map((item, index) => {return (
                                                    <TouchableOpacity key={index} style={[MainStyle.itemFilter,{ backgroundColor: this.state.fill_id_style==item.id ? '#000000' : '#FFFFFF' }]} onPress={()=>this.setStateStyle(item.id)}>
                                                        <Text style={[MainStyle.txtNameFilter,{ color: this.state.fill_id_style==item.id ? '#FFFFFF' : '#000000' }]}>{item.name}</Text>
                                                    </TouchableOpacity>
                                                )})}
                                            </View>
                                        </View>
                                        :
                                        <View><Text></Text></View>
                                    }
                                    { this.state.listColors !='' ?
                                        <View style={{marginBottom: 10}}>
                                            <Text style={MainStyle.titleFilter}>Màu sắc:</Text>
                                            <View style={MainStyle.listSelectItemFilter}>
                                                {this.state.listColors.map((item, index) => {return (
                                                    <TouchableOpacity key={index} style={[MainStyle.itemFilter,{ backgroundColor: this.state.fill_id_color==item.id ? '#000000' : '#FFFFFF' }]} onPress={()=>this.setStateColor(item.id)}>
                                                        <Text style={[MainStyle.txtNameFilter,{ color: this.state.fill_id_color==item.id ? '#FFFFFF' : '#000000' }]}>{item.name}</Text>
                                                    </TouchableOpacity>
                                                )})}
                                            </View>
                                        </View>
                                        :
                                        <View><Text></Text></View>
                                    }
                                    { this.state.listSizes !='' ?
                                        <View style={{marginBottom: 10}}>
                                            <Text style={MainStyle.titleFilter}>Kích cỡ:</Text>
                                            <View style={MainStyle.listSelectItemFilter}>
                                                {this.state.listSizes.map((item, index) => {return (
                                                    <TouchableOpacity key={index} style={[MainStyle.itemFilter,{ backgroundColor: this.state.fill_id_size==item.id ? '#000000' : '#FFFFFF' }]} onPress={()=>this.setStateSize(item.id)}>
                                                        <Text style={[MainStyle.txtNameFilter,{ color: this.state.fill_id_size==item.id ? '#FFFFFF' : '#000000' }]}>{item.name}</Text>
                                                    </TouchableOpacity>
                                                )})}
                                            </View>
                                        </View>
                                        :
                                        <View><Text></Text></View>
                                    }
                                    { this.state.listPrice !='' ?
                                        <View style={{marginBottom: 10}}>
                                            <Text style={MainStyle.titleFilter}>Giá tiền:</Text>
                                            <View style={MainStyle.listSelectItemFilter}>
                                                {this.state.listPrice.map((item, index) => {return (
                                                    <TouchableOpacity key={index} style={[MainStyle.itemFilter,{ backgroundColor: this.state.fill_id_price==item.id ? '#000000' : '#FFFFFF' }]} onPress={()=>this.setStatePrice(item.id)}>
                                                        <Text style={[MainStyle.txtNameFilter,{ color: this.state.fill_id_price==item.id ? '#FFFFFF' : '#000000' }]}>{item.name}</Text>
                                                    </TouchableOpacity>
                                                )})}
                                            </View>
                                        </View>
                                        :
                                        <View><Text></Text></View>
                                    }
                                    
                                </ScrollView>
                                <View style={MainStyle.btnFilter}>
                                    <TouchableOpacity style={[MainStyle.widthBtnFil,{backgroundColor: '#000000'}]} onPress={()=>this.applyFilter()}>
                                        <Text style={MainStyle.subFilter}>Áp dụng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[MainStyle.widthBtnFil,{backgroundColor: '#aaaaaa'}]} onPress={()=>this.resetFilter()}>
                                        <Text style={MainStyle.subFilter}>Thiết lập lại</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                            
                        </View>
                    </Modal>


                </View>
               

                <FooterBase navigation={navigation} page="muster"  />
            </Container>
        );
    }
}
 