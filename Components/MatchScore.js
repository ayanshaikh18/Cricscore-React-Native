import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, Divider } from "react-native-paper";

export default function MatchScore(props) {
  return (
    <Card style={styles.card}>
      <View>
        <Card.Content>
          <Text style={styles.teamName}>{props.match["team-1"]}</Text>
          <Text style={{fontSize:10}}>VS</Text>
          <Text style={styles.teamName}>{props.match["team-2"]}</Text>
        </Card.Content>
      </View>
      <Card.Content>
        <Divider style={styles.content} />
        <Text style={styles.score}>{props.match["score"]}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 14,
    padding: 10,
    borderWidth : 1,
    borderColor: "#f3f3f3",
    borderRadius : 5,
  },
  score: {
    color: "#808080",
  },
  type: {
    fontWeight: "bold",
    fontSize: 12,
    color : "#668cff",
  },
  content: {
    marginVertical: 5,
  },
  teamName : {
    fontSize : 17,
    fontWeight : "bold",
  }
});
