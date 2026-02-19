import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Ocultamos el header del Tab para que no estorbe */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* --- AGREGA ESTA LÍNEA --- */}
      {/* Esto le dice: "La carpeta one_partial tiene su propio header, no le pongas otro encima" */}
      <Stack.Screen name="one_partial" options={{ headerShown: false }} />

      {/* Tus otras pantallas */}
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}