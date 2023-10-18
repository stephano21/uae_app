import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Button,
} from 'react-native';
import {colores, styles as appStyles} from '../theme/appTheme';
import {BaseScreen} from '../Template/BaseScreen';
import {Metodos} from '../hooks/Metodos';
import {useIsFocused} from '@react-navigation/native';
import {Background} from './Background';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CheckInternetContext} from '../context/CheckInternetContext';

export const PerfilScreen = () => {
  const isFocused = useIsFocused();

  const {width} = useWindowDimensions();
  const {getPorfile, profile} = Metodos();

  const [showProfile, setShowProfile] = useState(false);
  const {hasConection} = useContext(CheckInternetContext);

  useEffect(() => {
    if (isFocused && hasConection) {
      setTimeout(() => {
        getPorfile();
        setShowProfile(true);
      }, 2000); // Mostrar el perfil después de 3 segundos
    }
  }, [isFocused]);

  // Calcula el número de elementos skeletors en función de la altura de la pantalla
  const skeletonItems = Array.from({length: 4}, (_, index) => (
    <SkeletonPlaceholder.Item marginBottom={8} key={index}>
      <SkeletonPlaceholder.Item marginTop={6} width={width * 0.4} height={20} />
      <SkeletonPlaceholder.Item marginTop={6} width={width * 0.7} height={25} />
    </SkeletonPlaceholder.Item>
  ));

  return (
    <BaseScreen>
      <Background></Background>

      <View style={styles.container}>
        {!hasConection ? (
          <View style={styles.noConnectionCard}>
            <Text style={styles.noConnectionTitle}>
              No tienes conexión para ver tu perfil
            </Text>
          </View>
        ) : showProfile && profile ? (
          <>
            <Text style={styles.title}>Hola {profile.first_name} </Text>
            <View
              style={{backgroundColor: colores.blanco, ...styles.profileInfo}}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.value}>
                {profile.first_name} {profile.last_name}
              </Text>
              <Text style={styles.label}>Cédula:</Text>
              <Text style={styles.value}>{profile.cedula}</Text>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{profile.username}</Text>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{profile.email}</Text>
            </View>
          </>
        ) : (
          <View style={styles.profileInfo}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item alignSelf="center">
                {skeletonItems}
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )}
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: colores.primario,
    marginTop: 20,
  },
  profileInfo: {
    padding: 16,
    marginTop: 20,
    width: '90%',
    ...appStyles.sombra, // Si tienes un estilo de sombra personalizado
  },
  label: {
    fontSize: 18,
    color: colores.primario,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: colores.negro,
    marginBottom: 12,
  },
  noConnectionCard: {
    padding: 16,
    marginTop: 20,
    width: '90%',
    ...appStyles.sombra,
  },
  noConnectionTitle: {
    fontSize: 18,
    color: colores.primario,
    textAlign: 'center',
  },
});
