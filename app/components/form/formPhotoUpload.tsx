import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { theme } from "../../../theme";
import { fontStyles } from "../../../fonts";

type formInputProps = {
    file: any
    upload: () => Promise<void>
    error?: string
}

export default function FormPhotoUpload({ file, upload, error }: formInputProps) {
    return (
        <View style={[styles.fileUploadContainer, error ? styles.errorUploadContainer : null]}>
            <FontAwesome name="file-photo-o" size={32} color={theme.lightBlue} />
            {file == null?
                <View style={styles.uploadBtnContainer}>
                    <Pressable onPress={upload}><Text style={[fontStyles.body, { color: theme.lightBlue }]}>Click here</Text></Pressable>
                    <Text style={fontStyles.body}> to upload</Text>
                </View> :
                <View>
                    <Text>Uploaded</Text>
                </View>
            }
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContianer: {
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    textInput: {
        borderColor: theme.grey2Text,
        borderWidth: 1,
        alignSelf: "stretch",
        padding: 10,
        fontSize: 16,
        marginBottom: 12,
        borderRadius: 6,
    },
    inputError: {
        borderColor: theme.failColor,
    },
    errorText: {
        color: theme.failColor,
        fontSize: 12,
        marginTop: -8,
        marginBottom: 8,
    },
    fileUploadContainer: {
        alignItems: "center",
        gap: 12,
        borderStyle: 'dashed',
        borderColor: theme.lightBlue,
        borderWidth: 3,
        paddingHorizontal: 16,
        paddingVertical: 48,
        borderRadius: 6
    },
    errorUploadContainer: {
        borderColor: theme.failColor
    },
    uploadBtnContainer: {
        flexDirection: 'row'
    },
})