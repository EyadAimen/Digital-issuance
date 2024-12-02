import { View, StyleSheet, Text, Pressable } from "react-native";
import { theme } from "../../theme";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import { fontStyles } from "../../fonts";

type props = {
    application: string
    progress: number
    updateMessage: string
    onPress: (application: any) => void
}

export default function ApplicationStatusCard({application, progress, updateMessage, onPress}: props) {
    return (
        <View style={styles.card}>
            <View style={styles.topContainer}>
              <Text style={fontStyles.buttonLabels}>{application}</Text>
              <Text style={[fontStyles.tabLabels, {color:theme.greyText, marginRight: 6}]}>Status</Text>
            </View>
            <View style={styles.bottomContainer}>
                {/* <ProgressBar 
                    progress={progress/100}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    color="#FF0000"
                /> */}
                <View style={styles.progressBar}>
                    <View
                        style={[
                        styles.progressFill,
                        { width: `${progress * 100}%` },
                        ]}
                    />
                    </View>
                <Pressable style={styles.cardButton} onPress={onPress}>
                    <Text style={[fontStyles.tabLabels, {color:theme.whiteColor}]}>
                        View Details
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.whiteColor,
        borderRadius: 6,
        paddingHorizontal:12,
        padding: 16,
        height: 90,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        gap: 12,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    progressBar: {
        width: 150,
        height: 10,
        backgroundColor: theme.lightBlue,
        borderRadius: 8,
    },
      progressFill: {
        height: '100%',
        backgroundColor: theme.primaryBlue,
        borderRadius: 8,
    },
    cardButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 10,
        backgroundColor: theme.primaryBlue,
        borderRadius: 6,
    }
  });