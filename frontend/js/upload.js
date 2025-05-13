const inputUpload = document.getElementById("upload-input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

inputUpload.addEventListener("change", () => {
  const file = inputUpload.files[0];

  if (!file || !file.type.startsWith("image/")) {
    alert("Por favor, selecione uma imagem válida.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Salva no localStorage
      localStorage.setItem("imagemOriginal", img.src);
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
});
