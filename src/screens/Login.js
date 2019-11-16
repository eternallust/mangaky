import React, { Component } from 'react';
import { View, Text,ImageBackground,Image,TouchableOpacity,StyleSheet,AsyncStorage } from 'react-native';
import { Item, Input,} from 'native-base';
import jwt_decode from 'jwt-decode';

import * as actionAuthentication from '../redux/actions/actionAuthentication'
import {connect} from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername:'',
      inputPassword:''
    };
  }

  login = async() => {
    await this.props.authentication(
      this.state.inputUsername,
      this.state.inputPassword
    )
      const data = this.props.authenticationLocal.user.token
      await AsyncStorage.setItem('user-token',data)
      this.props.navigation.navigate('MainApp')
   
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ImageBackground source={require('./../assets/bg.png')}
        style={styles.imageBackground}>
            <View style={{width:'75%',height:'20%'}}>
              <Image 
                source={require('./../assets/logo.png')}
                style={{width:150,height:100}}
              />
            </View>
            <Item rounded style={{width:'80%',height:'8%',backgroundColor:'#0652DD98',borderColor:'#0652DD98'}}>
              <Input
                style={{fontSize:14,marginLeft:10,color:'white'}}
                placeholderTextColor='white'
                placeholder='Input Your Email'
                onChangeText={(text) => this.setState({ inputUsername: text })}
              >
              </Input>
            </Item>
            <Item rounded style={{width:'80%',height:'8%',marginTop:10,backgroundColor:'#0652DD98',borderColor:'#0652DD98'}}>
              <Input
                onChangeText={(text) => this.setState({ inputPassword: text })}
                style={{fontSize:14,marginLeft:10,color:'white'}}
                placeholderTextColor='white'
                placeholder='Input Your Password'
              >
              </Input>
            </Item>
            <TouchableOpacity style={styles.buttonLogin} onPress={this.login}>
              <Text style={styles.fontButton} >Login</Text>
            </TouchableOpacity>
            
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageBackground: {
    width: '100%', 
    height: '100%',
    alignItems:'center',
    justifyContent:'center'
  },
  textTitle: {
    marginTop:10,
    fontSize:28,
    fontWeight:'bold',
    color:'white'
  },
  subTitle: {
    marginTop:5,
    color:'white'
  },
  buttonLogin: {
    borderRadius:20,
    backgroundColor:'#e67e22',
    alignItems:'center',
    justifyContent:'center', 
    height:'8%',
    width: '80%',
    marginTop:10 
  },
  fontButton: {
    color:'white',
    fontWeight:'bold'
  },
  buttonRegister: {
    borderRadius:10,
    backgroundColor:'#133c49', 
    alignItems:'center',
    justifyContent:'center',
    height:'8%',
    width: '80%',
    marginTop:10
  }
})
const mapStateToProps = state => {
  return {
    authenticationLocal: state.authentication // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authentication: (inputUsername,inputPassword) => dispatch(actionAuthentication.login(inputUsername,inputPassword))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);