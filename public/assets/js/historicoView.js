(() => {
    "use strict";

    const cancelBtns = document.querySelectorAll(".cancel-btn");

    cancelBtns.forEach((btn) => {
        btn.addEventListener("click", async function () {
            const coletaId = this.dataset.coletaId;

            try {
                const response = await fetch('/cliente/cancelar-coleta', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ coletaId })
                });

                if (!response.ok) {
                    throw new Error('Erro ao cancelar a coleta');
                }

                alert('Coleta cancelada com sucesso!');

                // Recarregar a página após 1 segundo
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao cancelar a coleta. Por favor, tente novamente.');
            }
        });
    });

})();