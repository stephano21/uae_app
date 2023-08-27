import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet, StatusBar } from 'react-native';
import {PermissionsContext} from '../context/PermissionsContext';
import Geolocation from 'react-native-geolocation-service';
import _lotes from "./../api/test.json"
export const NextScreen = () => {
  const [locationPermission, setLocationPermission] = useState<boolean | undefined>();
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const permissionsContext = useContext(PermissionsContext); // Obtén el contexto de permisos

  useEffect(() => {
    let updateIntervalRef: NodeJS.Timeout | null = null;
    (async () => {
      if (Platform.OS === 'android') {
        const hasPermission = await permissionsContext.checkPermission(); // Usa la función del contexto
        await permissionsContext.checkPermission(); // Utiliza la función del contexto
        if (permissionsContext.permissions !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      }

      getLocation2();
      updateIntervalRef = setInterval(getLocation2, 1000);
    })();

    return () => {
      if (updateIntervalRef) {
        clearInterval(updateIntervalRef);
      }
    };
  }, []);

 
  const pointInRegion = (lat: number, lon: number, vertices: any[]) => {
    // Convertir las coordenadas a flotantes 
    console.log(vertices)
    lat = parseFloat(lat);
    lon = parseFloat(lon);
    // Inicializar el contador 
    let contador = 0;
    // Obtener el número de vértices del polígono 
    const numVertices = vertices.length;

    // Iterar sobre los lados del polígono 
    for (let i = 0; i < numVertices; i++) {
      const v1 = vertices[i];
      const v2 = vertices[(i + 1) % numVertices];

      if (
        v1.longitude > lon !== v2.longitude > lon &&
        lat <
        ((v2.latitude - v1.latitude) * (lon - v1.longitude)) /
        (v2.longitude - v1.longitude) +
        v1.latitude
      ) {
        contador++;
      }
    }

    // Si el contador es impar, el punto está dentro del polígono 

    return contador % 2 === 1;
  };

  const getLocation2 = async () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const locationData = position.coords;
        locationData.region = _lotes
          .filter(item =>
            pointInRegion(
              locationData.latitude,
              locationData.longitude,
              item.geocoordenadas.map((item: any) => ({
                longitude: parseFloat(item.lng),
                latitude: parseFloat(item.lat),
              }))
            )
          )
          .map(item => item.Lote);
        setLocation(locationData);
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <>
      <StatusBar />
      {permissionsContext.permissions === 'granted' ? (
        <Text>{JSON.stringify(location, null, 30)}</Text>
      ) : (
        <Text>{errorMsg}</Text>
      )}
    </>
  );
}