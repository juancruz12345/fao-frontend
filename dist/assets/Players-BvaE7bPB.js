import{u as f,r as l,b as C,a as k,j as s,C as N,a5 as v,i as B}from"./index-9bMVTCwX.js";/* empty css                */import{B as c}from"./Button-mQ-mTWkK.js";import{T as E}from"./Table-DXOjfKuV.js";function A(){const{players:d}=f(),r=d==null?void 0:d.filter(t=>(t==null?void 0:t.name)!=="LIBRE"),[e,a]=l.useState([...r].sort((t,i)=>t.name.localeCompare(i.name))),h=()=>{const t=[...r].sort((i,n)=>i.name.localeCompare(n.name));a(t)},u=()=>{const t=[...r].sort((i,n)=>i.category?n.category?i.category.localeCompare(n.category):-1:1);a(t)},m=()=>{const t=[...r].sort((i,n)=>i.club?n.club?i.club.localeCompare(n.club):-1:1);a(t)},x=()=>{const t=[...r].sort((i,n)=>n.rating-i.rating);a(t)},j=()=>{const t=[...r].sort((i,n)=>n.elo-i.elo);a(t)},g=C(),b=t=>{g(`/jugador/${t}`,{state:{players:d}})},{theme:o}=k();return l.useEffect(()=>{},[e]),s.jsxs(N,{className:"mt-4",id:"players-container",children:[s.jsx("h1",{className:"text-center mb-4",children:"Jugadores"}),s.jsxs("div",{children:[s.jsx("span",{className:"filter-span",children:"Ordenar por:"}),s.jsxs("div",{className:"row-filters",children:[s.jsx(c,{className:"btn-filter",variant:o==="dark"?"outline-light":"outline-dark",onClick:h,children:"Nombre "}),s.jsx(c,{className:"btn-filter",variant:o==="dark"?"outline-light":"outline-dark",onClick:u,children:"Categoría "}),s.jsx(c,{className:"btn-filter",variant:o==="dark"?"outline-light":"outline-dark",onClick:m,children:"Club "}),s.jsx(c,{className:"btn-filter",variant:o==="dark"?"outline-light":"outline-dark",onClick:x,children:"Rating "}),s.jsx(c,{className:"btn-filter",variant:o==="dark"?"outline-light":"outline-dark",onClick:j,children:"Elo "})]})]}),s.jsxs(E,{striped:!0,bordered:!0,hover:!0,responsive:!0,className:"players-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Nombre"}),s.jsx("th",{children:"Categoría"}),s.jsx("th",{children:"Club"}),s.jsx("th",{children:"Rating"}),s.jsx("th",{children:"Elo"}),s.jsx("th",{children:"ID Fide"}),s.jsx("th",{children:"Historial"})]})}),s.jsx("tbody",{children:Array.isArray(e)&&e&&(e==null?void 0:e.map(t=>s.jsxs("tr",{children:[s.jsx("td",{children:t==null?void 0:t.name}),s.jsx("td",{children:t==null?void 0:t.category}),s.jsx("td",{children:t==null?void 0:t.club}),s.jsx("td",{children:t==null?void 0:t.rating}),s.jsx("td",{children:t==null?void 0:t.elo}),s.jsx("td",{children:s.jsx(v,{className:"link",to:`https://ratings.fide.com/profile/${t.id_fide}`,children:t==null?void 0:t.id_fide})}),s.jsx("td",{children:s.jsxs(c,{className:"btn-history",variant:o,onClick:()=>{b(t==null?void 0:t.id)},children:["Ir al historial",s.jsx(B,{})]})})]},t==null?void 0:t.id)))})]})]})}export{A as default};
