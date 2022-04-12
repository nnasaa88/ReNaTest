const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("userName");
    if (value !== null) {
      Alert.alert(value + "---хадгалсан байна");
    }
  } catch (e) {
    Alert.alert("Алдаа байна");
  }
};
