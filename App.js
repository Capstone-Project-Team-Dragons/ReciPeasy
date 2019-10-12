import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/index';

import SearchIngredientsScreen from './src/screens/SearchIngredientsScreen';
import SingleRecipeScreen from './src/screens/SingleRecipeScreen';
import BarcodeScannerScreen from './src/screens/BarcodeScannerScreen';
import InstructionScreen from './src/screens/InstructionsScreen';
import LoginScreen from './src/screens/LoginScreen';
import MyRecipesScreen from './src/screens/MyRecipesScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';


const WelcomeStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen
  }, {
    initialRouteName: 'Welcome'
  }
)

const SearchRecipesStack = createStackNavigator(
  {
    Search: SearchIngredientsScreen,
    SingleRecipe: SingleRecipeScreen,
    BarcodeScanner: BarcodeScannerScreen, 
    Instruction: InstructionScreen,
    Login: LoginScreen
  },   
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
       title: "Search Ingredients"
     },
  }
);

const MyRecipesStack = createStackNavigator(
  {
    MyRecipes: MyRecipesScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'MyRecipes',
    defaultNavigationOptions: {
      title: 'My Recipes',
    },
  }
);

let Navigation = createAppContainer(
  createBottomTabNavigator(
    {
      'Home' : {
        screen: WelcomeStack,
        navigationOptions: {
          tabBarVisible: false
        }
      },
      'Search Recipes': SearchRecipesStack,
      'My Recipes': MyRecipesStack,
    },
    {}
  )
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
