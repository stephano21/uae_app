import {StyleSheet} from 'react-native';

export const colores = {
  blanco: '#f3eff5',
  primario: '#00553c',
  primarioclaro: '#a6dbd6',
  secundario: '#72b01d',
  darkTransparent: 'rgba(0,0,0,0.5)',
  darkLoader: 'rgba(0,0,0,0.75)',
  LocationBg: 'rgba(114,176,29,0.36)',
  LecList: '#698079',
  negro: 'black',
  plomo: 'rgba(142,143,141,0.36)',
  plomoclaro: '#ededed',
  rojo: '#eb4034',
  azul: '#20397a',
  verde: '#16c40c',
  negroClaro: '#0d0a0b',
  gris: '#f3eff5',
  grisOscuro:"#CBCBCB",
  verdeLima: '#72b01d',
  verdePasto: '#79b473',
  //
  success: '#00553c',
  danger: '#f0003e',
};

export const iconos = {
  atras: 'chevron-back-outline',
  abajo: 'chevron-down-outline',
  advertencia: 'warning-outline',
  agenda: 'calendar-outline',
  albunes: 'albums-outline',
  avion: 'paper-plane-outline',
  arriba: 'chevron-up-outline',
  basura: 'trash-outline',
  bolitaLlena: 'radio-button-on-outline',
  bolitaVacia: 'radio-button-off-outline',
  calificacion: 'ribbon-outline',
  camara: 'camera-outline',
  campana: 'notifications',
  campanaOutline: 'notifications-outline',
  cargarNube: 'cloud-upload-outline',
  carro: 'car-sport-outline',
  carrito: 'cart-outline',
  clip: 'attach-outline',
  codigoBarras: 'barcode-outline',
  datos: 'document-text-outline',
  derecha: 'chevron-forward-outline',
  documento: 'document-attach-outline',
  editList: 'create-outline',
  enviar: 'send-outline',
  equis: 'close-outline',
  equisCirculo: 'close-circle-outline',
  estrella: 'star',
  estrellaout: 'star-outline',
  estrellaCheck: 'star-check-outline',
  favorito: 'heart',
  guardar: 'bookmark-outline',
  home: 'home-outline',
  inicio: 'home',
  info: 'help-circle-outline',
  imagen: 'image-outline',
  lapiz: 'pencil',
  lista: 'list-outline',
  llaveajustes: 'build-outline',
  login: 'log-in-outline',
  logout: 'log-out-outline',
  lupa: 'search-outline',
  mas: 'add-circle-outline',
  menos: 'remove-outline',
  menu: 'menu',
  menuOutline: 'menu-outline',
  meta: 'golf-outline',
  ojo: 'eye-outline',
  ojotachado: 'eye-off-outline',
  ordenDeTrabajo: 'newspaper-outline',
  ordTrabajo: 'newspaper',
  papel: 'reader-outline',
  pedido: 'reader-outline',
  perfil: 'person',
  perfilOutline: 'person-outline',
  recargar: 'reload-outline',
  recuperar: 'help-circle-outline',
  resetPass: 'lock-open-outline',
  reloj: 'alarm-outline',
  segurity: 'shield-checkmark-outline',
  sincronizar: 'sync-outline',
  tableroCuenta: 'table-account',
  tarjeta: 'wallet-outline',
  tendencia: 'trending-up-outline',
  tecnico: 'account-wrench-outline',
  tuerca: 'settings-outline',
  ubicacion: 'navigate-outline',
  visto: 'checkmark-outline',
  volver: 'arrow-undo-outline',
  whatsapp: 'logo-whatsapp',
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
