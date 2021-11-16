import React from 'react';
import { Text, View, StyleSheet } from 'react-native';





export default function ShortcutScreen() {
    return (
        <View>
            <Text style={styles.title}>
                Ajouter un raccourci : 
            </Text>   
            <View style={styles.container2}>
                <Text>
                    Logiciel
                </Text>
                <Text>
                    Catégories
                </Text>
             </View>    
        </View>
        
       
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
  