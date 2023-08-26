import React, {createContext, useState} from 'react';
import {DocumentModal} from './DocumentView/DocumentModal';

type DocumentViewContextProps = {
  showDocument: (title: string, path: string) => void;
};

export const DocumentViewContext = createContext(
  {} as DocumentViewContextProps,
);

export const DocumentViewProvider = ({children}: any) => {
  const [DocumentVisible, setDocumentVisible] = useState(false);
  const [title, settitle] = useState('');
  const [path, setpath] = useState('');

  const showDocument = (title: string, path: string) => {
    setDocumentVisible(true);
    settitle(title);
    setpath(path);
  };

  return (
    <DocumentViewContext.Provider
      value={{
        showDocument,
      }}>
      {children}
      <DocumentModal
        CloseFunction={() => setDocumentVisible(false)}
        title={title}
        path={path}
        isVisible={DocumentVisible}></DocumentModal>
    </DocumentViewContext.Provider>
  );
};
