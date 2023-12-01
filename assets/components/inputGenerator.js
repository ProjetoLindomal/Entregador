import { View, Text, Alert } from "react-native";
import CaixaInput from "./caixaInput";
import { forwardRef, useImperativeHandle } from "react";

function InputGenerator({ dados, setDados, info, errors, setErrors }, ref) {
    const transform = (par)=>{
        return (par.charAt(0).toUpperCase() + par.slice(1)).replace(/_/g," ")
    }

    useImperativeHandle(ref, () =>({
        validate(){
            var error = {}
            info.map((item) =>{
                // msg =
                // console.log(`item: ${item.name}, erro: ${errors[item.name]}, msg: ${msg}`);
                error[item.name] = validators(item, dados[item.name])
            })
            setErrors(error)
            return error
        }
    }));
    const validators = (field, value) => {
        let name = transform(field.name)
        if (field?.req && value.toString() == "") {
            return name + " is required";
        }
        if (field?.min != null && value.toString().length < field.min || field?.max != null && value.toString().length > field.max) {
            if (field.max == field.min) {
                return name + " must contain " + field.max + " letters";
            }
            else if (field.max != null) {
                return name + " can't contain more than " + field.max + " letters";
            }
            else if (field.min != null && field.max == null) {
                return name + " must contain at least " + field.min + " letters";
            }
            else {
                return name + " must be between " + field.min + " and " + field.max;
            }
        }
        var msg = undefined
        if (field?.specificValidator != null) {
            msg = field.specificValidator(value)?.valueOf();
            // if (msg != undefined || msg != "") {
            //     return msg
            // }
        }
        return msg
    }

    return (
        <View className="w-[100%] ">
            {info.map((item) =>
                <View key={item.name}className='pb-3'>
                    <CaixaInput
                        title={item.name}
                        value={dados[item.name]}
                        placeholder={item.placeholder != undefined ? item.placeholder : item.name}
                        isPassword={item.isPassword}
                        onChangeText={(e) =>{ setErrors({...errors, [item.name]: validators(item, e)});setDados({ ...dados, [item.name]: e }) } }
                    />
                    <View className={errors[item.name] == undefined ? "hidden":`block`}>
                    <Text className="text-red-400">
                        *{errors[item.name]}
                    </Text>
                    </View>
                    {item.description}

                </View>
            )}
        </View>
    );
}

export default forwardRef(InputGenerator);