import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,FlatList,TouchableOpacity } from 'react-native';
import { Item, Input,Header,Icon} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import ImageSlider from 'react-native-image-slider';

import {connect} from 'react-redux'
import * as actionManga from '../redux/actions/actionManga'

const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyData: [
        {title:'ACT-AGE',image:require('./../assets/cover/cover_dummy4.jpg')},
        {title:'SAIKI KUSUO NO SAINAN',image:require('./../assets/cover/cover_dummy3.jpg')},
        {title:'ONEE-SAN WA JOSHI SHOUGAKUSEI NI KYOUMI GA ARIMASU',image:require('./../assets/cover/cover_dummy2.jpg')}, 
      ],
      dummyAllData: [
        {title:'KOMI-SAN WA KOMYUSHOU DESU',image:require('./../assets/cover/cover_dummy5.jpg')},
        {title:'Dignified asleep saeki',image:require('./../assets/cover/cover_dummy.jpg')},
        {title:'HONZUKI NO GEKOKUJOU',image:require('./../assets/cover/cover_dummy6.jpg')},
        {title:'ACT-AGE',image:require('./../assets/cover/cover_dummy4.jpg')},
        {title:'SAIKI KUSUO NO SAINAN',image:require('./../assets/cover/cover_dummy3.jpg')},
        {title:'ONEE-SAN WA JOSHI SHOUGAKUSEI NI KYOUMI GA ARIMASU',image:require('./../assets/cover/cover_dummy2.jpg')}, 
      ],
    };
  }

  goToAllMangaScreen = () =>{
    this.props.navigation.navigate('AllMangas')
  }

  componentDidMount = () => {
    this.props.getAllManga()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header searchBar rounded style={{backgroundColor:'#0984e3'}}>
          <Item rounded style={{height:'70%'}}>
            <Input
              style={styles.input} 
              placeholder="Search for mangas" />
            <Icon name="search" style={{marginRight:10}} />
          </Item>
        </Header>
        <View style={styles.carousel}>
          <ImageSlider
            autoPlayWithInterval={3000}
            customSlide={({ index, item}) => (
              <View key={index}>
                
                <Image source={{ uri: item }} style={{height:maxHeightScreen*0.3,width:maxWidthScreen}} />
                
              </View>
            )}
            images={[
              'https://gemr.com/wp-content/uploads/2017/11/5256-SeriesHeaders_OPM_2000x800-1024x410.jpg',
              'https://cdn.iview.abc.net.au/thumbs/1200/zw/ZW2034A_5d6de327dd53d.jpg',
              'https://media.cdn.adultswim.com/uploads/20190819/198191720334-DrStone__searchImage_.jpg'
          ]}/>
        </View>
        <View style={styles.recomendedManga}>
          <View style={styles.listRecomendedManga}>
            <View style={styles.containerRecManga}>
            <View style={styles.insideContainerRecManga}>
              <Text
              style={styles.header}>Recommended Mangas</Text>
            </View>
           <FlatList
            showsHorizontalScrollIndicator ={false}
            horizontal={true}
            data={this.state.dummyData}
            renderItem={({item})=>
            <View style={{marginRight:10}}>
              <View style={{height:maxHeightScreen*0.2,}}>
                <Image 
                  source={item.image}
                  style={styles.coverManga}
                />
              </View>
              <View style={styles.textTitle}>
                <Text numberOfLines={1}>{item.title}</Text>
              </View>
            </View>
            }
            keyExtractor = {(item,index)=>index.toString()}
           />
          
            </View>
           
          </View>
        </View>
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
            data={this.props.mangaLocal.manga.slice(0,6)}
            renderItem={({item})=>
            <View style={{marginRight:10}}>
              <View style={{height:maxHeightScreen*0.2,}}>
                <Image 
                  source={item.cover}
                  style={styles.coverManga}
                />
              </View>
              <View style={styles.textTitle}>
                <Text numberOfLines={1}>{item.title}</Text>
              </View>
            </View>
            }
            keyExtractor = {(item,index)=>index.toString()}
           />
           <TouchableOpacity style={styles.buttonLogin} onPress={this.goToAllMangaScreen}>
              <Text style={styles.fontButton} >View All Manga</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
  carousel: {
    height:maxHeightScreen*0.30, 
    width: maxWidthScreen, 
    backgroundColor:'blue'
  },
  recomendedManga: {
    height:maxHeightScreen*0.35, 
    width: maxWidthScreen, 
    alignItems:'center', 
    justifyContent:'center',
    
  },
  listRecomendedManga: {
    borderRadius:10,
    height:maxHeightScreen*0.34, 
    width: maxWidthScreen*0.95, 
    alignSelf:'center',
    backgroundColor:'white',
    alignItems:'center', 
    justifyContent:'center',
  
  },
  allMangas: {
    alignItems:'center', 
    height:maxHeightScreen*0.70, 
    width: maxWidthScreen, 
  },
  listMangas: {
    alignItems:'center', 
    justifyContent:'center',
    borderRadius: 10,
    height: maxHeightScreen*0.69,
    width: maxWidthScreen*0.95,
    backgroundColor:'white'
  },
  buttonLogin: {
    borderRadius:20,
    backgroundColor:'#2e86de',
    alignItems:'center',
    justifyContent:'center', 
    height:maxHeightScreen*0.08,
    width: maxWidthScreen*0.9,
    marginTop:10 
  },
  fontButton: {
    color:'white',
    fontWeight:'bold'
  },
  containerRecManga: {
    height:maxHeightScreen*0.3,
    width:maxWidthScreen*0.9
  },
  insideContainerRecManga: {
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
  },
  containerAllManga: {
    height:maxHeightScreen*0.65,
    width:maxWidthScreen*0.9
  },
  insideContainerAllManga: {
    height:maxHeightScreen*0.05,
    width:maxWidthScreen*0.90
  }
})

const mapStateToProps = state => {
  return {
    mangaLocal: state.manga // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllManga: () => dispatch(actionManga.getAllManga())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);