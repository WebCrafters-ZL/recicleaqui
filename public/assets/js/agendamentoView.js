document.addEventListener('DOMContentLoaded', function () {
    const datePicker = document.getElementById('datePicker');
    const timeSlots = document.getElementById('timeSlots');
    const tipoMaterial = document.getElementById('tipoMaterial');
    const quantidadeMaterial = document.getElementById('quantidadeMaterial');
    const adicionarMaterialBtn = document.getElementById('adicionarMaterialBtn');
    const listaMateriais = document.getElementById('listaMateriais');
    const agendarBtn = document.getElementById('agendarBtn');
    const confirmacaoDiv = document.getElementById('confirmacao');
    const confirmacaoTexto = document.getElementById('confirmacaoTexto');

    // Função para adicionar um material à lista
    function adicionarMaterial(material, quantidade) {
        const item = document.createElement('li');
        item.textContent = `${quantidade} kg de ${material}`;
        listaMateriais.appendChild(item);
        document.getElementById('materiaisSelecionados').style.display = 'block';
    }

    // Evento de clique no botão "Adicionar Material"
    adicionarMaterialBtn.addEventListener('click', function () {
        const material = tipoMaterial.value;
        const quantidade = quantidadeMaterial.value;
        adicionarMaterial(material, quantidade);
    });

    // Evento de clique no botão "Agendar"
    agendarBtn.addEventListener('click', function () {
        const selectedDate = datePicker.value;
        const selectedTime = timeSlots.value;
        const selectedTipoMaterial = tipoMaterial.value;
        const selectedQuantidadeMaterial = quantidadeMaterial.value;
        showConfirmation(selectedDate, selectedTime, selectedTipoMaterial, selectedQuantidadeMaterial);
    });

    // Carregar os horários disponíveis ao selecionar uma data
    datePicker.addEventListener('change', function () {
        const selectedDate = datePicker.value;
        loadTimeSlots(selectedDate);
    });

    // Função para carregar os horários disponíveis
    function loadTimeSlots(selectedDate) {
        const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

        // Limpar as opções existentes
        timeSlots.innerHTML = '';

        // Adicionar as opções de horário disponíveis
        availableTimes.forEach(time => {
            const option = document.createElement('option');
            option.textContent = time;
            timeSlots.appendChild(option);
        });
    }

    // Função para formatar a data
    function formatarData(dateString) {
        const partes = dateString.split("-");
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    // Função para exibir a confirmação do agendamento
    function showConfirmation(selectedDate, selectedTime, selectedTipoMaterial, selectedQuantidadeMaterial) {
        const dataFormatada = formatarData(selectedDate);
        const materiaisSelecionados = Array.from(listaMateriais.getElementsByTagName('li')).map(li => li.textContent).join(', ');
        confirmacaoTexto.textContent = `Você agendou a coleta para ${dataFormatada} às ${selectedTime}. Materiais: ${materiaisSelecionados}.`;
        confirmacaoDiv.style.display = 'block';
    }
});
