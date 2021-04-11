import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import MatchScore from "../Components/MatchScore";
import {CRIC_API_KEY} from '@env';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function HomeScreen({ navigation }) {
  const [macthesList, setMatchesList] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchMatchScore = async function (match) {
    let response = await fetch(
      "https://cricapi.com/api/cricketScore?apikey="+CRIC_API_KEY+"&unique_id=" +
        match["unique_id"],
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    var matchTemp = await response.json();
    match = { ...match, ...matchTemp };
    macthesList.push(match);
    setMatchesList(["123"]);
    setMatchesList(macthesList);
  };

  const fetchData = async function () {
    console.log(CRIC_API_KEY)
    console.log("Fetching Live Data");
    let response = await fetch(
      "https://cricapi.com/api/matches?apikey="+CRIC_API_KEY,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    let json = await response.json();
    var matches = json.matches;
    matches = matches.filter((match) => match["matchStarted"] == true);

    matches.map((match) => {
      fetchMatchScore(match);
    });
  };

  const onRefresh = React.useCallback(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>Recent Matches</Text>
      </View>
      {macthesList.map((match, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("Match Info", {
              matchId: match["unique_id"],
            })
          }
        >
          <MatchScore match={match} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: 12,
    marginBottom: 7,
    justifyContent: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
