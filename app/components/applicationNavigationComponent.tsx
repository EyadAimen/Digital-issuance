import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { theme } from "../../theme";

type props = {
    appName: string,
    onPress: () => void,
}

export function ApplicationNavigationComponent({ appName, onPress }: props) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.card}
            >
            <Text style={styles.text}>{appName}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.primaryBlue,
        borderRadius: 6,
        padding: 5,
        margin: 5,
        marginHorizontal:22,
    },
    text: {
        color: theme.whiteColor,
        marginBottom:5,
        fontSize: 20,
        fontWeight: "400"
    }
  });