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
      userToken: "778TIlaNHBcW1lwvk3dZ1HuTuPv1",
      modalPhoneVisible: false,

    };
    this.onMessage = this.onMessage.bind(this);

  }
  handleClick = () => {
    Linking.openURL(captchaUrl).catch(err => console.error('An error occurred', err));
    //////開Phone number authentication with invisible ReCaptcha

  };
  componentDidMount() {
    //检测网络是否连接
    // this.getStorage().done();
    this.check_ID_Storage().done();
  }
  componentWillReceiveProps() {
    //检测网络是否连接
    // this.getStorage().done();
    // this.check_ID_Storage().done();
  }
  check(str) { return str.length > 25 && str.length < 29 && str.match(/[0-9A-Za-z]+/).toString() == str; }

  onMessage(e) {
    var event =e.nativeEvent;
    var data = e.nativeEvent.data;

    console.warn("event run")
    // console.warn(event)

    if (data.length > 25 && data.length < 29 && data.match(/[0-9A-Za-z]+/).toString() == data){
      console.warn(data)


    }
  

      // var data=JSON.parse(event.data);

    // alert(e);
    //+886910927898

    // var event =e.nativeEvent;
    //   var data=JSON.parse(event.data);

    // var event = e.nativeEvent;
    // var data = JSON.parse(even);
    // alert(data);
    // console.warn(data)

    // this.setState({ userToken: "'"+e+"'" });
    // alert("data");
    // alert(e);

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
          style={styles.bottomLoginSetup}
          onPress={() => {
            this.setPhoneModalVisible(true)
          }} >
          <Text>Login "&" Setup Modal</Text>
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

              <View style={{ width: width * 0.9, height: height * 0.5, backgroundColor: "white", padding: 10, borderRadius: 15, }}>

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


  }
});
export default withNavigation(LoginModal);