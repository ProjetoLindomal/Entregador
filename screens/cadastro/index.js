import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
// import CampoInput from "../../assets/components/textinput"
// import CustomButton from "../../assets/components/custombutton";
import { useState } from "react";
import FormGenerator from "../../assets/components/formGenerator";
import PasswordCases from "../../assets/components/passwordcases";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import getDB from "../../assets/services/getDB";
// import CustomButton from "../../assets/components/customButton";


function Cadastro({ navigation }) {
    const [caso, setCaso] = useState(0)
    const [text, setText] = useState("Create your account")

    const [dados, setDados] = useState({
        deliveryman:true,
        username: "",
        password: "",
        name: "",
        email: "",
        date_of_birthday: "",
        cep: "",
        road: "",
        neighborhood: "",
        complement: "",
        password: "",
        confirm_password: ""

    })
    const [errors, setErrors] = useState({
    })
    function verificarSenha() {
        if (dados.password == dados.confirm_password) {
            createUser()
            
        }
        else {
            Alert.alert("Different")
        }
    }
    const switchCase = () => {
        switch (caso) {
            case 0:
                return <FormGenerator
                    errors={errors}
                    setErrors={setErrors}
                    buttonName={"Next"}
                    // submitAction={() => navigation.navigate("mainMenu")}
                    submitAction={() => { setCaso(1); setText("your address") }}
                    dados={dados}
                    setDados={setDados} info={[
                        { name: "name", placeholder: "", req: true },
                        { name: "email", placeholder: "", req: true },
                        { name: "date_of_birthday", placeholder: "", req: true },
                    ]} />
            case 1:
                return <FormGenerator
                    errors={errors}
                    setErrors={setErrors}
                    buttonName={"Next"}
                    // submitAction={() => navigation.navigate("mainMenu")}
                    submitAction={() => { setCaso(2); setText("Create your password") }}
                    dados={dados}
                    secondButtonFunction={() => { setCaso(0) }}
                    secondButtonName={"Previous"}
                    setDados={setDados} info={[
                        { name: "cep", placeholder: "Enter your cep", req: true },
                        { name: "road", placeholder: "Enter your road", req: true },
                        { name: "neighborhood", placeholder: "Enter your neighborhood", req: true },
                        { name: "complement", placeholder: "Enter your complement", req: true },
                    ]} />
            case 2:
                return <FormGenerator
                    errors={errors}
                    setErrors={setErrors}
                    buttonName={"Finish"}
                    secondButtonFunction={() => { setCaso(1) }}
                    secondButtonName={"Previous"}
                    // submitAction={() => navigation.navigate("mainMenu")}
                    submitAction={() => verificarSenha()}
                    dados={dados}
                    setDados={setDados} info={[
                        { name: "password", placeholder: "Enter your password", req: true },
                        { name: "confirm_password", placeholder: "Enter your password again", req: true },
                    ]} />
        }
    }

    const createUser = async () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, dados.email, dados.password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const db = await getDB();

                console.log("creating user...");
                addDoc(collection(db, "Users"), dados)
                    .then(() => {
                        alert("user created successifully")
                        navigation.navigate("Login")
                    })
                    .catch(() => {
                        alert("OOops :/")
                    })
                console.log("finished");




            })
            .catch((error) => {
                alert('erro');
                alert(error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <View className='bg-purple-bright flex-1 h-screen justify-center grid grid-rows-2 gap-8'>
            <View className="w-full  items-center justify-end ">
                <Text className="text-white text-[22px]">
                    {text}
                </Text>
            </View>
            <View className="flex justify-evenly items-center">
                <View className="flex w-[90%]">
                    {switchCase()}
                    <Text className='text-white'>{dados.user}</Text>
                </View>
                <View>
                    <Text className='text-white'>{caso + 1}/3</Text>
                </View>
                <View className={caso != 0 ? ` hidden ` : `  ` + ` flex justify-center items-center pt-8`}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                        <Text className="text-[#EACEF6]">
                            {"Do you have an account?"}
                        </Text>
                        <Text className="text-[#FF48E2]">
                            {"Sign up"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

export default Cadastro;