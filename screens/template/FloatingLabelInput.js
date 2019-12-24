import React, { Component } from 'react';
import { View, TextInput, Animated } from 'react-native';

export default class FloatingLabelInput extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		isFocused: false,
	};

	componentWillMount() {
		this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
	}

	handleFocus = () => this.setState({ isFocused: true });
	handleBlur = () => this.setState({ isFocused: false });

	componentDidUpdate() {
		Animated.timing(this._animatedIsFocused, {
		toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
			duration: 200,
		}).start();
	}

	render() {
		const { label, ...props } = this.props;
		
		const labelStyle = {
			fontFamily: 'Avo',
			position: 'absolute',
			left: 0,
			top: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [16, 0],
			}),
			fontSize: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [15, 13],
			}),
			color: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: ['#333', '#666'],
			}),
		};

		return (
			<View style={{ paddingTop: 16}}>
				<Animated.Text style={labelStyle}>
				{label}
				</Animated.Text>
				<TextInput
					{...props}
					style={{ fontFamily: 'Avo', height: 30, fontSize: 14, color: '#111'}}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					ref={(input) => this.name = input}
					blurOnSubmit
					/>
			</View>
		);
	}
}