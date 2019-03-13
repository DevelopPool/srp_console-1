import React, { Component } from "react";
import {
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
  Button,
  SafeAreaView,
  TouchableHighlight,
  Modal
} from "react-native";

import CardLeave from '../../components/CardLeave';
// import { SafeAreaView, } from 'react-navigation';

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get("window");
const url = 'https://us-central1-my-fuck-awesome-project.cloudfunctions.net/getLeaveNoteList';

const items_Text = [
  {
    name: "標題們",
    // id: 0,
    children: [
      {
        profile_icon: require("../../img/account.png"),
        profile_name: "拉互依",
        leave_type: "假別",
        leave_start_date: "2019/10/10",
        leave_end_date: "2019/10/11",
        leave_start_time: "12:00",
        leave_end_time: "13:00",
        leave_desc: "請假理由請假理由請假理由請假理由請假理由",
        leave_apply_date: "2019/10/11"
        // id: 20,
      }
    ]
  }
];

export default class RequestLeave extends Component {
  constructor() {
    super();
    this.state = {
      issuer: "778TIlaNHBcW1lwvk3dZ1HuTuPv1",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.onPost();
  }

  onPost = () =>{
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "uid": this.state.issuer,
        "unAuthNotes":true,
        "authedNotes":true,
        "offset":0,
        "limit":5
      })
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data.excutionResult == "success") {
        console.warn(data.leaveNote)
        this.setState({
          isLoading: false,
          leaveNote: data.leaveNote,
        }, function(){

        });
      }
    }).catch((err) => {
      console.warn('錯誤:', err);
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View></View>
      )
    }
    else{
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.Scrollcontainer}>
  
          {this.state.leaveNote.map((note) => {
           return (
            <CardLeave
            profile_icon={items_Text[0].children[0].profile_icon}
            profile_name={note.issuerName.toString}
            leave_type={note.type}
            leave_start_date={items_Text[0].children[0].leave_start_date}
            leave_end_date={items_Text[0].children[0].leave_end_date}
            leave_start_time={items_Text[0].children[0].leave_start_time}
            leave_end_time={items_Text[0].children[0].leave_end_time}
            leave_desc={note.desc}
            leave_apply_date={items_Text[0].children[0].leave_apply_date} />
           );
        })}
          </ScrollView>
        </SafeAreaView>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#6787A0',
    // padding: 20
  },
  Scrollcontainer: {
    flex: 1,
    padding: 10
  },
});
