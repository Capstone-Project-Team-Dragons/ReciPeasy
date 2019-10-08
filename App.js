import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchIngredientsScreen from './src/screens/SearchIngredientsScreen';
import SingleRecipeScreen from './src/screens/SingleRecipeScreen';
import BarcodeScannerScreen from './src/screens/BarcodeScannerScreen';
import InstructionScreen from './src/screens/InstructionsScreen';

const navigator = createStackNavigator(
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

export default createAppContainer(navigator)

