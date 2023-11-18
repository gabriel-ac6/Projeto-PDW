const express = require('express');
const app = express();
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const crypto = require('crypto');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));


// Configuração do express-session
app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: true,
}));

// Configuração das credenciais diretamente no código (não é recomendado para produção)
const firebaseConfig = {
    apiKey: "AIzaSyAJqefvbRWEKo-xmkHEsT3N87ltToLBEp0",
    authDomain: "pdw5-2dc4f.firebaseapp.com",
    projectId: "pdw5-2dc4f",
    storageBucket: "pdw5-2dc4f.appspot.com",
    messagingSenderId: "1049028371781",
    appId: "1:1049028371781:web:b22ad5a332e200aac2ca2c",
    measurementId: "G-2L5P7147CG"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const serviceAccount = {
    type: "service_account",
    project_id: "pdw5-2dc4f",
    private_key_id: "d6c356718ee90a165fcd88a62b006771493cc56e",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJLIAIb6mJejs7\nix39HdxZRBXNriirqx41s9Mryw34p2DacH6B1+kXEjQfcJTIOPk6qPvrG+henviE\n/k7tF+kqONj2563+EljAT8O6geNUWoaH5A3igsHYBRymzbAhM9yOnwbrXFG2sS++\nqk4xQblPIoN10fQ8I4rQgGhTUlTOwthwU+UBjjQV6l9afgRUDbBPgVANClldPZ6L\n2w6fWw/g0dKrjNTWkj1Ra3VM0usx7hsUius8E5UrRQIIwLwCf/wcL9Sf3QweSWQi\nxZ1PJYcXUMOCvqet1k2udrpcW4y458Ec/TB/fLXkJUM5hcadc/T2dF1uZJKht9Gx\nYAAyqHynAgMBAAECggEAHGhmygoumCXFEIL0IKajU42sQIer4ZX/5Zh3pPL/DZJh\nOGdzTdWV6jadWqU0tVNqSlDLhidCOH5dXLZmoc9jEx3E8ZTEuqCPnNSGsKMf3W0N\nG0pmdYp+YglSwvE/wmiG6DLnsLuwJErAEb4N3aHIz7ZxduVHhmiEdS30zXNOW4Xj\nHPzEMQ/k6rD2gKiR7nghL7lMSAI+DOkFZ7sDn5fTOWHl0YO8JYUAamNfwDx2P6Kd\nGbsLfOpRMGRDFtnYigp23RZr6ThWPq0ufWSbUq8B6khHzBii/g/C66qUvyqECCc1\nU+//+xmxY5yeLjUwbcP8+MoROToDqdUinE7bKqWX7QKBgQDnHjDIxrmpD9u3KLER\no59xQdoCKcpg1w3gwbTaDn2e6wjOMWOC/LJgHp70IRpPrYM4ow+1sUlGrG5mzwTX\ncHzOdf+/dM7wkEJhs+TxX9Tx7fOpc4hHDKveOEsDJkJ6oFLdTOvepF924qTdssku\nE+OTa89aeyEKKq9rZH241sTpfQKBgQDe1QY2TmKTR0nAgZqkSxotMAY2kuP28XVm\nYkejoHC0xK5xP1mdDr8nwEwCfRVqJr5ECjbV/3mSUUQiq6KLILGsmn4eKxb5bt4w\ndgMFqbwzJXU4lo04dWIetClohPEbbWaxy6H0M+Qt42svdx//CnxuFCcCf+DLutox\nArjwMfk38wKBgCY8DmIIzkozv2uLpc9/PC9mb4SQGVTv/vHB2gOBBjM2Otyxuv6+\ng1v3dOB6YXnxAJZsE3tBexfgCtujP+/MQjl9t/OahWmy0+iJ9EQiUH49mWPdIxxt\n8jjvIynAOJtEzrChuxu4IbrvP8sVesbOr4WB/mm/mPWvnhmsJEhh722ZAoGAAjog\n0MQhyhUJUKo68G9ruI3lUgBP1PT+1mIfEyyUU8ovcCRQ8ffmwy/x0oiLgT8X4bg0\nahkeju7O/oW2nytZez8kCYsmtKF+CP/08caLgfta25DtomXR8Dqeu1Ow0TRbtWUy\nni0yl57RQG0xXawuKC99YFIE3iRk7952GLh3JC8CgYBGMARS4f7BydyTm5Rzw2Fh\nGJs2K+Ah2XAY2/ZebUDcxjA9sCwXfsuCGuISsNZhQJeRHl/HHOIEWJsAMbBxfggb\nXdNhef1j8AxVlbqImBb8A+cwUOQJUiOCv8hspekdBk0y+LRR8kuI7iCZUQoOGsJJ\nf9XxYdHFK3vfzupW1szaXQ==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-pj2qw@pdw5-2dc4f.iam.gserviceaccount.com",
    client_id: "104319911743706637600",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pj2qw%40pdw5-2dc4f.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
 const db = admin.firestore();

// Middleware para analisar o corpo das solicitações em formato JSON
app.use(bodyParser.json());

// Resto do seu código para as rotas e lógica de servidor aqui...

// Rota para cadastrar usuário

// Middleware para verificar se o usuário é um administrador autenticado
function verificarAutenticacaoAdmin(req, res, next) {
  if (req.session.logadoAdmin) {
      // O usuário já está autenticado como administrador
      next();
  } else {
      res.status(403).json({ error: 'Acesso negado. Você deve fazer login como administrador' });
  }
}

app.post('/cadastrar-admin', verificarAutenticacaoAdmin , async (req, res) => {
  try {
      const { Nome, Email, Senha, Status, Tipo } = req.body;

      // Obter a referência à coleção de usuários
      const usersCollection = admin.firestore().collection('usuarios');

      // Obter o último valor sequencial na coleção de usuários
      const lastUser = await usersCollection.orderBy('id', 'desc').limit(1).get();

      let novoId = 1; // Valor padrão se a coleção estiver vazia

      if (!lastUser.empty) {
          const ultimoUsuario = lastUser.docs[0].data();
          novoId = ultimoUsuario.id + 1;
      }

      // Criptografar a senha usando MD5 (não é uma prática segura)
      const senhaCriptografada = md5(Senha);

      // Adicionar informações adicionais ao usuário no Firestore com o novo ID
      await usersCollection.doc(Email).set({
          id: novoId,
          Nome,
          Email,
          Status,
          Tipo,
          Senha: senhaCriptografada // Armazenar a senha criptografada no Firestore (não é uma prática segura)
      });

      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o usuário' });
  }
});

  
  // Função para criptografar a senha usando MD5
  function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
  }



// Rota para cadastrar clientes
app.post('/cadastrar-cliente', async (req, res) => {
  try {
      const { Nome, Email, Senha, Status } = req.body;

      // Verificar se já existe um usuário com o mesmo email
      const userExists = await verificarUsuarioExistente(Email);

      if (userExists) {
          return res.status(400).json({ error: 'Já existe um usuário com este email.' });
      }

      // Gerar um novo ID sequencial
      const novoId = await gerarNovoIdCliente();

      // Criptografar a senha usando MD5 (não é uma prática segura)
      const senhaCriptografada = md5(Senha);

      // Adicionar informações ao cliente no Firestore
      await admin.firestore().collection('usuarios').doc(Email).set({
          id: novoId,
          Nome,
          Email,
          Status,
          Tipo: 'Cliente',
          Senha: senhaCriptografada // Armazenar a senha criptografada no Firestore (não é uma prática segura)
      });

      res.status(201).json({ message: 'Cliente cadastrado com sucesso' });
  } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o cliente' });
  }
});


  async function verificarUsuarioExistente(email) {
    const userDoc = await admin.firestore().collection('usuarios').doc(email).get();
    return userDoc.exists;
}

