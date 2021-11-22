import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CategoryScreen(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [shortcuts, setShortcuts] = useState([]);

  useEffect(() => {
    fetch(process.env.API_URL + "categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data["hydra:member"]);
        refreshList(data["hydra:member"][0].id);
      })
      .catch((error) => console.log(error));
  }, []);

  const categorieJsx = categories
    .sort((c1, c2) => c1.name.localeCompare(c2.name))
    .map((c) => <Picker.Item key={c.id} label={c.name} value={c.id} />);

  const shortcutsJsx = shortcuts.map((s) => (
    <View key={s.id} style={styles.container2}>
      <Text>{s.title}</Text>
    </View>
  ));

  function refreshList(c) {
    fetch(process.env.API_URL + "shortcuts?categories.id=" + c)
      .then((response) => response.json())
      .then((data) => setShortcuts(data["hydra:member"]))
      .catch((error) => console.log(error));
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Rechercher par catégorie :</Text>
      <Picker
        selectedValue={selectedCategory}
        style={{ backgroundColor: "#ffbe9f", margin: 15 }}
        onValueChange={function (c) {
          refreshList(c);
          setSelectedCategory(c);
        }}
      >
        {categorieJsx}
      </Picker>

      {shortcutsJsx}
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

  container2: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
});
