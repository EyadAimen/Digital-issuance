import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../../../theme";
import { fontStyles } from "../../../fonts";
import { useState } from "react";

type formButtonTypes = {
    title: string
    handlePress: () => void
} 

export default function FormButton({title, handlePress}: formButtonTypes){
    const [isPressed, setIsPressed] = useState<boolean>(false)
    
    return(
        <Pressable 
            style={[styles.button, isPressed ? styles.clickedButton: null]} 
            onPress={handlePress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <Text style={[fontStyles.buttonLabels, {color:theme.whiteColor}]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.primaryBlue,
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignItems: "center",
        borderRadius: 6,
        marginTop: 48,
        marginBottom: 32
      },
    clickedButton: {
        opacity: .8
    },
})