import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import ReceiptsNavigator from "./ReceiptsNavigator";
import ProfileNavigator from "./ProfileNavigator";
import MyPlacesNavigator from "./MyPlacesNavigator";
import { colors } from "../global/colors";


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
        <Tab.Navigator 
            initialRouteName="Shop"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen 
                name="Shop" 
                component={ShopNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="pedal-bike" size={30} color={focused?colors.burntOrange:colors.grisMedio} />)
                }}
            />
            <Tab.Screen 
                name="Cart" 
                component={CartNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="shopping-cart" size={30} color={focused?colors.burntOrange:colors.grisMedio} />)
                }}
            />
            <Tab.Screen 
                name="Receipts"
                component={ReceiptsNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="receipt" size={30} color={focused?colors.burntOrange:colors.grisMedio} />)
                }}
            />
            <Tab.Screen 
                name="Profile"
                component={ProfileNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="account-circle" size={30} color={focused?colors.burntOrange:colors.grisMedio} />)
                }}
            />
            <Tab.Screen 
                name="Places"
                component={MyPlacesNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="pin-drop" size={30} color={focused?colors.burntOrange:colors.grisMedio} />)
                }}
            />
        </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar:{
        height: 64,
        backgroundColor: colors.negro
    }
})