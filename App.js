import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  BottomNavigation,
  Provider,
  DefaultTheme,
  Appbar,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import HomeScreen from "./Screens/HomeScreen";
import MatchesScreen from "./Screens/MatchesList";
import MyTabs from "./Screens/MatchDetails";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const theme = {
  ...DefaultTheme,

  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3399ff",
  },
};

const options = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: "#3399ff",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

function MainScreen() {
  
  return (
    <Provider theme={theme}>
      <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>
      <Tab.Screen name="Matches" component={MatchesScreen} options={{
          tabBarLabel: 'Upcoming Matches',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cricket" color={color} size={26} />
          ),
        }}/>
    </Tab.Navigator>
    </Provider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CricScores">
        <Stack.Screen name="CricScores" options={options} component={MainScreen} />
        <Stack.Screen name="Match Info" options={options} component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  "heading" : {
    alignItems : "center",
  },
})
