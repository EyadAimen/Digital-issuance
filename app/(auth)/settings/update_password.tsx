import { StyleSheet, Text, View } from "react-native"
import { theme } from "../../../theme"
import { useState } from "react"
import FormInputField from "../../components/form/formInputField"
import FormButton from "../../components/form/formButton"

export default function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    return (
        <View style={styles.container}>
            <View>
                <FormInputField
                    label="Current Password"
                    value={currentPassword}
                    setValue={setCurrentPassword}
                    placeholder=""
                />
                <FormInputField
                    label="New Password"
                    value={password}
                    setValue={setPassword}
                    placeholder=""
                />
                <FormInputField
                    label="Confirm Password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    placeholder=""
                />
            </View>
            <FormButton title="Confirm" handlePress={() => "changed"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.whiteColor,
        paddingVertical: 56,
        paddingHorizontal: 18,
        gap: 12,
        // justifyContent: 'center',
    },
})