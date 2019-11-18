import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,FlatList,TouchableOpacity,AsyncStorage } from 'react-native';
import { Item, Input,Header,Icon, Title} from 'native-base';
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-picker';
import {storage} from '../firebase'
import * as fb from 'firebase'
import {connect} from 'react-redux'
import * as actionManga from '../redux/actions/actionManga'
import jwt_decode from 'jwt-decode';

const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

class MyMangaCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dummyData: [
                {title:'ACT-AGE',image:require('./../assets/cover/cover_dummy4.jpg')},
                {title:'SAIKI KUSUO NO SAINAN',image:require('./../assets/cover/cover_dummy3.jpg')},
                {title:'ONEE-SAN WA JOSHI SHOUGAKUSEI NI KYOUMI GA ARIMASU',image:require('./../assets/cover/cover_dummy2.jpg')}, 
            ],
            modalAppear: false,
            coverManga:null,
            urlCover:'',
            title:''
        };
      }
      handleCamera=()=>{
        const options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              let tmpPhoto = {
                uri: response.uri,
                type: response.type,
                name: response.fileName,
              };
              const source = response;
              this.setState({
                coverManga: tmpPhoto,
              });
            }
          });
      }

      renderEmptyCover = () => {
        return(
        <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
          <Image 
            source={require('./../assets/icon/picture.png')}
            style={{width:'44%',height:'30%'}}
          />
          <Text style={{marginTop:10}}>Cover Manga</Text>
        </View>
        )
      }

      renderSelectedCover = () =>{
        return(
          <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
            <Image 
              source={{uri:this.state.coverManga.uri}}
              style={{width:'100%',height:'100%'}}
            />
          </View>
          )
      }

      goToMyCreationChapter = (mangaId) => {
        this.props.navigation.navigate('MyCreationChapter',mangaId)
      }
      
      closeModal = () => {
        this.setState({
          modalAppear: false
        })
      }
     
      openModal = () => {
        this.setState({
          modalAppear: true
        })
      }

      addManga = async() =>{
        const token = await AsyncStorage.getItem('user-token')
        const data = jwt_decode(token)
        const userId = data.userId
        const formData = new FormData()
        formData.append('user_id',userId)
        formData.append('title',this.state.title)
        formData.append('cover',this.state.coverManga)
        await this.props.addManga(formData)
        await this.props.mangaUser(userId)
        this.closeModal()
        alert('Please add chapter and page after adding your manga')
      }
      
      
      // uploadCover = async() => {
      //   const dataCover = await this.state.coverManga;
      //   var anjing = `data:image/png;base64,${dataCover.data}`
      //   var bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
      //   const uploadTask = storage.ref().child(dataCover.path)
      //   uploadTask.on(
      //     'promise',
      //     (loading) => {
      //       // loading function....
      //     },
      //     (error) => {
      //       // error function....
      //       console.log(error)
      //     },
      //     () => {
      //       // fulfilled function....
      //       storage.ref('cover').child(dataCover.name).getDownloadURL().then(url =>{
      //        this.setState({
      //         urlCover: url
      //        }) 
      //       })
      //     }
      //   )
      //   alert(dataCover.path)
      // }
      componentDidMount = async() => {
        const token = await AsyncStorage.getItem('user-token')
        const data = jwt_decode(token)
        const userId = data.userId
        await this.props.mangaUser(userId)
      }
      render() {
        let coba = true
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
              <View style={styles.modalContainer}>
                <View style={styles.Header}>
                  <View style={styles.nameHeader}>
                    <Text style={styles.textHeader}>Add Manga</Text>
                  </View>
                </View>
                <View style={styles.formAdd}>
                  <TouchableOpacity
                    onPress={this.handleCamera}
                    style={styles.cover}>
                    {
                      this.state.coverManga==null?
                      this.renderEmptyCover() :
                      this.renderSelectedCover()
                    }
                  </TouchableOpacity>
                  <Item regular style={styles.title}>
                    <Input
                      style={styles.input} 
                      placeholder="Input your title manga" 
                      onChangeText={(text) => this.setState({ title: text })}/>
                  </Item>
                </View>
                <View style={styles.containerButton}>
                  <TouchableOpacity 
                    onPress={this.closeModal}
                    style={styles.buttonCancel}
                  >
                    <Text style={{color:'white',fontWeight:'bold'}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={this.addManga}
                    style={styles.buttonAdd}
                  >
                    <Text style={{color:'white',fontWeight:'bold'}}>Add</Text>
                  </TouchableOpacity>
                </View>               
              </View>
            </Modal>
            <View style={styles.allMangas}>
              <View style={styles.listMangas}>
                <View style={{width:'95%',height:'95%'}}>
                    <Text style={styles.textMyCreation}>My Creations</Text>
                    <FlatList
                        style={{height:'70%',width:'100%',}}
                        data={this.props.mangaLocal.mangaUser}
                        numColumns={3}
                        renderItem={({item})=>
                        <TouchableOpacity
                          onPress ={()=>this.goToMyCreationChapter(item.id)}
                        >
                        <Image 
                            source={item.cover}
                            style={styles.cover}
                        />
                        <View style={{height:maxHeightScreen*0.05,width:maxWidthScreen*0.27}}>
                            <Text numberOfLines={1}>{item.title}</Text>
                        </View>
                        </TouchableOpacity>
                    }
                    keyExtractor = {(item,index)=>index.toString()}
                    />
                    <TouchableOpacity 
                    onPress={this.openModal}
                    style={styles.buttonAddManga}>
                      <Text style={{fontWeight:'bold',color:'white'}}>Add My Manga</Text>  
                    </TouchableOpacity>                   
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
    modalContainer: {
      height:maxHeightScreen*0.70,
      width:maxWidthScreen*0.90 ,
      backgroundColor:'white',
      borderRadius:5
    },
    Header: {
      backgroundColor:'#0984e3',
      height:'12%',
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      borderTopStartRadius:5,
      borderTopEndRadius:5
    },
    nameHeader: {
      height:'95%',
      width:'90%',
      justifyContent:'center'
    },
    textHeader: {
      color:'white',
      fontWeight:'bold',
      fontSize:17
    },
    formAdd: {
      height:'70%'
      ,width:'100%',
      justifyContent:'center',
      alignItems:'center', 
    },
    cover: {
      borderColor:'grey',
      borderWidth:1,
      height:'60%',
      width:'40%',
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center'
    },
    title: {
      height:'15%',
      width:'90%',
      marginTop:30,
      borderRadius:5
    },
    buttonCancel:{
      height:'60%',
      width:'45%',
      backgroundColor:'#e84118',
      justifyContent:'center',
      borderRadius:5,
      alignItems:'center'
    },
    buttonAdd: {
      height:'60%',
      width:'45%',
      backgroundColor:'#0097e6',
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center'
    },
    containerButton: {
      height:'18%',
      width:'100%',
      flexDirection:'row',
      justifyContent:'center'
    },
    textMyCreation:{
      color:'#192a56',
      width:'100%',
      height:'7%',
      fontSize:17, 
      fontWeight:'bold'
    },
    cover:{
      width:maxWidthScreen*0.28,
      height:maxHeightScreen*0.2,
      borderRadius:3,
      marginRight:10
    },
    buttonAddManga: {
      height:'13%',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:5,
      width:'100%',
      backgroundColor:'#192a56'
    }
})
const mapStateToProps = state => {
  return {
    mangaLocal: state.manga // reducers/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    mangaUser: (userId) => dispatch(actionManga.getMangaUser(userId)),
    addManga: (dataManga) => dispatch(actionManga.addManga(dataManga)),
   
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMangaCreation);