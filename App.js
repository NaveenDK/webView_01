import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

import WebBridge from './testWebBridge';


export default class App extends React.Component {
  render() {
    return (
      
      
       <WebBridge/>
     
    );
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
