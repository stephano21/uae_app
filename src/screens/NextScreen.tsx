import { CommonActions, useNavigation } from '@react-navigation/native';
import { CheckInternetContext } from '../context/CheckInternetContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Geolotes, ILocation } from '../interfaces/ApiInterface';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonWithText } from '../components/ButtonWithText';
import Geolocation from '@react-native-community/geolocation';
import { AuthContext } from '../context/AuthContext';
import { BaseScreen } from '../Template/BaseScreen';
import { colores, styles } from '../theme/appTheme';
import { Metodos } from '../hooks/Metodos';
import { Text, View } from 'react-native';
import { SearchInput } from '../components/SearchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from '../components/List';
import CustomSwitch from '../components/CustomSwich';

export const NextScreen = () => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  const { geolotes, pointInRegion, getPlantas } = Metodos();
  const { hasConection } = useContext(CheckInternetContext);
  const [lotesMásRecientes, setLotesMásRecientes] = useState<Geolotes[]>([]);
  const [filtrado, setFiltrado] = useState<Geolotes[]>([]);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [TypeSearch, setTypeSearch] = useState<boolean>(false)
  const [labelTypeSearch, setlabelTypeSearch] = useState<string>("Modo Automático")
  useEffect(() => {
    let _lotesMásRecientes: Geolotes[];
    const loadData = async () => {
      // 1. Los lotes más recientes se asumen de la caché.
      try {
        const asyncStorageItem = await AsyncStorage.getItem('GeoLotes');
        if (asyncStorageItem) {
          console.log("Local Data")
          _lotesMásRecientes = JSON.parse(asyncStorageItem);
          console.log("Local Data", _lotesMásRecientes)
        } else {
          console.log('No se encontraron datos guardados en AsyncStorage');
        }
      } catch (error) {
        console.error('Error al cargar los datos desde AsyncStorage:', error);
      }
      // 2. Si hay acceso a la API, se descargarán los datos más recientes.
      if (hasConection && token.length > 0) {
        try {
          console.log("Trying get geolotes")
          _lotesMásRecientes = await geolotes();
          console.log(_lotesMásRecientes.length)
          await getPlantas();
        } catch (error) {
          // Manejar cualquier error que ocurra en geolotes o getPlantas
          console.error('Error en geolotes o getPlantas:', error);
        }
      }
      setLotesMásRecientes(_lotesMásRecientes);
    };
    loadData();
  }, [hasConection]);
  // 3. Acá abajo se chequeará de acuerdo con las regiones más recientes.

  const getLocation = () => {
    console.log("Find location ")
    Geolocation.getCurrentPosition(
      async position => {
        const locationData: any = position.coords;
        // Filtrar los polígonos basados en la ubicación actual
        const filteredPoligonos = lotesMásRecientes.filter(item => {
          pointInRegion(
            locationData.latitude,
            locationData.longitude,
            item.geocoordenadas.map((item: any) => ({
              longitude: parseFloat(item.lng),
              latitude: parseFloat(item.lat),
            })),
          )
          console.log(locationData)
        }
        );
        // Mapear los polígonos filtrados a un arreglo de objetos
        const regionData = filteredPoligonos.map(item => ({
          Lote: item.Lote,
          Id: item.Id_Lote,
          Cod: item.CodigoLote,
        }));
        // Asignar la propiedad 'region' en locationData con los datos mapeados
        locationData.region = regionData;

        // Actualizar el estado con los datos de ubicación
        setLocation(locationData);
      },
      error => {
        //console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    if (lotesMásRecientes && lotesMásRecientes.length === 0) {
      return;
    }
    if(TypeSearch){
      getLocation();
      let refrescarUbicación: NodeJS.Timeout | null;
      refrescarUbicación = setInterval(async () => {
        getLocation();
      }, 5000);
  
      return () => {
        if (refrescarUbicación) {
          clearInterval(refrescarUbicación);
        }
      };
    }
  }, [lotesMásRecientes]); // Añadir poligonos como dependencia
  const HandleTypeSearch = (isEnabled: boolean) => {
    setTypeSearch(isEnabled)
    setlabelTypeSearch(isEnabled?"Modo Manual":"Modo Automático")
  };
  return (
    <BaseScreen>
    <View style={{margin:10, alignItems:"center"}}>
    <Text style={{color:colores.primario, padding:5}}>{labelTypeSearch}</Text>
      <CustomSwitch onToggle={HandleTypeSearch} />
    </View>
      {TypeSearch ? (
        <>
          <SearchInput
            placeholder={'Buscar por código de lote'}
            keyBoard="visible-password"
            
            catalog={lotesMásRecientes}
            textCompare={(item: Geolotes) =>
              item.CodigoLote !== null ? [item.CodigoLote] : []
            }
            result={setFiltrado}
          />
          <View style={styles.geoConatiner}>
            {filtrado?.length >0 ? (
              <ScrollView style={styles.geoScrol}>
                {filtrado.map((a, index) => (
                  <ButtonWithText
                    key={index}
                    width={"100%"}
                    anyfunction={() => {
                      navigation.dispatch(
                        CommonActions.navigate('PlantasScreen', {
                          idLote: a.Id_Lote,
                          data: a,
                          title: a.CodigoLote,
                        }),
                      );
                    }}
                    icon="location"
                    title={a.CodigoLote}
                  />
                ))}
              </ScrollView>
            ) : (
              <ScrollView style={styles.geoScrol}>
                {lotesMásRecientes?.map((a, index) => (
                  <ButtonWithText
                    key={index}
                    width={"100%"}
                    anyfunction={() => {
                      navigation.dispatch(
                        CommonActions.navigate('PlantasScreen', {
                          idLote: a.Id_Lote,
                          data: a,
                          title: a.CodigoLote,
                        }),
                      );
                    }}
                    icon="location"
                    title={a.CodigoLote}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        </>
      ) : (<View>
        <List
          ListEmptyText="No hay lotes cercanos disponibles, cambie a modo manual para buscarlo por su código."
          data={location?.region || []}
          refreshFunction={geolotes}
          renderItem={(a, index) => (
            <ButtonWithText
              key={index}
              anyfunction={() => {
                navigation.dispatch(
                  CommonActions.navigate('PlantasScreen', {
                    idLote: a.Id,
                    datos: a,
                    title: a.Cod,
                  }),
                );
              }}
              icon="location"
              title={a.Cod}
            />
          )}
        />
        <Text style={{color: colores.negro, fontSize:20, marginTop:150}}>
              Searching.....
            </Text>
        {/* {location && location.region ? (
          location?.region.map((a, index) => (

          ))
        ) : (
          <>
            <Text style={{color: colores.negro}}>
              No hay lotes cercanos disponibles, puedes buscarlo por su código.
            </Text>
          </>
        )} */}
      </View>)}



    </BaseScreen>
  );
};
