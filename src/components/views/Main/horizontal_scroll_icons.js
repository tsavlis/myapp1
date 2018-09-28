import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const categoriesIcon = (value) => {
    let name = '';
    switch (value) {
        case 'All':
            name = 'circle-o-notch'
            break;
        case 'Sports':
            name = 'soccer-ball-o'
            break;
        case 'Music':
            name = 'music'
            break;
        case 'Politics':
            name = 'suitcase'
            break;
        case 'E-gaming':
            name = 'tv'
            break;
        default:
            name = ''
    }
    return name;
}
class HorizontalScrollIcons extends React.Component {

    generateIcon = (categories) => (
        categories ?
            categories.map(item => (
                <View style={{ marginRight: 15 }} key={item}>
                    <Icon.Button
                        name={categoriesIcon(item)}
                        iconStyle={{ marginRight: 7, marginLeft: 3 }}
                        backgroundColor={
                            this.props.categorySelected !== item ? '#c1c1c1' : '#FF6444'
                        }
                        borderRadius={100}
                        size={15}
                        onPress={()=> this.props.updateCategoryHandler(item)}
                    >
                        <Text style={{
                            color: '#ffffff',
                            marginRight: 5
                        }}
                        >{item}</Text>
                    </Icon.Button>
                </View>
            ))
        :null
    )



    render() {
        return (
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200}
                showsHorizontalScrollIndicator={false}

            >
                <View style={styles.scrollcontainer}>
                    {this.generateIcon(this.props.categories)}
                </View>


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollcontainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        padding: 10
    }

});


export default HorizontalScrollIcons;