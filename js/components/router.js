import dashboard from '../pages/dashboard.js';
import timetable from '../pages/timetable.js';
import assignments from '../pages/assignments.js';
import absences from '../pages/absences.js';
import resources from '../pages/resources.js';
import admin from '../pages/admin.js';


const notFound = {
render(){ return `<div class="cards"><div class="card neon"><h3>Seite nicht gefunden</h3><p>Diese Route existiert nicht.</p></div></div>`; }
};


export const routes = new Map([
['/', dashboard],
['/timetable', timetable],
['/assignments', assignments],
['/absences', absences],
['/resources', resources],
['/admin', admin],
['/404', notFound]
]);
