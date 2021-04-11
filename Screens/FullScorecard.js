import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  RefreshControl,
} from "react-native";

import { List, DataTable } from "react-native-paper";

export default function Scorecard(props) {
  
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    console.log("Refreshing")
  }, []);


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {props.batting &&
        props.bowling &&
        props.batting.map((bat, index) => (
          <List.Accordion
            key={index}
            title={<Text style={styles.accHeader}>{bat.title}</Text>}
            style={styles.ScoreCardHeader}
          >
            <DataTable>
              <DataTable.Header style={styles.scoreHeader}>
                <DataTable.Cell style={{ flex: 6 }}>Batsman</DataTable.Cell>
                <DataTable.Cell>R</DataTable.Cell>
                <DataTable.Cell>B</DataTable.Cell>
                <DataTable.Cell>4s</DataTable.Cell>
                <DataTable.Cell>6s</DataTable.Cell>
                <DataTable.Cell>SR</DataTable.Cell>
              </DataTable.Header>

              {bat.scores.map((score, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={{ flex: 6 }}>
                    <View style={styles.batsman}>
                      <Text>{score.batsman}</Text>
                      <Text style={styles.dismissal}>
                        {score["dismissal-info"]}
                      </Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell>{score.R}</DataTable.Cell>
                  <DataTable.Cell>{score.B}</DataTable.Cell>
                  <DataTable.Cell>{score["4s"]}</DataTable.Cell>
                  <DataTable.Cell>{score["6s"]}</DataTable.Cell>
                  <DataTable.Cell>{score.SR}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>

            <DataTable style={styles.bowlingHeader}>
              <DataTable.Header style={styles.scoreHeader}>
                <DataTable.Cell style={{ flex: 6 }}>Bowler</DataTable.Cell>
                <DataTable.Cell>O</DataTable.Cell>
                <DataTable.Cell>M</DataTable.Cell>
                <DataTable.Cell>R</DataTable.Cell>
                <DataTable.Cell>W</DataTable.Cell>
                <DataTable.Cell>ER</DataTable.Cell>
              </DataTable.Header>

              {props.bowling &&
                props.bowling[index] &&
                props.bowling[index].scores &&
                props.bowling[index]["scores"].map((score, i) => (
                  <DataTable.Row key={i}>
                    <DataTable.Cell style={{ flex: 6 }}>
                      {score.bowler}
                    </DataTable.Cell>
                    <DataTable.Cell>{score.O}</DataTable.Cell>
                    <DataTable.Cell>{score.M}</DataTable.Cell>
                    <DataTable.Cell>{score.R}</DataTable.Cell>
                    <DataTable.Cell>{score.W}</DataTable.Cell>
                    <DataTable.Cell>{score.Econ}</DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
          </List.Accordion>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ScoreCardHeader: {
    backgroundColor: "#3399ff",
    margin: 10,
    color: "#ffffff",
    marginTop : 15,
  },
  scoreHeader: {
    backgroundColor: "#ffffff",
  },
  dismissal: {
    color: "#808080",
    fontSize: 12,
  },
  batsman: {
    padding: 3,
  },
  bowlingHeader: {
    marginTop: 10,
  },
  accHeader: {
    color: "#fff",
  },
});
