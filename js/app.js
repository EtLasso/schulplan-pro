import { getState, setState, on, qs } from './components/ui.js';
import { routes } from './components/router.js';
import './api/mock.js';


const app = document.getElementById('app');


function render(){
const hash = location.hash.replace('#','') || '/';
const route = routes.get(hash) || routes.get('/404');
const html = route.render(getState());
app.innerHTML = html;
route.afterRender?.(getState());
// mark active link
document.querySelectorAll('[data-link]').forEach(a=>{
const target = a.getAttribute('href').replace('#','');
a.setAttribute('aria-current', target===hash ? 'page' : 'false');
});
}


// Theme toggle
on('#themeToggle','click', () => {
const s = getState();
const next = s.theme==='light'?'dark':'light';
setState({ theme: next });
document.documentElement.classList.toggle('light', next==='light');
localStorage.setItem('theme', next);
});


// Global search shortcut
window.addEventListener('keydown', (e)=>{
if ((e.ctrlKey || e.metaKey) && e.key === '/') qs('#globalSearch')?.focus();
});


window.addEventListener('hashchange', render);
window.addEventListener('load', ()=>{
const stored = localStorage.getItem('theme')||'dark';
if(stored==='light'){ document.documentElement.classList.add('light'); setState({theme:'light'}); }
render();
});
