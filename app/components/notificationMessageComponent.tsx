import { Text, View, StyleSheet } from "react-native"
import { theme } from "../../theme"

type props = {
    date: Date,
    status: string,
    title: string,
    message: string,
}

export default function NotificationMessageComponent({ date, status, title, message }: props) {
    const textDate = date.toLocaleDateString('default', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    return(
    <View style={styles.card}>
        <Text 
        style={styles.dateText}>{textDate}</Text>
        <Text style={[styles.statusText, status === "Fail"? { color:theme.failColor }: status === "Success" ? { color:theme.successColor }: { color:theme.warningColor }]}>{status}</Text>
        <Text style={styles.statusText}>{title}</Text>
        <Text style={styles.messageText}>{message}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    dateText: {
        color: theme.whiteColor,
        fontSize: 16,
        backgroundColor: theme.primaryBlue,
        paddingHorizontal:20,
        marginBottom: 5,
        padding: 5
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