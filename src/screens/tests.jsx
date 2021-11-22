const shortcutJsx = shortcut.map((s) => (
    <TouchableOpacity
      key={s.id}
      style={styles.card}
      onPress={() => props.navigation.navigate("ShortcutScreen", { shortcut: s })}
    >
      <View>
        <Text style={styles.titleCard}>{s.title}</Text>
        <Text style={styles.software}>{s.software.name}</Text>
        <View>
          {s.categories.map((c) => (
            <Text key={c.id} style={styles.category}>
              {c.name}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  ));