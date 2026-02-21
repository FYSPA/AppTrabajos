import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleLogin = () => {
  const [token, setToken] = useState<string | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI,

    scopes: [
      "https://www.googleapis.com/auth/classroom.courses.readonly",
      "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
      "https://www.googleapis.com/auth/classroom.rosters.readonly",
    ],
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      console.log("LOGIN EXITOSO! Token:", response.authentication.accessToken);
      setToken(response.authentication.accessToken);
    } else if (response?.type === "error") {
      console.error("Error en Login:", response.error);
      console.log("Error Auth:", response.error);
    }
  }, [response]);

  const login = () => {
    promptAsync({
      url: process.env.REDIRECT_URI,
    });
  };

  return { token, request, promptAsync: login };
};
