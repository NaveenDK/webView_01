import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

//const htmlURL =require('./assets/index.html').uri;
export default class testWebBridge extends React.Component {

  render() {
  
    return (
     
       <WebView
      
        source={{uri:'https://blooming-tor-31315.herokuapp.com/'}}
         style={{ marginTop: 20  }} 
        />
   
   )
  }
}