document.addEventListener('DOMContentLoaded', function () {
    const datePicker = document.getElementById('datePicker');
    const timeSlots = document.getElementById('timeSlots');
    const tipoMaterial = document.getElementById('tipoMaterial');
    const quantidadeMaterial = document.getElementById('quantidadeMaterial');
    const agendarBtn = document.getElementById('agendarBtn');
    const confirmacaoDiv = document.getElementById('confirmacao');
    const confirmacaoTexto = document.getElementById('confirmacaoTexto');

    datePicker.addEventListener('change', function () {
        const selectedDate = datePicker.value;
        loadTimeSlots(selectedDate);
    });

    agendarBtn.addEventListener('click', function () {
        const selectedDate = datePicker.value;
        const selectedTime = timeSlots.value;
        const selectedTipoMaterial = tipoMaterial.value;
        const selectedQuantidadeMaterial = quantidadeMaterial.value;
        showConfirmation(selectedDate, selectedTime, selectedTipoMaterial, selectedQuantidadeMaterial);
    });

    function loadTimeSlots(selectedDate) {
        const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

        // Limpa as opções existentes
        timeSlots.innerHTML = '';

        // Adiciona as opções de horário disponíveis
        availableTimes.forEach(time => {
            const option = document.createElement('option');
            option.textContent = time;
            timeSlots.appendChild(option);
        });
    }

    function formatarData(dateString) {
        const partes = dateString.split("-");
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    function showConfirmation(selectedDate, selectedTime, selectedTipoMaterial, selectedQuantidadeMaterial) {
        const dataFormatada = formatarData(selectedDate);
        confirmacaoTexto.textContent = `Você agendou a coleta para ${dataFormatada} às ${selectedTime}. Tipo de Material: ${selectedTipoMaterial}. Quantidade: ${selectedQuantidadeMaterial} kg.`;
        confirmacaoDiv.style.display = 'block';
    }
});
