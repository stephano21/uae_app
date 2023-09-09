import React, {createContext, useContext, useState} from 'react';
import {AlertImageModal} from './Alerts/AlertImageModal';
import {AlertModal} from './Alerts/AlertModal';
import {AlertPromtModal} from './Alerts/AlertPromtModal';
import {AlertYesNoModal} from './Alerts/AlertYesNoModal';
import {AxiosError} from 'axios';
import {CheckInternetContext} from './CheckInternetContext';
import {ApiErrorResponse} from '../interfaces/BaseApiInterface';
import {AlertTitleType} from './Alerts/AlertBaseModal';

type AlertContextProps = {
  value: string;
  ShowAlert: (type: AlertType, options: Options) => void;
  ShowAlertApiError: (
    {response}: AxiosError<ApiErrorResponse>,
    OkFunction?: () => void,
  ) => void;
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface Options {
  title: AlertTitleType;
  message: string;
  placeholder?: string;
  imagePath?: string;
  OkFunction?: ((value: string) => void) | (() => void);
  CancelFunction?: ((value: string) => void) | (() => void);
}

type AlertType = 'default' | 'yesno' | 'promt' | 'image';

export const AlertContext = createContext({} as AlertContextProps);

export const AlertProvider = ({children}: Props) => {
  const {hasConection} = useContext(CheckInternetContext);

  // Alert
  const [showAlert, setshowAlert] = useState(false); //to show alert
  const [titleAlert, settitleAlert] = useState<AlertTitleType>('Aviso'); //title of alert
  const [messageAlert, setmessageAlert] = useState(''); //message of alert
  const [OkAlertFunction, setOkAlertFunction] = useState(() => () => {}); //function to call when click ok
  // Alert Yes No
  const [showAlertYesNo, setshowAlertYesNo] = useState(false); //to show alert yes no
  const [titleAlertYesNo, settitleAlertYesNo] =
    useState<AlertTitleType>('Aviso'); //title of alert yes no
  const [messageAlertYesNo, setmessageAlertYesNo] = useState(''); //message of alert yes no
  const [OkAlertYesNoFunction, setOkAlertYesNoFunction] = useState(
    () => () => {},
  ); //function to call when click ok
  const [CancelAlertYesNoFunction, setCancelAlertYesNoFunction] = useState(
    () => () => {},
  ); //function to call when click cancel
  // Alert Promt
  const [showAlertPromt, setshowAlertPromt] = useState(false); //to show alert promt
  const [titleAlertPromt, settitleAlertPromt] =
    useState<AlertTitleType>('Aviso'); //title of alert promt
  const [messageAlertPromt, setmessageAlertPromt] = useState(''); //message of alert promt
  const [placeholder, setplaceholder] = useState(''); //placeholder of promt
  const [value, setvalue] = useState(''); //value of promt
  const [OkPromtFunction, setOkPromtFunction] = useState(
    () => (value: string) => {},
  ); //function to call when click ok
  const [CancelAlertPromtFunction, setCancelAlertPromtFunction] = useState(
    () => (value?: string) => {},
  ); //function to call when click cancel
  // Alert Image
  const [showAlertImage, setshowAlertImage] = useState(false); //to show alert image
  const [titleAlertImage, settitleAlertImage] =
    useState<AlertTitleType>('Aviso'); //title of alert image
  const [messageAlertImage, setmessageAlertImage] = useState(''); //message of alert image
  const [ImagePath, setImagePath] = useState(''); //image path
  const [OkAlertImageFunction, setOkAlertImageFunction] = useState(
    () => () => {},
  ); //function to call when click ok
  const [CancelAlertImageFunction, setCancelAlertImageFunction] = useState(
    () => () => {},
  ); //function to call when click cancel

  const checkValue = () => {
    // Verify if the value is empty
    if (value.length === 0) {
      // Show alert
      ShowAlert('default', {
        title: 'Aviso',
        message: 'Debe llenar el campo requerido',
      });
    } else {
      // Execute OkFunction with the value
      if (OkPromtFunction !== undefined) {
        OkPromtFunction(value);
      }
      // Empty the value
      setvalue('');
      // Hide the alert
      setshowAlertPromt(false);
    }
  };

  const ShowAlertApiError = (
    error: AxiosError<ApiErrorResponse>,
    OkFunction?: () => void,
  ) => {
    ShowAlert('default', {
      title: 'Error',
      message:
        error.response?.status === 401
          ? 'Su cuenta no está autorizada, por favor inicie sesión nuevamente.'
          : !hasConection
          ? 'Verifique su conexión a Internet'
          : error.response?.status! >= 400 && error.response?.status! < 500
          ? typeof error.response?.data === 'string'
            ? error.response.data // Si la respuesta es un string, úsalo directamente
            : typeof error.response?.data === 'object' &&
              typeof error.response.data.error_description === 'string'
            ? error.response.data.error_description // Si hay un error_description en el objeto JSON, úsalo
            : 'Ocurrió un error en la consulta'
          : error.response?.status! >= 500
          ? 'Ocurrió un error en el servidor'
          : 'Ocurrió un error inesperado',
      OkFunction,
    });
  };

  const ShowAlert = (alertType: AlertType, options: Options) => {
    switch (alertType) {
      case 'default': // if alert type is Alert
        setshowAlert(true); // set show alert to true
        settitleAlert(options.title); // set title alert to options title
        setmessageAlert(options.message); // set message alert to options message
        setOkAlertFunction(() => options.OkFunction); // set any function to options any function
        break;
      case 'yesno': // if alert type is AlertYesNo
        setshowAlertYesNo(true); // set show alert yes no to true
        settitleAlertYesNo(options.title); // set title alert yes no to options title
        setmessageAlertYesNo(options.message); // set message alert yes no to options message
        setOkAlertYesNoFunction(() => options.OkFunction); // set any function to options any function
        setCancelAlertYesNoFunction(() => options.CancelFunction); // set negative function to options negative function
        break;
      case 'promt': // if alert type is AlertPromt
        setshowAlertPromt(true); // set show alert promt to true
        settitleAlertPromt(options.title); // set title alert promt to options title
        setmessageAlertPromt(options.message); // set message alert promt to options message
        setplaceholder(options.placeholder!); // set placeholder to options placeholder
        setOkPromtFunction(() => options.OkFunction); // set any function to options any function
        break;
      case 'image': // if alert type is AlertImage
        setshowAlertImage(true); // set show alert image to true
        settitleAlertImage(options.title); // set title alert image to options title
        setmessageAlertImage(options.message); // set message alert image to options message
        setImagePath(options.imagePath!); // set image path to options image path
        setOkAlertImageFunction(() => options.OkFunction); // set any function to options any function
        break;
      default:
        break;
    }
  };

  return (
    <AlertContext.Provider
      value={{
        value,
        ShowAlert,
        ShowAlertApiError,
      }}>
      {children}
      <AlertModal
        isVisible={showAlert}
        title={titleAlert}
        message={messageAlert}
        CloseFunction={() => {
          if (OkAlertFunction !== undefined) {
            OkAlertFunction();
          }
          setshowAlert(false);
        }}></AlertModal>
      <AlertYesNoModal
        isVisible={showAlertYesNo}
        title={titleAlertYesNo}
        message={messageAlertYesNo}
        CloseFunction={() => {
          setshowAlertYesNo(false);
          if (CancelAlertYesNoFunction !== undefined) {
            CancelAlertYesNoFunction();
          }
        }}
        OkFunction={() => {
          if (OkAlertYesNoFunction !== undefined) {
            OkAlertYesNoFunction();
          }
          setshowAlertYesNo(false);
        }}></AlertYesNoModal>
      <AlertPromtModal
        isVisible={showAlertPromt}
        title={titleAlertPromt}
        message={messageAlertPromt}
        placeholder={placeholder}
        value={value}
        onChange={setvalue}
        CloseFunction={() => setshowAlertPromt(false)}
        OkFunction={() => {
          checkValue();
        }}></AlertPromtModal>
      <AlertImageModal
        isVisible={showAlertImage}
        CloseFunction={() => setshowAlertImage(false)}
        OkFunction={() => {
          if (OkAlertImageFunction !== undefined) {
            OkAlertImageFunction();
          }
          setshowAlertImage(false);
        }}
        title={titleAlertImage}
        message={messageAlertImage}
        imagePath={ImagePath}></AlertImageModal>
    </AlertContext.Provider>
  );
};
