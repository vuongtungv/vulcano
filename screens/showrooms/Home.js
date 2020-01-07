import React, { Component} from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList ,Picker, Alert} from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import {getCities, getDistricts, getAllShowrooms} from '../../src/api/apiShowrooms';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
 
    constructor(props) {
        super(props);
        
        this.state = {
            city:'0',
            district: '0',
            listCities:[],
            listDistricts: [],
            listAllShowrooms: [],
        }

        this.arr = [];
    }
 
    componentDidMount() {
        this.getCity();
        // this.getDistricts();
        // this.getAllShowrooms();
    }

    getCity= () => {
        this.setState({ loading: true });
        getCities()
        .then(resJSON => {
            const { list, error } = resJSON;
            if (error == false) {
                this.setState({
                    listCities: list,  
                    loading: false,
                    refreshing: false,
                    error: false || null,   
                });  
            } else {
                this.setState({ loading: false, refreshing: false });
            }
     
        }).catch(err => {
        
        });
    }

    
    setCityChange=(value, index)=>{
        this.setState(
          {
            "city": value
          },
          () => {
            // here is our callback that will be fired after state change.
            // Alert.alert(this.state.city);
            this.getDistricts();
            this.getAllShowrooms();
          }
        );
      }
      setDistrictChange=(value, index)=>{
        this.setState(
          {
            "district": value
          },
          () => {
            // here is our callback that will be fired after state change.
            // Alert.alert(this.state.city);
            // this.getDistricts();
            this.getAllShowrooms();
          }
        );
      }
    getDistricts= () => {
        this.setState({ loading: true });
        getDistricts(this.state.city)
        .then(resJSON => {
            const { list, error } = resJSON;
            if (error == false) {
                this.setState({
                    listDistricts: list,  
                    loading: false,
                    refreshing: false,
                    error: false || null,   
                });  
            } else {
                this.setState({ loading: false, refreshing: false });
            }
        
        }).catch(err => {
        
        });
    }

    getAllShowrooms= () => {
        this.setState({ loading: true });
        getAllShowrooms(this.state.city,this.state.district)
        .then(resJSON => {
            const { list, error } = resJSON;
            if (error == false) {
                this.setState({
                    listAllShowrooms: list,  
                    loading: false,
                    refreshing: false,
                    error: false || null,   
                });  
            } else {
                this.setState({ loading: false, refreshing: false });
            }
        
        }).catch(err => {
        
        });
    }


	
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="showrooms" title={'Hệ thống cửa hàng Vulcano'} navigation={navigation} />
                <ScrollView style={[MainStyle.pageShowrooms]}>
                    <View style={MainStyle.vMap}>

                    </View>
                    <View style={MainStyle.bSelectShowrooms}>
                        <Text style={MainStyle.txtShowrooms}>Tìm kiếm theo địa chỉ</Text>
                        <View style={MainStyle.borSelectSR}>
                            <Picker
                                selectedValue={this.state.city}
                                style={MainStyle.sSelectBox}
                                // onValueChange={(itemValue, itemIndex) =>
                                //     // this.setState({city: itemValue})
                                //     this.setCityChange()
                                // }
                                onValueChange={(value)=>this.setCityChange(value)}
                                
                            >
                                <Picker.Item label="-- Chọn Tỉnh/TP --" value="0" />
                                {this.state.listCities.map((item, index) => {return (
                                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                                )})} 
                            </Picker>
                        </View>
                        <View style={MainStyle.borSelectSR}>
                            <Picker
                                selectedValue={this.state.district}
                                style={MainStyle.sSelectBox}
                                
                                // onValueChange={(itemValue, itemIndex) =>
                                //     this.setState({district: itemValue})
                                // }
                                onValueChange={(value)=>this.setDistrictChange(value)}
                            >
                                <Picker.Item label="-- Chọn Quận/Huyện --" value="0" />
                                {this.state.listDistricts.map((item, index) => {return (
                                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                                )})}   
                            </Picker>
                        </View>
                    </View>
                    <View style={MainStyle.vListShowrooms}>
                        {this.state.listAllShowrooms.map((item, index) => {return (
                            <View key={item.id} style={MainStyle.itemShowrooms}>
                                <Text style={MainStyle.txtNameShowrooms}>{item.name}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Icon type="EvilIcons" name="location" style={{color: '#555555', fontSize: 26 }} />
                                    <Text style={MainStyle.txtAddShowrooms}>{item.address}</Text>
                                </View>
                            </View>
                        )})}  
                        
                    </View>  
                </ScrollView>
                <FooterBase navigation={navigation} page="showrooms" />
            </Container>
        );
    }
}
 