async function gerarNovoIdCliente() {
  const usersCollection = admin.firestore().collection('usuarios');
  const lastUser = await usersCollection.where('Tipo', '==', 'Cliente').orderBy('id', 'desc').limit(1).get();

  let novoId = 1; // Valor padrão se a coleção estiver vazia

  if (!lastUser.empty) {
      const ultimoCliente = lastUser.docs[0].data();
      novoId = ultimoCliente.id + 1;
  }

  return novoId;
}

  
// Rota para fazer login do usuário
app.post('/login', async (req, res) => {
  try {
      const { Email, Senha } = req.body;

      // Consulte o usuário pelo email no Firestore
      const userDoc = await admin.firestore().collection('usuarios').doc(Email).get();

      if (!userDoc.exists) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const userData = userDoc.data();

      // Verifique a senha (lembre-se de que a senha no banco de dados é MD5)
      const senhaCriptografada = md5(Senha);

      if (senhaCriptografada !== userData.Senha) {
          return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Verifique o tipo do usuário
      const tipoUsuario = userData.Tipo;

      console.log('Tipo de usuário:', tipoUsuario);

      if (tipoUsuario === 'admin') {
          return res.status(401).json({ error: 'Administradores não podem fazer login por esta rota' });
      }

      // Defina variáveis de sessão
      req.session.logado = true;
      req.session.emailUsuario = Email;
      req.session.tipoUsuario = tipoUsuario; // Defina o tipo do usuário na sessão
      console.log(req.session.emailUsuario);

      res.status(200).json({ message: 'Login bem-sucedido', tipoUsuario });
  } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao fazer login' });
  }
});

