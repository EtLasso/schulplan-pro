import { api } from '../api/mock.js';


export default {
render(){
const list = api.listAbsences();
return `
<div class="cards">
<div class="card neon">
<h3>Abwesenheit melden</h3>
<form id="absForm" aria-label="Abwesenheit">
<input name="student" required placeholder="Name der/s Schüler:in" />
<input name="date" required type="date" />
<input name="reason" required placeholder="Grund (z.B. Arzt)" />
<button class="btn">Einreichen</button>
</form>
<h3>Status</h3>
<table class="table" aria-label="Abwesenheitsliste">
<thead><tr><th>Schüler:in</th><th>Datum</th><th>Grund</th><th>Status</th></tr></thead>
<tbody>
${list.map(x=>`<tr><td>${x.student}</td><td>${x.date}</td><td>${x.reason}</td><td>${x.status}</td></tr>`).join('')}
</tbody>
</table>
</div>
</div>`;
},
afterRender(){
document.getElementById('absForm')?.addEventListener('submit', (e)=>{
e.preventDefault();
const fd = new FormData(e.currentTarget);
const obj = Object.fromEntries(fd.entries());
api.submitAbsence(obj); location.reload();
});
}
};
