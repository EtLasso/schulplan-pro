let STATE = {
user: { id:'u1', role:'student', name:'Alex Muster' },
theme: 'dark',
notifications: [ {id:1, text:'Neue Aufgabe in Mathe', read:false} ]
};


export const getState = ()=> STRUCTURED_CLONE(STATE);
export const setState = (partial)=>{ STATE = {...STATE, ...partial}; };


// Safari <17 workaround for structuredClone
const STRUCTURED_CLONE = (obj)=>{
if (typeof structuredClone === 'function') return structuredClone(obj);
return JSON.parse(JSON.stringify(obj));
};


export const qs = (sel, el=document)=> el.querySelector(sel);
export const on = (sel, ev, fn)=> document.addEventListener('click', (e)=>{
const t = e.target.closest(sel);
if(!t) return; if (ev!=='click') return; fn(e);
});


export const fmtDate = (iso)=> new Date(iso).toLocaleString('de-DE', { dateStyle:'medium', timeStyle:'short' });


export const pill = (text)=> `<span class="badge">${text}</span>`;
export const btn = (text, attrs='')=> `<button class="btn" ${attrs}>${text}</button>`;


