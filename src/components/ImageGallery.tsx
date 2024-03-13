import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { colores, styles } from '../theme/appTheme';
import { ButtonWithText } from './ButtonWithText';
import { BaseModal } from '../Template/BaseModal';

interface ImagenesProp {
  images: string[];
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
  const { width } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{
    uri: string;
    type: string;
  } | null>(null);
  const renderFotos = () => {
    const toggleModal = (uri: string, type: string) => {
      setSelectedMedia({ uri, type });
      setIsModalVisible(true);
    };
    if (images && images.length > 0) {
      return (
        <Carousel
          data={images}
          width={widthCarousel!}
          height={heightCarousel!}
          mode="parallax"
          loop={false}
          renderItem={({ item }) => (
            <View style={{ ...styles.centerItems }}>
              {1 === 1 ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggleModal(item, item)}>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: width*1 ,
                      height: width * 0.45,
                      resizeMode: 'contain',
                      ...MultimediaStyles.photo,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <Text style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: colores.blanco,
                  fontSize: 16,
                  width: width * 0.50,
                  height: width * 0.30,
                  verticalAlign: 'middle',
                  backgroundColor: colores.plomo
                }}>
                  Contenido no disponible
                </Text>
              )}
            </View>
          )}
        />
      );
    }
    return null;
  };
  return (
    <View style={{ ...(style as any) }}>
      {images.length > 0 ? (
        <>
          <View style={{ ...styles.centerItems }}>{renderFotos()}</View>
          {selectedMedia && selectedMedia.type && (
            <BaseModal
              showBlur={true}
              CloseFunction={() => setIsModalVisible(false)}
              isVisible={isModalVisible}
            >
              <ButtonWithText
                anyfunction={() => setIsModalVisible(false)}
                icon='close-circle-outline'
                color={"transparent"}
                bagraundIcon='transparent'
                tamañoIcon={50}
              />
              {selectedMedia.uri ? (
                <View style={{ flex: 1, ...styles.centerItems }}>
                  <Image
                    source={{ uri: selectedMedia.uri }}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'center', color: 'black', fontSize: 16 }}>
                    No hay Video
                  </Text>
                  {/*<Video
                source={{uri: selectedMedia.uri}}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
                controls={true}
              /> */}
                </View>
              )}
              
            </BaseModal>
          )}
        </>
      ) : (
        <Text style={{ textAlign: 'center', color: 'black', fontSize: 16 }}>
          No hay imágenes
        </Text>
      )}
    </View>
  );
};
const MultimediaStyles = StyleSheet.create({
  photo: {
    alignContent: 'center',
    alignSelf: 'center',
  },
  textButton: {
    color: colores.blanco,
    fontSize: 15,
    margin: '4%',
    marginVertical: 10,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  containerButon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
