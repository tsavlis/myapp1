import React from 'react';
import { View, Linking,StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import moment from 'moment';

 class Articles extends React.Component {
    render() {
        const {title,description,publishedAt,source,urlToImage,url} = this.props.article;
        const time = moment(publishedAt || moment.now()).fromNow();
        const defaultImg =
            'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';

        return (
            <TouchableNativeFeedback
                useForeground
                onPress={() => Linking.openURL(url)}
            >
                <Card
                    featuredTitleStyle={styles.titlestyle}
                    featuredTitle={title}
                    image={{
                        uri: urlToImage || defaultImg
                    }}
                >
                    <Text style={{ marginBottom: 10 }}>
                        {description || 'Read More..'}
                    </Text>
                    <Divider style={{ backgroundColor: '#dfe6e9' }} />
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                        <Text style={styles.textstyle}>{source.name.toUpperCase()}</Text>
                        <Text style={styles.textstyle}>{time}</Text>
                    </View>
                </Card>
            </TouchableNativeFeedback>
        );
    }
}

const styles =StyleSheet.create({
    textstyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },
    titlestyle: {
        marginHorizontal:15,
        textShadowColor: '#00000f',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 3
    }
});

export default Articles;