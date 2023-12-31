import React, {useState, useRef} from 'react'
import { StyleSheet, Text, ImageBackground, View, Dimensions, Image, Animated } from 'react-native'
import Layout from '../components/Layout'
//@ts-ignore
import TypingText from "react-native-typical";
const {width, height} = Dimensions.get("screen");
import { useFonts } from 'expo-font';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
   

    const fadeAnim = useRef(new Animated.Value(0)).current;
    Animated.sequence([
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver:true,
          }),
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver:true,
          })
    ]).start();

    useFocusEffect(() => {
        setLoadAnimatedComponents(true);
        return () => {
          setLoadAnimatedComponents(false);
          fadeAnim.setValue(0);
        }
    });
    const [loadAnimatedComponents, setLoadAnimatedComponents] = useState(false);
    const [loaded] = useFonts({
        "Museo": require("../assets/fonts/museo.otf"),
        "MuseoBold": require("../assets/fonts/museo900.otf"),
      });
      
      if (!loaded) {
        return null;
      }
    
    return (
        <Layout>
           <ImageBackground source={require("../assets/bgd.png")} style={styles.bg}>
               <View style={styles.textbanner}>
                    <Text style={{
                        fontFamily:"Museo",
                        color:"#612751",
                        fontSize:40,
                       
                    }}>
                MODERNÍ
                    </Text>
               {loadAnimatedComponents?<TypingText
                steps={["přelomová forma\nantikoncepce..."]}
                loop={1}
                blinkCursor={false}
                style={{fontFamily:"Museo",
                color:"#E81E75",
                fontSize:35,}}
            />:<></>}
                     <Animated.Image style={{
                         resizeMode:"contain",
                         width:250,
                         height:200,
                         opacity:fadeAnim
                     }} source={require("../assets/final_logo.png")} />   
              </View>
           </ImageBackground>
        </Layout>
    )
}

export default Home

const styles = StyleSheet.create({
    bg:{
        flex:1,
        resizeMode:"contain",
    },
    textbanner:{
        position:"absolute",
        right:0,
        marginTop:height/3,
        marginRight:20,
        width:300
    }
});