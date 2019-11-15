import React, {Component} from 'react';
import {Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/screens/Home'
import Login from './src/screens/Login';
import AllMangas from './src/screens/AllMangas'
import Favorites from './src/screens/Favorites'
import DetailManga from './src/screens/DetailManga'
import MangaChapter from './src/screens/MangaChapter'
import ReadManga from './src/screens/ReadManga'
import MyCreation from './src/screens/MyMangaCreation'
import MyCreationChapter from './src/screens/MyCreationChapter'
import PageChapter from './src/screens/PageChapter'
import {createBottomTabNavigator} from 'react-navigation-tabs';

const MainApp = createBottomTabNavigator(
    {
      Home:{screen:Home},
      Favorites:{screen:Favorites},
      MyCreation:{screen:MyCreation}
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
            return (
              <Image
                source={ require('./src/assets/icon/menu.png') }
                style={{ width: 20, height: 20, }} /> 
            );
          }
        else if(routeName==='Favorites') {
            return (
              <Image
                source={ require('./src/assets/icon/favorite.png') }
                style={{ width: 20, height: 20, }} /> 
            );
          }
          else if(routeName==='MyCreation') {
            return (
              <Image
                source={ require('./src/assets/icon/myCreation.png') }
                style={{ width: 20, height: 25, }} /> 
            );
          }
        },
        
      }),
      tabBarOptions: {
        activeTintColor: '#FF6F00',
        inactiveTintColor: '#263238',
      },
    }
  );
const AppNavigator = createStackNavigator({
    Login : {
      screen :Login,
      navigationOptions : {
      header:null
      }
    },
    MainApp:{
      screen :MainApp,
      navigationOptions : {
      header:null
      }
    },
    AllMangas: {
      screen :AllMangas,
      navigationOptions : {
      header:null
      }
    },
    DetailManga: {
      screen :DetailManga,
      navigationOptions : {
      header:null
      }
    },
    MangaChapter: {
      screen :MangaChapter,
      navigationOptions : {
      header:null
      }
    },
    MyCreationChapter: {
      screen :MyCreationChapter,
      navigationOptions : {
      header:null
      }
    },
    PageChapter: {
      screen :PageChapter,
      navigationOptions : {
      header:null
      }
    },
    ReadManga: {
      screen :ReadManga,
      navigationOptions : {
      header:null
      }
    }
});

export default createAppContainer(AppNavigator);
