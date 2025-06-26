import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const [fontsLoaded] = useFonts({
    'SpaceMonoFont': require('../assets/fonts/SpaceMono-Regular.ttf'), // Change to your font file
  });

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <ScrollView
      style={{ backgroundColor: '#f4f7f4' }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.row,{backgroundColor:'transparent',justifyContent:'flex-start',alignItems:'center'}]}>
        {roundCancelButton()}
      </View>
      {allTextsSection()}
      {checkinTimeSection()}
      <PlainRectButton title="Check-Out" />
    </ScrollView>
  );
}

const PlainRectButton = ({ title = "Button"}) => (
  <TouchableOpacity
    style={[
      styles.borderRadius,
      {
      backgroundColor: '#45a734',
      paddingVertical: 21,
      alignItems: 'center',
      marginVertical: 15,
      marginHorizontal:5,
    }]}
    onPress={() => alert(`You've Checked Out Successfully`)}
  >
    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{title}</Text>
  </TouchableOpacity>
);

const checkinTimeSection = () => {
  return (
    <View style={[
      styles.borderRadius,{
      marginBottom: 15,
      marginHorizontal:15,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      // Shadow for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      // Shadow for Android
      elevation: 5,
    }]}>
      <AddCheckIn label="You checked in at" time="01:46 pm" hasBottomLine={true} />
      <AddCheckIn label="You checked out at" time="05:33 pm" hasBottomLine={false} />
      <AddCheckIn label="Break time" time="30 minutes" hasBottomLine={false} />
    </View>
  );
}

const AddCheckIn = ({label="",time="",hasBottomLine=false}) => {
  return (
    <View style={[
      styles.borderRadius,{
      backgroundColor: 'transparent',
      padding: 14,
      marginBottom: hasBottomLine ? 20 : 0,
      width: '100%',
    }]}>
      <Text style={[styles.label, { color: '#33312f', fontWeight: '400', fontSize: 15,marginTop: 20,marginBottom: 10 }]}>{label}</Text>
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
          borderColor:'#45a734',
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
        borderColor:'#eee',
      }}>
        <Text style={{ fontSize: 18,fontWeight:'600', color: '#333', textAlign: 'center' }}>
          {time?time: "01:34 pm"}
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
            borderColor:'#45a734',
          }}
        >
          <Ionicons name="add" size={17} color="#45a734" />
        </TouchableOpacity>
      </View>
      {hasBottomLine && <View style={{ borderBottomWidth: 1, borderColor: '#eee', marginTop: 10,marginHorizontal:20 }} />}
    </View>
  );
}

const allTextsSection = () => {
  return(
      <View style={[
        { 
          backgroundColor: 'transparent', 
          paddingHorizontal: 50,
          marginBottom: 10,
          //justifyContent:"flex-start",
          //alignItems:'center'
      }]}>
        <Text style={[styles.label, { color: '#33312f', fontWeight: '600', fontSize: 34,opacity:0.85 }]}>Check-Out</Text>
        <Text style={[styles.label, { color: '#4a8b3a', fontWeight: '500', fontSize: 22,opacity:0.7,marginBottom:45,marginTop:5 }]}>Greeter</Text>
        <Text style={[styles.label, { color: '#353835', fontWeight: '400', fontSize: 14,opacity:0.85 }]}>Please enter any break time you took.</Text>
        <Text style={[styles.label, { color: '#353835', fontWeight: '400', fontSize: 14,opacity:0.85 }]}>
          You are Checking-out at <Text style={[styles.label,{color: '#30312f',fontSize: 16,fontWeight: 'bold',}]}>5:34 p.m.</Text>
          You have worked <Text style={[styles.label,{color: '#30312f',fontSize: 16,fontWeight: 'bold',}]}>3 hours</Text>
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
          // Shadow for iOS
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 15,
          // Shadow for Android
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
    //marginBottom: 90,
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
    //letterSpacing: 0.2,
    //fontFamily: 'SpaceMonoFont', // Use the loaded font
  },
  borderRadius: {
    borderRadius: 8,
  },
  centerText:{
    textAlign: 'center',
  }
});

