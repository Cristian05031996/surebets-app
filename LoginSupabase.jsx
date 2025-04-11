import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function LoginSupabase() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    if (error) alert(error.message);
    else setUser(data.user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {user ? (
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">Olá, {user.email}</p>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
            Sair
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Entrar com Supabase</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Login
          </button>
        </div>
      )}
    </div>
  );
}
