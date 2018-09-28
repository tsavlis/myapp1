import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

import Input from '../../utils/forms/inputs';
import ValidationRules from '../../utils/forms/validationRules';
import { connect } from 'react-redux';
import { signIn, PasswordReset } from '../../Store/actions/user_actions';
import { bindActionCreators } from 'redux';
import LoadTabs from '../Tabs';
import { setTokens } from '../../utils/misc';
import Icon from 'react-native-vector-icons/FontAwesome';

class LoginForm extends React.Component {


    state = {
        disabled:false,
        isloading: false,
        hasErrors: false,
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

                },
            }

        }
    }
    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
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
    submitUser = () => {
        this.setState({ hasErrors: false, disabled:true,isloading: true });
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;

        for (let key in formCopy) {
            if (isFormValid = isFormValid && formCopy[key].valid) {
                formToSubmit[key] = formCopy[key].value
            }
        }
        if (isFormValid) {
            this.props.signIn(formToSubmit).then(() => {
                this.state.form.password.value = ""
                this.manageAccess()

            })


        } else {
            this.setState({
                hasErrors: true,
                isloading: false,
                disabled:false
            })
        }
    }
    ResetPsw = () => {
        if (this.state.form.email.valid) {
            this.setState({ isloading: true,disabled:true })
            this.props.PasswordReset(this.state.form.email.value).then(() => {
                console.log(this.props.User)
                this.setState({ isloading: false,disabled:false })
                alert('Done,check your email!!')
            })


        } else {
            this.setState({
                isloading: false
            })
            alert('Valid Email is required')
        }
    }
    formHasErrors = () => (
        this.state.hasErrors ?
            <View style={styles.errorContainer}>
                <Text style={styles.errortext}>Email must be valid!</Text>
                <Text style={styles.errortext}>Password must be at least 6 characters!</Text>
            </View>
            : null
    )
    manageAccess = () => {
        if (!this.props.User.userData.uid) {
            this.setState({ isloading: false,disabled:false })
            alert('Email and password dont match!')
        } else {
            setTokens(this.props.User.userData, () => {
                this.setState({ hasErrors: false, isloading: true });
                LoadTabs();
            })
        }
    }
    showloading = () => (
        this.state.isloading ?
            <View>
                <ActivityIndicator size={'large'} />
            </View>
            : null
    )

    registerscreen = () => {
            this.setState({
                isloading:true,hasErrors:false,disabled:true
            })
            this.state.form.email.value = "",
            this.state.form.password.value = ""
        this.props.navigator.push({
                screen: "myapp1.RegisterScreen",
                title: "RegisterScreen",
                navigatorStyle: {
                    navBarHidden: true
            }
        }).then(()=>{
            this.setState({
                isloading:false,disabled:false
            })
        })
        
    }
    render() {
        return (
            <View style={styles.container}>
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
                returnKeyType={"next"}
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
                    returnKeyType={"done"}
                    autoCapitalize ='none'
                />
               
                </View>
                {this.formHasErrors()}
                {this.showloading()}
                <View style={this.props.platform === "android"
                    ? styles.buttonAndroid : styles.buttonIos}>
                    <Button
                        title="Log In"
                        color="#00CED1"
                        onPress={this.submitUser}
                        disabled = {this.state.disabled}
                    />
                </View>
                <View style={this.props.platform === "android"
                    ? styles.buttonAndroid : styles.buttonIos}>
                    <Button
                        title="Register"
                        color="#00CED1"
                        onPress={this.registerscreen}
                        disabled = {this.state.disabled}

                    />
                </View>
                <View style={this.props.platform === "android"
                    ? styles.buttonAndroid : styles.buttonIos}>
                    <Button
                        title="Forgot Password"
                        color="lightgrey"
                        onPress={this.ResetPsw}
                        disabled = {this.state.disabled}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minHeight: 400
    },
    buttonAndroid: {
        marginBottom: 10,
        marginTop: 10
    },
    buttonIos: {
        marginBottom: 0
    },
    errorContainer: {
        marginBottom: 20,
        marginTop: 10
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
    return bindActionCreators({ signIn, PasswordReset }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);