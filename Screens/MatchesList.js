import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import {CRIC_API_KEY} from '@env';

import MatchCard from "../Components/MatchCard";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function MatchesScreen() {
  const [macthesList, setMatchesList] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = async function () {
    console.log("Fetching Data");
    let response = await fetch(
      "https://cricapi.com/api/matchCalendar?apikey="+CRIC_API_KEY,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    let json = await response.json();
    var matches = json.data;
    setMatchesList(matches);
    console.log(matches);
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
        <Text style={styles.headerText}>Upcoming Matches</Text>
      </View>
      {macthesList.map((match, index) => (
        <TouchableOpacity key={index}>
          <MatchCard match={match} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerStyle : {
    marginTop : 12,
    marginBottom : 7,
    justifyContent : "center",
    flexDirection : "row",
  },
  headerText : {
    fontSize : 20,
    fontWeight : "bold"
  }
});
