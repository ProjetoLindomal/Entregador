import { View, Text } from "react-native";
import { Header } from "react-native-elements";
import { Icon } from "react-native-elements";

export const HeaderPersonalizado = () => {
    return (
        <Header
            backgroundColor="#27053C"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'gameXperience', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            containerStyle={{ height: 90 }}
        />
    )
}