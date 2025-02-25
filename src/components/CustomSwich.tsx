import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

// Definimos las props del componente
interface Props {
    onToggle?: (isEnabled: boolean) => void; // Función opcional que se ejecuta al cambiar el estado
}

export const CustomSwitch = ({ onToggle }: Props) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(false); // Estado del switch
    const translateX = useState(new Animated.Value(isEnabled ? 20 : 0))[0]; // Estado animado para el círculo

    const toggleSwitch = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);

        // Animación del círculo
        Animated.timing(translateX, {
            toValue: newState ? 20 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();

        // Llamar a la función onToggle si está definida
        if (onToggle) {
            onToggle(newState);
        }
    };

    useEffect(() => {
        // Animar la transición de translateX cuando el estado cambia
        Animated.timing(translateX, {
            toValue: isEnabled ? 20 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isEnabled, translateX]); // Ejecutar cuando el estado cambie

    return (
        <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
            <View style={[styles.switchContainer, isEnabled && styles.switchOn]}>
                <Animated.View
                    style={[
                        styles.switchCircle,
                        {
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#e0e0e0', // Color de fondo cuando está desactivado
        justifyContent: 'center',
        padding: 2,
    },
    switchOn: {
        backgroundColor: '#4caf50', // Color de fondo cuando está activado
    },
    switchCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: 'white', // Color del círculo
    },
});

export default CustomSwitch;
