import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../../../theme";
import { fontStyles } from "../../../fonts";

type formButtonTypes = {
    title: string
    handlePress: () => void
} 

export function FormButton({title, handlePress}: formButtonTypes){
    return(
        <Pressable style={styles.buttonStyle} onPress={handlePress}>
            <Text style={[fontStyles.buttonLabels, {color:theme.whiteColor}]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: theme.primaryBlue,
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignItems: "center",
        borderRadius: 6,
        marginTop: 48,
      },
})