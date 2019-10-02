import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import SearchIngredientsScreen from './src/screens/SearchIngredientsScreen'

const navigator = createStackNavigator(
  {
    Search: SearchIngredientsScreen
  }, 
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: "Ingredients Search"
    }
  }
);

export default createAppContainer(navigator)

