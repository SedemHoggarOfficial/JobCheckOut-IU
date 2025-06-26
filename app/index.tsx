import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,SafeAreaView, ScrollView, Animated, TouchableOpacity, View, StyleSheet, Modal, Dimensions, Platform } from "react-native";
import { useFonts } from "expo-font";

// Use @react-native-community/slider for cross-platform support
import Slider from '@react-native-community/slider';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const options = {
  headerShown: false,
};


export default function Index() {
  
  const [fontsLoaded] = useFonts({
    'SpaceMonoFont': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [sliderValue, setSliderValue] = useState(2);

  useEffect(() => {
    if (bottomSheetVisible) {
      setModalVisible(true); // Show modal immediately
      // Reset position before animating in
      slideAnim.setValue(SCREEN_HEIGHT);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setModalVisible(false)); // Hide modal after animation
    }
  }, [bottomSheetVisible, modalVisible, slideAnim]);

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <SafeAreaView  style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: '#f4f7f4' }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.row, { backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }]}>
          {roundCancelButton()}
        </View>
        {allTextsSection()}
        {checkinTimeSection()}
        <PlainRectButton title="Check-Out" onPress={() => setBottomSheetVisible(true)} />
      </ScrollView>
      <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setBottomSheetVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setBottomSheetVisible(false)}
        />
        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >

           {/* Emoji Slider Section */}
          <View style={{ flex:1,alignItems: 'stretch', marginTop: 0, marginBottom: 0,backgroundColor: 'transparent' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 5, textAlign: 'left',opacity: 0.85, color: '#33312f' }}>
              How was your job experience?
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 ,backgroundColor: 'transparent'}}>
              <Text style={{ fontSize: 28 }}>{'😞'}</Text>
              <Text style={{ fontSize: 28 }}>{'😐'}</Text>
              <Text style={{ fontSize: 28 }}>{'😊'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 0, marginBottom: 10,backgroundColor: 'transparent' }}>
              <Slider
                style={{
                  flex:1,
                  backgroundColor: 'transparent',
                  width: 180, 
                  height: 60 
                }} // Increased from 40 or 280 to 60
                minimumValue={1}
                maximumValue={3}
                //step={1}
                value={sliderValue}
                onValueChange={setSliderValue}
                minimumTrackTintColor="#45a734"
                maximumTrackTintColor="#eee"
                thumbTintColor="#45a734"
              />
            </View>


            {/* ///////////////////////////////// */}

            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 15, textAlign: 'left',opacity: 0.85, color: '#33312f' }}>
              How was your employer?
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 ,backgroundColor: 'transparent'}}>
              <Text style={{ fontSize: 28 }}>{'😞'}</Text>
              <Text style={{ fontSize: 28 }}>{'😐'}</Text>
              <Text style={{ fontSize: 28 }}>{'😊'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 0, marginBottom: 10,backgroundColor: 'transparent' }}>
              <Slider
                style={{
                  flex:1,
                  backgroundColor: 'transparent',
                  width: 180, 
                  height: 60 
                }} // Increased from 40 or 280 to 60
                minimumValue={1}
                maximumValue={3}
                //step={1}
                value={sliderValue}
                onValueChange={setSliderValue}
                minimumTrackTintColor="#45a734"
                maximumTrackTintColor="#eee"
                thumbTintColor="#45a734"
              />
            </View>
            
            <View style={{
              flex: 1,
              justifyContent: 'space-between',
              marginVertical: 5,
              backgroundColor: 'transparent',
            }}>
              <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 15, textAlign: 'left',opacity: 0.85, color: '#33312f' }}>
                Any comments?
              </Text>
              {richTextBox()}
              <View>
                <PlainRectButton title="Check-Out" backgroundColor="" onPress={() => setBottomSheetVisible(false)} />
                <View style={{
                  backgroundColor: 'transparent',
                  shadowColor: 'gray',
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  elevation: 5,
                  marginTop: 8,
                  marginBottom: 15,
                }}>
                  <PlainRectButton textColor = 'gray' title="Skip" backgroundColor="#f8f8f8" onPress={() => setBottomSheetVisible(false)} />
                </View>
              </View>
            </View>
          </View>
          {/* Add more content here if needed */}
        </Animated.View>
      </Modal>
    </SafeAreaView >
  );
}

const richTextBox = () => {
  return (
    <View style={[styles.borderRadius,{ 
      backgroundColor: 'white',
      padding: 14,
      marginBottom: 20,
      shadowColor: 'gray',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 30,
      elevation: 5,
    }]}> 
      <Text style={{ color:'#ababab',fontWeight:'600',fontSize:15,marginTop:10,marginBottom: 150,opacity:.5}}>Add comments about the job</Text>
    </View>
  );
}

