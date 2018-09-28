import {
    REGISTER_USER, SIGN_USER, AUTO_SIGN_IN,TOS_ACCEPTED,PASSWORD_CHANGE,PROFILE_UPDATE_PHOTO,GET_USER_DATA,
    PASSWORD_RESET, DELETE_ACCOUNT, SEND_TOKEN,PROFILE_UPDATE,LOGOUT,SET_PICTURES
} from '../types';
import axios from 'axios';
import {
    SIGNUP, SIGNIN, REFRESH, PSWRESET,TOSURL,GETUSERDATA,
     PASSWORDCHANGE, DELETEACCOUNT, MOKAALURL, UPDATEUSER
} from '../../utils/misc';

import { AsyncStorage } from 'react-native';


export function signIn(data) {
    const request = axios({
        method: "POST",
        url: SIGNIN,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    });
    return {
        type: SIGN_USER,
        payload: request
    }
}
export function signUp(data) {

    const request = axios({
        method: "POST",
        url: SIGNUP,
        data: {
            email: data.email,
            password: data.password,
            displayName:data.name,
            photoUrl: data.image,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log(response.data)
        return response.data
    }).catch(e => {
        return false
    });
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const autoSignIn = (refToken) => {
    const request = axios({
        method: "POST",
        url: REFRESH,
        data: "grant_type=refresh_token&refresh_token=" + refToken,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    })
    return {
        type: AUTO_SIGN_IN,
        payload: request
    }
}
export const authClearStorage = () => {
    AsyncStorage.removeItem("@myapp1@token");
    AsyncStorage.removeItem("@myapp1@refreshToken");
    AsyncStorage.removeItem("@myapp1@expireToken");
    AsyncStorage.removeItem("@myapp1@uid");

};
export const authLogout = () => {
    authClearStorage()
    return {
        type:LOGOUT,
        
    }
}

export const PasswordReset = (email) => {
    const request = axios({
        method: "POST",
        url: PSWRESET,
        data: {
            requestType: "PASSWORD_RESET",
            email: email
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    });

    return {
        type: PASSWORD_RESET,
        payload: request
    }
}



export const DeleteAccount = (token) => {
    const request = axios({
        method: "POST",
        url: DELETEACCOUNT,
        data: {
            idToken: token
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    });
    return {
        type: DELETE_ACCOUNT,
        payload: request
    }
}

export function sendTokenToUrl(data) {

    const request = axios({
        method: "GET",
        url: MOKAALURL,
        data: {
            token: data.payload
        },
        headers: {
            "Content-Type": "X-Auth-Token",

        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    });
    return {
        type: SEND_TOKEN,
        payload: request
    }
}

export const PasswordChange = (token,password) => {
    const request = axios({
        method: "POST",
        url: PASSWORDCHANGE,
        data: {
            idToken: token,
            password: password,
            returnSecureToken: false         //?????????????????
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log('pass chaged')
        return response
    }).catch(e => {
        return false
    });
    return {
        type: PASSWORD_CHANGE,
        payload: request
    }
}


export const UpdateUserProfile = (token,name) => {
    const request = axios({
        method: "POST",
        url: UPDATEUSER,
        data: {
            idToken:token,
            displayName: name,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
            alert('Your name changed to' + " "+ name)
        return response
    }).catch(e => {
        return false
    });

    return {
        type: PROFILE_UPDATE,
        payload: request
    }
}

export const ToSAccepted = () => {
    const request = axios({
        method: "POST",
        url: TOSURL,
        data: {
            accepted:1
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data,
        console.log('done')
    }).catch(e => {
        return false
    });
    return {
        type: TOS_ACCEPTED,
        payload: request
    }
}
export const UpdateUserPhoto = (token,image) => {
    const request = axios({
        method: "POST",
        url: UPDATEUSER,
        data: {
            idToken:token,
            photoUrl: image,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
            
        return response
    }).catch(e => {
        return false
    });

    return {
        type: PROFILE_UPDATE_PHOTO,
        payload: request
    }
}

export const UpdateUserData = (token) => {
    const request = axios({
        method: "POST",
        url: GETUSERDATA,
        data: {
            idToken: token
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        //let displayTag = response.data.users[0].displayName
        
            return response.data;
    }).catch(e => {
        return false
    });
    return {
        type: GET_USER_DATA,
        payload: request
    }
}



export const addPhoto = ( image) => {
    return dispatch => {

        fetch("https://projectone-db1a6.firebaseio.com/images.json", {
            method: "POST",
            body: JSON.stringify(image)
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        });
    };
};
export const placeAdded = () => {
    return {
      type: PLACE_ADDED
    };
  };

//   export const getPictures = () =>{
//     return dispatch => {
//         fetch("https://projectone-db1a6.firebaseio.com/images.json")
//         .catch(err => {
//             alert('Something went wrong');
//             console.log(err);
//         })
//         .then(res => res.json())
//         .then(parsedRes => {
//             const images = [];
//             for (let key in parsedRes){
//                 images.push({
//                     ...parsedRes[key],
//                     image:{
//                         uri: parsedRes[key].image
//                     },
//                     id:key
//                 });
//             }
//             dispatch(setPictures());
//         })
//     };
// };
// export const setPictures = images =>{
//     return{
//         type:SET_PICTURES,
//         images:images
//     }
// }



// export function signUp(data) {
//     const request = axios({
//         method:"POST",
//         url:SIGNUP,
//         data:{
//             email:data.email,
//             name:data.name,
//             password:data.password,
//             type:data.type,
//             did:data.did,
//             token:data.token

//         },
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then (response => {
//         console.log(response.data)
//         return response.data
//     }).catch(e =>{
//         return false
//     })
//     return {
//         type:REGISTER_USER,
//         payload:request
//     }
// }


// export function signIn(data) {
//     const request = axios({
//         method:"POST",
//         url:SIGNIN,
//         data:{
//             email:data.email,
//             password:data.password,
//             token:data.token
//         },
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then (response => {
//         console.log(response.data)
//         return response.data
//     }).catch(e =>{
//         return false
//     })
//     return {
//         type:SIGN_USER,
//         payload:request
//     }
// }