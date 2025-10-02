import { api } from '../api/mock.js';


export default {
render(){
const res = api.listResources();
return `
<div class="cards">
<div class="card neon">
<h3>Ressourcen</h3>
<form id="bookForm" aria-label="Buchen">
<select name="resource" required>
${res.map(r=>`<option value="${r.id}">${r.type}: ${r.name} (max ${r.capacity})</option>`).join('')}
</select>
<input name="when" required type="datetime-local" />
<button class="btn">Buchen</button>
</form>
</div>
</div>`;
},
afterRender(){
document.getElementById('bookForm')?.addEventListener('submit', (e)=>{
e.preventDefault();
const fd = new FormData(e.currentTarget);
const obj = Object.fromEntries(fd.entries());
api.bookResource(obj); alert('Buchung gespeichert (Demo)');
});
}
};
