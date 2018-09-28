import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';

const BlockItem = (props) => {



    const itemText = (item) => (
        <View style={styles.itemtextcontainer}>
            <Text style={styles.itemtexttitle}>
                    {item.title}
            </Text>
            <Text style={styles.itemtextprice}>
                    ${item.price}
            </Text>

        </View>

    )
    const itemImage = () =>(
        <View>
            <Image
                resizeMode={"cover"}
                style={styles.itemImage}
                source = {{uri:'https://loremflickr.com/400/400/girl,brazil,dog'}}
            />

        </View>
    )

    const block = ({ item, i }) => (
        <View style={styles.blockrow}>
            <TouchableOpacity
                onPress={() =>{
                    props.goto(item.blockOne)
                }}
                style={{ flex: 2 }}
            >
                <View
                    style={[
                        styles.blockGridStyle,
                        styles.blockGridStyleLeft]}
                >

                    {itemImage()}
                    {itemText(item.blockOne)}
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.goto(item.blockTwo)
                }}
                style={{ flex: 2 }}
            >
                <View
                        style={[
                        styles.blockGridStyle,
                        styles.blockGridStyleRigt]}>
                        {itemImage()}
                        {itemText(item.blockTwo)}
                </View>      
            </TouchableOpacity>
        </View>
    )
    return (
        <View>
            {block(props)}
        </View>
    )
}

const styles = StyleSheet.create({
    blockrow: {
        flex:1,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',

    },
    itemImage:{
        width:'100%',
        height:200
    },
    itemtextcontainer:{
        padding:10,
        borderLeftWidth:4,
        borderLeftColor: '#FF6444',
    },
    itemtexttitle:{
        fontFamily:'Roboto-Black',
        color:'#4C4C4C',
        marginBottom:5

    },
    itemtextprice:{
        fontFamily:'Roboto-Black',
        color: '#00ada9',
        marginBottom: 5,
    },
    blockGridStyle:{
        backgroundColor: '#f1f1f1'
    },
    blockGridStyleRigt:{
        marginLeft: 5,
    },
    blockGridStyleLeft:{
        marginRight: 5,
    }
});
export default BlockItem;