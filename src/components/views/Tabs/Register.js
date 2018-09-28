import {Navigation} from 'react-native-navigation';

const RegisterTab = () => {
    Navigation.startSingleScreenApp({
        screen: {
          screen: "myapp1.RegisterScreen",
          title: "RegisterScreen",
          navigatorStyle:{
            navBarHidden: true
          }
        }
      })
    }
export default RegisterTab;