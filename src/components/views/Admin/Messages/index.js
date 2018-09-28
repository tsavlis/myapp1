

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { List, ListItem, } from 'react-native-elements'
// import { getMessages } from './../../../Store/actions/articles_action';


class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible:false,
            messages: [],
            refreshing: true,

        }
        // this.fetchNews = this.fetchNews.bind(this);

    }

    // componentDidMount(){
    //   this.fetchNews();

    // }
    // fetchNews() {
    //   getMessages()
    //     .then(messages => this.setState({ messages, refreshing: false, }))
    //     .catch(() => this.setState({ refreshing: false,}));
    // }
    // handleRefresh() {
    //   this.setState(
    //     {
    //       refreshing: true
    //   },
    //     () => this.fetchNews()
    //   );
    // }

    render() {
        // if (this.state.refreshing) {
        //   return (
        //     <View style={styles.refreshing}>
        //       <ActivityIndicator />
        //     </View>
        //   )
        // } else {

        togglevissible=() =>{
            if(isVisible === true){
                this.setState({visible:false})

            }else {
                this.setState({visible:true})
            }
        }
        return (
            <View>
                <TouchableOpacity>
                    <ListItem
                    badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="Mokaal News"
                        subtitle="10% discount on our Premium members..."
                        onPress={this.togglevissible}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                    badge={{ value: 5, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="Sport News "
                        subtitle="The path of Germany is hard this year..."
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                    badge={{ value: 1, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="Politics"
                        subtitle="Turkey conflicts with USA concidering..."
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                    badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="E-Gaming"
                        subtitle="This weekend in Overwatch all heroes..."
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                    badge={{ value: 1, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
                        containerStyle={{ marginTop: 25, }}
                        hideChevron
                        title="Business"
                        subtitle="Burger King comes in Greece,first to open in..."
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
// }


export default Messages;
