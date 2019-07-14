import React from 'react';
import { Button, NetInfo, StyleSheet, Alert, TouchableOpacity, Image, Text, AsyncStorage, View, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';

class Btn_Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
      connectionInfo: null,
      name: "",
      phone: "",
      userToken: "",
      userData: {
        excutionResult: "success",
        workAssignment: [],
        userData: {
          phoneNumber: "+886900000000",
          jobTitle: "未登入使用者",
          image: " ",
          name: "未登入使用者",
          team: "外部人員組",
          workingType: "partTime",
          verified: true,
          permission: "Null",
          gender: "female",
        },
        leaveNote: []
      }

    };
  }

  //https://www.jianshu.com/p/4bf6a976659d
  //http://www.hangge.com/blog/cache/detail_1614.html
  //React Native - 使用NetInfo獲取網絡信息（是否聯網、當前網絡狀態）
  clear() {
    var _that = this;
    AsyncStorage.clear(function (err) {
      if (!err) {
        _that.setState({
          name: "",
          phone: ""
        });
        alert('存储的數據已清除完畢!');
      }
    });
    this.props.navigation.navigate("Login");

  }
  Logout() {
    var _that = this;
    Alert.alert('登出', '您確定要登出嗎？', [
      // onPress={() => { this.Logout() }}
      { text: "是，我要登出", onPress: () => this.clear() },
      { text: "否，繼續使用", onPress: this.opntion2Selected },
      // {text:"选项一", onPress:this.opntion1Selected},
      // {text:"选项二", onPress:this.opntion2Selected},
      // {text:"选项三", onPress:this.opntion3Selected},
      // {text:"选项四", onPress:this.opntion4Selected},
    ]);

    // AsyncStorage.clear(function (err) {
    //   if (!err) {
    //     _that.setState({
    //       name: "",
    //       phone: ""
    //     });
    //     alert('存储的数据已清除完毕!');
    //   }
    // });
  }

  //Alert參考 http://www.hangge.com/blog/cache/detail_1745.html

  getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      var userData_A = JSON.parse(value)
      // alert(userData);

      if (value !== null) {
        console.warn(userData_A);
        this.setState({ userData: userData_A });
        console.warn('top取得userData', await AsyncStorage.getItem('userData'));
        console.warn('top取得getItem(userData)', this.state.userData.userData.team);
      }
    } catch (error) {
      console.log(error);
    }
  }

  checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        console.warn(value);
        this.setState({ userToken: value });
        console.warn('ＧＥＴ checkLogin', await AsyncStorage.getItem('userToken'));
        this.JSON_Post();

      }
    } catch (error) {
      console.log('ＧＥＴ checkLogin', error);
    }
  }

  JSON_Post = () => {
    // let url = 'https://asia-northeast1-test-cf2e8.cloudfunctions.net/postjson';
    let url = 'https://us-central1-my-fuck-awesome-project.cloudfunctions.net/checkLogin';

    fetch(url, {
      method: 'POST',
      // headers 加入 json 格式
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        "uid": this.state.userToken
        // "uid": "778TIlaNHBcW1lwvk3dZ1HuTuPv1"
      })
    }).then((response) => {
      return response.json();
    }).then((jsonData) => {
      console.warn(jsonData);
      console.warn(jsonData.excutionResult);
      if (jsonData.excutionResult == "success") {
        Alert.alert("API checkLogin");
      }
      else {
        Alert.alert("checkLogin 失敗",this.state.userToken, "請檢查網路或是重新登入");
      }
    }).catch((err) => {
      console.warn('錯誤:', err);
      Alert.alert("錯誤", "請檢查checkLogin網路");
      // this.forceUpdate();
    })
  }

  componentWillReceiveProps() {
    this.getStorage().done();

  };

  //页面的组件渲染完毕（render）之后执行
  componentDidMount() {
    this.getStorage().done();
    this.checkLogin().done();

    // //检测网络是否连接
    // NetInfo.isConnected.fetch().done((isConnected) => {
    //     this.setState({isConnected});
    // });

    // //检测网络连接信息
    // NetInfo.fetch().done((connectionInfo) => {
    //     this.setState({connectionInfo});
    // });

    // //监听网络变化事件
    // NetInfo.addEventListener('change', (networkType) => {
    //     this.setState({isConnected: networkType})
    // })

  }
  render() {
    return (


      // <TouchableOpacity onPress={() => { this.props.navigation.navigate('Registered') }}>
      <TouchableOpacity onPress={() => { this.Logout() }}>

        {/* <View style={styles.searchBox}>
{this.state.isConnected ? <Icon name={"link"}  style={styles.Icon} />: <Icon name={"unlink"}  style={styles.Icon} />}

          <Text style={styles.searchContent}> 生態 組 </Text>
          <Text style={styles.welcome}>
                     {this.state.connectionInfo}
                </Text>
          <Text style={styles.welcome}>｀

                    {this.state.isConnected ? '使用中': '沒有網路'}
                </Text>
              

        </View> */}


        <View style={styles.TitleBox}>
          <Text style={styles.searchContent}>{this.state.userData.userData.team}</Text>
        </View>
      </TouchableOpacity>

    );
  }
}





const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.7,
    backgroundColor: '#ededed',
    borderRadius: 5,
    height: 30,

  },

  TitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.7,
    // backgroundColor: '#ededed',
    height: 30,

  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  searchContent: {
    color: '#ededed',
    fontSize: 20,
  },
});


// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(Btn_Search);