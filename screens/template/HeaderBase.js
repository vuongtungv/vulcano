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

    } 

    componentDidMount() {

    }
    gotoBack(){
        this.props.navigation.goBack();
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
                        <TouchableOpacity style={MainStyle.iconSearchHeader} >
                            <Icon type="MaterialCommunityIcons" name="dots-vertical" style={{ color: '#000000', fontSize: 23 }} />
                        </TouchableOpacity>
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
