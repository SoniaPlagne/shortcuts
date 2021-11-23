import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CategoryScreen(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [shortcuts, setShortcuts] = useState([]);

  // HOOK UseEffect « effets de bord » même rôle que Component did mount mais via API avec accès au props et à son état
  // Requête fetch pour aller chercher des infos dans l'API, then (promsesse) puis reponse
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
    //La méthode map()passe sur chaque élément du tableau et lui applique une fonction, 
    // puis renvoie un nouveau tableau contenant les résultats de cette fonction appliquée sur chaque élément.

  const shortcutsJsx = shortcuts.map((shortcut) => (
    <TouchableOpacity
      // pour que le contenenr des raccourcis soit cliquable vers la page Details
      title="Details"
      key={shortcut.id}
      onPress={() => props.navigation.navigate("Details", { shortcut: shortcut })}
    >
      <View style={styles.container}>
        <Text style={styles.picker}>
          {shortcut.title}
        </Text>

        <View>
          <Text style={styles.label1}>
            {shortcut.software.name}
          </Text>

          <View>
            {shortcut.categories.map((c) => (
              <Text key={c.id} style={styles.label2}>
                {c.name}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
