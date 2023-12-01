
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import Home from './screens/home';
import Login from './screens/login';
import Cadastro from './screens/cadastro';
import UserProfile from './screens/userprofile';
import Entregas from './screens/entregas';
import Entregues from './screens/entregues';

const Nav = createBottomTabNavigator();
const Pilha = createNativeStackNavigator()

function NavBarD() {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#4D166F',
          borderTopColor: 'transparent',
          paddingVertical: 1,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white'
      }}
    >
      <Pilha.Screen
        name="Delivery"
        component={Entregas}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="truck" size={size} color={color} />
          )
        }}
      />
      <Pilha.Screen
        name="Delivered"
        component={Entregues}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="check" size={size} color={color} />
          )
        }}
      />

    </Nav.Navigator>
  )
}



function Routers() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Nav.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Nav.Screen options={{ headerShown: false }} name="NavD" component={NavBarD} />
        <Nav.Screen options={{ headerShown: false }} name="Entrega" component={Entregas} />

        <Nav.Screen options={{ headerShown: false }} name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routers;