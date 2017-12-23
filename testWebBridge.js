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


export default class testWebBridge extends React.Component {

  constructor( props ) {
    super( props );
    this.webView = null;
}


  render() {

  
    return (
     <View style= {{flex:1}}>
          <WebView          
            source={{uri:'https://blooming-tor-31315.herokuapp.com/'}}
            style={{ marginTop: 20  }} 
            ref={( webView ) => this.webView = webView}
            onMessage={
              (event)=>{
                if(event.nativeEvent.data =="gallery!"){
                console.log(event.nativeEvent.data)
               this._pickImage()}
               if(event.nativeEvent.data =="camera!"){
               console.log(event.nativeEvent.data)
              this._uploadImage()}


            }}
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