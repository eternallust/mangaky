import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,FlatList,TouchableOpacity,AsyncStorage } from 'react-native';
import { Item, Input,Header,Icon} from 'native-base';
import jwt_decode from 'jwt-decode';

const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

import {connect} from 'react-redux'
import * as actionChapter from '../redux/actions/actionChapter'
import * as actionFavorite from '../redux/actions/actionFavorite'


class MangaChapter extends Component {
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
  addFavorite = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    const data = jwt_decode(token)
    const userId = data.userId
    const mangaId = this.props.mangaLocal.detailManga.id
    await this.props.addFavorite(userId,mangaId)
    await this.props.getDetailFavorite(userId,mangaId)
  }
  delFavorite = async(favoriteId) => {
    await this.props.deleteFavorite(favoriteId)
    const token = await AsyncStorage.getItem('user-token')
    const data = jwt_decode(token)
    const userId = data.userId
    const mangaId = this.props.mangaLocal.detailManga.id
    await this.props.getDetailFavorite(userId,mangaId)
    await this.props.getUserFavorite(userId)
  }
  formatDate = (time) => {
    var dt = new Date(time);
    var mo = ["JAN", "FEB", "MAR", "APR", "May", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var string =`${dt.getDate()} ${mo[dt.getMonth()]} ${dt.getFullYear()}`
    return string;
  }
  goToReadManga = () => {
    this.props.navigation.navigate('ReadManga')
  }

  componentDidMount = async() => {
    const token = await AsyncStorage.getItem('user-token')
    const data = jwt_decode(token)
    const userId = data.userId
    const mangaId = this.props.mangaLocal.detailManga.id
    await this.props.getChapterManga(mangaId)
    await this.props.getDetailFavorite(userId,mangaId)
    // console.log(await this.props.favoriteLocal.detailFavorite.id)
  }
  render() {
    // alert(this.props.favoriteLocal.detailFavorite.id)
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
            <View style={styles.containerDetailManga}>
              <Image 
              style={styles.coverManga}
              source={this.props.mangaLocal.detailManga.cover}
              />
              <View style={styles.containerTitleManga}>
                <Text style={styles.titleManga}>{this.props.mangaLocal.detailManga.title}</Text>
                <View style={{height:maxHeightScreen*0.15,width:maxWidthScreen*0.6,}}>
                    {/* AUTHOR */}
                    <View style={{flexDirection:'row'}}>
                        <Image 
                        style={styles.icon}
                        source={require('./../assets/icon/author.png')}
                        />
                        <Text style={{fontSize:12}}>AUTHOR(S) : </Text>
                        <Text
                         numberOfLines={2} 
                         style={styles.textDesc}>
                          {this.props.mangaLocal.detailManga.user.name}
                        </Text>
                    </View>
                    {/* GENRE */}
                    <View style={{flexDirection:'row'}}>
                        <Image 
                        style={styles.icon}
                        source={require('./../assets/icon/genre.png')}
                        />
                        <Text style={{fontSize:12}}>GENRE : </Text>
                        <Text
                         numberOfLines={2} 
                         style={styles.textDesc}>
                          {this.props.mangaLocal.detailManga.genre}
                        </Text>
                    </View>
                    {/* ONGOING */}
                    <View style={{flexDirection:'row'}}>
                        <Image 
                        style={styles.icon}
                        source={require('./../assets/icon/ongoing.png')}
                        />
                        <Text style={{fontSize:12}}>STATUS : </Text>
                        <Text
                        numberOfLines={2} 
                        style={styles.textDesc}>
                          {
                            this.props.mangaLocal.detailManga.status==1
                            ?'ONGOING'
                            :'FINISHED'
                          }
                        </Text>
                    </View>
                    {/* LAST UPDATED */}
                    <View style={{flexDirection:'row'}}>
                        <Image 
                        style={styles.icon}
                        source={require('./../assets/icon/lastupdated.png')}
                        />
                        <Text style={{fontSize:12}}>LAST UPDATED : </Text>
                        <Text
                        numberOfLines={2} 
                        style={styles.textDesc}>
                          {this.formatDate(this.props.mangaLocal.detailManga.updatedAt)}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity 
                 style={
                   this.props.favoriteLocal.detailFavorite.id==null?
                   styles.buttonFav:styles.buttonFavDel
                  }
                 onPress={
                  this.props.favoriteLocal.detailFavorite.id==null ?
                  this.addFavorite : ()=>this.delFavorite(this.props.favoriteLocal.detailFavorite.id)
                  }>
                    <View style={{flexDirection:'row'}}>
                        <Image 
                            style={{height:maxHeightScreen*0.035,marginRight:5,width:maxWidthScreen*0.057}}
                            source={require('./../assets/icon/star.png')}
                        />
                        <Text style={{color:'white',fontWeight:'bold'}}>
                          {
                            this.props.favoriteLocal.detailFavorite.id==null?
                            'Mark As Favorite':'Favorited'
                          }
                        </Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.containerChapter}>
              <View style={{width: maxWidthScreen*0.9,height: maxHeightScreen*0.47}}>
              <Text style={styles.headerChapter}>Dignified Asleep Saeki Chapters</Text>
                <FlatList
                    data={this.props.chapterLocal.chapterManga}
                    renderItem={({item})=>
                    <TouchableOpacity 
                      style={{flexDirection:'row',alignItems:'center'}}
                      onPress={()=>this.goToReadManga()}>
                      <Image
                      style={{height:maxHeightScreen*0.04,marginRight:5,width:maxWidthScreen*0.057}}
                      source={require('./../assets/icon/chapter.png')}
                      />
                      <View>
                        <Text>{`Chapter ${item.number_chapter} : ${item.chapter_name} `}</Text>
                        <Text style={{fontSize:13,color:'grey'}}>
                          {this.formatDate(item.updatedAt)}
                        </Text>
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
    
    buttonFav: {
      borderRadius:10,
      height:maxHeightScreen*0.065,
      alignItems:'center',
      justifyContent:'center'
      ,marginRight:5,
      width:maxWidthScreen*0.43,
      backgroundColor:'#e84118'
    },
    buttonFavDel: {
      borderRadius:10,
      height:maxHeightScreen*0.065,
      alignItems:'center',
      justifyContent:'center'
      ,marginRight:5,
      width:maxWidthScreen*0.43,
      backgroundColor:'#273c75'
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
    containerDetailManga: {
      flexDirection:'row',
      height:maxHeightScreen*0.25,
      width:maxWidthScreen*0.9
    },
    coverManga: {
      height:maxHeightScreen*0.25,
      width:maxWidthScreen*0.27,
      borderRadius:5
    },
    containerTitleManga: {
      height:maxHeightScreen*0.25,
      width:maxWidthScreen*0.6,
      marginLeft:5
    },
    titleManga: {
      fontSize:17,
      color:'#192a56',
      fontWeight:'bold'
    },
    icon: {
      height:maxHeightScreen*0.025,
      marginRight:5,
      width:maxWidthScreen*0.04
    },
    textDesc: {
      fontSize:12,
      width:maxWidthScreen*0.35
    },
    containerChapter: {
      marginTop:10,
      alignItems:'center',
      justifyContent:'center',
      height: maxHeightScreen*0.5,
      borderRadius:10,
      width: maxWidthScreen*0.95,
      backgroundColor:'white'
    },
    headerChapter: {
      color:'#192a56',
      fontWeight:'bold',
      fontSize:17,
      marginBottom:10
    }
  })
  const mapStateToProps = state => {
    return {
      mangaLocal: state.manga, // reducers/index.js
      chapterLocal: state.chapter,
      favoriteLocal: state.favorite
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      getChapterManga: (mangaId) => dispatch(actionChapter.getChapterManga(mangaId)),
      addFavorite: (userId,mangaId) => dispatch(actionFavorite.addFavorite(userId,mangaId)),
      getDetailFavorite: (userId,mangaId) => dispatch(actionFavorite.getDetailFavorite(userId,mangaId)),
      deleteFavorite: (favoriteId) => dispatch(actionFavorite.deleteFavorite(favoriteId)),
      getUserFavorite: (userId) => dispatch(actionFavorite.getUserFavorite(userId))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MangaChapter);