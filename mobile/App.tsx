
import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const targetUrl = 'https://akounamatata-eats-app.onrender.com/';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: targetUrl }}
        javaScriptEnabled={true}
        onShouldStartLoadWithRequest={(request) => {
          return request.url.startsWith(targetUrl);
        }}
      />
    </SafeAreaView>
  );
};

export default App;
