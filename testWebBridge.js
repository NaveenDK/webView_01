import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableHighlight
} from 'react-native';

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
          <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
              <Text style={{color: 'white'}}>Send post message from react native</Text>
          </TouchableHighlight>

          <WebView
          
            source={{uri:'https://blooming-tor-31315.herokuapp.com/'}}
            style={{ marginTop: 20  }} 
            ref={( webView ) => this.webView = webView}
            onMessage={this.onMessage}
            />
      </View>
   )
  }
}