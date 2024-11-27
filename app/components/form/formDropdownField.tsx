import { Text, View, StyleSheet, TextInput } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { theme } from "../../../theme";
import { useState } from "react";

type formDropdownProps = {
    value: string | undefined,
    filter: boolean | undefined,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>
    error?: string
}

export function FormDropdownField({value, filter, setValue, error}: formDropdownProps){
    const [isFocus, setIsFocus] = useState(false);
    const collectionOffices = [
      { name: "ALOR SETAR", isAbroad: false },
      { name: "CHISEL STONE", isAbroad: false },
      { name: "BESUT", isAbroad: false },
      { name: "BINTULU", isAbroad: false },
      { name: "CAMERON HIGHLAND", isAbroad: false },
      { name: "IPOH", isAbroad: false },
      { name: "JIM KUALA KUBU BHARU", isAbroad: false },
      { name: "KAJANG", isAbroad: false },
      { name: "KANGAR", isAbroad: false },
      { name: "KEMAMAN", isAbroad: false },
      { name: "KDN LANGKAWI COMPLEX", isAbroad: false },
      { name: "KOTA KINABALU", isAbroad: false },
      { name: "KUALA LANGAT", isAbroad: false }
    ];
  
    const collectionOfficesAbroad = [
      { name: "IMMIGRATION ATTACHMENT", isAbroad: true },
      { name: "BEIJING", isAbroad: true },
      { name: "CANBERRA", isAbroad: true },
      { name: "CONSULATE GENERAL OF MALAYSIA-CHENNAI", isAbroad: true },
      { name: "HONG KONG", isAbroad: true },
      { name: "JAKARTA", isAbroad: true },
      { name: "CONSULATE GENERAL OF MALAYSIA - KUNMING", isAbroad: true },
      { name: "LONDON", isAbroad: true },
      { name: "MELBOURNE", isAbroad: true },
      { name: "NEW DELHI", isAbroad: true },
      { name: "NEW YORK", isAbroad: true },
      { name: "MALAYSIAN CONSULATE OFFICE-GUANGZHOU", isAbroad: true },
      { name: "PERTH", isAbroad: true },
      { name: "SHANGHAI", isAbroad: true },
      { name: "SINGAPORE", isAbroad: true }
    ];
    return (
        <View>
                <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }, error ? styles.inputError : null]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={!filter? collectionOffices: collectionOfficesAbroad}
                search={false}
                maxHeight={300}
                labelField="name"
                valueField="name"
                placeholder={!isFocus ? 'Select' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.name);
                    setIsFocus(false);
                }}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        color: theme.grey2Text,
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
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
      inputError: {
        borderColor: theme.failColor,
      },
      errorText: {
        color: theme.failColor,
        fontSize: 12,
        marginTop: -8,
        marginBottom: 8,
      }
})