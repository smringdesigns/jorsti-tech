let index = 1;

function addItem() {
  const desc = document.getElementById('desc').value.trim();
  const qty = parseFloat(document.getElementById('qty').value.replace(',', '.')) || 0;
  const price = parseFloat(document.getElementById('price').value.replace(',', '.')) || 0;

  if(desc && qty > 0 && price >= 0) {
    const subtotal = qty * price;
    const tbody = document.querySelector('#itemsTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index++}</td>
      <td contenteditable="true">${desc}</td>
      <td contenteditable="true" oninput="updateTotals()">${qty}</td>
      <td contenteditable="true" oninput="updateTotals()">${price.toFixed(2)}</td>
      <td class="subtotal">$${formatNumber(subtotal)}</td>
      <td><button onclick="removeItem(this)">❌</button></td>
    `;
    tbody.appendChild(row);
    updateTotals();

    // Limpia los campos
    document.getElementById('desc').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('price').value = '';
  } else {
    alert('Completa todos los campos correctamente.');
  }
}

function updateTotals() {
  let total = 0;
  const rows = document.querySelectorAll('#itemsTable tbody tr');
  rows.forEach(row => {
    const qty = parseFloat(row.cells[2].innerText.replace(',', '.')) || 0;
    const price = parseFloat(row.cells[3].innerText.replace(',', '.')) || 0;
    const subtotal = qty * price;
    row.querySelector('.subtotal').innerText = '$' + formatNumber(subtotal);
    total += subtotal;
  });
  document.getElementById('total').innerText = '$' + formatNumber(total);
}

function removeItem(btn) {
  btn.closest('tr').remove();
  updateTotals();
}

function formatNumber(num) {
  return num.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
