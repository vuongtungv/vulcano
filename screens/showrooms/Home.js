import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, FlatList, Alert, Dimensions } from 'react-native';
import { Picker } from "native-base";
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getCities, getDistricts, getAllShowrooms } from '../../src/api/apiShowrooms';

import MapView, { AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);

        this.state = {
            city: '0',
            district: '0',
            listCities: [],
            listDistricts: [],
            listAllShowrooms: [],
            count: 1,
            latitude: 21.027763,
            longitude: 105.834160,
            latitudeDelta: 0.922,
            longitudeDelta: 0.421,
            markers: [],
            width_icon_img: 0,
            height_icon_img: 0,
        }


        getCities()
            .then(resJSON => {
                const { list, error } = resJSON;
                if (error == false) {
                    this.setState({
                        listCities: list,
                    });
                }
            });


        this.arr = [];
    }

    componentDidMount() {
        // this.getDistricts();
        this.getShowroomsAllCity(this.state.city, this.state.district);
        // console.log(this.state.markers)
    }


    setCityChange = (city) => {
        // here is our callback that will be fired after state change.
        // Alert.alert(this.state.city);
        this.getShowroomsAllCity(city, this.state.district);

        this.setState({ city });

        getDistricts(city)
            .then(resJSON => {
                const { list, error } = resJSON;
                if (error == false) {
                    this.setState({
                        listDistricts: list,
                    });
                }
            });
    }
    setDistrictChange = (value) => {
        this.setState({
            district: value
        });
        this.getShowroomsAllCity(this.state.city, value);
    }

    getShowroomsAllCity = (item1, item2) => {

        getAllShowrooms(item1, item2)
            .then(resJSON => {
                const { list, count, markers, icon_img, width_icon_img, height_icon_img, error } = resJSON;
                // console.log(markers);
                if (error == false) {
                    this.setState({
                        listAllShowrooms: list,
                        error: false || null,
                        count: count,
                        icon_img: icon_img,
                        markers: markers,
                        width_icon_img: width_icon_img,
                        height_icon_img: height_icon_img,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0922 + (width / height),
                    });

                    var MarKERS = [];

                    list.map((value) => {
                        MarKERS.push({
                            latitude: value.latitude,
                            longitude: value.longitude,
                        });
                    }),

                        this.fitAllMarkers(MarKERS);
                }
                else {
                    this.setState({ count: 0 });
                }

            });
    }

    fitAllMarkers(data) {
        const DEFAULT_PADDING = { top: 50, right: 50, bottom: 50, left: 50 };
        this.map.fitToCoordinates(data, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
    }



    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <HeaderBase page="showrooms" title={'Hệ thống cửa hàng Vulcano'} navigation={navigation} />
                <ScrollView style={[MainStyle.pageShowrooms]}>
                    <View style={MainStyle.vMap}>
                        <MapView
                            ref={ref => { this.map = ref; }}
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: this.state.latitudeDelta,
                                longitudeDelta: this.state.longitudeDelta,

                            }}

                        >
                            {this.state.count > 0 ?
                                this.state.markers.map((marker, i) => (
                                    <MapView.Marker
                                        // image={require('../../assets/logo_vul.png')}
                                        coordinate={marker.coordinates}
                                        key={i}
                                        title={marker.title}>
                                        <View style={{ width: this.state.width_icon_img, height: this.state.height_icon_img }}>
                                            <Image source={{ uri: this.state.icon_img }} style={{ width: this.state.width_icon_img, height: this.state.height_icon_img }} />
                                        </View>

                                    </MapView.Marker>
                                ))
                                :
                                <MapView.Marker

                                />
                            }
                        </MapView>
                    </View>

                    <View style={MainStyle.bSelectShowrooms}>
                        <Text style={MainStyle.txtShowrooms}>Tìm kiếm theo địa chỉ</Text>
                        <View style={MainStyle.borSelectSR}>
                            <Picker
                                selectedValue={this.state.city}
                                style={MainStyle.sSelectBox}
                                onValueChange={(city) => this.setCityChange(city)}
                            >
                                <Picker.Item label="-- Chọn Tỉnh/TP --" value="0" />
                                {this.state.listCities.map((item) => {
                                    return (
                                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                                    )
                                })}
                            </Picker>
                        </View>
                        <View style={MainStyle.borSelectSR}>
                            <Picker
                                selectedValue={this.state.district}
                                style={MainStyle.sSelectBox}
                                onValueChange={(value) => this.setDistrictChange(value)}
                            >
                                <Picker.Item label="-- Chọn Quận/Huyện --" value="0" />
                                {this.state.listDistricts.map((item) => {
                                    return (
                                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                                    )
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View style={MainStyle.vListShowrooms}>
                        {this.state.count > 0 ?
                            this.state.listAllShowrooms.map((item, index) => {
                                return (
                                    <View key={item.id} style={MainStyle.itemShowrooms}>
                                        <Text style={MainStyle.txtNameShowrooms}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon type="EvilIcons" name="location" style={{ color: '#555555', fontSize: 26 }} />
                                            <Text style={MainStyle.txtAddShowrooms}>{item.address}</Text>
                                        </View>
                                    </View>
                                )
                            })
                            :
                            <View><Text></Text></View>
                        }


                    </View>
                </ScrollView>
                <FooterBase navigation={navigation} page="showrooms" />
            </Container>
        );
    }
}
const { height, width } = Dimensions.get('window');
