import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';




export default function ShortcutScreen() {
    const [selectedSoftware, setSelectedSoftware] = useState();
    const [software, setSoftware] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        fetch(process.env.API_URL + "software")
          .then((response) => response.json())
          .then((data) => {
            setSoftware(data["hydra:member"]);
          })
          .catch((error) => console.log(error));
      }, []);


    useEffect(() => {
        fetch(process.env.API_URL + "categories")
          .then((response) => response.json())
          .then((data) => {
            setCategories(data["hydra:member"]);
          })
          .catch((error) => console.log(error));
      }, []);

    const softwareJsx = software
    .sort((s1, s2) => s1.name.localeCompare(s2.name))
    .map((s) => 
        <Picker.Item 
            key={s.id}
            label={s.name}
            value={s.id}
        />); 
    
    const categorieJsx = categories
    .sort((c1, c2) => c1.name.localeCompare(c2.name))
    .map((c) => 
      <Picker.Item 
        key={c.id} 
        label={c.name} 
        value={c.id} 
      />);

    return (
        <ScrollView>
            <Text style={styles.title}>
                Ajouter un raccourci : 
            </Text>
            
            <View style={styles.container2}>
                <Text>
                    Logiciel
                </Text>
                <Picker
                    selectedValue={selectedSoftware}
                    style={{ backgroundColor: "#ffbe9f", margin: 15 }} 
                    onValueChange={function (s) {
                        setSelectedSoftware (s);
                    }}
                >
                    {softwareJsx}
                </Picker>  

                <Text>
                    Catégories
                </Text>
                <Picker
                    electedValue={selectedCategory}
                    style={{ backgroundColor: "#ffbe9f", margin: 15 }}
                    onValueChange={function (c) {
                        setSelectedCategory(c);
                    }}
                >
                    {categorieJsx}
                </Picker> 
                
                       
             </View>    
        </ScrollView>
        
       
    )
}



const styles = StyleSheet.create({
    container2: {
      marginLeft: 10,
    },

    title: {  
        margin: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
      },
  })
  