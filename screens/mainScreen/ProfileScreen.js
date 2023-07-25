// import React, { useState } from "react";
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ImageBackground,
//   Image,
//   Platform,
//   useWindowDimensions,
// } from "react-native";
// import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import Post from "../../components/Post";
// import db from "../../firebase/config";

// const initialState = [
//   {
//     id: 1,
//     photo: require("../../assets/images/forest.jpg"),
//     title: "Forest",
//     comments: 8,
//     likes: 153,
//     location: `Ukraine`,
//   },
//   {
//     id: 2,
//     photo: require("../../assets/images/sunset.jpg"),
//     title: "Sunset",
//     comments: 3,
//     likes: 200,
//     location: `Ukraine`,
//   },
//   {
//     id: 3,
//     photo: require("../../assets/images/house.jpg"),
//     title: "Old house",
//     comments: 50,
//     likes: 200,
//     location: `Italy`,
//   },
// ];

// const ProfileScreen = ({ navigation, route }) => {
//   const [posts, setPosts] = useState(initialState);
//   const [isLoadedAvatar, setIsLoadedAvatar] = useState(true);
//   const { height, width } = useWindowDimensions();
//   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
//   const [inputData, setInputData] = useState(initialState);

//   const handleLoadAvatar = () => {
//     const toggle = isLoadedAvatar ? false : true;
//     setIsLoadedAvatar(toggle);
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         style={{
//           ...styles.backgroundImage,
//           width: width,
//           height: height,
//         }}
//         source={require("../../assets/images/photo_BG.jpg")}
//       >
//         <View
//           style={{
//             ...styles.content,
//             width: width,
//           }}
//         >
//           <MaterialIcons
//             name="logout"
//             size={24}
//             color="#BDBDBD"
//             style={styles.btnLogout}
//             onPress={() => navigation.navigate("Login")}
//           />
//           <View style={styles.avatarWrap}>
//             <Image
//               style={styles.avatar}
//               alt="user avatar"
//               source={require("../../assets/images/avatar.jpg")}
//             />
//             <TouchableOpacity activeOpacity={0.8} onPress={handleLoadAvatar}>
//               {isLoadedAvatar ? (
//                 <AntDesign
//                   name="closecircleo"
//                   size={25}
//                   color="#E8E8E8"
//                   style={styles.btnAdd}
//                 />
//               ) : (
//                 <AntDesign
//                   name="pluscircleo"
//                   size={25}
//                   color="#FF6C00"
//                   style={styles.btnAdd}
//                 />
//               )}
//             </TouchableOpacity>
//             <Text style={styles.login}>Natali Romanova</Text>

//             <FlatList
//               data={posts}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <Post item={item} navigation={navigation} />
//               )}
//             />
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E5E5E5",
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   content: {
//     marginTop: 310,
//     paddingHorizontal: 16,
//     columnGap: 16,
//     backgroundColor: "#FFFFFF",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
//   btnLogout: {
//     position: "absolute",
//     top: 22,
//     right: 16,
//   },
//   avatarWrap: {
//     alignItems: "center",
//   },
//   avatar: {
//     position: "absolute",
//     top: -60,
//     width: 120,
//     height: 120,
//     resizeMode: "cover",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     backgroundColor: "#F6F6F6",
//     borderRadius: 16,
//   },
//   btnAdd: {
//     position: "absolute",
//     top: 21,
//     left: 46,
//     width: 25,
//     height: 25,
//     borderRadius: 13,
//     overflow: "hidden",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//   },
//   login: {
//     marginTop: 92,
//     marginBottom: 32,
//     fontFamily: "Roboto-Medium",
//     fontWeight: "500",
//     fontSize: 30,
//     lineHeight: 35,
//     textAlign: "center",
//     color: "#212121",
//   },
// });

// export default ProfileScreen;
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export const ProfileScreen = ({ navigation }) => {
  const { userId, name, avatar } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(q, (data) => {
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/images/Photo_BG.png")}
    >
      <View style={styles.container}>
        <Image
          source={
            avatar
              ? { uri: avatar }
              : require("../../assets/images/placeholder.png")
          }
          style={styles.avatar}
        />
        <Feather
          style={styles.signOutIcon}
          onPress={signOut}
          name="log-out"
          size={24}
          color="#BDBDBD"
        />
        <Text style={styles.name}>{name}</Text>
        {userPosts && (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("UpdatePost", {
                      postId: item.id,
                      photo: item.photo,
                      title: item.title,
                      locationDescr: item.locationDescr,
                    })
                  }
                >
                  <Image style={styles.photo} source={{ uri: item.photo }} />
                </TouchableOpacity>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.linkContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Comments", {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }
                  >
                    <FontAwesome
                      style={styles.commentIcon}
                      name="comment"
                      size={24}
                      color="#FF6C00"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.locationLink}
                    onPress={() =>
                      navigation.navigate("Map", { location: item.location })
                    }
                  >
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.locationDescr}>
                      {item.locationDescr}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          ></FlatList>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    paddingnHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
  },
  avatar: {
    borderWidth: 5,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  signOutIcon: {
    top: 22,
    right: 16,
    position: "absolute",
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    marginTop: 92,
    marginBottom: 33,
    color: "#212121",
  },
  postCard: {
    marginBottom: 35,
  },
  photo: {
    minWidth: 343,
    minHeight: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 11,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationLink: {
    flexDirection: "row",
  },
  locationDescr: {
    marginLeft: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
});
