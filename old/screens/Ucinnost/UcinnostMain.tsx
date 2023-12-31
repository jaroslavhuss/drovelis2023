import React, { useRef, useState } from 'react'
import { Text, View, Animated, ImageBackground, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import DisplayComponent from "./DisplayComponent";
import Heading from '../../components/Heading'
import Layout from '../../components/Layout'

const Screen1 = () => {
  const { width, height } = Dimensions.get("screen");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const theGirl = useRef(new Animated.Value(0)).current;
  const window1 = useRef(new Animated.Value(0)).current;
  const window2 = useRef(new Animated.Value(0)).current;
  const window3 = useRef(new Animated.Value(0)).current;

  const [theSeleciton, setTheSeleciton] = useState(0);
  const [displayComponent, setDisplayComponent] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      runAni();
      return () => {
        fadeAnim.setValue(0);
        opacityAnim.setValue(0);
        opacityAnim.setValue(0);
        window1.setValue(0);
        window2.setValue(0);
        window3.setValue(0);
        theGirl.setValue(0);
      };
    }, [])
  );

  const runAni = () => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.timing(fadeAnim, {
      toValue: 1300,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(theGirl, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }).start();
    });

    //Window1
    Animated.sequence([
      Animated.timing(window1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(window1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();


    //Window2
    Animated.sequence([
      Animated.timing(window2, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(window2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
    //Window3
    Animated.sequence([
      Animated.timing(window3, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(window3, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start(() => {

    });
  }
  const turnOffComponent = () => {
    setDisplayComponent(false);
  }
  return (
    <Layout>
      <Heading heading="Účinnost" />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 100 }}>
        <TouchableOpacity onPress={() => {
          setDisplayComponent(true);
          setTheSeleciton(1);
        }} style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textWindow}>Drovelis Pearl{"\n"}index</Text>
          <Animated.Image style={{ width: 180, height: 240, opacity: window1 }} source={require("../../assets/window_s_kridlem.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setDisplayComponent(true);
          setTheSeleciton(2);
        }} style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textWindow}>stabilita{"\n"}cyklu</Text>
          <Animated.Image style={{ width: 180, height: 240, opacity: window2 }} source={require("../../assets/window_bez_kridla.png")} />
        </TouchableOpacity>

      </View>
      <ImageBackground resizeMode="center" style={{
        transform: [{
          rotate: "-10deg"
        }], width: width, height: 100, marginTop: height / 1.5, position: "absolute"
      }} source={require("../../assets/plocha.png")}>
        <Animated.Image style={[{
          width: 240, height: 162, opacity: opacityAnim, transform: [{
            translateX: fadeAnim
          }]
        }]} source={require("../../assets/airplane2.png")} />
      </ImageBackground>
      <Animated.Image style={{ position: "absolute", bottom: 0, right: 0, width: 250, height: 350, opacity: theGirl }} source={require("../../assets/the_girl.png")} />
      {displayComponent && <DisplayComponent selection={theSeleciton} display={turnOffComponent} />}

    </Layout>
  )
}

export default Screen1

const styles = StyleSheet.create({
  textWindow: {
    position: "absolute",
    fontFamily: "Museo",
    color: "#d9326f",
    fontSize: 20,
    textAlign: "center"

  }
});