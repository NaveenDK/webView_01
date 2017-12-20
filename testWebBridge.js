import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

const htmlURL =require('./assets/index.html');
export default class testWebBridge extends React.Component {

  render() {
    //let yourAlert = 'alert("hello")'
  
    return (
     
       <WebView
      //  javaScriptEnabled={true}
       // domStorageEnabled={true}
        //injectedJavaScript={yourAlert}
        source={{html:htmlURL}} style={{ marginTop: 20  }} 
        />
   
   )
  }
}