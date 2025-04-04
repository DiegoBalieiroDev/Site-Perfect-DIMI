document.addEventListener('DOMContentLoaded', (event) => {
    var modals = document.querySelectorAll(".modal");
    var images = document.querySelectorAll(".image");
    var spans = document.querySelectorAll(".close");

    images.forEach((img, index) => {
        var modal = modals[index];
        var modalImg = modal.querySelector(".modal-content");
        var span = spans[index];
        var currentImageIndex = 0;
        var imageList = JSON.parse(img.getAttribute("data-images"));

        // Garante que o modal esteja oculto ao carregar a página
        modal.style.display = "none";

        img.onclick = function() {
            modal.style.display = "block";
            currentImageIndex = 0; // Reinicia o índice da imagem ao abrir o modal
            modalImg.src = imageList[currentImageIndex]; // Define a primeira imagem
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        modalImg.onclick = function() {
            modalImg.classList.add("fade-out");
            modalImg.addEventListener('animationend', function() {
                modalImg.classList.remove("fade-out");

                // Alterna para a próxima imagem
                currentImageIndex = (currentImageIndex + 1) % imageList.length;
                modalImg.src = imageList[currentImageIndex];

                modalImg.classList.add("fade-in");
                modalImg.addEventListener('animationend', function() {
                    modalImg.classList.remove("fade-in");
                }, { once: true });
            }, { once: true });
        }

        // Adiciona a verificação do clique no botão de fechar (span)
        window.onclick = function(event) {
            if (event.target == modal || event.target == span) {
                modal.style.display = "none";
            }
        }
    });
});