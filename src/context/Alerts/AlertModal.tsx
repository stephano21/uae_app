import React from 'react';
import {View} from 'react-native';
import {AlertButton} from './AlertComponents/AlertButton';
import {AlertBaseModal, BaseAlertProps} from './AlertBaseModal';
import {BaseModalProps} from '../../Template/BaseModal';

interface Props extends BaseAlertProps {}
export const AlertModal = ({
  CloseFunction,
  title = 'Aviso',
  message,
  isVisible = false,
}: Props) => {
  return (
    <AlertBaseModal
      title={title}
      message={message}
      isVisible={isVisible}
      CloseFunction={CloseFunction}>
      <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
        <AlertButton anyFunction={CloseFunction}></AlertButton>
      </View>
    </AlertBaseModal>
  );
};
