import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colores, styles as appStyles} from '../theme/appTheme';
import {BaseScreen} from '../Template/BaseScreen';
import {Metodos} from '../hooks/Metodos';
import {useIsFocused} from '@react-navigation/native';
import {Background} from './Auth/Background';
import {CheckInternetContext} from '../context/CheckInternetContext';

export const PerfilScreen = () => {
  const isFocused = useIsFocused();
  const {getPorfile, profile} = Metodos();
  const [showProfile, setShowProfile] = useState(false);
  const {hasConection} = useContext(CheckInternetContext);

  useEffect(() => {
    if (isFocused && hasConection) {
      setTimeout(() => {
        getPorfile();
        setShowProfile(true);
      }, 1000); // Mostrar el perfil después de 3 segundos
    }
  }, [isFocused]);

  return (
    <BaseScreen>
      <Background></Background>

      <View style={styles.container}>
        {profile && showProfile ? (
          <>
            <Text style={styles.title}>Hola {profile.first_name}</Text>
            <View
              style={{backgroundColor: colores.blanco, ...styles.profileInfo}}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.value}>
                {profile.first_name} {profile.last_name}
              </Text>
              <Text style={styles.label}>Cédula:</Text>
              <Text style={styles.value}>{profile.cedula}</Text>
              <Text style={styles.label}>Nombre de Usuario:</Text>
              <Text style={styles.value}>{profile.username}</Text>
              <Text style={styles.label}>Correo:</Text>
              <Text style={styles.value}>{profile.email}</Text>
            </View>
          </>
        ) : showProfile ? (
          <>
            <Text style={styles.noConnectionTitle}>
              ESTAMOS CARGANDO TU PERFIL
            </Text>
          </>
        ) : !hasConection ? (
          <>
            <Text style={styles.noConnectionTitle}>
              NO TIENES CONEXIÓN PARA VER TU PERFIL
            </Text>
          </>
        ) : (
          <></>
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
