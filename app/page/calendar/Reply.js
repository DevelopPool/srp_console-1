import React, { Component } from 'react';
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  ScrollView,
  TextInput,
  Alert,
  Button,
  RefreshControl,
} from 'react-native';

import CardLeaveList from '../../components/CardLeaveList';
import moment from "moment";
// import CheckBox from 'react-native-check-box';
import { SafeAreaView, } from 'react-navigation';

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
const url = 'https://us-central1-my-fuck-awesome-project.cloudfunctions.net/getLeaveNoteList';
const img = require('../../img/account.png');

export default class Reply extends Component {
  constructor() {
    super();
    this.state = {
      userToken: "778TIlaNHBcW1lwvk3dZ1HuTuPv1",
      isLoading: true,
      refreshing: false,


    };
  }

  componentDidMount() {
    this.getStorage().done();

    
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.onPost();
  }


  getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        this.setState({ userToken: value });
        this.onPost();
      }
    } catch (error) {
      console.log(error);
    }
  }

  onPost = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "uid": this.state.userToken,
        "unAuthNotes": false,
        "authedNotes": true,
        "offset": 0,
        "limit": 1000
      })
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data.excutionResult == "success") {
        if (data.leaveNote[1] == null) {
          // console.warn(data.leaveNote,"尚未審核")
          Alert.alert('提示', '目前尚未審核任何假單', [
            // onPress={() => { this.Logout() }}
            // { text: "是，我要登出", onPress: () => this.clear() },
            { text: "好，我知道了", onPress: this.opntion1Selected },
            // {text:"选项一", onPress:this.opntion1Selected},
            // {text:"选项二", onPress:this.opntion2Selected},
            // {text:"选项三", onPress:this.opntion3Selected},
            // {text:"选项四", onPress:this.opntion4Selected},
          ]);
        }
        console.warn(data.leaveNote,"審核")
       
        this.setState({
          isLoading: false,
          leaveNote: data.leaveNote,
        }, function () {

        });
      }
    }).catch((err) => {
      console.warn('錯誤:', err);
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View></View>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.Scrollcontainer}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh} />}>
            {this.state.leaveNote.map((note) => {
              return (
                <CardLeaveList
                  profile_icon={img}
                  profile_name={note.issuerName}
                  leave_type={note.type}
                  leave_start_date={moment(note.startLeaveTime._seconds * 1000).format("YYYY/MM/DD")}
                  leave_end_date={moment(note.endLeaveTime._seconds * 1000).format("YYYY/MM/DD")}
                  leave_start_time={moment(note.startLeaveTime._seconds * 1000).format("hh:mm a")}
                  leave_end_time={moment(note.endLeaveTime._seconds * 1000).format("hh:mm a")}
                  leave_desc={note.desc}
                  leave_apply_date={moment(note.issueTime._seconds * 1000).format("YYYY/MM/DD")} />
              );
            })}
          </ScrollView>
        </SafeAreaView>
      );

    }

  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Scrollcontainer: {
    // flex: 1,
    // flexDirection:'row',
    // padding: 10,
  },
});