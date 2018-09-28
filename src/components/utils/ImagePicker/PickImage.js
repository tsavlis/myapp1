import React, { Component } from 'react'
import { StyleSheet, View, Button,  Image } from 'react-native';
import ImagePicker from  './index';

class PickImage extends Component {
    state = {
        pickedImage: null
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an Image"}, res => {
          if (res.didCancel) {
            console.log("User cancelled!");
          } else if (res.error) {
            console.log("Error", res.error);
          } else {
            this.setState({
              pickedImaged: { uri: res.uri }
            });
            this.props.onImagePicked({uri: res.uri, base64: res.data});
            
          }
        });
      }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
            <Image source={this.state.pickedImaged} style={styles.previewImage}/>
        </View> 
        <View style={styles.button}>
            <Button
                title="Take a Picture"
                onPress={this.pickImageHandler}
                color="#00CED1"
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    button: {
      marginTop:10
    },
    previewImage: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
    }
  });
export default PickImage;