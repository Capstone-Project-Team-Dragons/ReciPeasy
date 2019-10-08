import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SearchIngredientsScreen from './src/screens/SearchIngredientsScreen';
import SingleRecipeScreen from './src/screens/SingleRecipeScreen';
import BarcodeScannerScreen from './src/screens/BarcodeScannerScreen';
import InstructionScreen from './src/screens/InstructionsScreen';
import LoginScreen from './src/screens/LoginScreen';
import MyRecipesScreen from './src/screens/MyRecipesScreen';

const SearchRecipesStack = createStackNavigator(
  {
  Search: SearchIngredientsScreen,
  SingleRecipe: SingleRecipeScreen,
  BarcodeScanner: BarcodeScannerScreen, 
  Instruction: InstructionScreen
  },   
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: "Ingredients Search"
    }
  }
);

const MyRecipesStack = createStackNavigator(
  { 
    MyRecipes: MyRecipesScreen,
    Login: LoginScreen
  },   
  {
    initialRouteName: 'MyRecipes',
    defaultNavigationOptions: {
      title: "My Recipes"
    }
  }
);

export default createAppContainer(
  createBottomTabNavigator(
    {
      'Search Recipes': SearchRecipesStack,
      'My Recipes': MyRecipesStack,
    }, 
    {

    }
  )
)

