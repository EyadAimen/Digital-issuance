import { theme } from "./theme"
import { TextStyle } from "react-native";

export const fontStyles: { [key: string]: TextStyle } = {
    baseStyle: {
        color: theme.blackText,
        // fontFamily: 'Roboto'
    },
    mainHeading : {
        fontSize: 32,
        fontWeight: "bold",
    },
    sectionHeading : {
        fontSize: 24,
        fontWeight: "bold",
    },
    subHeading : {
        fontSize: 18,
        fontWeight: "bold",
    },
    body : {
        fontSize: 16,
        fontWeight: "normal",
    },
    buttonLabels : {
        fontSize: 16,
        fontWeight: "bold",
    },
    tabLabels : {
        fontSize: 12,
        fontWeight: "normal",
    },
}

 