type PlainRectButtonProps = {
  textColor?: string;
  title?: string;
  backgroundColor?: string;
  onPress: () => void;
};

const PlainRectButton = ({textColor='', title = "Button",backgroundColor='', onPress }: PlainRectButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.borderRadius,
        {
          backgroundColor: backgroundColor? backgroundColor: '#45a734',
          paddingVertical: 21,
          alignItems: 'center',
          //marginVertical: 15,
          //marginHorizontal: 5,
        }]}
      onPress={onPress}
    >
    <Text style={[{ color: textColor? textColor: 'white', fontSize: 16, fontWeight: '600' }]}>{title}</Text>
  </TouchableOpacity>
  );
};

const checkinTimeSection = () => {
  return (
    <View style={[
      styles.borderRadius, {
        marginBottom: 15,
        marginHorizontal: 15,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
      }]}>
      <AddCheckIn label="You checked in at" time="01:46 pm" hasBottomLine={true} />
      <AddCheckIn label="You checked out at" time="05:33 pm" hasBottomLine={false} />
      <AddCheckIn label="Break time" time="30 minutes" hasBottomLine={false} />
    </View>
  );
}

const AddCheckIn = ({ label = "", time = "", hasBottomLine = false }) => {
  return (
    <View style={[
      styles.borderRadius, {
        backgroundColor: 'transparent',
        padding: 14,
        marginBottom: hasBottomLine ? 20 : 0,
        width: '100%',
      }]}>
      <Text style={[styles.label, { color: '#33312f', fontWeight: '400', fontSize: 15, marginTop: 20, marginBottom: 10 }]}>{label}</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 25,
      }}>
        {/* Left circular button */}
        <TouchableOpacity
          style={{
            width: 28,
            height: 28,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#45a734',
          }}
        >
          <Ionicons name="remove" size={17} color="#45a734" />
        </TouchableOpacity>

        {/* Centered text container */}
        <View style={{
          backgroundColor: 'transparent',
          borderRadius: 12,
          paddingHorizontal: 40,
          paddingVertical: 12,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 120,
          marginHorizontal: 20,
          borderWidth: 1.5,
          borderColor: '#eee',
        }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center' }}>
            {time ? time : "01:34 pm"}
          </Text>
        </View>

        {/* Right circular button */}
        <TouchableOpacity
          style={{
            width: 28,
            height: 28,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#45a734',
          }}
        >
          <Ionicons name="add" size={17} color="#45a734" />
        </TouchableOpacity>
      </View>
      {hasBottomLine && <View style={{ borderBottomWidth: 1, borderColor: '#eee', marginTop: 10, marginHorizontal: 20 }} />}
    </View>
  );
}

const allTextsSection = () => {
  return (
    <View style={[
      {
        backgroundColor: 'transparent',
        paddingHorizontal: 50,
        marginBottom: 10,
      }]}>
      <Text style={[styles.label, { color: '#33312f', fontWeight: '600', fontSize: 34, opacity: 0.85 }]}>Check-Out</Text>
      <Text style={[styles.label, { color: '#4a8b3a', fontWeight: '500', fontSize: 22, opacity: 0.7, marginBottom: 45, marginTop: 5 }]}>Greeter</Text>
      <Text style={[styles.label, { color: '#353835', fontWeight: '400', fontSize: 14, opacity: 0.85 }]}>Please enter any break time you took.</Text>
      <Text style={[styles.label, { color: '#353835', fontWeight: '400', fontSize: 14, opacity: 0.85 }]}>
        You are Checking-out at <Text style={[styles.label, { color: '#30312f', fontSize: 16, fontWeight: 'bold', }]}>5:34 p.m.</Text>
        You have worked <Text style={[styles.label, { color: '#30312f', fontSize: 16, fontWeight: 'bold', }]}>3 hours</Text>
      </Text>
    </View>
  );
}

const roundCancelButton = () => {
  return (
    <TouchableOpacity
      style={[{
        width: 53,
        height: 53,
        borderRadius: 40,
        marginBottom: 15,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 5,
      }]}
      onPress={() => alert('Your review has been sent!')}
    >
      <Ionicons name="close" size={28} color="#342f2d" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    marginBottom: 5,
    fontSize: 17,
    textAlign: 'center',
  },
  borderRadius: {
    borderRadius: 8,
  },
  centerText: {
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  bottomSheet: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#fff',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding: 24,
  height: '82%',
  elevation: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
},
  bottomSheetClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
});