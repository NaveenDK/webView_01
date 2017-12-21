import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableHighlight,
  Button
} from 'react-native';
import {ImagePicker} from 'expo';

//const htmlURL =require('./assets/index.html').uri;
export default class testWebBridge extends React.Component {
  constructor( props ) {
    super( props );

    this.webView = null;
}

onMessage( event ) {
    console.log( "On Message", event.nativeEvent.data );
}

sendPostMessage() {
    console.log( "Sending post message" );
    this.webView.postMessage( "Post message from react native" );
}

  render() {

  
    return (
     <View style= {{flex:1}}>
          <TouchableHighlight style={{padding: 10, backgroundColor: 'green', marginTop: 20}} onPress={() => this.sendPostMessage()}>
              <Text style={{color: 'white'}}></Text>
          </TouchableHighlight>
          <View style={styles.container}>
               <Text>Image picking!</Text>
               <Button title="Pick image" onPress={this._pickImage} />
               <Button title="Upload image" onPress={this._uploadImage} />

          </View>
          <WebView          
            source={{uri:'https://blooming-tor-31315.herokuapp.com/'}}
            style={{ marginTop: 20  }} 
            ref={( webView ) => this.webView = webView}
            onMessage={this.onMessage}
            />
      </View>
   )
  }

  _pickImage = async () => {
            let pickerResult = await Expo.ImagePicker.launchImageLibraryAsync({
              exif: true,
              allowsEditing: false,
              quality: 0.7,
              base64: true,
            })

            if (pickerResult.cancelled) {
              return
            }

            console.log(pickerResult)
  }



  _uploadImage = async() =>{

       // Display the camera to the user and wait for them to take a photo or to cancel
  // the action
  let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        if (result.cancelled) {
          return;
        }

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('photo', { uri: localUri, name: filename, type });

        return await fetch(YOUR_SERVER_URL, {
          method: 'POST',
          body: formData,
          header: {
            'content-type': 'multipart/form-data',
          },
        });
      }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});