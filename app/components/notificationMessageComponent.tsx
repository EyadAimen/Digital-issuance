import { Text, View, StyleSheet } from "react-native"
import { theme } from "../../theme"

type props = {
    date: string,
    status: string,
    statusMessage: string,
    message: string,
}

export default function NotificationMessageComponent({ date, status, statusMessage, message }: props) {
    return(
    <View style={styles.card}>
        <Text 
        style={styles.dateText}>{date}</Text>
        <Text style={[styles.statusText, status === "Fail"? { color:theme.failColor }: status === "Success" ? { color:theme.successColor }: { color:theme.warningColor }]}>{status}</Text>
        <Text style={styles.statusText}>{statusMessage}</Text>
        <Text style={styles.messageText}>{message}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    dateText: {
        color: theme.blackText,
        fontSize: 18,
        backgroundColor: theme.primaryBlue,
        paddingHorizontal:20,
        marginBottom: 5
    },
    messageText: {
        color: theme.greyText,
        fontSize: 14,
        paddingHorizontal:20
    },
    statusText: {
        color: theme.blackText,
        fontSize: 16,
        paddingHorizontal:20,
    },
    card: {
        marginBottom: 20
    }
})