/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
const EXTRAPOLATE = 'clamp';
const getInputRange = i => [(i - 1) * width, i * width, (i + 1) * width];

const images = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];
const data = images.map((image, index) => ({
  key: String(index),
  photo: {uri: image},
  avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
    Math.random() * 40,
  )}.jpg`,
}));

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  scrollX.addListener(state => {});

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject]}>
        {data.map((item, i) => {
          const opacity = scrollX.interpolate({
            inputRange: getInputRange(i),
            outputRange: [0.8, 1, 0.8],
            extrapolate: EXTRAPOLATE,
          });

          const translateY = scrollX.interpolate({
            inputRange: getInputRange(i),
            outputRange: [height, 0, -height],
            extrapolate: EXTRAPOLATE,
          });

          return (
            <Animated.Image
              key={`img-${i}`}
              style={[
                StyleSheet.absoluteFillObject,
                {height: height, opacity, transform: [{translateY}]},
              ]}
              resizeMode="cover"
              source={item.photo}
            />
          );
        })}
      </View>

      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        bounces={false}
        data={data}
        horizontal
        pagingEnabled
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        renderItem={({item, index}) => {
          const size = scrollX.interpolate({
            inputRange: getInputRange(index),
            outputRange: [0.2, 1, 0.2],
            extrapolate: EXTRAPOLATE,
          });
          return (
            <View style={{width, alignItems: 'center'}}>
              <Animated.View
                style={{
                  height: ITEM_HEIGHT,
                  width: ITEM_WIDTH,
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 10,
                  transform: [{scale: size}],
                }}>
                <Image
                  source={item.photo}
                  resizeMode="cover"
                  style={{height: '100%', width: '100%'}}
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
