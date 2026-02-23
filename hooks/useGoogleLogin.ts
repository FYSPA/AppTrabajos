import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleLogin = () => {
  const { token, setToken } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,

    scopes: [
      "https://www.googleapis.com/auth/classroom.courses.readonly",
      "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
      "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
      "https://www.googleapis.com/auth/classroom.rosters.readonly",
      "https://www.googleapis.com/auth/classroom.student-submissions.students.readonly",
      "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly",
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
    promptAsync();
  };

  return { token, request, promptAsync: login };
};
