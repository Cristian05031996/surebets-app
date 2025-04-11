import { useEffect, useState } from "react";
import { buscarConfiguracoes, salvarConfiguracoes } from "./UserStorageSupabase";
import { supabase } from "./supabaseClient";

export default function PainelUsuario() {
  const [user, setUser] = useState(null);
  const [config, setConfig] = useState({ tema: "claro", idioma: "pt", som: true });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        carregarConfig(data.session.user.id);
      }
    });
  }, []);

  async function carregarConfig(userId) {
    const cfg = await buscarConfiguracoes(userId);
    setConfig({ ...config, ...cfg });
  }

  async function salvar() {
    if (!user) return;
    await salvarConfiguracoes(user.id, config);
    alert("Configurações salvas com sucesso!");
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Painel do Usuário</h1>

      <div>
        <label className="block font-medium">Tema</label>
        <select
          value={config.tema}
          onChange={(e) => setConfig({ ...config, tema: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="claro">Claro</option>
          <option value="escuro">Escuro</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Idioma</label>
        <select
          value={config.idioma}
          onChange={(e) => setConfig({ ...config, idioma: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={config.som}
          onChange={(e) => setConfig({ ...config, som: e.target.checked })}
        />
        <label>Ativar som de notificação</label>
      </div>

      <button onClick={salvar} className="bg-green-600 text-white px-4 py-2 rounded">
        Salvar Configurações
      </button>
    </div>
  );
}
