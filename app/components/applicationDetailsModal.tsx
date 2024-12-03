import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { fontStyles } from "../../fonts";
import { theme } from "../../theme";

type ApplicationDetailsModalProps = {
    isModalVisible: boolean,
    application: any,
    msg: any,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}


export default function ApplicationDetailsModal({isModalVisible, application, msg, setIsModalVisible}: ApplicationDetailsModalProps){
    const date =  msg.date.toDate();
    const textDate = date.toTimeString();
    const progress = application.progress;
    const status = msg.status;
    const updateMessage =  msg.message;
  
  
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
                <Text style={fontStyles.sectionHeading}>{application.type}</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.titleColumn}>
                    <View style={styles.titleItem}>
                        
                        <Text style={[fontStyles.body, styles.colon]}>:</Text>
                    </View>
                    <View style={styles.titleItem}>
                        <Text style={fontStyles.body}>Update Date </Text>
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
                    
                    <Text style={[fontStyles.body, {color:theme.greyText}]}>{textDate}</Text>
                    <Text style={[fontStyles.body, {color:theme.greyText}]}>{progress}%</Text>
                    <Text style={[fontStyles.body, {color:theme.greyText}]}>{status}</Text>
                    <Text style={[fontStyles.body, {color:theme.greyText}]}>{updateMessage}</Text>
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