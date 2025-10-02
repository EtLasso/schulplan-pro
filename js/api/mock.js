export const DB = {
lessons: [
{ id:1, day:'Mo', time:'08:00', subject:'Mathe', room:'203', teacher:'Frau Sommer' },
{ id:2, day:'Mo', time:'09:00', subject:'Deutsch', room:'115', teacher:'Herr Winter' },
{ id:3, day:'Di', time:'08:00', subject:'Englisch', room:'307', teacher:'Ms. Spring' }
],
assignments: [
{ id:11, course:'Mathe', title:'Lineare Funktionen', due:'2025-10-05T23:59:00+02:00', rubric:'Punkte', status:'offen' },
{ id:12, course:'Deutsch', title:'Aufsatz – Digitalisierung', due:'2025-10-07T18:00:00+02:00', rubric:'Rubrik A', status:'offen' }
],
absences: [
{ id:21, student:'Alex Muster', date:'2025-10-03', reason:'Arzt', status:'eingereicht' }
],
resources: [
{ id:31, type:'Raum', name:'Chemie-Labor', capacity:24 },
{ id:32, type:'Gerät', name:'iPad-Koffer', capacity:20 }
],
bookings: []
};


// Simulierter Persist Layer via localStorage
const KEY='schulplan-pro';
const saved = localStorage.getItem(KEY);
if(saved){
try { Object.assign(DB, JSON.parse(saved)); } catch {}
}


export const save = ()=> localStorage.setItem(KEY, JSON.stringify(DB));


export const api = {
listAssignments: ()=> DB.assignments,
addAssignment: (a)=>{ a.id=Date.now(); DB.assignments.push(a); save(); return a; },
submitAbsence: (rec)=>{ rec.id=Date.now(); rec.status='eingereicht'; DB.absences.push(rec); save(); return rec; },
listLessons: ()=> DB.lessons,
listAbsences: ()=> DB.absences,
listResources: ()=> DB.resources,
bookResource: (b)=>{ b.id=Date.now(); DB.bookings.push(b); save(); return b; }
};
