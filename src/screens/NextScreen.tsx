import {Text} from 'react-native';
import _lotes from './../api/test.json';
import React, {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';

export const NextScreen = () => {
  const [location, setLocation] = useState<any>(); //definir un cuerpo o interfaz para location

  useEffect(() => {
    getLocation2();
  }, []);

  const pointInRegion = (lat: number, lon: number, vertices: any[]) => {
    // Convertir las coordenadas a flotantes
    console.log(vertices);
    lat = parseFloat(lat.toString());
    lon = parseFloat(lon.toString());
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
      async position => {
        const locationData = position.coords;
        locationData.region = _lotes //en la interfaz GeoCoordinates por parte de GeoLocation no se encuentra region, por eso este error
          .filter(item =>
            pointInRegion(
              locationData.latitude,
              locationData.longitude,
              item.geocoordenadas.map((item: any) => ({
                longitude: parseFloat(item.lng),
                latitude: parseFloat(item.lat),
              })),
            ),
          )
          .map(item => item.Lote);
        setLocation(locationData);
      },
      error => {
        console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <>
      {/* <StatusBar /> usa librería de expo xd*/}
      <Text>{JSON.stringify(location, null, 30)}</Text>
    </>
  );
};
