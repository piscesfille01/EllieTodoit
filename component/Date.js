import moment from "moment";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Date = ({ date, onSelectDate, selected }) => {
  const day = moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") ? "Today" : moment(date).format("ddd");
  const dayNumber = moment(date).format("D");
  const fullDate = moment(date).format("YYYY-MM-DD");

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)} 
      style={[styles.card, selected === fullDate && { backgroundColor: "#808080" }]}
    >
      <Text style={[styles.big, selected === fullDate && { color: "#fff" }]}>{day}</Text>
      <View style={{ height: 10 }} />
      <Text style={[styles.medium, selected === fullDate && { color: "#fff", fontWeight: "bold", fontSize: 17 }]}>
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date; 

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eee",
    borderRadius: 10,
    borderColor: "#ddd",
    padding: 11,
    marginVertical: 10,
    alignItems: "center",
    height: 85,
    width: 77,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: "bold",
    fontSize: 19,
  },
  medium: {
    // fontWeight: 'bold',
    fontSize: 17,
  },
});
