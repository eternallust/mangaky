import React, { Component } from 'react';
import { View, Text,Dimensions,Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

export default class ReadManga extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pageDummy:[
            {
                page:require('./../assets/pages/dummy_page1.jpg')
            },
            {
                page:require('./../assets/pages/dummy_page2.jpg')
            },
            {
                page:require('./../assets/pages/dummy_page3.jpg')
            },
            {
                page:require('./../assets/pages/dummy_page4.jpg')
            },
            {
                page:require('./../assets/pages/dummy_page5.jpg')
            },
            {
                page:require('./../assets/pages/dummy_page6.jpg')
            },
            {
                page:require('./../assets/pages/dummy_page7.jpg')
            },
        ]
    };
  }

  render() {
    return (
      <View>
        <FlatList
            data={this.state.pageDummy}
            renderItem={({item})=>
                <Image
                resizeMode='contain'
                style={{height:maxHeightScreen,width:maxWidthScreen,}}
                source={item.page}
            />
            }
        />
      </View>
    );
  }
}
