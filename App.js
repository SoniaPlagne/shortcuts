import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import SoftwareScreen from './src/screens/SoftwareScreen';
import ShortcutScreen from './src/screens/ShortcutScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Home'
          component={HomeScreen}
          options={{title:"Bienvenue"}} />
        <Stack.Screen 
          name='Category' 
          component={CategoryScreen}
          options={{title:"Recherche par catégorie"}} />
         <Stack.Screen 
          name='Software' 
          component={SoftwareScreen}
          options={{title:"Recherche par logiciel"}} />
        <Stack.Screen 
          name='Shortcut' 
          component={ShortcutScreen}
          options={{title:"Ajout d'un raccourci"}} />  
        <Stack.Screen
          name='Details'
          component={DetailsScreen}
          options={{title:"Détails du raccourci"}} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
