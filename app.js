const customDocs = [
  {
    id: 1,
    title: "Père riche, père pauvre",
    category: "Développement personnel",
    price: 500,
    file: "pere-riche-pere-pauvre.pdf"
  }
];

const generatedDocs = Array.from({length: 99}, (_, i) => ({
  id: i + 2,
  title: `Document PDF ${String(i + 2).padStart(3, '0')}`,
  category: i % 4 === 0 ? 'Formation' : i % 4 === 1 ? 'Business' : i % 4 === 2 ? 'Études' : 'Développement personnel',
  price: 500
}));

const docs = [...customDocs, ...generatedDocs];

const grid = document.getElementById('grid');
const search = document.getElementById('search');

function render(list) {
  grid.innerHTML = list.map(d => `
    <article class="card">
      <div class="pdf">PDF</div>
      <h3>${d.title}</h3>
      <div class="meta">${d.category} • ${d.price.toLocaleString('fr-FR')} F CFA</div>
      <button class="buy" onclick="buy(${d.id})">Acheter – 500 F</button>
    </article>
  `).join('');
}

function buy(id) {
  const d = docs.find(x => x.id == id);
  document.getElementById('modalContent').innerHTML = `
    <h2>${d.title}</h2>
    <p>Prix : <b>500 F CFA</b></p>
    <div class="note">Après le paiement Wave, la commande est validée automatiquement par le serveur. Le lien sécurisé du PDF est ensuite envoyé/affiché selon la configuration du site.</div>
    <a class="pay" href="/api/checkout?product_id=${d.id}">pour d'autres documents veiller nous contacter par WhatsApp</a>
    <a class="pay" style="background:#111827" target="_blank" href="https://wa.me/2250596037289?text=${encodeURIComponent('Bonjour, je souhaite acheter le ' + d.title + ' pour 500 F CFA.')}">Besoin d'aide sur WhatsApp</a>
  `;
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

search.addEventListener('input', e => {
  const q = e.target.value.toLowerCase().trim();
  render(docs.filter(d => (d.title + ' ' + d.category).toLowerCase().includes(q)));
});

render(docs);
