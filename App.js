import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native'
import {MainScreen} from "./src/screens/MainScreen";
import React from 'react'


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <NavigationContainer>

            <Tab.Navigator>
                <Tab.Screen name="Home" component={MainScreen}/>
                <Tab.Screen name="Home2" component={MainScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MyTabs
