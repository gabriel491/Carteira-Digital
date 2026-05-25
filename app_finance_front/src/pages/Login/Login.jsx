import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    // LIMPEZA: Remove espaços em branco nas pontas e quebras de linha/caracteres ocultos
    const cleanEmail = email.trim().replace(/[\n\r\t]/g, "");
    const cleanPassword = password.trim().replace(/[\n\r\t]/g, "");

    try {
      // Faz o disparo real para a rota de login do backend
      // Agora enviamos as strings 100% limpas para o backend
      const response = await api.post("/auth/login", {
        email: cleanEmail,
        password: cleanPassword,
      });

      // Desestruturamos a resposta para pegar o token e os dados do usuário que o backend retornou
      const { token, user } = response.data;

      // Salva o token e os dados do usuário no LocalStorage do navegador para manter a sessão ativa
      localStorage.setItem("@FinanceApp:token", token);
      localStorage.setItem("@FinanceApp:userId", user.id || user._id); // Dependendo de como o backend retorna o ID, pode ser 'id' ou '_id'
      localStorage.setItem("@FinanceApp:userName", user.firstName);

      alert(`Bem vindo de Volta, ${user.firstName}! 🚀`);

      // Redirecionar para a página de dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      const errorMsg =
        error.response?.data?.message || "Erro ao conectar com o servidor.";
      alert("Ops! " + errorMsg);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔐 Acessar Finanças</h1>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>

        <p className="auth-redirect">
          Não tem uma conta? <Link to="/register" style={{ color: "#3498db", fontWeight: "bold", textDecoration: "none" }}>Cadastre-se aqui</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
