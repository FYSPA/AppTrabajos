import { Stack } from "expo-router";

const context = require.context("./", false, /\.(js|jsx|ts|tsx)$/);

export default function PartialThreeLayout() {
    const dynamicScreens = context
        .keys()
        .filter((key) => !key.includes("_layout"))
        .map((key) => {
            const name = key.replace("./", "").replace(/\.(js|jsx|ts|tsx)$/, "");
            const module = context(key);

            const displayTitle = module.title || name.replace(/_/g, " ");

            return (
                <Stack.Screen
                    key={name}
                    name={name}
                    options={{ title: displayTitle }}
                />
            );
        });

    return (
        <Stack
            screenOptions={({ route }) => {
                const isPractica = route.name.startsWith("practica");
                const isActividad = route.name.startsWith("actividad");
                const isPorGusto = route.name.startsWith("por_gusto");

                return {
                    headerStyle: {
                        backgroundColor: isPractica ? "#4a90e2" : "#f39c12",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                    headerShown: true,
                };
            }}
        >
            {dynamicScreens}
        </Stack>
    );
}
