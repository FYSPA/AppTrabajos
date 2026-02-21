import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
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
        name="login"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={"account"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