// Rota para fazer logout
app.post('/logout', (req, res) => {
  if (req.session.logado == true){
    req.session.destroy((err) => {
      if (err) {
          console.error('Erro ao fazer logout:', err);
          res.status(500).json({ error: 'Erro ao fazer logout' });
      } else {
          res.status(200).json({ message: 'Logout bem-sucedido' });
      }
  });
  }else{
    console.log("Usuário não fez login ainda");
    res.status(500).json({ error: 'Usuário não fez login aind' });
  }
});

// Rota para fazer login de administradores
app.post('/login-admin', async (req, res) => {
  try {
      const { Email, Senha } = req.body;

      // Consulte o usuário pelo email no Firestore
      const userDoc = await admin.firestore().collection('usuarios').doc(Email).get();

      if (!userDoc.exists) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const userData = userDoc.data();

      // Verifique a senha (lembre-se de que a senha no banco de dados é MD5)
      const senhaCriptografada = md5(Senha);

      if (senhaCriptografada !== userData.Senha) {
          return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Verifique o tipo do usuário
      const tipoUsuario = userData.Tipo;

      if (tipoUsuario !== 'admin') {
          return res.status(401).json({ error: 'Esta rota é apenas para administradores' });
      }
    req.session.id = userData.id;
    console.log(  req.session.id);
      // Defina variáveis de sessão para administrador
      req.session.logadoAdmin = true;
      req.session.emailAdmin = Email;

      res.status(200).json({ message: 'Login de administrador bem-sucedido' });
  } catch (error) {
      console.error('Erro ao fazer login de administrador:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao fazer login de administrador' });
  }
});

// Rota para procurar usuário
app.get('/procurar-usuario/:email', verificarAutenticacaoAdmin, async (req, res) => {
  try {
      const emailUsuario = req.params.email;

      // Consultar o Firestore para buscar o usuário pelo email
      const userRef = admin.firestore().collection('usuarios').doc(emailUsuario);
      const snapshot = await userRef.get();

      if (!snapshot.exists) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Retornar os dados do usuário em formato JSON
      const userData = snapshot.data();
      res.status(200).json(userData);
  } catch (error) {
      console.error('Erro ao procurar usuário:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao procurar o usuário' });
  }
});


// Middleware para verificar a autenticação e permissões de edição
function verificarAutenticacao(req, res, next) {
  const isAdmin = req.session.logadoAdmin;
  const isCliente = req.session.logado;

  if (!isAdmin && !isCliente) {
      return res.status(403).json({ error: 'Acesso negado. Você deve fazer login como administrador ou cliente para editar perfis.' });
  }

  next();
}

// Rota para editar usuário
app.put('/editar/:email', verificarAutenticacao, async (req, res) => {
  try {
      const email = req.params.email;
      const { Nome, Email, Senha} = req.body;

      // Verificar se o usuário está autorizado a editar este perfil
      const isAdmin = req.session.logadoAdmin;
      const isCliente = req.session.logado;

      // Verificar se o usuário que está editando é o mesmo que está autenticado, no caso de clientes
      if (!isAdmin && isCliente && email !== req.session.emailUsuario) {
          return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para editar este perfil.' });
      }

      // Dados que podem ser atualizados com base no tipo de usuário
      const dadosAtualizaveis = {
          Nome,
          Email,
      };

      // Se o usuário for um administrador, ele pode atualizar o campo "Tipo"
      if (isAdmin) {
          dadosAtualizaveis.Tipo = req.body.Tipo;
          dadosAtualizaveis.Status = req.body.Status;
      }

      // Se a senha estiver sendo atualizada, criptografe-a
      if (Senha) {
          dadosAtualizaveis.Senha = md5(Senha); // Criptografar a senha (não é uma prática segura)
      }

      // Atualizar informações do usuário no Firestore
      const userRef = admin.firestore().collection('usuarios').doc(req.session.emailUsuario);
      await userRef.update(dadosAtualizaveis);

      res.status(200).json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
      console.error('Erro ao editar perfil:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao editar o perfil' });
  }
});
  
