import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import {getListNews} from './../../src/api/apiNews';


export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            listNews:'',
        }

        this.arr = [];
    }

    componentDidMount() {
        this.getListNews();
    }

    getListNews= () => {
        this.setState({ loading: true });
        getListNews()
        .then(resJSON => {
            const { list, error } = resJSON;
            // console.log(list); 
            if (error == false) {
                this.setState({
                    listNews: list,  
                    loading: false,
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



    detailNews(id){
        this.props.navigation.navigate('DetailNewsScreen',{ id: id });
    }

	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="news" title={'Tin tức và sự kiện'} navigation={navigation} />
                <ScrollView style={MainStyle.pageNews}>
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
                                        <Text style={MainStyle.nDateNameNews}>
                                            <Icon type="FontAwesome" name="clock-o" style={{ color: '#777777', fontSize: 13, marginRight: 10}} />
                                            {item.created_time} | {item.time_post}
                                        </Text>
                                        <Text style={MainStyle.nDateNameNews}>
                                            <Icon type="FontAwesome" name="newspaper-o" style={{ color: '#777777', fontSize: 13, marginRight: 10}} />
                                            Chuyên mục: {item.category_name}
                                        </Text>
                                    </View>  
                                    <View style={MainStyle.briefNews}>
                                        <Text style={MainStyle.txtBriefNews}>{item.summary}</Text>
                                    </View>
                                    
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />   
                </ScrollView>
                <FooterBase navigation={navigation} page="muster"  />
            </Container>
        );
    }
}
 