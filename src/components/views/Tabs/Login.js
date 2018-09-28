import {Navigation} from 'react-native-navigation';

const LoginTab = () => {
    Navigation.startSingleScreenApp({
        screen: {
          screen: "myapp1.LoginScreen",
          title: "LoginScreen",
          navigatorStyle:{
            navBarHidden: true
          }
        }
      })
    }
export default LoginTab;