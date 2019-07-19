import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  WebView,
  TextInput,
  AsyncStorage,
  Alert,
  Button,
  Linking,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { createBottomTabNavigator, SafeAreaView, createStackNavigator, withNavigation } from 'react-navigation';

// import SvgMsg from '../img/icon/msg';


// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
const captchaUrl = 'https://my-fuck-awesome-project.firebaseapp.com/phone-invisible.html'
const patchPostMessageFunction = function () {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function (message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function () {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };

  window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';


class LoginModal extends React.Component {

// export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+886910927898',
      confirmResult: null,
      text: 'Useless Placeholder',
      name: 'aaaaa',
      phone: 'bbbbb',
      // userToken: "778TIlaNHBcW1lwvk3dZ1HuTuPv1",
      userToken: "",
      modalPhoneVisible: false,
      userData: {
        phoneNumber: "+886910927898",
        jobTitle: "dayuan",
        image: " ",
        name: "dayuan",
        team: "dayuan",
        workingType: "partTime",
        verified: true,
        permission: "Null",
        gender: "female"
      }

    };
    this.onMessage = this.onMessage.bind(this);

  }
  handleClick = () => {
    Linking.openURL(captchaUrl).catch(err => console.error('An error occurred', err));
    //////開Phone number authentication with invisible ReCaptcha

  };
  // componentDidMount() {
  //   //检测网络是否连接
  //   // this.getStorage().done();
  //   this.check_ID_Storage().done();
  // }
  // componentWillReceiveProps() {
  //   //检测网络是否连接
  //   // this.getStorage().done();
  //   // this.check_ID_Storage().done();
  // }
  check(str) { return str.length > 25 && str.length < 29 && str.match(/[0-9A-Za-z]+/).toString() == str; }

testID(){
  
  var data = "9UDpS6D8TkNkTJ2S2c33MrlYbAY2";

  // var data = "778TIlaNHBcW1lwvk3dZ1HuTuPv1";
var json= {///測試用 可拔
  "excutionResult": "success",
  "workAssignment": [],
  "userData": {
      "workingType": "partTime",
      "verified": true,
      "permission": "root",
      "gender": "female",
      "phoneNumber": "+886910927898",
      "jobTitle": "supercoder",
      "image": " ",
      "name": "daYuan",
      "team": "team101"
  },
  "leaveNote": []
}
var userData=JSON.stringify(json)///測試用 可拔
  console.warn("event run")
  // console.warn(event)

  if (data.length > 25 && data.length < 29 && data.match(/[0-9A-Za-z]+/).toString() == data){
  //   console.warn(data);
  //    //设置多项
  // var keyValuePairs = [['userToken', data],['userData', userData]]
  // AsyncStorage.multiSet(keyValuePairs, function (errs) {
  //   if (errs) {
  //     //TODO：存储出错
  //     return;
  //   }

  //   console.warn('userToken保存成功!');
  // });
  this.JSON_Post(data);
  }
}
  onMessage(e) {
    var event =e.nativeEvent;
    var data = e.nativeEvent.data;

    console.warn("event run")
    // console.warn(event)

    if (data.length > 25 && data.length < 29 && data.match(/[0-9A-Za-z]+/).toString() == data){
      console.warn(data);
      this.JSON_Post(data);
      console.warn('userDATA保存成功!');
       //设置多项
    // var keyValuePairs = [['userToken', data]]
    // AsyncStorage.multiSet(keyValuePairs, function (errs) {
    //   if (errs) {
    //     //TODO：存储出错
    //     return;
    //   }
    //   console.warn('userToken保存成功!');
    //   // this.props.navigation.push('Home')

    // });
    }
  }


  JSON_Post (Token) {
    let url = 'https://us-central1-my-fuck-awesome-project.cloudfunctions.net/getUserDetail';
  
    fetch(url, {
      method: 'POST',
      // headers 加入 json 格式
      headers: {
        'Content-Type': 'application/json'
      },
  
      body: JSON.stringify({
        "uid": Token
        // "uid": "778TIlaNHBcW1lwvk3dZ1HuTuPv1"
      })
    }).then((response) => {
      return response.json();
    }).then((jsonData) => {
      console.warn(jsonData);
      console.warn(jsonData.excutionResult);
      if (jsonData.excutionResult == "success") {
        var userData=JSON.stringify(jsonData)
  
        var keyValuePairs = [['userToken', Token],['userData', userData]]
        AsyncStorage.multiSet(keyValuePairs, function (errs) {
          if (errs) {
            //TODO：存储出错
            return;
          }
      
          console.warn('userToken+userData保存成功NET!');
        });
      }
      else {
        Alert.alert("NET Login 失敗",this.state.userToken, "請檢查網路或是重新登入");
      }
    }).catch((err) => {
      console.warn('錯誤:', err);
      Alert.alert("錯誤", "請檢查Login網路");
      // this.forceUpdate();
    })
  }
  // check_ID_Storage = async () => {
  //   //主動驗證是否登入
  //   try {
  //     const value = await AsyncStorage.getItem('userToken');
  //     console.warn(value);

  //     if (value !== null) {
  //       console.warn(value);
  //       console.warn('已登入過', await AsyncStorage.getItem('userToken'));
  //       // this.props.navigation.push('Home')
  //       this._retrieveData();
  //     }
  //     else {
  //       ///這段有問題...
  //       Alert('請登入');
  //       console.warn('請登入');
  //     }


  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // save() {
  //   //设置多项
  //   var keyValuePairs = [['userToken', this.state.userToken]]
  //   AsyncStorage.multiSet(keyValuePairs, function (errs) {
  //     if (errs) {
  //       //TODO：存储出错
  //       return;
  //     }
  //     console.warn('userToken保存成功!');
  //   });
  // }


  setPhoneModalVisible(visible) {
    this.setState({ modalPhoneVisible: visible });
  }
  check_ID_Storage = async () => {
    //主動驗證是否登入
    try {
      const value = await AsyncStorage.getItem('userToken');
      console.warn(value);

      if (value !== null) {
        console.warn(value);
        console.warn('已登入過', await AsyncStorage.getItem('userToken'));
        this.props.navigation.push('Home')
      }
      else {
        ///這段有問題...
        Alert('請登入');
        console.warn('請登入');
      }


    } catch (error) {
      console.log(error);
    }
  }
  getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        console.warn(value);
        this.setState({ userToken: value });
        this.JSON_Post();
        console.warn('再次', await AsyncStorage.getItem('userToken'));
      }
    } catch (error) {
      console.log(error);
    }
  }
  save() {
    //设置多项
    var keyValuePairs = [['userToken', this.state.userToken]]
    AsyncStorage.multiSet(keyValuePairs, function (errs) {
      if (errs) {
        //TODO：存储出错
        return;
      }
      console.warn('userToken保存成功!');
    });
  }

  clear() {
    var _that = this;
    AsyncStorage.clear(function (err) {
      if (!err) {
        _that.setState({
          name: "",
          phone: ""
        });
        alert('存储的数据已清除完毕!');
      }
    });
  }


  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    } catch (error) {
      // Error saving data
    }
  };

  setStorage = async () => {
    try {
      await AsyncStorage.setItem('@Route:initialPage', 'login');
    } catch (error) {
      console.log(error);
    }
  }

  // clear() {
  //   var _that = this;
  //   AsyncStorage.clear(function (err) {
  //     if (!err) {
  //       _that.setState({
  //         name: "",
  //         phone: ""
  //       });
  //       alert('存储的数据已清除完毕!');
  //     }
  //   });
  // }


  render() {
    return (
      <View >

        <TouchableOpacity
          // style={styles.bottomLoginSetup}
          onPress={() => {
            this.setPhoneModalVisible(true)
          }} >
 <View style={styles.Button}>
          <Text style={styles.searchContent}>電話登入</Text>
          {/* <Text style={styles.searchContent}>簽下去</Text> */}

        </View>    
            </TouchableOpacity>    
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalPhoneVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
        >
          <View style={{ flex: 1, backgroundColor: "#2A2E43", }}>

            <View style={{
              marginTop: 40, flex: 1, backgroundColor: "#2A2E43", justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text>Is the Phone Modal</Text>

              <View style={{ width: width * 0.9, height: height * 0.6, backgroundColor: "white", padding: 10, borderRadius: 15, }}>

                <WebView
                  ref={(ref) => { this.webview = ref; }}
                  // source={{ uri}}
                  style={{ flex: 1, backgroundColor: '#FCF' }}
                  // source={{ uri: 'http://localhost:5000/phone-invisible.html' }}
                  source={{ uri: 'https://my-fuck-awesome-project.firebaseapp.com/phone-invisible.html' }}

                  
                  injectedJavaScript={patchPostMessageJsCode}
                  onMessage={this.onMessage}
                />
              </View>

              <TouchableOpacity
          // style={styles.bottomLoginSetup}
          onPress={() => {
            this.testID();
          }} >
 {/* <View style={styles.Button}>
          <Text style={styles.searchContent}>test登入</Text>
///測試用電話登入
        </View>     */}

        <Text>如果發生錯誤，請關閉頁面後重新操做</Text>


            </TouchableOpacity>    
              <View style={{
                flex: 0.8, backgroundColor: "#2A2E43", alignItems: 'center',
                alignItems: 'center',
                justifyContent: "flex-end"
              }}>


                <TouchableHighlight style={styles.Box} onPress={() => {
                  this.setPhoneModalVisible(!this.state.modalPhoneVisible);
                  this.check_ID_Storage();

                }}>
                  <Text>back to home</Text>
                </TouchableHighlight>
              </View>


            </View>
          </View>
        </Modal>
  
    </View>
    );
  }
}


{/*Ex
  <Card body={
  <View style={{ flex: 1, }}>
    <Text style={{ fontSize: 22, }}>HI</Text>
  </View>
}/> */}


const styles = StyleSheet.create({
  card: {
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: width * 0.9,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000000',
    shadowRadius: 8,
    shadowOpacity: 0.4,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4
    },
    marginHorizontal: width * 0.05,
  } , bottomLoginSetup: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#3B56C9',
    borderStyle: 'solid',
    marginRight: 5,
    marginVertical: 5,
    height: 50,

  }
  ,
  Box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,

    marginVertical: 20,

    height: 40,
    borderRadius: 10,
    backgroundColor: "#665EFFa5",
    // marginVertical:10,
    width: width * 0.9,
  },
  backgroundimg:{
    // paddingRight:30,
  },
  background: {
    flex:1,
    // height: 90,
    width: width,
    // resizeMode: 'cover',
        // paddingVertical: 35,
        paddingHorizontal: 20,
        height:height*0.15,
       marginTop:height*0.66, 

    //  backgroundColor: '#6E93',
  flexDirection: 'column', 
  justifyContent: 'center',
   paddingHorizontal: 35,

    position: 'absolute',

  },
  TextTop:{
    flex:1,

  },
  TextDown:{
    marginTop:20,
    flex:1,
    paddingHorizontal: 45,
    // backgroundColor: '#6E93',


  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    paddingVertical:15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  searchContent: {
    color: '#7094B1',
    fontSize: 20,
  },
});
export default withNavigation(LoginModal);


