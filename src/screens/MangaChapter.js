import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,FlatList,TouchableOpacity } from 'react-native';
import { Item, Input,Header,Icon} from 'native-base';

const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

export default class MangaChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        chapterDummy:[
        {
            name: 'A Dignified Sleeping Face'
        },
        {
            name: 'Fifth Period Trap'
        },
        {
            name: 'Trigger'
        },
        {
            name: 'Sleeping Plan'
        }

    ]
    };
  }

  goToReadManga = () => {
    this.props.navigation.navigate('ReadManga')
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
            <View style={{flexDirection:'row',height:maxHeightScreen*0.25,width:maxWidthScreen*0.9}}>
              <Image 
              style={{height:maxHeightScreen*0.25,width:maxWidthScreen*0.27,borderRadius:5}}
              source={require('./../assets/cover/cover_dummy.jpg')}
              />
              <View style={{height:maxHeightScreen*0.25,width:maxWidthScreen*0.6,marginLeft:5}}>
              <Text style={{fontSize:17,color:'#192a56',fontWeight:'bold'}}>DIGINIFIED ASLEEP SAEKI</Text>
                <View style={{height:maxHeightScreen*0.15,width:maxWidthScreen*0.6,}}>
                    {/* AUTHOR */}
                    <View style={{flexDirection:'row'}}>
                        <Image 
                        style={{height:maxHeightScreen*0.025,marginRight:5,width:maxWidthScreen*0.04}}
                        source={require('./../assets/icon/author.png')}
                        />
                        <Text style={{fontSize:12}}>AUTHOR(S) : </Text>
                        <Text
                        numberOfLines={2} 
                        style={{fontSize:12,width:maxWidthScreen*0.35}}>HARUHARA ROBINSON</Text>
                    </View>
                    {/* GENRE */}
                    <View style={{flexDirection:'row'}}>
                        <Image 
                        style={{height:maxHeightScreen*0.025,marginRight:5,width:maxWidthScreen*0.04}}
                        source={require('./../assets/icon/genre.png')}
                        />
                        <Text style={{fontSize:12}}>GENRE : </Text>
                        <Text
                        numberOfLines={2} 
                        style={{fontSize:12,width:maxWidthScreen*0.35}}>COMEDY</Text>
                    </View>
                    {/* ONGOING */}
                    <View style={{flexDirection:'row'}}>
                        <Image 
                        style={{height:maxHeightScreen*0.025,marginRight:5,width:maxWidthScreen*0.04}}
                        source={require('./../assets/icon/ongoing.png')}
                        />
                        <Text style={{fontSize:12}}>STATUS : </Text>
                        <Text
                        numberOfLines={2} 
                        style={{fontSize:12,width:maxWidthScreen*0.35}}>ONGOING</Text>
                    </View>
                    {/* LAST UPDATED */}
                    <View style={{flexDirection:'row'}}>
                        <Image 
                        style={{height:maxHeightScreen*0.025,marginRight:5,width:maxWidthScreen*0.04}}
                        source={require('./../assets/icon/lastupdated.png')}
                        />
                        <Text style={{fontSize:12}}>LAST UPDATED : </Text>
                        <Text
                        numberOfLines={2} 
                        style={{fontSize:12,width:maxWidthScreen*0.35}}>04 NOV 2019 20:30</Text>
                    </View>
                </View>
                <TouchableOpacity style={{borderRadius:10,height:maxHeightScreen*0.065,alignItems:'center',
                justifyContent:'center',marginRight:5,width:maxWidthScreen*0.43,backgroundColor:'#e84118'}}>
                    <View style={{flexDirection:'row'}}>
                        <Image 
                            style={{height:maxHeightScreen*0.035,marginRight:5,width:maxWidthScreen*0.057}}
                            source={require('./../assets/icon/star.png')}
                        />
                        <Text style={{color:'white',fontWeight:'bold'}}>Mark As Favorite</Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop:10,alignItems:'center',justifyContent:'center',height: maxHeightScreen*0.5,borderRadius:10,width: maxWidthScreen*0.95,backgroundColor:'white'}}>
              <View style={{width: maxWidthScreen*0.9,height: maxHeightScreen*0.47}}>
              <Text style={{color:'#192a56',fontWeight:'bold',fontSize:17,marginBottom:10}}>Dignified Asleep Saeki Chapters</Text>
                <FlatList
                    data={this.state.chapterDummy}
                    renderItem={({item})=>
                    <TouchableOpacity 
                      style={{flexDirection:'row',alignItems:'center'}}
                      onPress={()=>this.goToReadManga()}
                    >
                      <Image
                      style={{height:maxHeightScreen*0.04,marginRight:5,width:maxWidthScreen*0.057}}
                      source={require('./../assets/icon/chapter.png')}
                      />
                      <View>
                        <Text>{`Chapter 1 : ${item.name} `}</Text>
                        <Text style={{fontSize:13,color:'grey'}}>04 NOV 2019 20:30</Text>
                      </View>
                    </TouchableOpacity>           
                    }
                ></FlatList>
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
      height: maxHeightScreen*0.3,
      width: maxWidthScreen*0.95,
      backgroundColor:'white'
    },
    buttonLogin: {
        borderRadius:20,
        backgroundColor:'#2e86de',
        alignItems:'center',
        justifyContent:'center', 
        height:maxHeightScreen*0.07,
        width: maxWidthScreen*0.6,
        marginTop:10 
      },
      fontButton: {
        color:'white',
        fontWeight:'bold'
      },
  })