import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";



export default function SoftwareScreen(props) {
  const [software, setSoftware] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState();
  const [shortcuts, setShortcuts] = useState ([]);

  useEffect(() => {
    fetch(process.env.API_URL + "software")
      .then((response) => response.json())
      .then((data) => setSoftware(data["hydra:member"]))
      .catch((error) => console.log(error));
  }, []);

  const softwareJsx = software
    .sort((s1, s2) => s1.name.localeCompare(s2.name))
    .map((s) => <Picker.Item key={s.id} label={s.name} value={s.id} />);

  const shortcutsJsx = shortcuts.map((s) => (
    <View key={s.id} style={styles.container2}>
      <Text>
        {s.title}
      </Text>
    </View>
  ))  

  return (
    <ScrollView>
      <Text style={styles.title}>
        Rechercher par logiciel :
      </Text>
      <Picker
        selectedValue={selectedSoftware}
        style={{ backgroundColor: "#ffbe9f", margin: 15 }}
        onValueChange={
          function (s) {
            fetch(process.env.API_URL + "shortcuts?software.id=" + s)
              .then((response) => response.json())
              .then((data) => setShortcuts(data["hydra:member"]))
              .catch((error) => console.log(error));
            setSelectedSoftware(s);
        }}>
        
          {softwareJsx}

      </Picker>

          {shortcutsJsx}

    </ScrollView>
  )
}



const styles = StyleSheet.create({
  title: {  
    margin: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  container2: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },


})
