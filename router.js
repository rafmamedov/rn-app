import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreatePostsSreen from "./screens/mainScreen/CreatePostsScreen";
// import Home from "./screens/mainScreen/Home";
// import CommentsScreen from "./screens/mainScreen/CommentsScreen";
// import MapScreen from "./screens/mainScreen/MapScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";
// import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  const headerTitleStyle = {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,

    textAlign: "center",
    letterSpacing: -0.408,

    color: "#212121",
  };

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 71, paddingHorizontal: 62 },
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (focused, color, size) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          unmountOnBlur: true,
          headerTitleAlign: "center",
          headerTitleStyle: headerTitleStyle,
          headerTitle: "Создать публикацию",
          tabBarIcon: (focused, color, size) => (
            <View style={styles.addIcon}>
              <Ionicons name="add" size={24} color={"#ffffff"} />
            </View>
          ),
        }}
        name="Create"
        component={CreatePostsSreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (focused, color, size) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    width: 70,
    height: 40,
  },
});
