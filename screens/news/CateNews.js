import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import {getListNewsCate} from './../../src/api/apiNews';


export default class CateNews extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            listNews:'',
            page: 1,
        }

        this.arr = [];
        
    }

    componentDidMount() {
        this.makeRequestCompoment();
    }


    makeRequestCompoment(){
        const { id } = this.props.navigation.state.params;
        getListNewsCate(id,this.state.page)
        .then(resJSON => {
            const { list, category_name, error } = resJSON;
            // console.log(list); 
            if (error == false) {
                this.setState({
                    listNews: list,  
                    loading: false,
                    category_name: category_name,
                    refreshing: false,
                    error: false || null,   
                });  
                // console.log(list);
            } else {
                this.setState({ loading: false, refreshing: false });
            }
     
        }).catch(err => {
            this.setState({ loading: false }); 
        });
    }


    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        },
        () => {
            this.makeRequestCompoment();
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
    



    detailNews(id){
        this.props.navigation.navigate('DetailNewsScreen',{ id: id });
    }

	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="news" title={this.state.category_name} navigation={navigation} />
                <View style={{paddingBottom: 68}}>
                    <View style={MainStyle.pageNews}>
                        <FlatList  
                            data={this.state.listNews}   
                            renderItem={({ item }) => (
                                <TouchableOpacity style={MainStyle.itemNews} onPress={()=>this.detailNews(item.id)}>
                                    <View style={MainStyle.vImgNews}>
                                        <Image style={MainStyle.imgNews} source={{uri:item.image}} />
                                    </View>
                                    <View style={MainStyle.bodyNews}>
                                        <Text style={MainStyle.titleNews}>{item.title}</Text>
                                        <View style={MainStyle.vDateNews}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={[MainStyle.nDateNameNews,{paddingTop: 2}]}> 
                                                    <Icon type="FontAwesome" name="clock-o" style={{ color: '#777777', fontSize: 13}} />
                                                </Text>
                                                <Text style={MainStyle.nDateNameNews}>
                                                    {item.created_time} | {item.time_post}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={[MainStyle.nDateNameNews,{paddingTop: 2}]}>
                                                    <Icon type="FontAwesome" name="newspaper-o" style={{ color: '#777777', fontSize: 13}} />
                                                    
                                                </Text >
                                                <Text style={MainStyle.nDateNameNews}>Chuyên mục: {item.category_name}</Text>
                                            </View>
                                            
                                        </View>  
                                        <View style={MainStyle.briefNews}>
                                            <Text style={MainStyle.txtBriefNews}>{item.summary}</Text>
                                        </View>
                                        
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                            contentContainerStyle={MainStyle.containerListProducts}
                            ListFooterComponent={this.renderFooter}     
                            refreshing={this.state.refreshing}
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
 