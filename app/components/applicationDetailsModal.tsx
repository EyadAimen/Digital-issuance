import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { fontStyles } from "../../fonts";
import { theme } from "../../theme";

type ApplicationDetailsModalProps = {
    isModalVisible: boolean,
    application: any,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}


export default function ApplicationDetailsModal({isModalVisible, application, setIsModalVisible}: ApplicationDetailsModalProps){
    return(
        <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
        >
        <View style={styles.container}>
        <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
                <Text style={fontStyles.sectionHeading}>{application?.type}</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.titleColumn}>
                    <View style={styles.titleItem}>
                        <Text style={fontStyles.body}>Application ID </Text>
                        <Text style={[fontStyles.body, styles.colon]}>:</Text>
                    </View>
                    <View style={styles.titleItem}>
                        <Text style={fontStyles.body}>Submission Date </Text>
                        <Text style={[fontStyles.body, styles.colon]}>:</Text>
                    </View>
                    <View style={styles.titleItem}>
                        <Text style={fontStyles.body}>Progress </Text>
                        <Text style={[fontStyles.body, styles.colon]}>:</Text>
                    </View>
                    <View style={styles.titleItem}>
                        <Text style={fontStyles.body}>Current Status </Text>
                        <Text style={[fontStyles.body, styles.colon]}>:</Text>
                    </View>
                    <View style={styles.titleItem}>
                        <Text style={fontStyles.body}>Last Update </Text>
                        <Text style={[fontStyles.body, styles.colon]}>:</Text>
                    </View>
                </View>
                <View style={styles.valueColumn}>
                    <Text style={[fontStyles.body, {color:theme.greyText}]}>PAS12345</Text>
                    <Text style={[fontStyles.body, {color:theme.greyText}]}>1/12/2024</Text>
                    <Text style={[fontStyles.body, {color:theme.greyText}]}>60%</Text>
                    <Text style={[fontStyles.body, {color:theme.greyText}]}>Under Review</Text>
                    <Text style={[fontStyles.body, {color:theme.greyText}]}>Documents approved, waiting for printing</Text>
                </View>
            </View>
            <Pressable
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
            >
            <Text style={[fontStyles.buttonLabels, { color: theme.whiteColor }]}>
                Close
            </Text>
            </Pressable>
        </View>
        </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: "90%",
        backgroundColor: theme.whiteColor,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        gap: 12,
      },
      modalHeader: {
        paddingVertical: 8,
        borderBottomColor: theme.grey2Text,
        borderBottomWidth: 1,
        width: "100%",
        alignItems:"center"
      },
      infoContainer: {
        flexDirection: "row",
        gap: 12,
      },
      titleColumn:{
        flexShrink: 1,
        gap: 12,
      },
      titleItem: {
        flexDirection: "row",
        justifyContent: "space-between"
      },
      colon: {
        marginLeft: 6,
      },
      valueColumn:{
        flex: 1,
        gap: 12
      },
      closeButton: {
        marginTop: 16,
        backgroundColor: theme.primaryBlue,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 6,
      },
})