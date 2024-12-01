import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { theme } from "../../theme";
import { fontStyles } from '../../fonts';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';

type props = {
    appName: string,
    onPress: () => void,
}

export default function ApplicationNavigationComponent({ appName, onPress }: props) {

    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.card}
            >
            {appName === "Passport"? 
                <Fontisto name="passport-alt" size={34} color={theme.primaryBlue} />
            :appName === "National ID"? 
                <AntDesign name="idcard" size={34} color={theme.primaryBlue} />
                : <FontAwesome name="drivers-license" size={34} color={theme.primaryBlue} />
            }
            <Text style={[fontStyles.baseStyle, fontStyles.tablabels]}>{appName}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex:1,
        alignItems:'center',
        gap: 12,
        borderRadius: 6,
        height: 62,
    },
  });