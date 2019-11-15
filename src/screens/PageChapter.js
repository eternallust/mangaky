import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet,Image,TouchableOpacity,FlatList } from 'react-native';
import { Item, Input,Header,Icon} from 'native-base';
import Modal from 'react-native-modal'
const maxWidthScreen = Dimensions.get('window').width;
const maxHeightScreen = Dimensions.get('window').height;

export default class PageChapter extends Component {
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
        ],
        
    };
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
        <Modal isVisible = {this.state.modalAppear}>
              <View style={{height:maxHeightScreen*0.70,width:maxWidthScreen*0.90 ,backgroundColor:'white',borderRadius:5}}>
                <View style={{backgroundColor:'#0984e3',height:'12%',width:'100%',justifyContent:'center',alignItems:'center',borderTopStartRadius:5,borderTopEndRadius:5}}>
                  <View style={{height:'95%',width:'90%',justifyContent:'center'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:17}}>Add Page</Text>
                  </View>
                </View>
                  <View style={{height:'70%',width:'100%',justifyContent:'center',alignItems:'center', }}>
                    <TouchableOpacity style={{borderColor:'grey',borderWidth:1,height:'60%',width:'40%',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                    <Image 
                      source={require('./../assets/icon/picture.png')}
                      style={{width:'44%',height:'30%'}}
                    />
                    <Text style={{marginTop:10}}>Image Page</Text>
                    </TouchableOpacity>
                    <Item regular style={{height:'15%',width:'90%',marginTop:30,borderRadius:5}}>
                  
                     <Input
                      style={styles.input} 
                      placeholder="Number Page" />
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
            <View style={{height:'95%',width:'95%',}}>
            <Text
              style={{color:'#192a56',alignItems:'center',fontWeight:'bold',marginBottom:10}}>Recommended Mangas</Text>
                <View style={{height:'80%',width:'100%'}}>
                <FlatList
                    data={this.state.pageDummy}
                    renderItem={({item,index})=>
                    <View style={{justifyContent:'space-between',marginBottom:10}}>
                      <View
                      style={{flexDirection:'row',alignItems:'center'}}
                      >
                        <TouchableOpacity>
                          <Image
                          style={{height:maxHeightScreen*0.13,marginRight:5,width:maxWidthScreen*0.18}}
                          source={item.page}
                          />
                        </TouchableOpacity>
                     
                        <View style={{height:maxHeightScreen*0.13,width:'100%',justifyContent:'space-between'}}>
                          <View>
                            <Text>{`Page ${index+1} `}</Text>
                            <Text style={{fontSize:13,color:'grey'}}>04 NOV 2019 20:30</Text>
                          </View>
                          <View style={{flexDirection:'row',height:'50%',width:'100%'}}>
                            <TouchableOpacity style={{height:'100%',width:'30%',backgroundColor:'#e84118',borderRadius:5}}>
                            
                            </TouchableOpacity>
                          </View>
                        </View>
                    </View> 
                    </View>
                             
                    }
                ></FlatList>
                </View>
                <View style={{height:'15%',alignItems:'center',justifyContent:'flex-end',width:'100%'}}>
                    <TouchableOpacity
                    onPress={this.openModal} 
                    style={{height:'70%',width:'80%',backgroundColor:'#0097e6',borderRadius:5}}></TouchableOpacity>
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

  })