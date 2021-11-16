import React, { useState, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";



export default function HomeScreen(props) {
  

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.header}>Bienvenue sur l'application de </Text>
        <Text style={styles.header}>raccourcis de commandes</Text>
      </View>

      <Text style={styles.title}>Rechercher par : </Text>

      <View style={styles.button}>
                <TouchableOpacity
                    title="Catégorie"
                    onPress={() => props.navigation.navigate('Category')}
                    style={styles.btn}>
                    <Text>
                        Catégorie
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    title="Logiciel" 
                    onPress={() => props.navigation.navigate('Software')}
                    style={styles.btn}>
                    <Text>
                        Logiciel
                    </Text>  
                </TouchableOpacity> 
      </View>

      <View style= {styles.shortcut}>
        <Text style={styles.title}>Ou bien :</Text>
        <TouchableOpacity
            title="Ajouter un raccourci"
            onPress={() => props.navigation.navigate("Shortcut")}
            style={[styles.btn, styles.btn2]}>
                <Text>
                    Ajouter un raccourci
                </Text>
        
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },

  head:{
      marginBottom: 80
  },

  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  title: {  
    margin: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },


  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50
  },

  btn: {
    alignItems: "center",
    flexBasis: "35%",
    color: "black",
    fontWeight: "bold",
    backgroundColor: "#ffbe9f",
    padding: 20,
    borderRadius: 5,
    margin: 15
  },

  btn2:{
    flexBasis: "15%",
    backgroundColor: "#b4ffc9",
    alignContent: "center"
  },

  shortcut:{
      flex: 1,
  }

});
