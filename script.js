const now = new Date();
document.getElementById('year').textContent = now.getFullYear();

const ITEMS = [
  // Nuts
  {name:'Almonds', cat:'nuts', price:699, unit:'kg', emoji:'??', origin:'California / India', notes:'Rich in vitamin E, great for snacking.'},
  {name:'Cashews', cat:'nuts', price:849, unit:'kg', emoji:'??', origin:'Goa / Vietnam', notes:'Creamy texture, perfect for curries.'},
  {name:'Pistachios', cat:'nuts', price:1099, unit:'kg', emoji:'??', origin:'Iran / California', notes:'Roasted & salted options available.'},
  {name:'Walnuts', cat:'nuts', price:899, unit:'kg', emoji:'??', origin:'Kashmir / Chile', notes:'Omega?3 rich brain food.'},
  {name:'Hazelnuts', cat:'nuts', price:1299, unit:'kg', emoji:'??', origin:'Turkey', notes:'Excellent for baking and pralines.'},
  {name:'Pecans', cat:'nuts', price:1399, unit:'kg', emoji:'??', origin:'USA', notes:'Buttery, great in pies and snacks.'},
  {name:'Macadamia Nuts', cat:'nuts', price:2499, unit:'kg', emoji:'??', origin:'Australia / Kenya', notes:'Deluxe crunch, high in good fats.'},
  {name:'Brazil Nuts', cat:'nuts', price:1499, unit:'kg', emoji:'??', origin:'Brazil', notes:'Selenium powerhouse.'},
  {name:'Pine Nuts (Chilgoza)', cat:'nuts', price:2999, unit:'kg', emoji:'??', origin:'Himalayas', notes:'Premium, aromatic and delicate.'},

  // Dried fruits
  {name:'Raisins (Kishmish)', cat:'dried-fruits', price:399, unit:'kg', emoji:'??', origin:'Nashik', notes:'Black & golden varieties.'},
  {name:'Black Raisins (Munakka)', cat:'dried-fruits', price:449, unit:'kg', emoji:'??', origin:'India', notes:'Seeded, great for health tonics.'},
  {name:'Dates (Khajur)', cat:'dried-fruits', price:549, unit:'kg', emoji:'??', origin:'Saudi / UAE', notes:'Medjool, Ajwa, Safawi, Deglet Noor.'},
  {name:'Figs (Anjeer)', cat:'dried-fruits', price:1099, unit:'kg', emoji:'??', origin:'Turkey', notes:'Soft, fiber?rich rounds.'},
  {name:'Apricots', cat:'dried-fruits', price:899, unit:'kg', emoji:'??', origin:'Turkey', notes:'Sulphur?free available.'},
  {name:'Prunes', cat:'dried-fruits', price:999, unit:'kg', emoji:'??', origin:'Chile', notes:'Digestive health essential.'},
  {name:'Dried Apple', cat:'dried-fruits', price:799, unit:'kg', emoji:'??', origin:'Himachal', notes:'No added sugar.'},
  {name:'Dried Mango', cat:'dried-fruits', price:999, unit:'kg', emoji:'??', origin:'India / Thailand', notes:'Tropical sweetness.'},
  {name:'Dried Kiwi', cat:'dried-fruits', price:949, unit:'kg', emoji:'??', origin:'New Zealand', notes:'Tangy slices.'},
  {name:'Dried Pineapple', cat:'dried-fruits', price:949, unit:'kg', emoji:'??', origin:'Philippines', notes:'Naturally sweet.'},

  // Berries
  {name:'Cranberries', cat:'berries', price:1099, unit:'kg', emoji:'??', origin:'USA', notes:'Great in salads & bakes.'},
  {name:'Blueberries', cat:'berries', price:1499, unit:'kg', emoji:'??', origin:'Canada', notes:'Antioxidant?rich snack.'},
  {name:'Goji Berries', cat:'berries', price:1799, unit:'kg', emoji:'??', origin:'Tibet', notes:'Superfood favorite.'},
  {name:'Mulberries', cat:'berries', price:1199, unit:'kg', emoji:'??', origin:'Turkey', notes:'Chewy and mildly sweet.'},

  // Seeds (often grouped with dry fruit offerings)
  {name:'Pumpkin Seeds', cat:'seeds', price:899, unit:'kg', emoji:'??', origin:'India', notes:'Protein?rich crunch.'},
  {name:'Sunflower Seeds', cat:'seeds', price:599, unit:'kg', emoji:'??', origin:'India', notes:'Lightly salted option.'},
  {name:'Chia Seeds', cat:'seeds', price:1099, unit:'kg', emoji:'?', origin:'Peru', notes:'High omega?3 and fiber.'},
  {name:'Flax Seeds', cat:'seeds', price:499, unit:'kg', emoji:'??', origin:'India', notes:'Great for smoothies.'},
];

const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const search = document.getElementById('search');
const category = document.getElementById('category');
const sort = document.getElementById('sort');

function formatPrice(p){
  // INR placeholder; can adapt as needed
  return `?${p.toLocaleString('en-IN')}`;
}

function render(items){
  grid.innerHTML = '';
  if(items.length === 0){
    empty.classList.remove('hidden');
    grid.setAttribute('aria-busy','false');
    return;
  }
  empty.classList.add('hidden');
  const frag = document.createDocumentFragment();
  for(const it of items){
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header">
        <div class="thumb" aria-hidden="true">${it.emoji}</div>
        <div>
          <h4 class="title">${it.name}</h4>
          <p class="subtitle">${it.origin}</p>
        </div>
        <div class="price" title="Approximate retail price per ${it.unit}">${formatPrice(it.price)}</div>
      </div>
      <div class="card-body">
        <p>${it.notes}</p>
        <div class="meta">
          <span class="badge">${labelForCat(it.cat)}</span>
          <span class="tag">${it.unit}</span>
        </div>
      </div>
    `;
    frag.appendChild(card);
  }
  grid.appendChild(frag);
  grid.setAttribute('aria-busy','false');
}

function labelForCat(cat){
  switch(cat){
    case 'nuts': return 'Nuts';
    case 'dried-fruits': return 'Dried Fruits';
    case 'berries': return 'Berries';
    case 'seeds': return 'Seeds';
    default: return cat;
  }
}

function apply(){
  grid.setAttribute('aria-busy','true');
  const q = (search.value || '').trim().toLowerCase();
  const c = category.value;
  const s = sort.value;

  let out = ITEMS.filter(it => {
    const inCat = c === 'all' || it.cat === c;
    if(!inCat) return false;
    if(!q) return true;
    return (
      it.name.toLowerCase().includes(q) ||
      it.origin.toLowerCase().includes(q) ||
      it.notes.toLowerCase().includes(q)
    );
  });

  out.sort((a,b) => {
    if(s === 'name-asc') return a.name.localeCompare(b.name);
    if(s === 'name-desc') return b.name.localeCompare(a.name);
    if(s === 'price-asc') return a.price - b.price;
    if(s === 'price-desc') return b.price - a.price;
    return 0;
  });

  render(out);
}

search.addEventListener('input', apply);
category.addEventListener('change', apply);
sort.addEventListener('change', apply);

// Initial render
apply();
