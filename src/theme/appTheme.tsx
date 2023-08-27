import {StyleSheet} from 'react-native';

export const colores = {
  blanco: '#f3eff5',
  primario: '#00553c',
  primarioclaro: '#a6dbd6',
  secundario: '#72b01d',
  darkTransparent: 'rgba(0,0,0,0.5)',
  darkLoader: 'rgba(0,0,0,0.75)',
  negro: 'black',
  plomo: 'grey',
  plomoclaro: '#ededed',
  rojo: '#eb4034',
  azul: '#20397a',
  verde: '#16c40c',
  negroClaro: '#0d0a0b',
  gris: '#f3eff5',
  verdeLima: '#72b01d',
  verdePasto: '#79b473',
  //
  success:'#00553c',
  danger: '#f0003e'
};

export const iconos = {
  advertencia: 'warning-outline',
  favorito: 'heart',
  logout: 'log-out-outline',
  meta: 'golf-outline',
  papel: 'reader-outline',
  calificacion: 'ribbon-outline',
  abajo: 'chevron-down-outline',
  basura: 'trash-outline',
  mas: 'add-circle-outline',
  documento: 'document-attach-outline',
  imagen: 'image-outline',
  ojo: 'eye-outline',
  ojotachado: 'eye-off-outline',
  camara: 'camera-outline',
  visto: 'checkmark-outline',
  lupa: 'search-outline',
  carrito: 'cart-outline',
  //atras: 'arrow-undo',
  atras: 'chevron-back-outline',
  home: 'home-outline',
  perfil: 'person-outline',
  tarjeta: 'wallet-outline',
  pedido: 'reader-outline',
  resetPass: 'lock-open-outline',
  recuperar: 'help-circle-outline',
  login: 'log-in-outline',
  datos: 'document-text-outline',
  whatsapp: 'logo-whatsapp',
  menos: 'remove-outline',
  equis: 'close-outline',
  menu: 'menu-outline',
  lista: 'list-outline',
  reloj: 'alarm-outline',
  ubicacion: 'navigate-outline',
  carro: 'car-sport-outline',
  tendencia: 'trending-up-outline',
  estrella: 'star',
  recargar: 'reload-outline',
  arriba: 'chevron-up-outline',
  campana: 'notifications-outline',
};

export const styles = StyleSheet.create({
  /**
   * @View
   */
  globalmargin: {
    flex: 1,
    padding: 20,
  },
  centerItems: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  /**
   * @Menu
   */
  menuContainer: {
    marginVertical: 30,
    marginHorizontal: 10,
  },

  menuText: {
    color: colores.blanco,
    fontSize: 16,
  },
  /**
   * @Avatar
   */
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  /**
   * @TextInput
   */
  inputField: {
    marginVertical: 5,
    marginHorizontal: 5,
    color: 'white',
    width: '80%',
    borderRadius: 12,
  },
  inputFieldAlert: {
    color: 'white',
    borderRadius: 12,
    width: '100%',

    marginVertical: 5,
  },
  inputFieldText: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: colores.blanco,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
  /**
   * @Selector
   */
  selector: {width: '95%', margin: 5},
  sombra: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 10,
  },
  /**
   * @TextButton
   */
  textButton: {
    color: colores.blanco,
    fontSize: 15,
    margin: '4%',
    marginVertical: 10,
    textAlign: 'center',
  },
  textButtonBold: {
    color: colores.primario,
    fontWeight: 'bold',
    fontSize: 18,
    padding: '5%',
    minWidth: 50,
    textAlign: 'center',
  },
  /**
   * @Text
   */
  textTitle: {
    color: colores.blanco,
    fontSize: 18,
  },
  textBold: {
    color: colores.primario,
    fontWeight: 'bold',
    fontSize: 15,
  },
  textData: {
    color: colores.negro,
    fontWeight: '400',
    fontSize: 14,
  },
});
