import { Text, View, StyleSheet, TextInput } from "react-native";
import { theme } from "../../../theme";

type formInputProps = {
    label: string,
    placeholder: string,
    value: string | undefined,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>
    error?: string
}

export function FormInputField({ label, placeholder, value, setValue, error }: formInputProps) {
    return (
        <View style={styles.inputContianer}>
            <Text>{label}<Text style={{ color: theme.failColor }}>*</Text></Text>
            <TextInput
                value={value}
                style={[styles.textInput, error ? styles.inputError : null]}
                onChangeText={setValue}
                placeholder={placeholder}
            />
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
})