import { React, useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import axios from 'axios';

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const API = {
    Key: '7ee70a4a00b34679bbc24809953d9f6c',
    baseUrl:
      'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid={api.key}',
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => console.dir(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <TextInput
            placeholder="enter city name and press return..."
            onChangeText={(text) => setInput(text)}
            value={input}
            placeholderTextColor={'#000'}
            style={styles.textInput}
            onSubmitEditting={fetchDataHandler}
          />
        </View>
        {Loading && (
          <View>
            <ActivityIndicator size={'large'} color="#000" />
          </View>
        )}

        {data && (
          <View style={styles.infoView}>
            <Text style={styles.cityCountryText}>
              {'${data?.name} ${data?.sys.country}'}
            </Text>

            <Text style={styles.paragraphdateText}>
              {new Date().toLocaleString()}
            </Text>
            <Text style={styles.tempText}>
              {'${Math.round(data?main?.tem,)} °C'}
            </Text>
            <Text style={styles.minMaxText}>
              {
                'Min ${Math.round(data?.main?.temp_min,)} °C / Max ${Math.round(data?.main?.temp_max)} °C'
              }
            </Text>
          </View>
        )}
      </ImageBackground>

      <Text style={styles.paragraph}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: '#df8e00',
  },

  infoView: {
    alignItems: 'center',
  },

  cityCountryText: {
    color: '#fff',
    fontsize: 40,
    fontWeight: 'bold',
  },

  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },

  tempText: {
    fontSize: 45,
    color: '#fff',
    marginVertical: 10,
  },

  minMaxText: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '500',
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
