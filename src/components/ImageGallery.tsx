import React from 'react';
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {styles} from '../theme/appTheme';

interface ImagenesProp {
  images: Imagen[];
  style?: StyleProp<ViewStyle>;
  heightCarousel: number;
  widthCarousel: number;
}
interface Imagen {
  url?: string;
}

export const ImageGallery = ({
  images,
  style,
  heightCarousel,
  widthCarousel,
}: ImagenesProp) => {
  const {width} = useWindowDimensions();

  const renderFotos = () => {
    if (images && images.length > 0) {
      return (
        <Carousel
          data={images}
          width={widthCarousel!}
          height={heightCarousel!}
          mode="parallax"
          loop={false}
          renderItem={({item}) => (
            <View style={{...styles.centerItems}}>
              <Image
                source={{uri: item.url}}
                style={{
                  width: '100%',
                  height: '100%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </View>
          )}
        />
      );
    }
    return null;
  };
  return (
    <View style={{...(style as any)}}>
      {images.length > 0 ? (
        <View style={{...styles.centerItems}}>{renderFotos()}</View>
      ) : (
        <Text style={{textAlign: 'center', color: 'black', fontSize: 16}}>
          No hay imágenes
        </Text>
      )}
    </View>
  );
};
