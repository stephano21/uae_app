import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colores, styles as appStyles} from '../theme/appTheme';
import {BaseScreen} from '../Template/BaseScreen';
import {Metodos} from '../hooks/Metodos';
import {useIsFocused} from '@react-navigation/native';
import {Background} from './Auth/Background';
import {CheckInternetContext} from '../context/CheckInternetContext';
import {Avatar} from 'react-native-paper';

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

  const randomColor = (letras: string) => {
    // Patrón simple: usa ASCII de las letras para generar componentes RGB
    const codigoLetra1 = letras.charCodeAt(0);
    const codigoLetra2 = letras.charCodeAt(1);

    // Generar componentes RGB pasteles a partir de los códigos ASCII
    const componenteRojo = ((codigoLetra1 * 17) % 156) + 100; // Entre 100 y 255
    const componenteVerde = ((codigoLetra2 * 23) % 156) + 100; // Entre 100 y 255
    const componenteAzul = ((codigoLetra1 + codigoLetra2) % 156) + 100; // Entre 100 y 255

    // Formato hexadecimal
    const colorHex = `#${componenteRojo.toString(16)}${componenteVerde.toString(
      16,
    )}${componenteAzul.toString(16)}`;

    return colorHex;
  };

  const AvatarExample = (name: string) => {
    return (
      <View style={{margin: 30}}>
        <Avatar.Text
          style={{backgroundColor: randomColor(name)}}
          color="white"
          size={100}
          label={name}
        />
      </View>
    );
  };

  const iniciales = `${profile?.first_name.slice(
    0,
    1,
  )}${profile?.last_name.slice(0, 1)}`;

  return (
    <BaseScreen>
      <Background></Background>

      <View style={styles.container}>
        {profile && showProfile ? (
          <>
            {AvatarExample(iniciales.toUpperCase())}
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
    //  flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: colores.primario,
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
