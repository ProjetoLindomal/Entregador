import { withExpoSnack } from 'nativewind'
import Routers from './routers';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  
  return(
    
    <Routers/>
  );
  // const [lista, setLista] = useState(["a", "b"])
  // const [userName, setUserName] = useState("ab")
  // // useEffect(() => {
  // //   db.transaction((tx) => {
  // //     tx.executeSql('CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY, name TEXT)')
  // //   });
  // //   alert('working')
  // //   db.transaction((tx) => {
  // //     tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
  // //       var temp = [];
  // //       for (let i = 0; i < results.rows.length; ++i)
  // //         temp.push(results.rows.item(i));
  // //         setLista(temp);
  // //     });
  // //   });
  // // }, []);
  // // const registerUser = () =>{
  // //   db.transaction((tx) => {
  // //     tx.executeSql(
  // //       'INSERT INTO table_user (user_name) VALUES (?)',
  // //       [userName],
  // //       (tx, results) => {
  // //         alert("aaaa")
  // //         console.log('Results', results.rowsAffected);
  // //         if (results.rowsAffected > 0) {
  // //           Alert.alert(
  // //             'Success',
  // //             'You are Registered Successfully',
  // //             [
  // //               {
  // //                 text: 'Ok',
  // //                 onPress: () => navigation.navigate('HomeScreen'),
  // //               },
  // //             ],
  // //             {cancelable: false},
  // //           );
  // //         } else Alert.alert('Registration Failed');
  // //       },
  // //     );
  // //   });
  // // }
  // return (
  //   <View style={styles.container}>
  //     <Text >Open up App.js to start working on your app!</Text>
  //     <TextInput value={userName} onChange={(e)=>setUserName(e.nativeEvent.text)} style={{backgroundColor:"#acb", width:200, height:50}}/>
  //     {/* <Button title='Add' onPress={()=>registerUser()}/> */}
  //     {lista.map((item, index)=>
  //       <View key={index}><Text>{item}</Text></View>
  //     )}
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}
;