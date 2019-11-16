import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,FlatList,TouchableOpacity } from 'react-native';
import { Item, Input,Header,Icon} from 'native-base';

const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

import {connect} from 'react-redux'
import * as actionManga from '../redux/actions/actionManga'

class DetailManga extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goToMangaChapterScreen = () => {
    this.props.navigation.navigate('MangaChapter')
  }

  componentDidMount = () => {
    const mangaId = this.props.navigation.state.params
    this.props.getDetailManga(mangaId)
    console.log(this.props.mangaLocal.detailManga.title)
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
            <View style={styles.containerDetailManga}>
              <View style={styles.insideContainerDetailManga}>
                  <View style={{height:maxHeightScreen*0.35,}}>
                    <Image
                    style={styles.cover} 
                    source={this.props.mangaLocal.detailManga.cover}
                    ></Image>
                  </View>
                  <View style={styles.textTitle}>
                      <Text style={styles.valueTitle}>{this.props.mangaLocal.detailManga.title}</Text>
                  </View>
                  <View style={{height:maxHeightScreen*0.25}}>
                    <Text>{this.props.mangaLocal.detailManga.synopsis}</Text>
                  </View>
                  <View style={{height:maxHeightScreen*0.08,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity style={styles.buttonLogin} onPress={this.goToMangaChapterScreen}>
                        <Text style={styles.fontButton} >Read Now</Text>
                    </TouchableOpacity>
                  </View>
              </View>
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
      height: maxHeightScreen*0.82,
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
    containerDetailManga: {
      height:maxHeightScreen*0.8,
      width:maxWidthScreen*0.9,
      alignItems:'center',
      justifyContent:'center',
    },
    insideContainerDetailManga: {
      height:maxHeightScreen*0.75, 
      width:maxWidthScreen*0.85
    },
    cover: {
      height:maxHeightScreen*0.35,
      borderRadius:5,alignSelf:'center',
      width:maxWidthScreen*0.4
    },
    textTitle:{
      height:maxHeightScreen*0.07,
      alignItems:'center',
      justifyContent:'center'
    },
    valueTitle: {
      fontSize:17,
      color:'#192a56',
      fontWeight:'bold'
    }


  })

  const mapStateToProps = state => {
    return {
      mangaLocal: state.manga // reducers/index.js
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      getDetailManga: (mangaId) => dispatch(actionManga.getDetailManga(mangaId))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailManga);