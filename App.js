import { Navigation } from 'react-native-navigation';
import ConfigureStore from './src/components/Store/config';
import { Provider } from 'react-redux';

import SidedrawerComponent from './src/components/views/Sidedrawer';
import UserInfo from './src/components/views/Admin/UserInfo';
import LoginScreen from './src/components/views/Login';
import MainScreen from './src/components/views/Main';
import RegisterScreen from './src/components/views/Register';
import Messages from './src/components/views/Admin/Messages';
import Settings from './src/components/views/Admin/Settings';
import Article from './src/components/views/Articles';

const store = ConfigureStore();


Navigation.registerComponent(
  "myapp1.LoginScreen",
  () =>
    LoginScreen,
  store,
  Provider
);


Navigation.registerComponent(
  "myapp1.MainScreen",
  () =>
    MainScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "myapp1.SidedrawerComponent",
  ()=>SidedrawerComponent,
      store,
      Provider
);

Navigation.registerComponent(
  "myapp1.RegisterScreen",
  () =>
  RegisterScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "myapp1.UserInfo",
  () =>
  UserInfo,
  store,
  Provider
);

Navigation.registerComponent(
  "myapp1.Messages",
  () =>
  Messages,
  store,
  Provider
);
Navigation.registerComponent(
  "myapp1.Settings",
  () =>
  Settings,
  store,
  Provider
);

Navigation.registerComponent(
  "myapp1.Article",
  ()=>Article,
      store,
      Provider
);
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "myapp1.LoginScreen",
    title: "Login",
    navigatorStyle: {
      navBarHidden: true
    }
  }
})