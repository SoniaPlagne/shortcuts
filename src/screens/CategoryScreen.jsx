import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import {Picker} from '@react-native-picker/picker';
import ShortcutScreen from "./ShortcutScreen";



export default function CategoryScreen(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [shortcuts, setShortcuts] = useState([]);

  
  useEffect(() => {
    fetch(process.env.API_URL + "categories")
      .then((response) => response.json())
      .then((data) => setCategories(data["hydra:member"]))
      .catch((error) => console.log(error));
  }, []);

  const categorieJsx = categories
    .sort((c1, c2) => c1.name.localeCompare(c2.name))
    .map((c) => <Picker.Item key={c.id} label={c.name} value={c.id} />);


  const shortcutsJsx = shortcuts.map((s) => (
    <View key={s.id}>
      <Text>
        {s.title}
      </Text>
      
    </View>
  ))  




  // const productsJsx = Details.products.map((p) => (
  //   <View key={p['@id']} style={styles.productContainer}>
  //       <Image style={styles.image} source={{uri: getImageUrl(p.image)}} />
  //       <View style={styles.productDetails}>
  //           <Text style={styles.productTitle}>{p.name}</Text>
  //           <Text>{p.price} euros</Text>

  //       </View>
      

  //   </View>
  // )
  
  return (
    <ScrollView>
      <Picker
        selectedValue={selectedCategory}
        style={{ backgroundColor: "#ffbe9f", margin: 15}}
        onValueChange={
          function (c){
            fetch(process.env.API_URL + "shortcuts?categories.id=" + c)
              .then((response) => response.json())
              .then((data) => setShortcuts(data["hydra:member"]))
              .catch((error) => console.log(error));
          setSelectedCategory(c);
        }}>

          {categorieJsx}

      </Picker>

          {shortcutsJsx}

    </ScrollView>
  )
}