// 1.2 數據的持久化操作(RN上的sharedPreference與NSUserDefaults)
// 1.2.1、說明
// 1、RN不支持調用JS的fs包進行讀寫操作，它提供的是AsyncStorage API。
// 2、該API只是一個簡單的鍵值對存儲系統。
// 3、每一個AsyncStorage API都會返回一個JS的Promise對象。
// 4、有回調函數。
// 1.2.2 寫入數據與錯誤捕捉
// 1、方法原型：static object setItem(key,value); 
// 2、調用該方法可存入數據。
// 3、可以通過AsyncStorage提供的multiSet來一次存儲多組數據。static object multiSet(aArray)方法。
// 1.2.3 讀取數據
// 1、調用getItem方法，原型為：static object getItem(aKey) 
// 2、還可以通過調用getAllKeys獲取當前存儲的所有鍵，原型：static object getAllKeys([aCallback]) 
// 3、還可以通過multiGet得到多個鍵對應的多個值。
// 4、AsyncStorage存儲數據是無序的。
// 1.2.4 刪除數據
// 1、函數原型：static object removeItem(aKey) 
// 2、還可以通過調用clear()函數刪除所有的數據。
// 3、還可以通過調用multiRemove刪除多個對應的鍵和值。函數原型：static object multiRemove(aArray)
// 1.2.5 修改數據
// 1、提供了兩個方法進行該項操作：mergeItem(aKey,aValue)以及multiMerge(aArray)。
// 2、需要注意的是：這兩個方法還不能跨平台使用，建議還是使用寫入方法對原來已經存在的鍵值進行覆蓋。
// 1.2.6 JSON對象的存取
// 存入：
// 調用JSON.stringify(json)方法。
// 讀取：調用JSON.parse(newJsonStr)。
// 注意：在使用parse方法的時候，傳入的字符串必須嚴格遵守JSON語法，尾部的逗號是不允許出現的。

// 作者：Alan想去月球
// 链接：https://www.jianshu.com/p/857e14689276
// 来源：简书
// 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。