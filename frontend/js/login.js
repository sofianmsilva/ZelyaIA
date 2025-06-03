// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona os elementos da página
  const emailInput = document.querySelector('.emailInput'); // Campo de entrada de e-mail
  const emailBtn = document.querySelector('.emailBtn'); // Botão de login com e-mail
  const anonimoBtn = document.getElementById('anonimoBtn'); // Botão de login como visitante

  // Função para validar se o e-mail está no formato correto
  function emailEhValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar e-mail
    return regex.test(email); // Retorna true se o e-mail for válido
  }

  // Evento de clique no botão de login com e-mail
  emailBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    const email = emailInput.value.trim(); // Pega o valor digitado e remove espaços extras

    if (!emailEhValido(email)) { // Se o e-mail for inválido, exibe alerta e para a execução
      alert('Por favor, digite um e-mail válido!');
      return;
    }

    // Se for válido, armazena o e-mail no localStorage
    localStorage.setItem('usuarioEmail', email);

    // Redireciona para a página de upload
    window.location.href = '/pages/upload.html';
  });

  // Evento de clique no botão de login como visitante
  anonimoBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do botão

    // Marca no localStorage que o usuário está acessando como anônimo
    localStorage.setItem('usuarioAnonimo', true);

    // Redireciona também para a página de upload
    window.location.href = '/pages/upload.html';
  });
});
