import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, ActivityIndicator } from 'react-native';

import Input from '../../utils/forms/inputs';
import ValidationRules from '../../utils/forms/validationRules';
import { connect } from 'react-redux';
import { signUp, ToSAccepted, UpdateUserPhoto } from '../../Store/actions/user_actions';
import { bindActionCreators } from 'redux';
import LoadTabs from '../Tabs';
import { setTokens, getTokens } from '../../utils/misc';
import PickImage from '../../utils/ImagePicker/PickImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements'

class RegisterForm extends React.Component {

    state = {
        pressed: false,
        disabled: false,
        isloading: false,
        hasErrors: false,
        NameErrors: false,
        ConPswErrors: false,
        form: {
            email: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                    isEmail: true
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
            name: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                }
            },
        },
        image: {
            value: null,
            valid: true
        }
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
                <Text style={styles.errortext}>Email must be valid and Not In Use!</Text>

            </View>
            : null
    )
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
    manageAccess = () => {
        this.setState({ isloading: true, disabled: true })
        if (!this.props.User.userData.uid) {
            if (this.state.form.email.valid && this.state.form.password.valid) {
                this.setState({ isloading: false, disabled: false })
                alert('Email Allready In Use!')
            } else {
                this.setState({ isloading: false, disabled: false });

            }
        } else {
            setTokens(this.props.User.userData, () => {
                this.setState({
                    hasErrors: false,
                    NameErrors: false,
                    ConPswErrors: false,
                })
                if(this.state.image.value){
                    this.submitUserPhoto();
                }
                LoadTabs();
            })
        }
    }
    submitUser = () => {
        this.setState({ isloading: true, disabled: true })
        let formToSubmit = {};
        let formCopy = this.state.form;

        if (!this.state.form.email.valid) {
            this.setState({
                ConPswErrors: true,
                isloading: false,
                disabled: false
            })
        }
        if (!this.state.form.name.valid) {
            this.setState({
                NameErrors: true,
                isloading: false,

            })
        }
        if (!this.state.form.password.valid) {
            this.setState({
                hasErrors: true,
                isloading: false,
                disabled: false
            })
        }


        for (let key in formCopy) {
            formToSubmit[key] = formCopy[key].value

        }
        if (this.state.form.email.valid && this.state.form.password.valid) {
            this.props.signUp(formToSubmit).then(() => {
                this.manageAccess()
            })
        }
    }
    onImagePickedHandler = image => {
        this.setState(() => {
            return {
                image: {
                    value: image,
                    valid: true
                }
            };
        })
    }

    componentWillMount() {
        Alert.alert(
            'Terms of Service',
            'Have you read and agree with our Terms of service?',
            [
                { text: 'Yes, I have read and I agree', onPress: () => ToSAccepted() },
                { text: 'No I dont agree', onPress: () => this.loginscreen() },
                {
                    text: 'Read the Terms of Service', onPress: () => {
                        alert('not fixed yet')
                    }
                },

            ],
            { cancelable: false }
        )
    }

    showloading = () => (
        this.state.isloading ?
            <View>
                <ActivityIndicator size={'large'} />
            </View>
            : null
    )

    loginscreen = () => {
        this.setState({
            disabled: false
        })
        this.props.navigator.pop({
            animated: true,
            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });

    }
    submitUserPhoto = () => {
        //this.props.addPhoto(this.state.form.image.value);
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
    showImage = () => {
        if(this.state.pressed ===false){
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

    render() {
        return (
            <View style={styles.container}>
                <View style={this.props.platform === "android"
                    ? { marginTop: 20, marginBottom: 28,marginLeft:20 } : styles.buttonIos}>
                        {this.showImage()}
                        {this.showimagepicker()}
                </View>
                <View style={styles.passwordContainer}>
                <Icon
                name='envelope-open'
                color='#000'
                size={18}
            />
                <Input
                style={styles.inputStyle}
                    placeholder="Enter your Email"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    onChangeText={value => this.updateInput("email", value)}
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}
                />
                </View>
                <View style={styles.passwordContainer}>
                <Icon
                    name='user'
                    color='#000'
                    size={28}
                />
                <Input
                style={styles.inputStyle}
                    placeholder="Enter your Name"
                    type={this.state.form.name.type}
                    value={this.state.form.name.value}
                    onChangeText={value => this.updateInput("name", value)}
                />  
                </View>
                <View style={styles.passwordContainer}>
                <Icon
                name='lock'
                color='#000'
                size={25}
            />
                <Input
                style={styles.inputStyle}
                    placeholder="Enter your Password"
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={value => this.updateInput("password", value)}
                    secureTextEntry
                />
                </View>
                {this.showloading()}
                {this.formHasErrors1()}
                {this.formHasErrors2()}
                {this.formHasErrors3()}
                <View style={this.props.platform === "android"
                    ? styles.buttonAndroid : styles.buttonIos}>
                    <Button
                        title="Complete Registration"
                        color="#00CED1"
                        onPress={this.submitUser}
                        disabled={this.state.disabled}
                    />
                </View>
                {/*<View style={this.props.platform === "android"
                    ? styles.buttonAndroid : styles.buttonIos}>
                    <Button
                        title="Device ID"
                        color="lightgrey"
                        onPress={() => { alert('not fixed yet'); }}
                        disabled={this.state.disabled}
                    />
         </View>*/}
                <View style={this.props.platform === "android"
                    ? styles.buttonAndroid : styles.buttonIos}>
                    <Button
                        title="Back to Login"
                        color="lightgrey"
                        onPress={this.loginscreen}
                        disabled={this.state.disabled}

                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minHeight: 350
    },
    buttonAndroid: {
        marginBottom: 10,
        marginTop: 10
    },
    buttonIos: {
        marginBottom: 0
    },
    errorContainer: {
        marginBottom: 5,
        marginTop: 5
    },
    errortext: {
        color: 'red',
        fontFamily: 'Roboto-black'
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      inputStyle: {
        flex: 1,
      },
});

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signUp, ToSAccepted, UpdateUserPhoto }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);