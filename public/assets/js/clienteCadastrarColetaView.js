const selectHora = document.getElementById('hora');
for (let i = 8; i <= 18; i++) {
    const option = document.createElement('option');
    const hour = String(i).padStart(2, '0');
    option.text = `${hour}:00`;
    option.value = `${hour}:00`;
    selectHora.add(option);
}
const dataField = document.getElementById('data');
const today = new Date();
const tomorrow = new Date(today);
const maxDate = new Date(today);

tomorrow.setDate(tomorrow.getDate() + 1); // Define a data mínima como sendo o dia seguinte

const ddMin = String(tomorrow.getDate()).padStart(2, '0');
const mmMin = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
const yyyyMin = tomorrow.getFullYear();

const minDate = `${yyyyMin}-${mmMin}-${ddMin}`;

dataField.setAttribute('min', minDate);

maxDate.setMonth(maxDate.getMonth() + 1);  // Define a data máxima como sendo 1 mês à frente

const ddMax = String(maxDate.getDate()).padStart(2, '0');
const mmMax = String(maxDate.getMonth() + 1).padStart(2, '0');
const yyyyMax = maxDate.getFullYear();

const maxDateValue = `${yyyyMax}-${mmMax}-${ddMax}`;
dataField.setAttribute('max', maxDateValue);

