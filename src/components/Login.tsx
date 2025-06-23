import { useState } from "react";
import { saveToken } from "../utils/auth";
import api from "../utils/api";
import axios from "axios";

interface LoginProps {
  onLoginSuccess: () => void;
}

interface LoginResponse {
  accessToken : string;
  expiresIn: number;
  [key: string]: unknown; // Otros posibles campos
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        username: username.trim(),
        password: password.trim(),
        expiresInMins: 30,
      });

      console.log("Respuesta completa:", response.data); // 💡 IMPORTANTE

      const { accessToken  } = response.data;
      saveToken(accessToken );
      onLoginSuccess();
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;

    if (status === 400) {
      setError("Usuario o contraseña incorrectos.");
    } else {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
    }

    console.error("Error del servidor:", err.response?.data);
  } else {
    console.error("Error desconocido:", err);
    setError("Error desconocido. Intenta más tarde.");
  }
}

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?auto=format&fit=crop&w=667&q=80')",
          }}
        />
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            AgroTech
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de usuario
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
                type="text"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contraseña
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
                type="password"
                required
              />
            </div>

            {error && (
              <div className="mt-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Iniciar
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <a href="#" className="text-xs text-gray-500 uppercase">
              Registrarse
            </a>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
