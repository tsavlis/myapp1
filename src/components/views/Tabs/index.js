import {
    Navigation
} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


const navLeftButton = (sources) => {
    return {
        title: 'Drawer',
        id: 'DrawerButton',
        icon: sources[0],
        disableIconTint: true,
        buttonColor: 'white'
    }
}
const LoadTabs = () => {
    Promise.all([
        Icon.getImageSource('bars', 20, 'white')
    ]).then(sources => {
        Navigation.startSingleScreenApp({
            screen: {
                screen: "myapp1.MainScreen",
                title: "Mokaal News",
                navigatorStyle: {
                    navBarBackgroundColor: '#00ADA9',
                    navBarTitleTextCentered: true,
                    navBarTextFontSize: 20,
                    navBarTextFontFamily: 'Roboto-Black',
                    navBarTextColor: '#ffffff'
                },
                navigatorButtons: {
                    leftButtons: [navLeftButton(sources)]
                }
            },
            tabStyle: {
                tabBarButtonColor: 'grey',
                tabBarSelectedButtonColor: '#FFC636',
                tabBarTextFontFamily: 'Roboto-Black',
                tabBarBackgroundColor: 'white',
                tabBarTranslucent: false
            },
            appStyle: {
                tabBarButtonColor: 'grey',
                tabBarSelectedButtonColor: '#FFC636',
                tabBarTextFontFamily: 'Roboto-Black',
                tabBarBackgroundColor: 'white',
                navBarButtonColor: '#ffffff',
                keepStyleAcrossPush: true
            },
            drawer: {
                left: {
                    screen: "myapp1.SidedrawerComponent",
                    fixedWidth:550
                    
                }
               
                
            }
        })
    })
}
export default LoadTabs;