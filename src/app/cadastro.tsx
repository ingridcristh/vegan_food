import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      await AsyncStorage.setItem("logado", "true");
      router.replace("/"); // Redireciona para a tela principal
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Bem-Vindo de Volta!</Text>

      {/* Campo de Email */}
      <View className="w-full mb-4 border rounded-lg flex-row items-center px-3 py-3">
        <TextInput 
          placeholder="E-mail" 
          className="flex-1 text-base" 
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Campo de Senha */}
      <View className="w-full mb-4 border rounded-lg flex-row items-center px-3 py-3">
        <TextInput 
          placeholder="Senha" 
          className="flex-1 text-base"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text>{showPassword ? "🚫" : "👁"}</Text>
        </TouchableOpacity>
      </View>

      {/* Opção "Manter conectado" e "Não possui conta?" */}
      <View className="w-full flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} className="flex-row items-center">
          <View className={`w-5 h-5 border ${rememberMe ? "bg-green-700" : "bg-white"}`} />
          <Text className="ml-2">Manter conectado</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-blue-500">Não possui conta?</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Entrar */}
      <TouchableOpacity className="bg-green-700 p-4 rounded-full w-full" onPress={handleLogin}>
        <Text className="text-white text-center text-lg font-bold">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
