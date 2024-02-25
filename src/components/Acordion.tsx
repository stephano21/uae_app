import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {colores, styles} from '../theme/appTheme';
interface AccordionProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const Accordion = ({title, children}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const {width} = useWindowDimensions();

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  
    Animated.parallel([
      Animated.timing(animation, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
    ]).start(); // <-- Aquí es donde debes iniciar la animación
  };

  return (
    <View style={{...AcordionStyles.container, width: width / 1.1}}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{flexDirection: 'row'}}
        onPress={toggleAccordion}>
        <Text style={{...AcordionStyles.header, fontSize: width * 0.05}}>
          {title}
        </Text>
      </TouchableOpacity>
      {isExpanded && <View style={AcordionStyles.content}>{children}</View>}
    </View>
  );
};
const AcordionStyles = StyleSheet.create({
  container: {
    backgroundColor: colores.blanco,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: '#000',
    marginBottom: 5,
    overflow: 'hidden',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: colores.primario,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: '100%',
    color: colores.blanco,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
  },
  content: {
    width: '90%',
    maxHeight: 320,
    ...styles.centerItems,
    padding: 4,
    backgroundColor: colores.LocationBg,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
