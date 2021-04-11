import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import Flag from "react-native-flags";

export default function MatchCard(props) {

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Paragraph style={styles.cardWrapper}>
          <Text style={styles.teamName}>
            {props.match['name']}  
            {"\n\n"}
          </Text>

          <Text style={styles.dateTime}>
            {
              props.match['date']  
            }
          </Text>
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  teamName : {
    fontSize : 16,
    fontWeight : "bold",
    marginRight : 10,
  },
  dateTime : {
    color : "#3399ff",
    fontWeight : "bold",
  },
});
