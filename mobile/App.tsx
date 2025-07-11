
import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const targetUrl = 'https://chatgpt.com/c/686c0093-0c1c-800f-baf1-189c121f1f2a';

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
