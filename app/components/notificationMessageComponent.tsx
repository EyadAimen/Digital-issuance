import { Text, View, StyleSheet } from "react-native"
import { theme } from "../../theme"
import { fontStyles } from "../../fonts";

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
        <View style={styles.cardHeader}>
            <Text style={[fontStyles.body, {color: theme.whiteColor}]}>{title}</Text>
            <Text style={[fontStyles.body, {color: theme.whiteColor}]}>{textDate}</Text>
        </View>
        <View style={styles.cardContent}>
            <Text style={[fontStyles.body, {color: theme.greyText}]}>{message}</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 12,
        borderBottomColor: theme.grey2Text,
        borderBottomWidth: 1,
        paddingVertical: 8,
        marginHorizontal: 12,
        gap: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: theme.primaryBlue,
        borderRadius: 6,
    },
    cardContent: {
        paddingHorizontal: 8,
    }
})