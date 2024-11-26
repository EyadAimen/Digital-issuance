import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../theme';
import { fontStyles } from "../../../fonts";

type formRadioInputProps = {
    label: string,
    value: boolean | undefined,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
}

export function FormRadioInputField({label, value, setValue}: formRadioInputProps){
    return(
        <View style={styles.inputContianer}>
            <Text>{label}<Text style={{color:theme.failColor}}>*</Text></Text>
            <RadioButtonGroup
            containerStyle={styles.radioContainer}
            selected={value}
            onSelected={setValue}
            radioBackground={theme.primaryBlue}
            size={20}
            containerOptionStyle={styles.radioButton}
            >
            <RadioButtonItem 
                value={false}
                label= {
                <Text style={fontStyles.body}>In the Country</Text>
                }
            />
            <RadioButtonItem
                value={true}
                label={
                <Text style={fontStyles.body}>Abroad</Text>
                }
            />
            </RadioButtonGroup>
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
      radioContainer: {
        flexDirection: "row",
        gap: 16,
      },
      radioButton: {
        gap: 4,
        padding: 10,
      },
      dropdown: {
        borderColor: theme.grey2Text,
        borderWidth: 1,
        alignSelf: "stretch",
        padding: 10,
        fontSize: 16,
        marginBottom: 12,
        borderRadius: 6,
      },
})