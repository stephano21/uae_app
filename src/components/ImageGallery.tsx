import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

interface ImagenesProp {
  images:Imagen[];
}
interface Imagen {
    url: string
}

const { width } = Dimensions.get('window');

const ImageGallery: React.FC<ImagenesProp> = ({ images }) => {
  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Image key={index} source={{ uri: image.url }} style={styles.image} />
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
    width: width * 0.80, // El 20% del ancho de la pantalla
    height: width * 0.3, // El 20% del ancho de la pantalla (misma altura que el ancho para que sea cuadrado)
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default ImageGallery;
