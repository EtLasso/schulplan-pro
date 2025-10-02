import { api } from '../api/mock.js';
import { fmtDate } from '../components/ui.js';


export default {
render(){
const list = api.listAssignments();
return `
<div class="cards">
<div class="card neon">
<h3>Aufgaben</h3>
<form id="newAss" class="row" aria-label="Neue Aufgabe">
<input name="course" required placeholder="Kurs (z.B. Mathe)" />
<input name="title" required placeholder="Titel" />
<input name="due" type="datetime-local" required />
<button class="btn">Erstellen</button>
</form>
<table class="table" aria-label="Aufgabenliste">
<thead><tr><th>Kurs</th><th>Titel</th><th>Fällig</th><th>Status</th></tr></thead>
<tbody>
${list.map(a=>`<tr><td>${a.course}</td><td>${a.title}</td><td>${fmtDate(a.due)}</td><td>${a.status}</td></tr>`).join('')}
</tbody>
</table>
</div>
</div>`;
},
afterRender(){
const form = document.getElementById('newAss');
form?.addEventListener('submit', (e)=>{
e.preventDefault();
const fd = new FormData(form);
const obj = Object.fromEntries(fd.entries());
obj.rubric = 'Punkte'; obj.status='offen';
api.addAssignment(obj); location.reload();
});
}
};
