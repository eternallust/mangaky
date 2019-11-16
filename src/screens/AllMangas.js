import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,FlatList,TouchableOpacity } from 'react-native';
import { Item, Input,Header,Icon} from 'native-base';

import {connect} from 'react-redux'

const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

class AllMangas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dummyData: [
            {title:'ONE PUNCH MAN',image:require('./../assets/cover/cover_dummy7.jpg')},
            {title:'KOMI-SAN WA KOMYUSHOU DESU',image:require('./../assets/cover/cover_dummy5.jpg')},
            {title:'Dignified asleep saeki',image:require('./../assets/cover/cover_dummy.jpg')},
            {title:'HONZUKI NO GEKOKUJOU',image:require('./../assets/cover/cover_dummy6.jpg')},
            {title:'ACT-AGE',image:require('./../assets/cover/cover_dummy4.jpg')},
            {title:'SAIKI KUSUO NO SAINAN',image:require('./../assets/cover/cover_dummy3.jpg')},
            {title:'ONEE-SAN WA JOSHI SHOUGAKUSEI NI KYOUMI GA ARIMASU',image:require('./../assets/cover/cover_dummy2.jpg')}, 
        ]
    };
  }

  goToDetailManga = (mangaId) => {
      this.props.navigation.navigate('DetailManga',mangaId)
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
            <View style={styles.containerAllManga}>
              <View style={styles.insideContainerAllManga}>
                <Text
                style={styles.header}>All Mangas</Text>
              </View>
              <FlatList
              showsHorizontalScrollIndicator ={false}
              numColumns={3}
              data={this.props.mangaLocal.manga}
              renderItem={({item})=>
                <TouchableOpacity 
                style={{marginRight:10}}
                onPress={()=>this.goToDetailManga(item.id)}
                >
                  <View style={{height:maxHeightScreen*0.2,}}>
                    <Image 
                      source={item.cover}
                      style={styles.coverManga}
                    />
                  </View>
                  <View style={styles.textTitle}>
                    <Text numberOfLines={1}>{item.title}</Text>
                  </View>
            </TouchableOpacity>
            }
            keyExtractor = {(item,index)=>index.toString()}
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
      height: maxHeightScreen*0.82,
      width: maxWidthScreen*0.95,
      backgroundColor:'white'
    },
    containerAllManga: {
      height:maxHeightScreen*0.8,
      width:maxWidthScreen*0.9
    },
    insideContainerAllManga: {
      height:maxHeightScreen*0.05,
      width:maxWidthScreen*0.90
    },
    header: {
      color:'#192a56',
      fontWeight:'bold'
    },
    coverManga: {
      width:maxWidthScreen*0.28,
      height:maxHeightScreen*0.2,
      borderRadius:3
    },
    textTitle: {
      height:maxHeightScreen*0.05,
      width:maxWidthScreen*0.27
    }

  })

  const mapStateToProps = state => {
    return {
      mangaLocal: state.manga // reducers/index.js
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
     
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllMangas);