import React from 'react';
import { Button,  NetInfo,  StyleSheet,TouchableOpacity,Image,Text,  AsyncStorage  ,View,Dimensions} from 'react-native';
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
        phone: ""
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
      alert('存储的数据已清除完毕!');
    }
  });
}




//页面的组件渲染完毕（render）之后执行
componentDidMount() {
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
  <TouchableOpacity onPress={() => { this.clear()}}>

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
          <Text style={styles.searchContent}> 生 態 組 </Text>
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