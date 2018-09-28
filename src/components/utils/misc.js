import { Dimensions,Platform,AsyncStorage } from 'react-native';
// export const MYURL = `https://plustic.mokaal.com/api/v1`
// export const SIGNUP = `${MYURL}/register`
// export const SIGNIN= `${MYURL}/login`
export const FIREBASEURL = `https://projectone-db1a6.firebaseio.com`;
export const APIKEY = `AIzaSyCZjFZhTCGvYtyIjh5Hemu6sktlAGDNqAU`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;
export const PSWRESET =`https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=${APIKEY}`;
export const EMAILCHANGE = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=${APIKEY}`;
export const PASSWORDCHANGE = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=${APIKEY}`;
export const DELETEACCOUNT =`https://www.googleapis.com/identitytoolkit/v3/relyingparty/deleteAccount?key=${APIKEY}`;
export const MOKAALURL =  `https://hankerbot.mokaal.com/api/v1/hello`;
export const UPDATEUSER = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=${APIKEY}`;
export const TOSURL= `https://plustic.mokaal.com/api/v1/tos`;
export const MESSAGEURL = `https://baconipsum.com/api/?type=meat-and-filler`;
export const GETUSERDATA = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${APIKEY}`;

export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape"
}

export const setOrientation = (cb) => {
    return Dimensions.addEventListener("change",cb)
}

export const removeOrientation = () =>{
    return Dimensions.removeEventListener("change")
}

export const getPlatform = () => {
    if(Platform.OS === 'ios') {
        return "ios"
    } else {
        return "android"
    }
}


export const getTokens =(cb) => {
    AsyncStorage.multiGet([
        '@myapp1@token',
        '@myapp1@refreshToken',
        '@myapp1@expireToken',
        '@myapp1@uid',
    ]).then(value=>{
        cb(value)
    })
}

export const setTokens = (values,cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600000*1000000);

    AsyncStorage.multiSet([
        ['@myapp1@token',values.token],
        ['@myapp1@refreshToken',values.refToken],
        ['@myapp1@expireToken',expiration.toString()],
        ['@myapp1@uid',values.uid],
    ]).then(response => {
        cb();
    })
}

export const navigatorDrawer = (event,$this) => {
    if (event.type === "NavBarButtonPress" && event.id === "DrawerButton"){
        $this.props.navigator.toggleDrawer({
            side:'left',
            animated:true
        })
    }
}
export const navigatorDeepLink = (event,$this) => {
    if(event.type === 'DeepLink'){
        $this.props.navigator.toggleDrawer({
            side:'left',
            animated:true
        }); 
            $this.props.navigator.showModal({
                screen:event.link,
                animationType:'slide-horizontal',
                navigatorStyle:{
                    navBarBackgroundColor:'#00ADA9',
                    screenBackgroundColor:'#ffffff'
                },
                backButtonHidden:false
            })
        
    }
}

export function debounce(callback, wait, context = this) {
    let timeout = null;
    let callbackArgs = null;
  
    const later = () => callback.apply(context, callbackArgs);
  
    return function() {
      callbackArgs = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

