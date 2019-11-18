import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,FlatList,TouchableOpacity,TextInput,AsyncStorage } from 'react-native';
import { Item, Input,Header,Icon} from 'native-base';
import Modal from 'react-native-modal'

const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux'
import * as actionManga from '../redux/actions/actionManga'
import * as actionChapter from '../redux/actions/actionChapter'

class myCreationChapter extends Component {
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
    ],
      titleManga:'',
      genre:'',
      synopsis:'',
      status:'',
      chapter_name:'',
      chapterNumber:''
    };
  }

  closeModal = (synopsis) => {
    this.setState({
      synopsis: synopsis,
      modalAppear: false,
    })
  }

  openModal = () => {
    this.setState({
      modalAppear: true
    })
  }

  goToPageManga = () => {
    this.props.navigation.navigate('PageChapter')
  }

  updateManga = async() => {
    const mangaId = this.props.navigation.state.params
    const dataManga = {
      title: this.state.titleManga,
      genre: this.state.genre,
      synopsis: this.state.synopsis,
      id: mangaId
    }
    await this.props.updateManga(dataManga)
    await this.props.getDetailManga(mangaId)
    await this.props.getAllManga()
    this.closeModal(this.state.synopsis)
  }

  deleteManga = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    const data = jwt_decode(token)
    const userId = data.userId
    const mangaId = this.props.navigation.state.params
    await this.props.deleteManga(mangaId)
    await this.props.mangaUser(userId)
    await this.props.getAllManga()
    alert('Delete Manga Success')
    this.props.navigation.navigate('Home')
  }

  addChapter = async() => {
    const mangaId = this.props.navigation.state.params
    const dataChapter = {
      chapterName: this.state.chapterName,
      numberChapter: this.state.chapterNumber,
      mangaId: mangaId
    }
    await this.props.addChapter(dataChapter)
    await this.props.getChapterManga(mangaId)
    this.closeModal(this.state.synopsis)
  }

  deleteChapter = async(chapterId) => {
    const mangaId = this.props.navigation.state.params
    await this.props.deleteChapter(chapterId)
    await this.props.getChapterManga(mangaId)
  }

  componentDidMount = async() => {
    const mangaId = this.props.navigation.state.params
    await this.props.getDetailManga(mangaId)
    await this.props.getChapterManga(mangaId)
    this.setState({
      titleManga: this.props.mangaLocal.detailManga.title,
      genre: this.props.mangaLocal.detailManga.genre,
      synopsis: this.props.mangaLocal.detailManga.synopsis,
      author: this.props.mangaLocal.detailManga.user.name
    })  
  }

  formatDate = (time) => {
    var dt = new Date(time);
    var mo = ["JAN", "FEB", "MAR", "APR", "May", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var string =`${dt.getDate()} ${mo[dt.getMonth()]} ${dt.getFullYear()}`
    return string;
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
        <Modal isVisible = {this.state.modalAppear}>
          <View style={{height:maxHeightScreen*0.95,width:maxWidthScreen*0.9 ,backgroundColor:'white',borderRadius:5}}>
            <View style={{backgroundColor:'#0984e3',height:'10%',width:'100%',justifyContent:'center',alignItems:'center',borderTopStartRadius:5,borderTopEndRadius:5}}>
              <View style={{height:'95%',width:'90%',justifyContent:'center'}}>
                  <Text style={{color:'white',fontWeight:'bold',fontSize:17}}>Edit Manga</Text>
                </View>
              </View>
              <View style={{height:'70%',width:'100%',justifyContent:'center',alignItems:'center', }}>
                 <View style={{height:'35%',width:'30%'}}>
                        <Image 
                            style={{height:'100%',width:'100%',borderRadius:5}}
                            source={require('./../assets/cover/cover_dummy.jpg')}
                        />
                    </View>
                    <View style={{height:'60%',width:'95%',alignItems:'center',justifyContent:'center'}}>
                        <View style={{height:'95%',width:'100%',}}>
                            <Item regular style={{height:'20%',width:'98%',marginTop:10,borderRadius:5}}>
                                <Input
                                    onChangeText={(text) => this.setState({ titleManga: text })}
                                    value={this.state.titleManga}
                                    style={styles.input} 
                                    placeholder="Input your title manga" />
                            </Item>
                            <Item regular style={{height:'20%',width:'98%',marginTop:10,borderRadius:5}}>
                                <Input
                                    onChangeText={(text) => this.setState({ genre: text })}
                                    value={this.state.genre}
                                    style={styles.input} 
                                    placeholder="Input your title genre" />
                            </Item>
                            <Item regular style={{height:'50%',width:'98%',marginTop:10,borderRadius:5}}>
                                <TextInput
                                    onChangeText={(text) => this.setState({ synopsis: text })}
                                    multiline = {true}
                                    numberOfLines = {4}
                                    style={styles.input} 
                                    placeholder="Input your title manga" 
                                    />
                            </Item>
                        </View>
                    </View>
                </View>
                <View style={{height:'10%',alignItems:'center',flex:1,width:'100%',  justifyContent:'center'}}>
                  <View style={{flexDirection:'row',height:'40%'}}>
                    <TouchableOpacity 
                      onPress={()=>this.closeModal(this.props.mangaLocal.detailManga.synopsis)}
                      style={{height:'100%',width:'45%',backgroundColor:'#e84118',justifyContent:'center',borderRadius:5,alignItems:'center'}}
                      >
                      <Text style={{color:'white',fontWeight:'bold'}}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                      onPress={this.updateManga}
                      style={{height:'100%',width:'45%',backgroundColor:'#0097e6',borderRadius:5,justifyContent:'center',alignItems:'center'}}
                      >
                    <Text style={{color:'white',fontWeight:'bold'}}>update</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity 
                      onPress={this.closeModal}
                      style={{height:'40%',marginTop:2,width:'90%',backgroundColor:'#0097e6',borderRadius:5,justifyContent:'center',alignItems:'center'}}
                      >
                    <Text style={{color:'white',fontWeight:'bold'}}>Finish This Manga</Text>
                    </TouchableOpacity>
                 
              </View>               
              </View>
            </Modal>
        <View style={styles.allMangas}>
          <View style={styles.listMangas}>
            <View style={styles.containerDetailManga}>
              <Image 
               style={styles.coverManga}
               source={require('./../assets/cover/cover_dummy.jpg')}
              />
              <View style={styles.containerInfoManga}>
                <Text style={styles.titleManga}>
                  {this.props.mangaLocal.detailManga.title}
                </Text>
                <View style={styles.infoManga}>
                  {/* AUTHOR */}
                  <View style={{flexDirection:'row'}}>
                    <Image 
                      style={styles.icon}
                      source={require('./../assets/icon/author.png')}
                    />
                        <Text style={{fontSize:12}}>AUTHOR(S) : </Text>
                        <Text
                         numberOfLines={2} 
                         style={styles.textDetailManga}>
                          {this.state.author}
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
                         style={styles.textDetailManga}>
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
                        style={styles.textDetailManga}>
                          {this.props.mangaLocal.detailManga.status==1?
                           'ONGOING':
                           'FINISHED'
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
                        style={styles.textDetailManga}>
                          {this.formatDate(this.props.mangaLocal.detailManga.createdAt)}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',height:'27%'}}>
                <TouchableOpacity
                onPress={this.openModal} 
                style={{flexDirection:'row',borderRadius:5,height:'100%',alignItems:'center',
                justifyContent:'center',width:'50%',backgroundColor:'#273c75'}}>
                    <Image 
                        style={{height:'50%',width:'20%',marginRight:10}}
                        source={require('./../assets/icon/edit.png')}
                    />
                    <Text style={{color:'white',fontWeight:'bold'}}>Edit </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={this.deleteManga}
                style={{borderRadius:5,height:'100%',alignItems:'center',
                justifyContent:'center',width:'20%',backgroundColor:'#e84118'}}>
                  <Image 
                        style={{height:'50%',width:'50%'}}
                        source={require('./../assets/icon/garbage.png')}
                        />
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.containerListChapter}>
            <View style={styles.listChapter}>
              <Text style={styles.listChapterTitle}>
                {`${this.props.mangaLocal.detailManga.title} Chapters`}
              </Text>
                <FlatList
                    data={this.props.chapterLocal.chapterManga}
                    renderItem={({item})=>
                    <TouchableOpacity 
                      style={{flexDirection:'row',alignItems:'center'}}
                      onPress={()=>this.goToPageManga()}
                    >
                      <Image
                      style={{height:maxHeightScreen*0.04,marginRight:5,width:maxWidthScreen*0.057}}
                      source={require('./../assets/icon/chapter.png')}
                      />
                      <View>
                        <Text>{`Chapter ${item.number_chapter} : ${item.chapter_name} `}</Text>
                        <Text style={{fontSize:13,color:'grey'}}>
                          {this.formatDate(this.props.mangaLocal.detailManga.createdAt)}
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
      coverManga:{
        height:maxHeightScreen*0.25,
        width:maxWidthScreen*0.27
        ,borderRadius:5
      },
      containerInfoManga:{
        height:maxHeightScreen*0.25,
        width:maxWidthScreen*0.6,
        marginLeft:5
      },
      titleManga: {
        fontSize:17,
        color:'#192a56',
        fontWeight:'bold'
      },
      infoManga: {
        height:maxHeightScreen*0.15,
        width:maxWidthScreen*0.6
      },
      icon: {
        height:maxHeightScreen*0.025,
        marginRight:5,
        width:maxWidthScreen*0.04
      },
      textDetailManga: {
        fontSize:12,
        width:maxWidthScreen*0.35
      },
      containerListChapter: {
        marginTop:10,
        alignItems:'center',
        justifyContent:'center',
        height: maxHeightScreen*0.5,
        borderRadius:10,
        width: maxWidthScreen*0.95,
        backgroundColor:'white'
      },
      listChapter: {
        width: maxWidthScreen*0.9,
        height: maxHeightScreen*0.47
      },
      listChapterTitle: {
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
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      mangaUser: (userId) => dispatch(actionManga.getMangaUser(userId)),
      getChapterManga: (mangaId) => dispatch(actionChapter.getChapterManga(mangaId)),
      getDetailManga: (mangaId) => dispatch(actionManga.getDetailManga(mangaId)),
      updateManga: (dataManga) => dispatch(actionManga.updateManga(dataManga)),
      getAllManga: () => dispatch(actionManga.getAllManga()),
      deleteManga: (mangaId) => dispatch(actionManga.deleteManga(mangaId)),
      addChapter: (mangaId) => dispatch(actionChapter.addChapterManga(mangaId)),
      deleteChapter: (chapterId) => dispatch(actionChapter.deleteChapter(chapterId))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(myCreationChapter);