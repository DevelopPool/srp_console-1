import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform, 
    Image,
    Dimensions,
    AsyncStorage,
    TouchableOpacity,
    Linking, 
    ScrollView,
    TextInput,
    Button 
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

import { SafeAreaView, } from 'react-navigation';

import ToDay from './ToDay';
import Works from './Works';
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');


export default class Bulletin extends Component {



  static navigationOptions = {
    // headerTitle instead of title
    // headerTitle: <Top />,
    title: '首頁',
    headerStyle: {
      // backgroundColor: '#f4511e',
      backgroundColor: '#F0C0AB',

      
      },
      indicatorStyle: {
        height: 0,
    }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
    headerColor:"red",
    
  
    headerTitleStyle:{flex:1, textAlign: 'center'},
    headerRight:(  //定义导航栏右侧的按钮
      // <Text style={{width:1}}></Text>
      <Text/>

      ),


  };

    state = {
        text: 'http://facebook.github.io/react-native/',
      };
    
  constructor(props) {
    super(props);
    this.state = {
      tabShow: false,
      label: [ '今日工事', '公告'],
      userToken:"",
      userData: {
        phoneNumber: "+886900000000",
        jobTitle:"未登入使用者",
        image: " ",
        name: "未登入使用者",
        team: "外部人員",
        workingType: "partTime",
        verified: true,
        permission: "Null",
        gender: "female"
    },
    };
  }

  componentDidMount() {
    this.getStorage().done();

    setTimeout(() => {
      this.setState({
        tabShow: true
      });
    }, 0)
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


  JSON_Post = () => {
    // let url = 'https://asia-northeast1-test-cf2e8.cloudfunctions.net/postjson';
    let url = 'https://us-central1-my-fuck-awesome-project.cloudfunctions.net/getAnnouncement';
    fetch(url, {
      method: 'POST',
      // headers 加入 json 格式
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "uid":this.state.userToken
      })
    }).then((response) => {
      return response.json();
    }).then((jsonData) => {
      // console.warn(jsonData);
      // console.warn(jsonData.excutionResult);
    //  info_data = jsonData;
      // this.JSON_body();
      if (jsonData.excutionResult=="success"){
        console.warn(jsonData.announcement);
        console.warn(this.state.announcement);
        Alert.alert ("更新成功");
        this.setState({refreshing: false,isLoading: false,announcement: jsonData.announcement,});
        console.warn(JSON.stringify(this.state.announcement));
        }
        else{
          Alert.alert ("更新失敗","請檢查網路");
          this.setState({refreshing: false});
          // this.forceUpdate();
        }
    }).catch((err) => {
      console.warn('錯誤:', err);
      Alert.alert ("指派失敗","請檢查網路");
      this.setState({refreshing: false});
      // this.forceUpdate();
    })
  }
  

  // 滑动tab
  renderScrollableTab() {
    let label = this.state.label
    if (this.state.tabShow) {
      return (

        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar />}
          //tabBarBackgroundColor='#fff'
          tabBarBackgroundColor='#Fefefe'
          tabBarActiveTextColor='#6787A0'
          tabBarUnderlineStyle='#2562b4'
          tabBarInactiveTextColor='#333'

          ///修改 今日公告 公事 tabber 顏色 
          tabBarUnderlineStyle={styles.tabBarUnderline}
        >
              {/* label: ['推荐', '新品', '居家', '餐厨', '配件', '服装', '电器', '洗护', '杂货', '饮食', '婴童', '志趣'], */}

          {
            label.map((item, index) => {

              switch (item) {
                
                
                case '今日工事':
                  return (
                    <Works tabLabel={item} key={index} />
                  )
                  break;
                case '公告':
                  return (
                    <ToDay tabLabel={item} key={index} />
                  )
                  break;
                
                default:
                  return (
                    <Works tabLabel={item} key={index} />
                  )
                  break;
              }
            })
          }
        </ScrollableTabView>

      )
    }

  }

      render() {
        return (
       
          
   
          <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>
            {this.renderScrollableTab()}
          </View>
          
          </SafeAreaView>
    
           
        );
      };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  tabBarUnderline: {
    backgroundColor: '#2562b4',
    height: 3,
    width: width/4,

    // marginLeft: 6
              ///修改 今日公告 公事 tabber  下底線 顏色 

  }
});