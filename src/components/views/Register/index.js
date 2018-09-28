import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import {
  getOrientation,
  setOrientation,
  removeOrientation,
  getPlatform
} from '../../utils/misc';
import Logo from '../Login/logo';
import RegisterPanel from '../Register/registerPanel';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: getOrientation(500),
      logoAnimation: false,
      platform:getPlatform()
    }
    setOrientation(this.changeOrientation)
  }
  changeOrientation = () => {
    this.setState({
      orientation: getOrientation(500)
    })
  }
  showLogin = () => {
    this.setState({
      logoAnimation: true
    })
  }
  componentWillUnmount() {
    removeOrientation()
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Logo
            showLogin={this.showLogin}
            orientation={this.state.orientation}
            
          />
          <RegisterPanel
            navigator={this.props.navigator}
            orientation={this.state.orientation}
            show={this.state.logoAnimation}
            platform = {this.state.platform}
          />

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
export default RegisterScreen;