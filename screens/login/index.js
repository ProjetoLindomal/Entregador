import { View, Text, TouchableOpacity, Image } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import CustomButton from "../../assets/components/customButton";
import PasswordCases from "../../assets/components/passwordcases";
import FormGenerator from "../../assets/components/formGenerator";


import { collection, query, where, getDocs } from "firebase/firestore";
import getDB from "../../assets/services/getDB";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { userAuth } from "../../assets/services/getDB";


function Login({ navigation }) {
    const [dados, setDados] = useState({
        username: "adm@senha123.adm",
        password: "senha123",
    })
    const [errors, setErrors] = useState({
    })
    
const isDeliveryMan = async () => {
    const db = await getDB();

    // const q = query(collection(db, "cities"), where("capital", "==", true));
    const q = query(collection(db, "Users"), where("email", "==", dados.username));
    const listaAuxiliar = [];
    var result
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(snapshot => {
        result = snapshot.data();
        return
    })
    
    return result.deliveryman
}
  
    const doLogin = async () => {
        const auth = getAuth();
        // const auth = userAuth;
        signInWithEmailAndPassword(auth, dados.username, dados.password)
            .then(async(userCredential) => {
                // Signed in 
                
                if (await isDeliveryMan()) {
                    const user = userCredential.user;
                    navigation.navigate('NavD')
                }else{
                    alert("Voce não tem permissao para acessar")
                }
            })
            .catch((error) => {
                alert('erro');
                alert(error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <View className='bg-white flex-1 h-screen justify-center grid grid-rows-2 gap-8'>
            <View className="w-full flex-[0.4] items-center justify-end ">
                <Image className="w-[170px] h-[160px]" source={require("../../assets/imagens/entregadorq.png")} />
                <Text className="text-purple-bright text-[22px]">
                    Welcome back
                </Text>

            </View>
            <View className="flex justify-evenly flex-[0.8] items-center bg-purple-bright rounded-t-2xl">
                <View className="flex h-[350px]  w-[90%]">
                    <FormGenerator
                        buttonName={"Login"}
                        // submitAction={() => navigation.navigate("mainMenu")}
                        submitAction={() => doLogin()}
                        dados={dados}
                        errors={errors}
                        setErrors={setErrors}
                        setDados={setDados} info={[
                            { name: "username", placeholder: "", req: true, specificValidator: (value) => { return undefined } },
                            { name: "password", placeholder: "", isPassword: true, description: <PasswordCases />, req: true },
                        ]} />

                    <Text className='text-white'>{dados.user}</Text>
                    {/* <CustomButton/> */}
                </View>
                <View className="items-center">
                    <TouchableOpacity onPress={() => { navigation.navigate("Cadastro") }}>
                        <Text className="text-[#EACEF6]">
                            {"Don't have an account yet?"}
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-[#FF48E2]">
                        {"Sign up"}
                    </Text>
                </View>
            </View>

        </View>
    );
}

export default Login;