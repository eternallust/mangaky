import React, { Component } from 'react';
import { View, Text,ImageBackground,Image,TouchableOpacity,StyleSheet } from 'react-native';
import { Item, Input,} from 'native-base';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  login = () => {
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
              >
              </Input>
            </Item>
            <Item rounded style={{width:'80%',height:'8%',marginTop:10,backgroundColor:'#0652DD98',borderColor:'#0652DD98'}}>
              <Input
                style={{fontSize:14,marginLeft:10}}
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