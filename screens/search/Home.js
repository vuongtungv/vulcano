import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList ,Picker,TextInput} from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";


export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            
        }

        this.arr = [];
    }
 
    componentDidMount() {
    
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="search" title={'Tìm kiếm'} navigation={navigation} />
                <View style={MainStyle.boxSearch}>
                        <View style={MainStyle.vInpSearch}>
                            <TouchableOpacity style={MainStyle.iconTouchSearch}>
                                <Icon type="FontAwesome" name="search" style={[{fontSize:25}]} />
                            </TouchableOpacity>
                            <TextInput
                                style={MainStyle.inputSearch}
                                onChangeText={text => onChangeText(text)}
                                value=''
                            />
                        </View>
                    </View>
                <ScrollView style={[MainStyle.pageShowrooms]}>
                    
                </ScrollView>
                <FooterBase navigation={navigation} page="muster" />
            </Container>
        );
    }
}
 