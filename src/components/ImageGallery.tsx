import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

interface ImagenesProp {
  images: Imagen[];
}
interface Imagen {
  url: string;
}

export const ImageGallery = ({images}: ImagenesProp) => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Image
          key={index}
          source={{uri: image.url}}
          style={{...styles.image, width: width * 0.8, height: width * 0.3}}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  image: {
    resizeMode: 'contain',
    padding: 8,
    borderRadius: 8,
  },
});
