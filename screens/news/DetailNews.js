import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions,WebView,PixelRatio  } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import AutoHeightWebView from 'react-native-autoheight-webview';

import {getDetailNews} from '../../src/api/apiNews';
import { FlatList } from 'react-native-gesture-handler';
let ScreenWidth = Dimensions.get("window").width;
import global from './../api/global';

export default class DetailNews extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            detail: '',
            
        }

        this.arr = [];

        global.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.navigation.state.params;
        getDetailNews(id)
            .then(resJSON => {
                const { detail, othernew,tags, error} = resJSON;
                
                if (error == false) {
                    this.setState({
                        detail: detail,
                        otherNews : othernew,
                        tags: tags,
                        loaded: true,
                    });
                
                }
            }).catch(err => {
                this.setState({ loaded: true });  
            }); 
        
    }
    detailNews(id){
        this.props.navigation.goBack();
        global.onRefresh();
        this.props.navigation.navigate('DetailNewsScreen',{ id: id });

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
                <HeaderBase page="detail_news" title={this.state.detail.category_name} navigation={navigation} />
                <ScrollView style={MainStyle.pageDetailNews}>
                    <View style={[MainStyle.bodyDetailNews,{marginTop: 30}]}>
                        <Text style={MainStyle.titleNews}>{this.state.detail.title}</Text>
                        <View style={MainStyle.vDateNews}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[MainStyle.nDateNameNews,{paddingTop: 2}]}> 
                                    <Icon type="FontAwesome" name="clock-o" style={{ color: '#777777', fontSize: 13}} />
                                </Text>
                                <Text style={MainStyle.nDateNameNews}>
                                    {this.state.detail.created_time} | {this.state.detail.time_post}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[MainStyle.nDateNameNews,{paddingTop: 2}]}>
                                    <Icon type="FontAwesome" name="newspaper-o" style={{ color: '#777777', fontSize: 13}} />
                                </Text >
                                <Text style={MainStyle.nDateNameNews}>Chuyên mục: {this.state.detail.category_name}</Text>
                            </View>
                        </View>  

                        <View style={MainStyle.briefDetailNews}>
                            <Text style={MainStyle.txtBriefDetailNews}>{this.state.detail.summary}</Text>
                        </View>
                        <View style={[MainStyle.vDescriptNews]}>
                            {/* <Text style={MainStyle.txtDescriptNews}>
                                Đối với phái mạnh quần âu đã trở thành một phần không thể thiếu. Một chiếc quần âu cao cấp không chỉ mang lại sự chuyên nghiệp, lịch lãm mà còn là chìa khóa giúp phái mạnh tự tin, làm chủ mọi tình huống.                                
                            </Text>
                            <Text style={MainStyle.txtDescriptNews}>
                                Sự thật rằng mọi quý ông đều ưa thích những bộ đồ chỉn chu và phẳng phiu nhưng lại rất “Lười” trong việc là ủi, hiểu được điều đó Vulcano đã ứng dụng công nghệ SUPERCREASE tạo nếp ly vĩnh viễn xua tan nỗi lo lắng quần mất phom và tiết kiệm được thời gian là ủi mỗi sáng. 
                            </Text>
                            
                            <Image style={{width: '100%'}} source={require('../../assets/img_detail_news.png')}/> */}
                            <AutoHeightWebView
                                customScript={`document.body.style.background = 'transparent';`}
                                style={{ width: ScreenWidth-40 }}
                                files={[{
                                    href: global.BASE_URL+'/templates/default/css/app.css?v=333',
                                    type: 'text/css',
                                    rel: 'stylesheet'
                                }]}
                                source={{ html: this.state.detail.content }}
                                zoomable={false}
                            />
                            {/* <HTML 
                                html={this.state.detail.content} imagesMaxWidth={ScreenWidth-40} 
                            /> */}

                        </View> 
                        <View style={MainStyle.tagsDetailNews}>
                            <Icon type="FontAwesome" name="tags" style={{ color: '#000000', fontSize: 27 }} />
                            <Text style={MainStyle.txtTagsDetailNews}>Tags: </Text>
                            <FlatList  
                                data={this.state.tags}   
                                renderItem={({ item }) => (
                                    <TouchableOpacity>
                                        <Text style={MainStyle.txtTagsN}>{item.name}</Text> 
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id}
                            />   
                                                        
                            {/* <TouchableOpacity>
                                <Text style={MainStyle.txtTagsN}>Quần au,</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={MainStyle.txtTagsN}>Quần au,</Text> 
                            </TouchableOpacity> */}
                            
                        </View>
                    </View>
                    <View style={MainStyle.otherNews}>
                        <View style={MainStyle.vHeaderOtherNews}>
                            <Text style={MainStyle.txtOtherNews}>Tin khác</Text>
                            <View style={MainStyle.brBottomOther}></View>
                        </View>
                        <View style={MainStyle.pageNews}>
                            <FlatList  
                                data={this.state.otherNews}   
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
                            />   
                        </View>
                    </View>
                </ScrollView>
                
                <FooterBase navigation={navigation} page="muster"  />
            </Container>
        );
    }
}
 