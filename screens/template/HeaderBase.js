import React, { Component } from 'react';
import { 
    Text, View, Image, Dimensions , Alert,TouchableOpacity
} from 'react-native';
import MainStyle from './../../styles/MainStyle';
import { Icon } from "native-base";
  
let ScreenWidth = Dimensions.get("window").width;

export default class HeaderBase extends Component {
    constructor(props) {
        super(props);
        this.state={
            ListCateNewsHeader: false,
        }
    } 

    componentDidMount() {

    }
    gotoBack(){
        this.props.navigation.goBack();
    }


    setStateListCateNewsHeader(method){
        this.setState({
            ListCateNewsHeader: !this.state.ListCateNewsHeader,   
        });  
    }
    showListCateNewsHeader(){
        if(this.state.ListCateNewsHeader)
            return (
                <View style={MainStyle.listCateNews}>
                    <TouchableOpacity style={MainStyle.itemHeaderCateNews}>
                        <Text style={MainStyle.txtCateHeaderNews}><Icon type="EvilIcons" name="chevron-right" style={{ color: '#000000', fontSize: 22 }} /> Tin tức Vulcano</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={MainStyle.itemHeaderCateNews}>
                        <Text style={MainStyle.txtCateHeaderNews}><Icon type="EvilIcons" name="chevron-right" style={{ color: '#000000', fontSize: 22 }} /> Tin tức Vulcano</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={MainStyle.itemHeaderCateNews}>
                        <Text style={MainStyle.txtCateHeaderNews}><Icon type="EvilIcons" name="chevron-right" style={{ color: '#000000', fontSize: 22 }} /> Tin tức Vulcano</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={MainStyle.itemHeaderCateNews}>
                        <Text style={MainStyle.txtCateHeaderNews}><Icon type="EvilIcons" name="chevron-right" style={{ color: '#000000', fontSize: 22 }} /> Tin tức Vulcano</Text>
                    </TouchableOpacity>
                </View>
            )
        // else
        //     return ( 
        //         <TouchableOpacity style={[MainStyle.tBoderS]}
        //             onPress={() => this.setStateEdit()}>
        //             <Text style={[MainStyle.fontAvo,{color: '#ED1E79', marginTop: -2}]}>Sửa thông tin</Text> 
        //         </TouchableOpacity>  
        //     )
    }
    



    render() {
        const { navigation, page, title, heading } = this.props;
        switch(page){
            case 'home':
                return(
                    <View style={MainStyle.barHearder}>
                        <View style={MainStyle.logoHeader}> 
                            <Image style={{width: 99, height: 40}} source={require("../../assets/logo.png")} />
                        </View>
                        <View style={MainStyle.iconSearchHeader}>
                            <Icon type="FontAwesome" name="search" style={{ color: '#000000', fontSize: 22 }} />
                        </View>
                    </View>
                );
            
            // sản phẩm
            case 'categories':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                    </View>
                );
            case 'list_products':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                    </View>
                );

            // tin tức
            case 'news':
                return(
                    <View style={MainStyle.barHearder}>
                        <TouchableOpacity style={MainStyle.backHeader} onPress={() => this.gotoBack()}>
                            <Icon type="FontAwesome" name="angle-left" style={[MainStyle.tHeaderIconMenu,{fontSize:35}]} />
                        </TouchableOpacity>
                        <View style={MainStyle.titleCenterHeader}> 
                            <Text style={MainStyle.txtCenterHeader}>{title}</Text>
                        </View>
                        <TouchableOpacity style={MainStyle.iconSearchHeader} onPress={()=>this.setStateListCateNewsHeader()}>
                            <Icon type="MaterialCommunityIcons" name="dots-vertical" style={{ color: '#000000', fontSize: 23 }} />
                        </TouchableOpacity>
                        {this.showListCateNewsHeader()}
                    </View>
                );
            default: 
                return(
                    <View style={MainStyle.barHearder}>
                        <View style={MainStyle.logoHeader}> 
                            <Image style={{width: 99, height: 40}} source={require("../../assets/logo.png")} />
                        </View>
                        <View style={MainStyle.iconSearchHeader}>
                            <Icon type="FontAwesome" name="search" style={{ color: '#000000', fontSize: 22 }} />
                        </View>
                    </View>
                );
        }
    }
}
