import React from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Card, Paragraph, Title, DataTable } from "react-native-paper";
import {CRIC_API_KEY} from '@env';

import Scorecard from "./FullScorecard";
import { concat } from "react-native-reanimated";

const Tab = createMaterialTopTabNavigator();

function MatchResult(props) {
  return (
    <ScrollView>
      {props.winner ? (
        <Card style={[styles.card, styles.firstCard]}>
          <Card.Content style={styles.cardWrapper}>
            <Title>Winning Team</Title>
            <Paragraph>
              <Text style={styles.cardText}>{props.winner}</Text>
            </Paragraph>
          </Card.Content>
        </Card>
      ) : null}

      {props.mom ? (
        <Card style={styles.card}>
          <Card.Content style={styles.cardWrapper}>
            <Title>Man of The Match</Title>
            <Paragraph>
              <Text style={styles.cardText}>{props.mom}</Text>
            </Paragraph>
          </Card.Content>
        </Card>
      ) : null}
    </ScrollView>
  );
}

function MatchInfo(props) {
  return (
    <ScrollView>
      {props.team &&
      props.team[0] &&
      props.team[1] &&
      props.team[0].players &&
      props.team[1].players ? (
        <View>
          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Playing XI</Text>
          </View>
          <DataTable style={[styles.teams]}>
            <DataTable.Header>
              <DataTable.Cell>
                <Text style={styles.tableHeader}>{props.team[0].name}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={[styles.tableHeader]}>{props.team[1].name}</Text>
              </DataTable.Cell>
            </DataTable.Header>

            {props.team[0].players.map((player, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{player.name}</DataTable.Cell>
                <DataTable.Cell>
                  {props.team[1].players[index].name}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#3399ff",
  },
  cardText: {
    color: "#808080",
  },
  cardWrapper: {
    alignItems: "center",
  },
  firstCard: {
    marginTop: 40,
  },
  teams: {
    marginTop: 5,
    marginBottom : 20,
    marginHorizontal : 15,  
    backgroundColor: "#fff",
    borderRadius: 10,
    alignContent : "center",
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default function MyTabs({ route }) {
  const [scorecard, setScorecard] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [mom, setMom] = React.useState("");
  const [batting, setBatting] = React.useState([]);
  const [bowling, setBowling] = React.useState([]);
  const [winner, setWinner] = React.useState("");
  const [team, setTeam] = React.useState([]);

  const fetchData = async function () {
    let response = await fetch(
      "https://cricapi.com/api/fantasySummary?apikey="+CRIC_API_KEY+"&unique_id=" +
        route.params.matchId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    let json = await response.json();
    setScorecard({});
    var data = await json.data;
    setScorecard(data);
    if (data["man-of-the-match"] != null) setMom(data["man-of-the-match"].name);
    if (data.winner_team != null) setWinner(data.winner_team);

    setBatting(data.batting);
    setBowling(data.bowling);
    console.log(data.batting);

    setTeam(data.team);
    console.log(data.team);
  };

  const onRefresh = React.useCallback(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Tab.Navigator initialRouteName="Squads">
      {team && (
        <Tab.Screen name="Squads">
          {(props) => <MatchInfo {...props} team={team} />}
        </Tab.Screen>
      )}

      {batting && bowling && (
        <Tab.Screen name="Scorecard">
          {(props) => (
            <Scorecard {...props} batting={batting} bowling={bowling} />
          )}
        </Tab.Screen>
      )}

      <Tab.Screen name="Match Result">
        {(props) => <MatchResult {...props} mom={mom} winner={winner} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
