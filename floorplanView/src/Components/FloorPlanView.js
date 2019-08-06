import React, { Component } from 'react';
import { Image, View, Dimensions, Button, Platform } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import ImagePicker from 'react-native-image-picker';


class FloorPlanView extends Component {
    constructor(props) {
        super(props);
        this.onPressChange = this.onPressChange.bind(this);
    }
    state = {
        image: require('./floorplan.png'),
        extension: 'png',
        imageHeight: 1783,
        imageWidth: 905
    }

    onPressChange() {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                Image.getSize(source, (width, height) => {
                    this.setState({
                        image: source,
                        imageHeight: height,
                        imageWidth: width,
                        extension: source.uri.split('.').pop()
                    });
                });
                console.log(this.state);
            }
        });
    }

    render() {
        const { floorplanViewStyle, imagePickerViewStyle } = styles;
        console.log(this.state);
        return (
            <View>
                <View style={imagePickerViewStyle}>
                    <Button
                        onPress={this.onPressChange.bind(this)}
                        title="Change Image"
                        color="#841584"
                    />
                </View>
                <View style={floorplanViewStyle}>
                    <ImageZoom
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={this.state.imageHeight}
                        imageHeight={this.state.imageWidth}
                        enableCenterFocus={false}
                    >
                        <Image
                            source={this.state.image}
                            style={{ flex: 1 }}
                        />
                    </ImageZoom>
                </View>
            </View>);
    }
}

const styles = {
    floorplanViewStyle: {
        backgroundColor: '#F0F0F0',
        flex: 1,
    },
    imagePickerViewStyle: {
        backgroundColor: '#F8F8F8',
        paddingTop: Platform.OS === 'ios' ? 55 : 15
    }
};

export default FloorPlanView;
