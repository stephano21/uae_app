import React, {useRef, useState} from 'react';
import {View, Image, ToastAndroid} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Pdf from 'react-native-pdf';
import {ButtonWithText} from '../../components/ButtonWithText';
import {colores, styles} from '../../theme/appTheme';
import {BaseModal, BaseModalProps} from '../../Template/BaseModal';

interface Props extends BaseModalProps {
  title: string;
  path: string;
}

export const DocumentModal = ({
  CloseFunction,
  title,
  path,
  isVisible = false,
}: Props) => {
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const pdfRef = useRef<Pdf>();
  const downloadPdf = () => {
    // Configure the download process
    ReactNativeBlobUtil.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: title,
        description: 'El pdf ha sido descargado',
      },
    })
      // Start the download
      .fetch('GET', path)
      // Show a Toast when the download is finished
      .then(() => ToastAndroid.show('Pdf Descargado', ToastAndroid.LONG))
      // If there is an error, show it in the console
      .catch((res: any) => console.log(res));
  };
  return (
    <BaseModal CloseFunction={CloseFunction} isVisible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: colores.blanco,
          ...styles.sombra,
          overflow: 'hidden',
        }}
        onLayout={event =>
          setDimensions({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          })
        }>
        <>
          {/* <Text style={{color: colores.negro}}>{title}</Text> */}
          {path.toUpperCase().includes('.PDF') ? (
            <Pdf
              ref={ref => (pdfRef.current = ref!)}
              trustAllCerts={false}
              source={{uri: path, cache: true}}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={{flex: 1}}
            />
          ) : (
            <Image
              source={{uri: path}}
              style={{
                height: dimensions.height,
                width: dimensions.width,
                resizeMode: 'contain',
              }}></Image>
          )}
        </>
        <View
          style={{
            position: 'absolute',
            top: dimensions.height - 75,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: path.toUpperCase().includes('.PDF') ? '75%' : undefined,
              justifyContent: 'space-between',
            }}>
            {path.toUpperCase().includes('.PDF') && (
              <ButtonWithText
                color={colores.verde}
                anyfunction={() => downloadPdf()}
                width={100}
                title={'Descargar'}></ButtonWithText>
            )}
            <ButtonWithText
              color={colores.rojo}
              anyfunction={CloseFunction}
              width={100}
              title={'Cerrar'}></ButtonWithText>
          </View>
        </View>
      </View>
    </BaseModal>
  );
};
