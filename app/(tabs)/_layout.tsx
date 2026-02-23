import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function TabLayout() {
  const { token } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0a7ea4",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="one_partial"
        options={{
          title: "Primer Parcial",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={"roman-numeral-1"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="two_partial"
        options={{
          title: "Segundo Parcial",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={"roman-numeral-2"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="three_partial"
        options={{
          title: "Tercer Parcial",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={"roman-numeral-3"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="classroom"
        options={{
          title: "Aula",
          // The href: null trick hides the tab when the user acts as unauthenticated.
          href: token ? "/classroom" : null,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={"school"} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: "Perfil",
          href: token ? null : "/login",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={"account"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
