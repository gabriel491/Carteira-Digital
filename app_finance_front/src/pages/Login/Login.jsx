import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Função que nos joga para outra tela

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email && password) {
      // No futuro, aqui faremos o api.post("/login") para o backend
      alert("Login efetuado! Redirecionando...");
      
      // Navega programaticamente para a tela de dashboard
      navigate("/dashboard");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔐 Acessar Finanças</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
export default Login;