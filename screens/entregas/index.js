import { Text, View, Image, TouchableOpacity } from "react-native";
import getDB from "../../assets/services/getDB";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

function Entregas() {
    const [game, setGame] = useState({ "uid": "default", "data": { "ext": "png", "name": "Loading...", "price": 0.00 } })
    const [carrinho, setCarrinho] = useState([game])

    const [pedidos, setPedidos] = useState([{ "id": "default", "data": { "dataHora": Date.now(), "produtos": carrinho, "user": "default","isDelivered":false } }])

    const getDatabase = async () => {
        console.log("produto inicializing...");
        const db = await getDB();
        // console.log(uid)
        // const q = query(collection(db, "cities"), where("capital", "==", true));
        const q = query(collection(db, "Compras"));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        var lista = []
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            const item = {
                "id": doc.id,
                "data": doc.data()
            }
            if (!doc.data().isDelivered){
                lista.push(item);
            }
            //   const item = {
            //     "id": doc.id,
            //     "data": doc.data()
            //   }
            //   setGame((anteriores) => [...anteriores, item])
        });
        setPedidos(lista)


        // console.log(game);
        console.log("produto finished");

    }
    const AlterarStatusFirebase = async() =>{
        const db = await getDB();

        

        pedidos.forEach((item) =>{
            console.log("iniciou");
            let userRef = doc(db, 'Compras', item.id);
            console.log("pegou");
            let newData = {
                isDelivered: item.data.isDelivered
            }
            console.log("updating...");
            updateDoc(userRef, newData)
                .then(()=>{
                    alert("itens atualizados")
                    getDatabase()
                })
                .catch(()=>{
                    alert("OOops :/")
                })
            console.log("finished");
            
            
        })

    }
    
    const alterDelivered = (pedidoId) => {
        var lista = []
        pedidos.forEach((item) => {
            if (item.id == pedidoId) {
                item.data.isDelivered = !item.data.isDelivered
            }
            lista.push(item)
        })
        setPedidos(lista)
        // setPedidos(...pedidos, pedidos[pedidoId].data.isDelivered = !pedidos[pedidoId].data.isDelivered);
    }

    useFocusEffect(
        useCallback(()=>{getDatabase()},[])
    )

    return (
        <View className="h-screen  bg-white flex items-center">
            <View className="space-y-8">
                <View className="mt-16 flex items-center w-[90%] space-y-4">
                    <Text className='text-black text-xl'>
                        Entrega Pendente!
                    </Text>
                    <Text className="text-gray-700 text-base">
                        Há uma entrega aguardando sua atenção. Confira os detalhes no app e siga para a próxima missão!
                    </Text>
                </View>
                <View className='flex flex-col space-y-4 '>
                    {pedidos.map((pedido) =>
                        <View key={pedido.id} className="flex flex-row space-x-5 border-b-2 border-gray-200 p-2">
                            <View>
                                <Image className="" source={require("../../assets/imagens/caminhao.png")} />
                            </View>
                            <View>
                                <Text className='text-black'>Cliente: {pedido.data.user}</Text>
                                <Text className='text-black'>Data e hora: {pedido.data.dataHora}</Text>
                            </View>
                            <TouchableOpacity onPress={() => alterDelivered(pedido.id)} style={{ backgroundColor: pedido.data.isDelivered ? "green" : "white" }} className='h-4 w-4 rounded border'></TouchableOpacity>
                        </View>
                    )}
                </View>
                <TouchableOpacity className='bg-green-600 p-3 px-6 rounded' onPress={() => AlterarStatusFirebase()} ><Text className='text-lg text-white'>Salvar</Text></TouchableOpacity>

                {/* <View className="flex items-center">
                    <Text className='text-black text-xl'>
                        Entrega concluida!
                    </Text>
                    <Text className="text-gray-700">
                        Parabéns! Você entregou com sucesso o pedido
                    </Text>
                </View> */}
            </View>
        </View >
    );
}

export default Entregas