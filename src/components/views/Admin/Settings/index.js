import React, { Component } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { authLogout, DeleteAccount } from '../../../Store/actions/user_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTokens, } from './../../../utils/misc';
import LoginTab from '../../Tabs/Login';
import {  ListItem, } from 'react-native-elements'



class Settings extends Component {
    state = {
        checked: true
    }
    confirmLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Yes,Logout Now', onPress: () => this.Logout() },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },

            ],
            { cancelable: false }
        )
    }
    confirmDelete = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to Delete?',
            [
                { text: 'Yes,Delete it Now', onPress: () => this.onDelete() },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },

            ],
            { cancelable: false }
        )
    }
    Logout = () => {
        getTokens((value) => {
            if (value[0][1] === null) {
                LoginTab();
            } else {
                this.props.authLogout();
                LoginTab();
            }
        })
    }

    onDelete = () => {
        getTokens((value) => {
            if (value[0][1] === null) {
                alert('done')
            } else {
                this.props.DeleteAccount(value[0][1]).then(() => {
                    LoginTab();
                })
            }
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity>
                    <ListItem
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="Push Permissions"
                        onPress={() => {
                            Alert.alert(
                                'Notifications Permissions',
                                'Do you want to keep receiving notifications?',
                                [{ text: 'No I do not wish to get notifications', onPress: () => console.log('Cancel Pressed') },
                                { text: 'Yes,Keep sending me notifications', onPress: () => alert('Done!') },

                                ],
                                { cancelable: false }
                            )
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="Camera Permissions"
                        onPress={() => {
                            Alert.alert(
                                'Camera Permissions',
                                'Do you allow access to your Camera and Storage?',
                                [{ text: 'No I do not wish to allow Access', onPress: () => console.log('Cancel Pressed') },
                                { text: 'Yes,allow Access ', onPress: () => alert('Done!') },

                                ],
                                { cancelable: false }
                            )
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="Log Out"
                        onPress={this.confirmLogout}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="Rescind Terms of Service"
                        onPress={() => {
                            Alert.alert(
                                'Confirm Rescind',
                                'Are you sure you want to Rescind?',
                                [
                                    { text: 'Yes,Rescind and Logout', onPress: () => this.Logout() },
                                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                                ],
                                { cancelable: false }
                            )
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="Delete Account"
                        onPress={this.confirmDelete}
                    />
                </TouchableOpacity>
             </View>
        )
    }
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authLogout, DeleteAccount }, dispatch)
}
export default connect(null, mapDispatchToProps)(Settings);