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

const SearchRecipesStack = createStackNavigator(
  {
    WelcomeScreen: WelcomeScreen,
    Search: SearchIngredientsScreen,
    SingleRecipe: SingleRecipeScreen,
    BarcodeScanner: BarcodeScannerScreen, 
    Instruction: InstructionScreen
  },   
  {
    initialRouteName: 'WelcomeScreen',
    defaultNavigationOptions: {
       title: "Welcome to the Ingredia"
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
