import React from 'react';
import { Button,StyleSheet,    AsyncStorage,
  TouchableOpacity,Image,Alert,Text ,View,Dimensions,Linking} from 'react-native';
import { withNavigation } from 'react-navigation';
const { width, height } = Dimensions.get('window');
const captchaUrl = 'https://my-fuck-awesome-project.firebaseapp.com/phone-invisible.html'

class Btn_Phone extends React.Component {

  state = {
    key:'',
    value:'',
    data: '\n',
}
handleClick = () => {
  Linking.openURL(captchaUrl).catch(err => console.error('An error occurred', err));

};

_retrieveData = async () => {
  try {

      this.props.navigation.push('Phone') 

    
   } catch (error) {
     // Error retrieving data
     Alert.alert('錯誤');

   }
}


  render() {
    return (
    <View>
   
  <TouchableOpacity onPress={ this.handleClick}>
        <View style={styles.Button}>
          <Text style={styles.searchContent}>電話登入</Text>
          {/* <Text style={styles.searchContent}>簽下去</Text> */}

        </View>
      </TouchableOpacity>
     


   </View>

    );
  }
}





const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.6,
    paddingVertical:10,
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
  

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(Btn_Phone);