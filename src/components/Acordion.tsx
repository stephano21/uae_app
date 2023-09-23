import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet, useWindowDimensions } from 'react-native';
import { colores, iconos } from '../theme/appTheme';
interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const { width } = useWindowDimensions();

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);

        Animated.timing(animation, {
            toValue: isExpanded ? 0 : 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false, // You can set this to true if needed
        }).start();
    };

    const rotateArrow = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={[styles.container, { width: width /1.1  }]}>
            <TouchableOpacity onPress={toggleAccordion}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.header,{fontSize:width*0.05}]}>{title}</Text>
                    {/* <Animated.Text style={{ transform: [{ rotate: rotateArrow }] }}>
                        ▼
                    </Animated.Text> */}
                </View>
            </TouchableOpacity>

            {isExpanded && <View style={styles.content}>{children}</View>}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor:colores.blanco,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: '#000',
        marginVertical: 1.2,
        overflow: 'hidden',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        textAlign:'center',
        padding: 5,
        fontWeight:'bold',
        backgroundColor:colores.verdeLima,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width:'100%',
        color:colores.blanco,
    },
    title: {
        flex: 1,
        fontSize: 16,
    },
    arrow: {
        fontSize: 20,
    },
    content: {
        padding: 16,
    },
});
export default Accordion;
