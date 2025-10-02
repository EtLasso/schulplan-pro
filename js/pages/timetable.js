import { api } from '../api/mock.js';


export default {
render(){
const days = ['Mo','Di','Mi','Do','Fr'];
const byDay = (d)=> api.listLessons().filter(l=>l.day===d);
return `
<div class="cards">
<div class="card neon"><h3>Stundenplan</h3>
${days.map(d=> `
<h4>${d}</h4>
<table class="table" aria-label="Stunden am ${d}">
<thead><tr><th>Zeit</th><th>Fach</th><th>Raum</th><th>Lehrkraft</th></tr></thead>
<tbody>
${byDay(d).map(l=>`<tr><td>${l.time}</td><td>${l.subject}</td><td>${l.room}</td><td>${l.teacher}</td></tr>`).join('')}
</tbody>
</table>
`).join('')}
</div>
</div>`;
}
};
