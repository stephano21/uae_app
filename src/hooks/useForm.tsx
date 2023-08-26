import {useState} from 'react';

export const useForm = <T extends {[key: string]: any}>(initState: T) => {
  const [state, setState] = useState(initState);
  const onChange = <K extends keyof T>(value: T[K], field: K) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  return {
    ...state,
    setState,
    form: state,
    onChange,
  };
};
