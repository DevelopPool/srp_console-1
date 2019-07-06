import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight
} from 'react-native';

import Card from './Card';
import moment from "moment";

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
let info_data;

export default class CardUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLeaveTime: null,
      endLeaveTime: null,
      authorized: null,
      type: null,
      description: null,
      userToken: "778TIlaNHBcW1lwvk3dZ1HuTuPv1",
      refreshing: false,
    };
  }

  componentDidMount() {
    this.JSON_Post();
}
_onRefresh = () => {
  this.setState({ refreshing: true });
  this.JSON_Post();
}

getStorage = async () => {
  try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
          console.warn(value);
          this.setState({ userToken: value });
      }
  } catch (error) {
      console.log(error);
  }
}

JSON_Post = () => {
  let url = 'https://us-central1-my-fuck-awesome-project.cloudfunctions.net/getMyLeaveNoteList';
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "uid": this.state.userToken
      })
  }).then((response) => {
      return response.json();
  }).then((jsonData) => {
      info_data = jsonData.leaveNotes;
      this.JSON_body();
      console.warn(jsonData);
      if (jsonData.excutionResult == "success") {
          this.setState({ refreshing: false });
      }
      else {
          Alert.alert("更新失敗", "請檢查網路");
          this.setState({ refreshing: false });
      }
  }).catch((err) => {
      console.warn('錯誤:', err);
      Alert.alert("更新失敗", "請檢查網路");
      this.setState({ refreshing: false });
  })
}

JSON_body = () => {
  console.warn("info_data",info_data);
  this.setState({
    startLeaveTime: info_data.startLeaveTime._seconds,
    endLeaveTime: info_data.endLeaveTime._seconds,
    authorized: info_data.authorized,
    type: info_data.type,
    description: info_data.description,
  })
}

ifAuthorized = (authorized) => {
  if(!authorized) return "待審核"
  else return "已審核"
}

startAndEndDate = (startLeaveTime, endLeaveTime) => {
  const start = moment(startLeaveTime * 1000).format("YYYY/MM/DD");
  const end = moment(endLeaveTime * 1000).format("YYYY/MM/DD");
  return start + " - " + end
}

  render() {
    return (
      <View>
        <View style={styles.CardTitle}>
          <Text style={styles.CardTitleText}>{"假單狀況"}</Text>
        </View>
        <Card body={
          <View style={styles.CardUserInfo}>
            <Text style={styles.CardUserInfoText}>{this.state.type}</Text>
            <Text style={styles.CardUserInfoText}>{this.startAndEndDate(this.state.startLeaveTime, this.state.endLeaveTime)}</Text>
            <Text style={styles.CardUserInfoText}>{this.ifAuthorized(this.state.authorized)}</Text>
            <View style={styles.cardModalConfirm}>
              <TouchableHighlight
                onPress={() => { }}>
                <Text style={styles.cardModalConfirmText}>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
        } />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  CardTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  CardTitleText: {
    fontSize: 22,
    color: '#4A667C'
  },
  CardUserInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  cardModalConfirm: {
    padding: 5,
    backgroundColor: "#98BFDE",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#98BFDE",
    marginHorizontal: 10
  },
  cardModalConfirmText: {
    color: "#FFFFFF",
    marginHorizontal: 5
  },
  CardUserInfoText: {
    fontSize: 16,
    color: '#4A667C',
    paddingVertical: 5
  }
});