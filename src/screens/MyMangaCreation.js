import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,FlatList,TouchableOpacity } from 'react-native';
import { Item, Input,Header,Icon, Title} from 'native-base';
import Modal from 'react-native-modal'

const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

export default class MyMangaCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dummyData: [
                {title:'ACT-AGE',image:require('./../assets/cover/cover_dummy4.jpg')},
                {title:'SAIKI KUSUO NO SAINAN',image:require('./../assets/cover/cover_dummy3.jpg')},
                {title:'ONEE-SAN WA JOSHI SHOUGAKUSEI NI KYOUMI GA ARIMASU',image:require('./../assets/cover/cover_dummy2.jpg')}, 
            ],
            modalAppear: false
        };
      }
    
      goToMyCreationChapter = () => {
        this.props.navigation.navigate('MyCreationChapter')
      }
      
      closeModal = () => {
        this.setState({
          modalAppear: false
        })
      }
      addManga = () => {
        this.setState({
          modalAppear: true
        })
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
              <View style={{height:maxHeightScreen*0.70,width:maxWidthScreen*0.90 ,backgroundColor:'white',borderRadius:5}}>
                <View style={{backgroundColor:'#0984e3',height:'12%',width:'100%',justifyContent:'center',alignItems:'center',borderTopStartRadius:5,borderTopEndRadius:5}}>
                  <View style={{height:'95%',width:'90%',justifyContent:'center'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:17}}>Add Manga</Text>
                  </View>
                </View>
                  <View style={{height:'70%',width:'100%',justifyContent:'center',alignItems:'center', }}>
                    <TouchableOpacity style={{borderColor:'grey',borderWidth:1,height:'60%',width:'40%',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <Image 
                      source={require('./../assets/icon/picture.png')}
                      style={{width:'44%',height:'30%'}}
                    />
                    <Text style={{marginTop:10}}>Cover Manga</Text>
                    </TouchableOpacity>
                    <Item regular style={{height:'15%',width:'90%',marginTop:30,borderRadius:5}}>
                  
                     <Input
                      style={styles.input} 
                      placeholder="Input your title manga" />
                    </Item>
                </View>
                <View style={{height:'18%',width:'100%',flexDirection:'row',justifyContent:'center'}}>
            
                <TouchableOpacity 
                  onPress={this.closeModal}
                  style={{height:'60%',width:'45%',backgroundColor:'#e84118',justifyContent:'center',borderRadius:5,alignItems:'center'}}
                >
                  <Text style={{color:'white',fontWeight:'bold'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={this.closeModal}
                  style={{height:'60%',width:'45%',backgroundColor:'#0097e6',borderRadius:5,justifyContent:'center',alignItems:'center'}}
                >
                  <Text style={{color:'white',fontWeight:'bold'}}>Add</Text>
                </TouchableOpacity>
              </View>               
              </View>
            </Modal>
            <View style={styles.allMangas}>
              <View style={styles.listMangas}>
                <View style={{width:'95%',height:'95%'}}>
                    <Text style={{color:'#192a56',width:'100%',height:'7%',fontSize:17, fontWeight:'bold'}}>My Creations</Text>
                    <FlatList
                        style={{height:'70%',width:'100%',}}
                        data={this.state.dummyData}
                        numColumns={3}
                        renderItem={({item})=>
                        <TouchableOpacity
                          onPress ={()=>this.goToMyCreationChapter()}
                        >
                        <Image 
                            source={item.image}
                            style={{width:maxWidthScreen*0.28,height:maxHeightScreen*0.2,borderRadius:3,marginRight:10}}
                        />
                        <View style={{height:maxHeightScreen*0.05,width:maxWidthScreen*0.27}}>
                            <Text numberOfLines={1}>{item.title}</Text>
                        </View>
                        </TouchableOpacity>
                    }
                    keyExtractor = {(item,index)=>index.toString()}
                    />
                    <TouchableOpacity 
                    onPress={this.addManga}
                    style={{height:'13%',alignItems:'center',justifyContent:'center',borderRadius:5,width:'100%',backgroundColor:'blue'}}>
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
})