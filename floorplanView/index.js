import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import FloorPlanView from './src/Components/FloorPlanView';

class App extends Component {
    render() {
        return <FloorPlanView />;
    }
}

AppRegistry.registerComponent('floorplanView', () => App);
