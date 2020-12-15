import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=" + BUSSTOP_NUMBER;
const BUSSTOP_NUMBER = "84231";
const LOADING_INTERVAL = 60000;
const BUS_NUMBER = "14";


export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");

  function loadBusStopData(){
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        const myBus = responseData.services.filter(
          (item) => item.no === BUS_NUMBER
          )[0];

          //console.log(myBus);
          const duration_s = Math.floor(myBus.next.duration_ms / 1000)
          const minutes = Math.floor(duration_s / 60)
          const seconds = duration_s % 60
          
          setArrival(`${minutes} minutes and ${seconds} seconds`);
          setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, LOADING_INTERVAL);
    loadBusStopData();

    return () => clearInterval(interval);
  }, []);


  return (
   <View style={styles.container}>
     <Text style={styles.title}>Bus arrival time:</Text>
     <Text style={styles.arrivalTime}>
       {loading? <ActivityIndicator style={styles.horizontal} size="large" color="#00ff00" />: arrival }
     </Text>
      
     <TouchableOpacity onPress={loadBusStopData} style={styles.button}>
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
   textAlign: "center"
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
