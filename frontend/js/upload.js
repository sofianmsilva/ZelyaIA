// frontend/js/upload.js
const inputUpload = document.getElementById("upload-input");
const canvas = document.getElementById("canvas"); // Canvas para preview, se mantido
const ctx = canvas.getContext("2d");

inputUpload.addEventListener("change", () => {
    const file = inputUpload.files[0];

    if (!file || !file.type.startsWith("image/")) {
        alert("Por favor, selecione uma imagem válida."); // Este alerta é para erro, pode ser mantido ou substituído por uma UI melhor.
        return;
    }

    // Opcional: Mostrar preview no canvas da página de upload
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file); // Para o preview

    // Enviar a imagem para o backend
    const formData = new FormData();
    formData.append('imageFile', file); // 'imageFile' deve bater com o upload.single() no backend

    fetch('/upload-image', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.imageUrl) {
            // Em vez de localStorage, guardamos o caminho da imagem retornado pelo servidor
            // E passamos para a próxima página via query parameter
            // A navegação para a próxima página é feita pelo botão "Próximo" no HTML
            // Então, vamos armazenar temporariamente esse imageUrl para o botão usar.
            const nextButton = document.querySelector('.next-button');
            if (nextButton) {
                // Habilita o botão e armazena a URL para ser usada no clique
                nextButton.disabled = false;
                nextButton.dataset.imageUrl = data.imageUrl;
                // Adiciona uma classe para indicar que a imagem foi carregada e está pronta
                nextButton.classList.add('ready-to-proceed');
                // A LINHA ABAIXO FOI REMOVIDA:
                // alert("Imagem carregada com sucesso! Clique em 'Próximo'.");
                console.log("Imagem carregada e pronta para o próximo passo. URL:", data.imageUrl); // Mensagem no console para feedback
            }
        } else {
            alert('Erro ao fazer upload da imagem: ' + (data.message || 'Erro desconhecido'));
        }
    })
    .catch(error => {
        console.error('Erro no fetch do upload:', error);
        alert('Erro de comunicação ao fazer upload da imagem.');
    });
});

// Modificar o comportamento do botão "Próximo" em upload.html
document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.querySelector('.next-button');
    if (nextButton) {
        nextButton.disabled = true; // Começa desabilitado
        nextButton.addEventListener('click', () => {
            if (nextButton.dataset.imageUrl) {
                // Redireciona para selecionar-funcao.html com o imageUrl como parâmetro
                window.location.href = '/pages/selecionar-funcao.html?imageUrl=' + encodeURIComponent(nextButton.dataset.imageUrl);
            } else {
                alert("Por favor, carregue uma imagem primeiro."); // Este alerta é para o caso de tentar prosseguir sem imagem.
            }
        });
    }
});
