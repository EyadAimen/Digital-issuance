import { View, StyleSheet, Text } from "react-native";
import { theme } from "../../theme";
import { ProgressBar } from "@react-native-community/progress-bar-android";

type props = {
    application: string;
    progress: number;
    updateMessage: string;
}


export function ApplicationStatusCard({application, progress, updateMessage}: props) {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>{application}</Text>
            <Text style={styles.text}>{updateMessage}</Text>
            <Text style={styles.text}>{progress}%</Text>

            <View style={styles.progressBar}>
            <ProgressBar 
            progress={progress/100}
            styleAttr="Horizontal"
            indeterminate={false}
            color="#FF0000"
            />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.primaryBlue,
        borderRadius: 6,
        padding: 5,
        margin: 5,
        marginHorizontal:22
    },
    progressBar: {
        width:"100%",
        height:10,
        backgroundColor: theme.whiteColor,
        borderColor: theme.whiteColor,
        borderRadius: 5,
        marginBottom: 5,
    },
    text: {
        color: theme.whiteColor,
        marginBottom:5,
        fontSize: 20,
        fontWeight: "400"
    }
  });