import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetailsScreen(props) {
  const { shortcut } = props.route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{shortcut.title}</Text>

      <Text style={styles.label1}>{shortcut.software.name}</Text>

      <View>
        {shortcut.categories.map((c) => (
            <Text key={c.id} style={styles.label2}>
              {c.name}
            </Text> 
        ))}    
      </View>

      <Text style={styles.text}>
        Windows:
        <Text style={styles.text2}>{shortcut.windows}</Text>
      </Text>

      <Text style={styles.text}>
        Mac:
        <Text style={styles.text2}>{shortcut.macos}</Text>
      </Text>

      <Text style={styles.text}>
        Linux:
        <Text style={styles.text2}>{shortcut.linux}</Text>
      </Text>
{/* 
      <Text>{shortcut.image}</Text> */}

      <Text style={styles.text}>
        Contexte:
        <Text style={styles.text2}>{shortcut.context}</Text>
      </Text>

      <Text style={styles.text}>
        Description:
        <Text style={styles.text2}>{shortcut.description}</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    width: 300,
  },

  title: {
    fontWeight: "bold",
  },

  label1: {
    backgroundColor: "#91B7F2",
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
  },

  label2: {
    backgroundColor: "#EBE8AD",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },

  text: {
    margin: 10,
    fontWeight: "bold",
  },

  text2: {
    fontWeight: "normal",
    marginLeft: 5,
    textAlign: "left",
  },
});
