import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Register.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => { 
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    // Limpeza de caracteres invisíveis e espaços
    const cleanFirstName = firstName.trim().replace(/[\n\r\t]/g, "");
    const cleanLastName = lastName.trim().replace(/[\n\r\t]/g, "");
    const cleanEmail = email.trim().replace(/[\n\r\t]/g, "");
    const cleanPassword = password.trim().replace(/[\n\r\t]/g, "");

    try {
      // Faz o disparo real para a rota de registro do backend
      const response = await api.post("/auth/register", {
        // Enviamos as strings 100% limpas para o backend
        firstName: cleanFirstName,
        lastName: cleanLastName,
        email: cleanEmail,
        password: cleanPassword,
      });
    alert(response.data.message || `Conta criada com sucesso! 🎉`);

      // Redirecionar para a página de dashboard
      navigate("/");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      const errorMsg = error.response?.data?.message || "Erro ao conectar com o servidor.";
      alert("Ops! " + errorMsg);
    }
  };



  return (
    <div className="register-container">
      <div className="register-card">
        <h1>📝 Criar Nova Conta</h1>

        <form onSubmit={handleRegister}>
          <div className="form-group-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="Seu nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Seu sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

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

          <button type="submit">Cadastrar</button>
        </form>

        <p className="auth-redirect">
          já tem uma conta? <Link to="/">Faça Login Aqui</Link>
        </p>
      </div>
    </div>
  );
}
export default Register;
