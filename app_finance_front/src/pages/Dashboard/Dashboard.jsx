import { useState, useEffect } from "react";
import api from "../../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const userId = "69f787be262a30b969e5d54e"; // Seu ID do MongoDB

  // Estados para capturar os dados do formulário
  const [itemName, setItemName] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // Função para buscar despesas
  const fetchExpenses = async () => {
    try {
      const response = await api.get(`/expenses/${userId}`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Erro ao buscar despesas do backend:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchExpenses();
    };
    loadData();
  }, []);

  // Função para enviar a nova despesa ao Backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    if (!itemName || !value || !category) {
      alert(
        "Por favor, preencha os campos obrigatórios (Item, Valor e Categoria)!",
      );
      return;
    }

    try {
      // Monta o objeto exatamente como o seu expenseSchema espera
      const newExpenseData = {
        user: userId,
        itemName,
        value: Number(value),
        category,
        description,
      };

      // Faz o disparo POST para a rota que testamos no Insomnia
      await api.post("/expenses", newExpenseData);

      // Limpa os campos do formulário após o sucesso
      setItemName("");
      setValue("");
      setCategory("");
      setDescription("");

      // Atualiza a lista na tela chamando o GET novamente
      await fetchExpenses();
      alert("Despesa cadastrada com sucesso! 🎉");
    } catch (error) {
      console.error("Erro ao cadastrar despesa:", error);
      alert("Erro ao cadastrar despesa no banco de dados.");
    }
  };

  // Função para deletar uma despesa
  const handleDelete = async (expenseId) => {
    // Uma confirmação nativa do navegador para o usuário não deletar sem querer
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta despesa?.",
    );
    if (!confirmDelete) return;

    try {
      // Faz o disparo DELETE para a rota do backend
      await api.delete(`/expenses/${expenseId}`);

      // chamamos o GET novamente para atualizar a lista na tela
      await fetchExpenses();
      alert("Despesa excluída com sucesso! 🗑️");
    } catch (error) {
      console.log("Erro ao deletar despesa: ", +error);
      alert("Erro ao excluir despesa.");
    }
  };

  // Função para Atualizar o status de pagamento da despesa
  const handleTogglePaid = async (expenseId, currentStatus) => {
    try {
      // inverter o status atual
      const upadateStatus = { isPaid: !currentStatus };

      // Faz o disoparo PATCH para a rota do backend
      await api.patch(`expenses/${expenseId}`, upadateStatus);

      // chamamos o GET novamente para atualizar a lista na tela
      await fetchExpenses();
    } catch (error) {
      console.log("Erro ao atualizar status da despesa: ", +error);
      alert("Não foi possível atualizar o status de pagamento.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Meu Dashboard de Despesas</h1>

      <div className="dashboard-grid">
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="expense-form">
          <h2>Nova Despesa</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nome do Item (Ex: Netflix) *"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              step="0.01"
              placeholder="Valor (R$) *"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="form-group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione uma Categoria *</option>
              <option value="Lazer">Lazer</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className="form-group">
            <textarea
              placeholder="Descrição (Opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">Adicionar Despesa</button>
        </form>

        {/* Listagem */}
        <div className="expense-list">
          <h2 className="dashboard-title">Suas Despesas Cadastradas:</h2>
          {expenses.length === 0 ? (
            <p>Nenhuma despesa encontrada para este usuário.</p>
          ) : (
            <ul>
              {expenses.map((expense) => (
                <li key={expense._id} className="expense-item">
                  <div>
                    <p className="expense-name">
                      <strong>{expense.itemName}</strong> - R${" "}
                      {expense.value.toFixed(2)}
                    </p>
                    <div>
                      <span className="category-tag">
                        🏷️ {expense.category}
                      </span>
                    </div>
                    {expense.description && (
                      <p className="desc">{expense.description}</p>
                    )}
                  </div>

                  <span className={expense.isPaid ? "paid" : "pending"}>
                    {expense.isPaid ? "✅ Paga" : "⏳ Pendente"}
                  </span>

                  <div className="expense-actions">
                    <button
                      className="status-btn"
                      onClick={() =>
                        handleTogglePaid(expense._id, expense.isPaid)
                      }
                    >
                      {expense.isPaid ? "↩️ Desmarcar" : "💰 Marcar como Paga"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(expense._id)}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
