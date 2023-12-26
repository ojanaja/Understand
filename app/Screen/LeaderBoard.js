import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { GetAllUsers } from "../Services";
import COLORS from "../Utils/Colors";
import Gold from './../../assets/gol-medal.png'
import Silver from './../../assets/silver-medal.png'
import Bronze from './../../assets/bronje-medal.png'

export default function LeaderBoard() {
  const [userList, setUserList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    GetAllUserDetails();
  }, []);

  const GetAllUserDetails = () => {
    setRefreshing(true); // Set refreshing to true when starting to fetch data
    GetAllUsers()
      .then((resp) => {
        console.log(resp);
        resp && setUserList(resp?.userDetails);
      })
      .finally(() => setRefreshing(false)); // Set refreshing to false after fetching data
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={GetAllUserDetails}
        />
      }
    >
      <View>
        <View style={{ height: 160, backgroundColor: COLORS.GREEN, padding: 30 }}>
          <Text style={{ fontFamily: 'bold', color: COLORS.PRIMARY, fontSize: 30 }}>LeaderBoard</Text>
        </View>

        <View style={{ marginTop: -40, height: "85%" }}>
          <ScrollView>
            {userList.map((item, index) => (
              <View key={index} style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between', padding: 20, backgroundColor: COLORS.PRIMARY,
                margin: 8, marginRight: 15, marginLeft: 15, borderRadius: 15
              }}>
                <View style={{
                  display: 'flex', flexDirection: 'row',
                  gap: 10, alignItems: 'center'
                }}>
                  <Text style={{ fontFamily: 'medium', fontSize: 21, color: COLORS.GRAY }}>{index + 1}</Text>
                  <Image source={{ uri: item.profileImage }}
                    style={{ width: 60, height: 60, borderRadius: 99 }}
                  />
                  <View>
                    <Text style={{ fontFamily: 'medium', fontSize: 19 }}>{item.userName}</Text>
                    <Text style={{ fontFamily: 'poppins', fontSize: 17, color: COLORS.GRAY }}>{item.point} Points</Text>
                  </View>
                </View>
                {index < 3 ?
                  <Image source={index + 1 === 1 ? Gold
                    : index + 1 === 2 ? Silver : Bronze}
                    style={{ width: 40, height: 40 }} />
                  : null}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
