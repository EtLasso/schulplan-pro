import { pill, fmtDate } from '../components/ui.js';
import { api } from '../api/mock.js';


export default {
render(){
const a = api.listAssignments().slice(0,3);
const lessons = api.listLessons().filter(l=> l.day==='Mo');
return `
<div class="cards grid-2">
<div class="card neon">
<h3>Heute</h3>
<table class="table" aria-label="Heutiger Stundenplan">
<thead><tr><th>Zeit</th><th>Fach</th><th>Raum</th><th>Lehrkraft</th></tr></thead>
<tbody>
${lessons.map(l=>`<tr><td>${l.time}</td><td>${l.subject}</td><td>${l.room}</td><td>${l.teacher}</td></tr>`).join('')}
</tbody>
</table>
</div>
<div class="card">
<h3>Offene Aufgaben ${pill(a.length)}</h3>
<ul>
${a.map(x=>`<li><strong>${x.course}:</strong> ${x.title} • fällig ${fmtDate(x.due)}</li>`).join('')}
</ul>
<a class="btn" href="#/assignments">Zu Aufgaben</a>
</div>
<div class="card">
<h3>Abwesenheiten</h3>
<p>Abwesenheit melden und Status verfolgen.</p>
<a class="btn" href="#/absences">Abwesenheit melden</a>
</div>
<div class="card">
<h3>Ressourcen</h3>
<p>Räume & Geräte einfach buchen.</p>
<a class="btn" href="#/resources">Jetzt buchen</a>
</div>
</div>`;
}
};
