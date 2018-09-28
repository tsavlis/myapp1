import React, { Component } from 'react';
import { StyleSheet, Text, View,  Animated, Easing } from 'react-native';


class Logo extends React.Component {


    state = {
        PLAnim: new Animated.Value(0),
        mokAnim: new Animated.Value(0)
    }

    componentWillMount() {
        Animated.sequence([
            Animated.timing(this.state.PLAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.easeOutCubic
            }),
            Animated.timing(this.state.mokAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.easeOutCubic
            })
        ]).start(() => {
            this.props.showLogin()
        })
    }
    render() {
        return (
            <View>
                <View style={
                    this.props.orientation === "portrait"
                    ? styles.logoportrait
                    : styles.logolandscape
                }>
                    <Animated.View
                        style={{
                            opacity:this.state.PLAnim,
                            top:this.state.PLAnim.interpolate({
                                inputRange:[0,1],
                                outputRange:[100,0]
                            })
                        }}
                    >
                        <Text style={styles.Plu}>Plustic</Text>
                    </Animated.View>
                    <Animated.View style={{
                        opacity:this.state.mokAnim
                    }}
                    >
                        <Text style={styles.Mok}>Mokaal</Text>
                    </Animated.View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    logoportrait: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 50
    },
    logolandscape:{
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 40
    },
    Plu:{
        fontSize: 40,
        fontFamily: 'Roboto-Medium',
        color:'#555555'
    },
    Mok:{
        fontSize: 40,
        fontFamily: 'Roboto-Medium',
        color:'#00ADA9'
    }
})
export default Logo;