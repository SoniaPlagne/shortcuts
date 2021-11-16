import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SoftwareScreen(props) {
  const [software, setSoftware] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState();

  useEffect(() => {
    fetch(process.env.API_URL + "software")
      .then((response) => response.json())
      .then((data) => setSoftware(data["hydra:member"]))
      .catch((error) => console.log(error));
  }, []);

  const softwareJsx = software
    .sort((s1, s2) => s1.name.localeCompare(s2.name))
    .map((s) => <Button key={s.id} label={s.name} value={s.id} />);

  return (
    <ScrollView>
      <Picker
        selectedValue={selectedSoftware}
        style={{ backgroundColor: "#ffbe9f", margin: 15 }}
        onValueChange={function (s) {
          fetch(process.env.API_URL + "shortcuts?software.id=" + s)
            .then((response) => response.json())
            .then((data) => setShortcuts(data["hydra:member"]))
            .catch((error) => console.log(error));
          setSelectedSoftware(s);
        }}
      >
        {softwareJsx}
      </Picker>
    </ScrollView>
  );
}
