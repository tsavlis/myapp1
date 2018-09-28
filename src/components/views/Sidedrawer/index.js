import React, { Component } from 'react'
import { StyleSheet, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { getTokens,debounce  } from './../../utils/misc';
import { UpdateUserData } from './../../Store/actions/user_actions';
import { bindActionCreators } from 'redux';
import { Avatar,Divider } from 'react-native-elements'

class SidedrawerComponent extends Component {


    state = {
        name: {
            value: ""
        },
        image: {
            value: null
        },
        buttons: [
        
            {
                value: "Settings",
                iconName: "cogs",
                shouldGoto: "myapp1.Settings",
                typeLink: "view",
                index: null,
            },
            {
                value: "Messages",
                iconName: "envelope",
                shouldGoto: "myapp1.Messages",
                typeLink: "view",
                index: null,

            },
            {
                value: "User Info",
                iconName: "users",
                shouldGoto: "myapp1.UserInfo",
                typeLink: "view",
                index: null,
            }
        ]
    }


    button = (button) => (
        <Icon.Button
            key={button.value}
            name={button.iconName}
            backgroundColor="#474143"
            color="#ffffff"
            size={20}
            onPress={ debounce(() => {
                this.props.navigator.handleDeepLink({
                    link: button.shouldGoto,
                    payload: {
                        typeLink: button.typeLink,
                        indexLink: button.index
                    }
                })
            }, 500)}
        >
            <Text style={styles.buttonText}>{button.value}</Text>
        </Icon.Button>
    )

    showButtons = (buttons) => (
        buttons.map(button => (
            this.button(button)
        ))
    )





    showImage = () => {
        if(this.state.image.value){
            return (
                <Avatar
                    size="xlarge"
                    rounded
                    source={{ uri: this.state.image.value }}
                    onPress={ debounce(() => {
                        this.props.navigator.handleDeepLink({
                            link: "myapp1.UserInfo",
                            payload: {
                                typeLink: "view",
                                indexLink: null
                            }
                        })
                    }, 500)}
                    activeOpacity={0.7}
                    width={100}
                    overlayContainerStyle={{ flex: 0.4 }}
                    imageProps={{ resizeMode: 'cover' }}
                />
            )
        }
        else {
            return (
                <Avatar
                    size="xlarge"
                    rounded
                    source={{ uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvNPv98FqyJ84XCqgOqW9jxOteljaS5ltW09rj60U-97Ab0Exc`}}
                    onPress={ debounce(() => {
                        this.props.navigator.handleDeepLink({
                            link: "myapp1.UserInfo",
                            payload: {
                                typeLink: "view",
                                indexLink: null
                            }
                        })
                    }, 500)}
                    activeOpacity={0.7}
                    width={100}
                    overlayContainerStyle={{ flex: 0.4 }}
                    imageProps={{ resizeMode: 'cover' }}
                />
            )
        }
    }

    componentDidMount() {
        if (this.props.User.userData) {
            getTokens((value) => {
                this.props.UpdateUserData(value[0][1]).then(() => {
                    this.setState({
                        name: { value: this.props.User.userData.users[0].displayName },
                        image: { value: this.props.User.userData.users[0].photoUrl }
                    });
                })
            })
        } else {
            alert('relog pls')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    {this.showImage()}
                    <Text style={styles.displayname}>{this.state.name.value}</Text>
                    <Divider style={{ backgroundColor: 'lightgray' }}/>
                    {this.showButtons(this.state.buttons)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#474143'
    },
    buttonContainer: {
        padding: 15,
        marginTop: 20,
    },
    buttonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#ffffff'
    },
    displayname: {
        fontFamily: 'Roboto-Regular',
        fontSize: 25,
        color: '#ffffff',
        padding: 15,
    }
});

function mapStateToProps(state) {
    return {
        User: state.User
    }
} function mapDispatchToProps(dispatch) {
    return bindActionCreators({ UpdateUserData }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SidedrawerComponent);

