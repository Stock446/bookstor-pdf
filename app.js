const customDocs = [
  {
    id: 1,
    title: "L'art du Trading",
    category: "Finance",
    price: 500,
    file: "L'art du Trading.pdf"
  },
  {
    id: 2,
    title: "Le marketing digital pour les nuls",
    category: "Marketing",
    price: 500,
    file: "Le marketing digital pour les nuls.pdf"
  },
  {
    id: 3,
    title: "L'Alchimiste - Paulo Coelho",
    category: "Développement personnel",
    price: 500,
    file: "L’Alchimiste Paulo Coelho.pdf"
  },
  {
    id: 4,
    title: "Père riche, père pauvre",
    category: "Finance",
    price: 500,
    file: "Père riche, père pauvre (Robert T. Kiyosaki) (z-lib.org)-1.pdf"
  },
  {
    id: 5,
    title: "Un pied à l'école, un pied dans le business",
    category: "Business",
    price: 500,
    file: "Un pied à l'école un pied dans le business .pdf"
  },
  {
    id: 6,
    title: "Vivez mieux et plus longtemps",
    category: "Santé",
    price: 500,
    file: "Vivez-mieux-et-plus-longtemps-Michel-Cymes-z-lib.org_.pdf"
  },
  {
    id: 7,
    title: "L'investisseur intelligent",
    category: "Finance",
    price: 500,
    file: "l'investisseur intelligent (1).pdf"
  },
  {
    id: 8,
    title: "La chèvre de ma mère",
    category: "Business",
    price: 500,
    file: "la-chevre-de-ma-mere.pdf"
  }
];

const docs = [...customDocs];
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
