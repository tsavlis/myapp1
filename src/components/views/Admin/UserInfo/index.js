import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ImageBackground } from 'react-native';
import Input from '../../../utils/forms/inputs';
import ValidationRules from '../../../utils/forms/validationRules';
import { UpdateUserPhoto, PasswordChange, UpdateUserProfile, UpdateUserData } from '../../../Store/actions/user_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTokens } from '../../../utils/misc';
import PickImage from '../../../utils/ImagePicker/PickImage';
import LoadTabs from './../../Tabs';
import LoginTab from './../../Tabs/Login';
import BackgroundImage from './../../../../assets/images/back2.png';
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


class UserInfo extends Component {

    state = {
        pressed: false,
        disabled: false,
        placename: "Type your New name",
        image: {
            value: null,
            valid: false
        },
        form: {
            isloading: false,
            hasErrors: false,
            NameErrors: false,
            ConPswErrors: false,
            name: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                    minLength: 3
                }
            },
            password: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    minLength: 6,
                    isRequired: true,
                }
            },
            
            confirmPassword: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    confirmPass: "password"
                }
            }
        }
    }


    updateInput = (name, value) => {
        this.setState({
            hasErrors: false,
            NameErrors: false,
            ConPswErrors: false,
        })

        let formCopy = this.state.form;
        formCopy[name].value = value;

        let rules = formCopy[name].rules;
        let valid = ValidationRules(value, rules, formCopy);
        formCopy[name].valid = valid;

        this.setState({
            form: formCopy
        })
    }


    submitUserPassword = () => {
        this.setState({ isloading: true })
        getTokens((value) => {
            if (value[0][1] === null) {
                alert('whoops')
            } else
                if (this.state.form.password.valid && this.state.form.password.value) {
                    if (this.state.form.confirmPassword.valid) {
                        {
                            this.props.PasswordChange(value[0][1], this.state.form.password.value).then(() => {
                                this.state.form.password.value = ""
                                this.state.form.confirmPassword.value = ""
                                this.setState({
                                    isloading: false,
                                    hasErrors: false,
                                    NameErrors: false,
                                    ConPswErrors: false,
                                })
                                LoginTab();
                            })
                        }
                    } else {
                        this.setState({
                            isloading: false,
                            ConPswErrors: true
                        })
                    }
                } else {
                    this.setState({
                        isloading: false,
                        hasErrors: true
                    })
                }
        })
    }
    submitUser = () => {
        this.setState({ isloading: true })
        getTokens((value) => {
            if (value[0][1] === null) {
                alert('whoops')
            } else
                if (this.state.form.name.valid && this.state.form.name.value) {
                    {
                        this.props.UpdateUserProfile(value[0][1], this.state.form.name.value).then(() => {
                            this.setState({
                                isloading: false, hasErrors: false, placename: this.state.form.name.value,
                                NameErrors: false,
                                ConPswErrors: false,
                            })
                        })
                    }
                } else {
                    this.setState({
                        NameErrors: true,
                        isloading: false
                    })
                }
        })
    }
    submitUserPhoto = () => {
        this.setState({ isloading: true })
        getTokens((value) => {
            if (value[0][1] === null) {
                alert('whoops')
            }
            {
                this.props.UpdateUserPhoto(value[0][1], this.state.image.value.uri).then(() => {
                })
            }
        })
    }
    submitUserData = () => {
        this.setState({ isloading: true })
        getTokens((value) => {
            if (value[0][1] === null) {
                this.setState({ isloading: false })
                alert('whoops')
            } else {
                this.props.UpdateUserData(value[0][1]).then(() => {
                    this.setState({ isloading: false, NameErrors: false })
                })
            }
        })
    }


    formHasErrors1 = () => (
        this.state.hasErrors ?
            <View style={styles.errorContainer}>
                <Text style={styles.errortext}>Password must be at least 6 characters!</Text>
            </View>
            : null
    )
    formHasErrors2 = () => (
        this.state.NameErrors ?
            <View style={styles.errorContainer}>
                <Text style={styles.errortext}>Name must be at least 3 characters!</Text>

            </View>
            : null
    )
    formHasErrors3 = () => (
        this.state.ConPswErrors ?
            <View style={styles.errorContainer}>
                <Text style={styles.errortext}>Passwords must match and be at least 6 characters!</Text>

            </View>
            : null
    )
    onImagePickedHandler = image => {
        this.setState(prevState => {
            return {

                    image: {
                        value: image,
                        valid: true
                    }
                
            };
        })
    }


    showloading = () => (
        this.state.isloading ?
            <View>
                <ActivityIndicator size={'large'} />
            </View>
            : null
    )

    shaveChanges = () => {
        this.setState({ isloading: true, })
        if (this.state.form.name.value) {
            if (this.state.form.password.value) {
                if (this.state.form.confirmPassword.value) {
                    if (this.state.form.password.valid && this.state.form.confirmPassword.valid) {
                        if (this.state.image.value) {
                            this.submitUser();
                            this.submitUserPhoto();
                            this.submitUserPassword();
                        } else {
                            this.submitUser();
                            this.submitUserPassword();
                        }
                    }
                    else {
                        this.setState({
                            isloading: false, ConPswErrors: true,
                        })
                    }
                }
                else {
                    this.setState({
                        ConPswErrors: true, isloading: false,
                    })
                }
            } else if (this.state.form.confirmPassword.value) {
                this.setState({
                    hasErrors: true, isloading: false,
                })
            }
            else if (this.state.image.value) {
                this.submitUserPhoto();
                this.submitUser();
                LoadTabs();
            }
            else {
                if (this.state.form.name.valid) {
                    this.submitUser();
                    LoadTabs();
                } else {
                    this.setState({
                        NameErrors: true, isloading: false,
                    })
                }
            }
        } else if (this.state.form.password.value) {
            if (this.state.image.value) {
                this.submitUserPassword();
                this.submitUserPhoto();
            } else {
                this.submitUserPassword();
            }
        }
        else if (this.state.form.confirmPassword.value) {
            if (this.state.image.value) {
                this.submitUserPassword();
                this.submitUserPhoto();
            } else {
                this.submitUserPassword();
            }
        }
        else if (this.state.image.value) {
            this.submitUserPhoto();
            LoadTabs();
            


        }
        else {
            this.setState({ isloading: false })
            alert('Nothing to change!')
        }
    }
    showImage = () => {
        if (this.state.pressed === false) {
            if (this.state.image.value) {
                return (
                    <Avatar
                        size="xlarge"
                        rounded
                        source={{ uri: this.state.image.value }}
                        onPress={this.showimagepicker2}
                        activeOpacity={0.7}
                        width={150}
                        overlayContainerStyle={{ flex: 0.6 }}
                        imageProps={{ resizeMode: 'cover' }}
                    />
                )
            } else {
                return (
                    <Avatar
                        size="xlarge"
                        rounded
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvNPv98FqyJ84XCqgOqW9jxOteljaS5ltW09rj60U-97Ab0Exc" }}
                        onPress={this.showimagepicker2}
                        activeOpacity={0.7}
                        width={150}
                        overlayContainerStyle={{ flex: 0.4 }}
                        imageProps={{ resizeMode: 'cover' }}
                    />
                )
            }
        }
        else {
            return null
        }
    }

    showimagepicker2 = () => {
        this.setState({ pressed: true })
        this.showimagepicker()
    }
    showimagepicker = () => {
        if (this.state.pressed === true) {
            return (
                <PickImage onImagePicked={this.onImagePickedHandler} />
            )
        }
        else {
            return null
        }
    }



    componentDidMount() {
        this.submitUserData();
        if (this.props.User.userData) {
            if (this.props.User.userData.users[0].displayName) {
                
                this.setState({
                    placename: this.props.User.userData.users[0].displayName,image:{value: this.props.User.userData.users[0].photoUrl}
                })
            } else {
                this.setState({ placename: "Type your Name",image:{value: this.props.User.userData.users[0].photoUrl} })
            }
        } else {
            alert('Something went wrong,please relog the application')
        }
    }
    render() {
        return (
            <View style={styles.container}>
           
                <View style={styles.avatar}>
                    {this.showImage()}
                </View>
                <View style={styles.picker}>
                    {this.showimagepicker()}
                </View>
                <View style={styles.passwordContainer}>
                <Icon
                name='user'
                color='#000'
                size={28}
            />
                <Input style={styles.input}
                    placeholder={this.state.placename}
                    type={this.state.form.name.type}
                    value={this.state.form.name.value}
                    onChangeText={value => this.updateInput("name", value)}
                    returnKeyType={"next"}
                />
                </View>
                <View style={styles.passwordContainer}>
                <Icon
                    name='lock'
                    color='#000'
                    size={25}
                />
                <Input style={styles.input}
                    placeholder="Type your new Password "
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={value => this.updateInput("password", value)}
                    secureTextEntry
                    autoCapitalize='none'

                />
                </View>
                <View style={styles.passwordContainer}>
                <Icon
                    name='lock'
                    color='#000'
                    size={25}
                />
                <Input style={styles.input}
                    placeholder="Confirm your Password"
                    type={this.state.form.confirmPassword.type}
                    value={this.state.form.confirmPassword.value}
                    onChangeText={value => this.updateInput("confirmPassword", value)}
                    secureTextEntry
                    autoCapitalize='none'
                />
                </View>
                {this.showloading()}
                {this.formHasErrors1()}
                {this.formHasErrors2()}
                {this.formHasErrors3()}
                <View style={styles.button2}>
                    <Button
                        title="Save And Go Back"
                        color="#00CED1"
                        onPress={this.shaveChanges}
                        disabled={this.state.disabled} />
                </View>
                <Text style={{ opacity: 0.5 }}>Changing your Password will prompt you to Login again
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        marginBottom: 60,
        marginTop: 10,
    },
    avatar: {
        marginBottom: 60,
        
    },
    button2: {
        marginTop: 5,
        marginBottom: 10,

    },
    errorContainer: {
        marginBottom: 12,
        marginTop: 10
    },
    errortext: {
        color: 'red',
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: "black",
        padding: 5,
        margin: 5,
        
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
});
function mapStateToProps(state) {
    return {
        User: state.User,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ UpdateUserProfile, UpdateUserData, PasswordChange, UpdateUserPhoto }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);