const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Chave secreta para assinar o token JWT
const JWT_SECRET = process.env.JWT_SECRET

// REGISTRO DE NOVO USUÁRIO (POST /auth/register)
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        // Verifica se o usuário já existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Usuário já cadastrado." });
        } 

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Criamos o usuário no banco de dados com a senha criptografada
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Usuário cadastrado com sucesso.", user: newUser });
    } catch (error) {
        console.error("Erro interno no registro:", error); 
        res.status(400).json({ message: "Erro ao registrar usuário.", error: error.message });
    }
};

// LOGIN DO USUÁRIO (POST /auth/login)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busca o usuário pelo email
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: "E-mail ou senha incorretos." });
        }

        // Compara a senha digitada com a senha criptografada do banco
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "E-mail ou senha incorretos." });
        }

        // Cria um token JWT com o ID do usuário
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
        
        // Retorna o token e os dados essenciais do usuário para o frontend
        res.status(200).json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao fazer login.", error: error.message });
    }
};

module.exports = { register, login };