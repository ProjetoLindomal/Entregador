import { View, Text, TouchableOpacity,  TextInput} from "react-native"; 

const CaixaInput = ({onChangeText, title, placeholder, type, value, isPassword}) => {
    const transform = (par)=>{
        return (par.charAt(0).toUpperCase() + par.slice(1)).replace(/_/g," ")
    }

    title = transform(title)
    placeholder = transform(placeholder)

    return (
        <View className="w-[100%]">
            <Text className="text-white font-semibold pb-2">{title}</Text> 
            <TextInput 
                className="p-3 rounded-lg text-white border border-pink-700" 
                value={value} 
                keyboardType={type != undefined? type : "default"} 
                secureTextEntry={isPassword == undefined? false : isPassword} 
                onChangeText={onChangeText} 
                placeholder={placeholder}
                placeholderTextColor={"#a9a9a9"} 
                
                >
            </TextInput>
        </View>
    );
}

export default CaixaInput;