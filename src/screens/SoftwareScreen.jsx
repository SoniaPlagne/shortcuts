import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SoftwareScreen(props) {
  const [software, setSoftware] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState();
  const [shortcuts, setShortcuts] = useState([]);

  useEffect(() => {
    fetch(process.env.API_URL + "software")
      .then((response) => response.json())
      .then((data) => {
        setSoftware(data["hydra:member"]);
        refreshList(data["hydra:member"][0].id);
      })
      .catch((error) => console.log(error));
  }, []);

  const softwareJsx = software
    .sort((s1, s2) => s1.name.localeCompare(s2.name))
    .map((s) => <Picker.Item key={s.id} label={s.name} value={s.id} />);

  const shortcutsJsx = shortcuts.map((shortcut) => (

    <TouchableOpacity
      title="Details"
      key={shortcut.id}
      onPress={() => props.navigation.navigate("Details", {shortcut: shortcut})}
      >

        <View key={shortcut.id} style={styles.container}>
            <Text style={styles.picker}>
                {shortcut.title}
            </Text>

            <View>
              <Text style={styles.label1}>
                {shortcut.software.name}
              </Text>
              <View>
                {shortcut.categories.map((s) => (
                  <Text key={s.id} style={styles.label2}>
                  {s.name}
                  </Text>
                ))}
              </View>
            </View>
        </View>
      </TouchableOpacity>
    
  ));

  function refreshList(s) {
    fetch(process.env.API_URL + "shortcuts?software.id=" + s)
      .then((response) => response.json())
      .then((data) => setShortcuts(data["hydra:member"]))
      .catch((error) => console.log(error));
  }

  return (
    <ScrollView>
      <Text style={styles.title}>
        Rechercher par logiciel :
      </Text>
      <Picker
        selectedValue={selectedSoftware}
        style={{ backgroundColor: "#ffbe9f", margin: 15 }}
        onValueChange={function (s) {
          refreshList(s);
          setSelectedSoftware(s);
        }}
      >
        {softwareJsx}
      </Picker>
      <View style={styles.container2}>{shortcutsJsx}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  container: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 30,
    borderStyle: "solid medium",
    borderColor: "black",
    borderWidth: 2,
    width: 300,
  },

  picker: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  container2: {
    alignItems: "center",
  },

  label1: {
    backgroundColor: "#91B7F2",
    borderRadius: 5,
    padding: 5,
    width: 250,
    marginBottom: 20,
  },

  label2: {
    backgroundColor: "#EBE8AD",
    borderRadius: 5,
    padding: 5,
    width: 250,
    marginBottom: 10,
  },
});
