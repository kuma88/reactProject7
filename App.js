import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=84231"

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((responseData) => responseData);

      const myBus = responseData.services.filter(
        (item) => item.no === "14"
      )[0];
      console.log("My Bus:");
      console.log(myBus);

  }, []);


 return (
   <View style={styles.container}>
     <Text style={styles.title}>Bus arrival time:</Text>
     <Text style={styles.arrivalTime}>
       {loading? <ActivityIndicator style={styles.horizontal} size="large" color="#00ff00" />: "Loaded"}
     </Text>
      
     <TouchableOpacity style={styles.button}>
       <Text style={styles.buttonText}>Refresh!</Text>
     </TouchableOpacity>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
 title: {
   fontWeight: "bold",
   fontSize: 32,
   marginBottom: 24,
 },
 arrivalTime: {
   fontSize: 64,
   marginBottom: 32,
 },
 button: {
   padding: 20,
   backgroundColor: "darkgreen",
   borderRadius: 50,
 },
 buttonText: {
   fontSize: 32,
   fontWeight: "bold",
   color: "white",
 },
 horizontal: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10,
},
});
