import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,FlatList,TouchableOpacity } from 'react-native';
import { Item, Input,Header,Icon} from 'native-base';


const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

export default class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dummyData: [
                {title:'ACT-AGE',image:require('./../assets/cover/cover_dummy4.jpg')},
                {title:'SAIKI KUSUO NO SAINAN',image:require('./../assets/cover/cover_dummy3.jpg')},
                {title:'ONEE-SAN WA JOSHI SHOUGAKUSEI NI KYOUMI GA ARIMASU',image:require('./../assets/cover/cover_dummy2.jpg')}, 
            ]
        };
      }
    
      goToDetailManga = () => {
          this.props.navigation.navigate('DetailManga')
      }

      render() {
        return (
            <View style={styles.container}>
            <Header searchBar rounded style={{backgroundColor:'#0984e3'}}>
              <Item rounded style={{height:'70%'}}>
                <Input
                  style={styles.input} 
                  placeholder="Search for mangas" />
                <Icon name="search" style={{marginRight:10}} />
              </Item>
            </Header>
            <View style={styles.allMangas}>
              <View style={styles.listMangas}>
                <View style={{width:'95%',height:'95%'}}>
                    <Text style={{color:'#192a56',width:'100%',height:'7%',fontSize:17, fontWeight:'bold'}}>My Favorite Mangas</Text>
                    <FlatList
                        style={{height:'93%',width:'100%'}}
                        data={this.state.dummyData}
                        numColumns={3}
                        renderItem={({item})=>
                        <TouchableOpacity>
                        
                        <Image 
                            source={item.image}
                            style={{width:maxWidthScreen*0.28,height:maxHeightScreen*0.2,borderRadius:3,marginRight:10}}
                        />
                        <View style={{height:maxHeightScreen*0.05,width:maxWidthScreen*0.27}}>
                            <Text numberOfLines={1}>{item.title}</Text>
                        </View>
                        </TouchableOpacity>
                    }
                    />                    
                </View>
              </View>
            </View>
          </View>
        );
      }
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#f0f6fb'
    },
    input: {
      fontSize:16,
      marginLeft:10
    },
    allMangas: {
      marginTop:10,
      alignItems:'center', 
      height:maxHeightScreen*0.85, 
      width: maxWidthScreen, 
    },
    listMangas: {
      alignItems:'center', 
      justifyContent:'center',
      borderRadius: 10,
      height: maxHeightScreen*0.75,
      width: maxWidthScreen*0.95,
      backgroundColor:'white'
    },
})