// Middleware para verificar a autenticação e permissões de exclusão
function verificarAutenticacaoExclusao(req, res, next) {
  const isAdmin = req.session.logadoAdmin;
  const isCliente = req.session.logado;
  const emailLogado = req.session.emailUsuario; // Email do usuário autenticado

  // Verificar se o usuário está autenticado e com uma sessão ativa
  if (!isAdmin && !isCliente) {
      return res.status(403).json({ error: 'Acesso negado. Você deve fazer login como administrador ou cliente para excluir perfis.' });
  }

  // Verificar se o usuário que está excluindo é o mesmo que está autenticado, no caso de clientes
  if (!isAdmin && isCliente && req.params.email !== emailLogado) {
      return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para excluir este perfil.' });
  }

  next();
}

// Rota para excluir usuário
app.delete('/excluir/:email', verificarAutenticacaoExclusao, async (req, res) => {
  try {
      const emailUsuario = req.params.email;

      // Verificar se o usuário está autorizado a excluir este perfil
      const isAdmin = req.session.logadoAdmin;
      const isCliente = req.session.logado;
      const emailLogado = req.session.emailUsuario; // Email do usuário autenticado

      // Verificar se o usuário que está excluindo é o mesmo que está autenticado, no caso de clientes
      if (!isAdmin && isCliente && emailUsuario !== req.session.emailUsuario) {
          return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para excluir este perfil.' });
      }

      // Excluir o usuário do Firestore
      const userRef = admin.firestore().collection('usuarios').doc(emailUsuario);
      await userRef.delete();

      res.status(200).json({ message: 'Perfil excluído com sucesso' });
  } catch (error) {
      console.error('Erro ao excluir perfil:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao excluir o perfil' });
  }
});
  






































