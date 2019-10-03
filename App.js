import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchIngredientsScreen from './src/screens/SearchIngredientsScreen';
import SingleRecipeScreen from './src/screens/SingleRecipeScreen';

const navigator = createStackNavigator(
  { 
    Search: SearchIngredientsScreen,
    SingleRecipe: SingleRecipeScreen
  }, 
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: "Ingredients Search"
    }
  }
);

export default createAppContainer(navigator)