app.post('/items', async (req, res) => {
  if (req.session.logado) {
    try {
      const { id, title, author, category, price, description, status, publicationDate, periodicity, quantity } = req.body;

      var email = req.session.emailUsuario;

      // Consulte o usuário pelo email no Firestore
      const userDoc = await admin.firestore().collection('usuarios').doc(email).get();
      const userData = userDoc.data();

      const sellerId = userData.id;

      // Verificar se todos os campos obrigatórios estão presentes
      const requiredFields = ['id', 'title', 'author', 'category', 'price', 'description', 'status', 'publicationDate', 'periodicity', 'quantity'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({ message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` });
      }

      // Verificar se a categoria existe na coleção de categorias
      const categoryDoc = await admin.firestore().collection('categories').doc(category).get();
      if (!categoryDoc.exists) {
        return res.status(400).json({ message: 'Categoria não encontrada' });
      }

      const newItem = {
        id,
        title,
        author,
        category,
        price,
        description,
        status,
        publicationDate,
        periodicity,
        sellerId,
        quantity
      };

      await db.collection('items').doc(id).set(newItem);

      res.status(201).json({ message: 'Item adicionado com sucesso' });
    } catch (error) {
      console.error('Error adding item: ', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Se não estiver logado, retorne um erro de não autorizado
    res.status(401).json({ error: 'Não autorizado. Faça login para acessar este recurso.' });
  }
});

// GET /items - Listar todos os itens.
app.get('/items', async (req, res) => {
  if (req.session.logado || req.session.logadoAdmin) {
  try {
    const snapshot = await db.collection('items').get();
    const items = snapshot.docs.map(doc => doc.data());
    res.json(items);
  } catch (error) {
    console.error('Error getting items: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
else{
   // Se não estiver logado, retorne um erro de não autorizado
   res.status(401).json({ error: 'Não autorizado. Faça login para acessar este recurso.' });
}
});

// GET /items/{id} - Obter detalhes de um item específico.
app.get('/items/:id', async (req, res) => {
  if (req.session.logado || req.session.logadoAdmin) {
  try {
    const itemId = req.params.id;
    const itemRef = db.collection('items').doc(itemId);
    const item = await itemRef.get();

    if (item.exists) {
      res.json(item.data());
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error getting item: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
else{
  // Se não estiver logado, retorne um erro de não autorizado
  res.status(401).json({ error: 'Não autorizado. Faça login para acessar este recurso.' });
}
});

// PUT /items/{id} - Editar um item.
app.put('/items/:id', async (req, res) => {
  if (req.session.logado) {

  try {
    const itemId = req.params.id;
    const updatedItem = req.body;

    // Verificar se todos os campos obrigatórios estão presentes
    const requiredFields = ['title', 'author', 'category', 'price', 'description', 'status', 'publicationDate', 'periodicity', 'quantity'];
    const missingFields = requiredFields.filter(field => updatedItem[field] === undefined);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` });
    }

    // Remover o campo 'id' para garantir que não seja alterado
    delete updatedItem.id;
    delete updatedItem.sellerId;

    const itemRef = db.collection('items').doc(itemId);
    const snapshot = await itemRef.get();

    if (!snapshot.exists) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    await itemRef.update(updatedItem);
    const updatedItemData = await itemRef.get();
    res.json(updatedItemData.data());
  } catch (error) {
    console.error('Error updating item: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
else {
  // Se não estiver logado, retorne um erro de não autorizado
  res.status(401).json({ error: 'Não autorizado. Faça login para acessar este recurso.' });
}
});


// DELETE /items/{id} - Excluir permanentemente um item.
app.delete('/items/:id', async (req, res) => {
  if (req.session.logado) {
  try {
    const itemId = req.params.id;
    const itemRef = db.collection('items').doc(itemId);

    const snapshot = await itemRef.get();
    if (!snapshot.exists) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    // Excluir permanentemente o item
    await itemRef.delete();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} else {
  // Se não estiver logado, retorne um erro de não autorizado
  res.status(401).json({ error: 'Não autorizado. Faça login para acessar este recurso.' });
}
});

// Rota para buscar itens com base nos parâmetros fornecidos
app.post('/items/search', async (req, res) => {
  try {
    const queryParams = req.body;
    let query = admin.firestore().collection('items');

    // Defina as condições de preço mínimo e máximo dinamicamente
    const priceConditions = {};
    if (queryParams.minPrice !== undefined) {
      priceConditions['>='] = queryParams.minPrice;
    }

    if (queryParams.maxPrice !== undefined) {
      priceConditions['<='] = queryParams.maxPrice;
    }

    // Remova minPrice e maxPrice dos parâmetros para não interferir nas demais condições
    delete queryParams.minPrice;
    delete queryParams.maxPrice;

    // Adicione as condições de preço à consulta
    if (Object.keys(priceConditions).length > 0) {
      query = query.where('price', ...Object.entries(priceConditions)[0]);
    }

    // Construa a consulta com base nos parâmetros fornecidos
    Object.keys(queryParams).forEach((param) => {
      query = query.where(param, '==', queryParams[param]);
    });

    // Execute a consulta
    const snapshot = await query.get();

    // Mapeie os documentos para um array de objetos JavaScript
    const items = snapshot.docs.map((doc) => doc.data());

    res.json({ success: true, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});






































































// GET /categories - Listar todas as categorias.
app.get('/categories', async (req, res) => {
  try {
    const snapshot = await db.collection('categories').get();
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(categories);
  } catch (error) {
    console.error('Error getting categories: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /categories - Adicionar uma nova categoria.
app.post('/categories', async (req, res) => {
  if (req.session.logadoAdmin) {
    try {
      const { id, name, description } = req.body;

      // Verificar se todos os campos obrigatórios estão presentes
      const requiredFields = ['id', 'name', 'description'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({ message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` });
      }

      // Verificar se o ID da categoria já existe
      const existingCategory = await db.collection('categories').doc(id).get();
      if (existingCategory.exists) {
        return res.status(400).json({ message: 'ID da categoria já existe, escolha outro ID' });
      }

      // Cadastrar a nova categoria no Firestore
      await db.collection('categories').doc(name).set({ id, name, description });

      res.status(201).json({ id, name, description });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  } else {
    res.status(420).json({ message: 'Para cadastrar uma nova categoria, é preciso estar logado como administrador' });
  }
});



// PUT /categories/{id} - Editar uma categoria existente.
app.put('/categories/:id', async (req, res) => {
  if (req.session.logadoAdmin) {
  try {
    const categoryId = req.params.id;
    const updatedCategory = req.body;

    // Verificar se a categoria existe
    const categoryRef = db.collection('categories').doc(categoryId);
    const categoryDoc = await categoryRef.get();

    if (!categoryDoc.exists) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
  // Atualizar apenas os campos fornecidos
  Object.keys(updatedCategory).forEach(field => {
    if (updatedCategory[field] !== undefined) {
      categoryDoc.ref.update({ [field]: updatedCategory[field] });
    }
  });

  // Recuperar os dados atualizados da categoria
  const updatedCategoryData = await categoryRef.get();
  res.json(updatedCategoryData.data());

  } catch (error) {
    console.error('Error updating category: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
else{
  res.status(420).json({ message: 'Para cadastrar uma nova categoria é preciso estar logado como administrador'});
}
});


// DELETE /categories/{id} - Excluir uma categoria.
app.delete('/categories/:id', async (req, res) => {
  if (req.session.logadoAdmin) {
  try {
    const categoryId = req.params.id;

    // Excluir a categoria do Firestore
    await db.collection('categories').doc(categoryId).delete();
    res.json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    console.error('Error deleting category: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
else{
  res.status(420).json({ message: 'Para cadastrar uma nova categoria é preciso estar logado como administrador'});
}
});














































































// POST /transactions - Registrar uma nova transação.
app.post('/transactions', async (req, res) => {
  if (req.session.logado || req.session.logadoAdmin) {
  try {
    const {itemId, transactionDate, transactionValue, quantity } = req.body;

    // Verificar se todos os campos obrigatórios estão presentes
    const requiredFields = ['itemId', 'transactionDate', 'transactionValue', 'quantity'];
    const missingFields = requiredFields.filter(field => req.body[field] === undefined);

    var email = req.session.emailUsuario;

    // Consulte o usuário pelo email no Firestore
    const userDoc = await admin.firestore().collection('usuarios').doc(email).get();
   
    const userData = userDoc.data();
          
    const buyerId = userData.id;

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` });
    }

    // Verificar se o valor da transação é igual ao preço do item
    const itemRef = db.collection('items').doc(itemId);
    const itemSnapshot = await itemRef.get();

    if (!itemSnapshot.exists) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    const itemData = itemSnapshot.data();
    const itemPrice = itemData.price;
    const sellerId = itemData.sellerId;

    if (transactionValue !== itemPrice) {
      return res.status(400).json({ message: 'Valor da transação deve ser igual ao preço do item' });
    }

    // Atualizar o número de exemplares (periodicity) e verificar se deve excluir o item
    const updatedQuantity = itemData.quantity - quantity;
    
    if (updatedQuantity === 0) {
      // Se o resultado for 0, excluir o item
      await itemRef.delete();
       // Registrar a nova transação no Firestore
    const transactionData = {
      buyerId,
      sellerId,
      itemId,
      transactionDate,
      transactionValue,
      quantity
    };

    const docRef = await db.collection('transacoes').add(transactionData);
    const addedTransaction = await docRef.get();
    res.status(201).json(addedTransaction.data());
    } else if (updatedQuantity <= 0){
      res.send("Não possuimos está quantidade de livros no nosso")
    }else {
      // Se o resultado não for 0, apenas atualizar o número de exemplares
      await itemRef.update({ quantity: updatedQuantity });
    
      // Registrar a nova transação no Firestore com buyerId como ID do documento
      const transactionData = {
        buyerId,
        sellerId,
        itemId,
        transactionDate,
        transactionValue,
        quantity
      };
    
      await db.collection('transacoes').add(transactionData);
      res.status(201).json(transactionData);
    }

   
  } catch (error) {
    console.error('Error adding transaction: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
else{
    // Se não estiver logado, retorne um erro de não autorizado
    res.status(401).json({ error: 'Não autorizado. Faça login para acessar este recurso.' });
}
});

// GET /transactions/{userId} - Visualizar transações de um usuário específico.
app.get('/transactions/:userId', async (req, res) => {
  if (req.session.logadoAdmin) {
  try {
    const userId = req.params.userId;

    // Buscar transações do usuário no Firestore
    const querySnapshot = await db.collection('transacoes').where('buyerId', '==', userId).get();
    const transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(transactions);
  } catch (error) {
    console.error('Error getting user transactions: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
  else{
     // Se não estiver logado, retorne um erro de não autorizado
     res.status(401).json({ error: 'Não autorizado. Faça login para acessar este recurso.' });
  }
});














































  const port = process.env.PORT || 3002;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
