import{j as e,a6 as P,a7 as V,r as o,V as G,C as z,T as M,ab as q,ac as A,ad as K,ae as O}from"./index-BHeBwaQY.js";import{T as Q}from"./TournamentContext-OLgUqsZj.js";import{F as i,T as W}from"./ToastComponent-wfRgfQl_.js";import{C as a}from"./Card-CpCgghwF.js";import{T as X}from"./Table-BprD6uSp.js";import{R as w,C as x}from"./Row-cu-65cpA.js";import{B as g}from"./Button-o09q16N0.js";import{B as $}from"./Badge-CnctFRQV.js";import"./warning-ByQxE_mr.js";import"./useWillUnmount-km8qQ_co.js";function J(){var b,C;const{id:d}=P(),v=V(),{players:T}=v.state||{},t=T.find(r=>r.id===parseInt(d)).name,[c,u]=o.useState(""),[h,p]=o.useState(""),[f,m]=o.useState([]),[_,y]=o.useState(!1),{data:n=[],isLoading:L,isError:S}=G({queryKey:["player_history",d],queryFn:async()=>{console.log("Fetching historial");const r=await fetch(`https://fao-backend.onrender.com/player/${d}/matches`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"});if(!r.ok)throw new Error("Error al cargar la página");return r.json()},staleTime:1e3*60*20,cacheTime:1e3*60*30,refetchOnWindowFocus:!1}),B=()=>{if(!n.matches)return;const r=n.matches.filter(s=>(c===""||s.player1_name.toLowerCase().includes(c.toLowerCase())||s.player2_name.toLowerCase().includes(c.toLowerCase()))&&(h===""||s.tournament_name.toLowerCase().includes(h.toLowerCase())));r.length>0?m(r):y(!0),console.log(r)},E=()=>{u(""),p(""),m([])};o.useEffect(()=>{R()},[d]);const[k,j]=o.useState(0),[I,D]=o.useState(0),[F,N]=o.useState(0);function R(){var r;if(((r=n==null?void 0:n.matches)==null?void 0:r.length)>0)for(const s of n.matches)(s==null?void 0:s.result)==="1-0"&&(s==null?void 0:s.player1_name)===t?j(l=>l+1):(s==null?void 0:s.result)==="0-1"&&(s==null?void 0:s.player2_name)===t?j(l=>l+1):(s==null?void 0:s.player1_name)===t&&(s==null?void 0:s.player2_name)==="LIBRE"||(s==null?void 0:s.player2_name)===t&&(s==null?void 0:s.player1_name)==="LIBRE"?j(l=>l+1):(s==null?void 0:s.result)==="1-0"&&(s==null?void 0:s.player2_name)===t?N(l=>l+1):(s==null?void 0:s.result)==="0-1"&&(s==null?void 0:s.player1_name)===t?N(l=>l+1):(s==null?void 0:s.result)==="1/2-1/2"&&D(l=>l+1)}return S?e.jsx("div",{className:"text-center text-danger",children:"Error al cargar el historial del jugador"}):e.jsxs("div",{children:[e.jsxs(z,{className:"py-5",id:"player-history-container",children:[e.jsx("h1",{className:"mb-4",children:t}),L?e.jsx(M,{msg:"Cargando historial de jugador"}):e.jsx("div",{children:Array.isArray(n==null?void 0:n.matches)&&((b=n==null?void 0:n.matches)==null?void 0:b.length)>0?e.jsxs("div",{children:[e.jsxs(a,{className:"mb-4",children:[e.jsx(a.Header,{children:e.jsx(a.Title,{children:"Estadísticas"})}),e.jsx(a.Body,{children:e.jsxs(X,{striped:!0,bordered:!0,hover:!0,responsive:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Victorias"}),e.jsx("th",{children:"Empates"}),e.jsx("th",{children:"Derrotas"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:k}),e.jsx("td",{children:I}),e.jsx("td",{children:F})]})})]})})]}),e.jsx(a,{className:"mb-4",children:e.jsx(a.Body,{children:e.jsxs(w,{className:"g-3",children:[e.jsx(x,{xs:12,sm:6,md:4,children:e.jsxs(i.Group,{children:[e.jsx(i.Label,{children:"Buscar por jugador"}),e.jsx(i.Control,{type:"text",placeholder:"Nombre del jugador",value:c,onChange:r=>u(r.target.value)})]})}),e.jsx(x,{xs:12,sm:6,md:4,children:e.jsxs(i.Group,{children:[e.jsx(i.Label,{children:"Buscar por torneo"}),e.jsx(i.Control,{type:"text",placeholder:"Nombre del torneo",value:h,onChange:r=>p(r.target.value)})]})}),e.jsx(x,{xs:12,md:4,className:"d-flex align-items-end",children:e.jsxs("div",{className:"d-flex gap-2 flex-grow-1",children:[e.jsxs(g,{variant:"primary",onClick:B,className:"flex-grow-1",children:[e.jsx(q,{size:20,className:"me-2"}),"Buscar"]}),e.jsxs(g,{variant:"outline-secondary",onClick:E,className:"flex-grow-1",children:[e.jsx(A,{size:20,className:"me-2"}),"Limpiar"]})]})})]})})}),e.jsx(w,{xs:1,md:2,lg:3,className:"g-4",children:(C=f.length>0?f:n==null?void 0:n.matches)==null?void 0:C.map(r=>e.jsx(x,{children:e.jsxs(a,{className:"h-100",children:[e.jsxs(a.Header,{children:[e.jsxs(a.Title,{className:"h5 mb-0",children:[e.jsx("strong",{children:"Torneo:"})," ",r==null?void 0:r.tournament_name]}),e.jsxs(a.Subtitle,{className:"mt-1",children:[e.jsx("strong",{children:"Ronda "}),r==null?void 0:r.round_number]})]}),e.jsx(a.Body,{children:e.jsxs("div",{className:"match-result",children:[e.jsx("div",{className:"player-name",children:e.jsx("span",{children:r==null?void 0:r.player1_name})}),e.jsx($,{bg:"secondary",children:r==null?void 0:r.result}),e.jsx("div",{className:"player-name",children:e.jsx("span",{children:r==null?void 0:r.player2_name})})]})}),e.jsx(a.Footer,{children:e.jsxs("div",{className:"match-links",children:[(r==null?void 0:r.link)&&e.jsxs("a",{href:r.link,target:"_blank",rel:"noopener noreferrer",className:"btn btn-outline-secondary btn-sm",children:["Ver partida ",e.jsx(K,{})]}),(r==null?void 0:r.pgn)&&e.jsxs("a",{href:r==null?void 0:r.pgn,download:!0,className:"btn btn-outline-primary btn-sm",onClick:s=>{s.preventDefault(),window.open(r.pgn,"_blank")},children:["Descargar PGN ",e.jsx(O,{size:16})]})]})})]})},r.match_id))})]}):e.jsx("h2",{children:"No hay historial"})})]}),e.jsx(W,{show:_,setShow:y,msg:"No se encuentro ninguna partida."})]})}function te(){return e.jsx(Q,{children:e.jsx(J,{})})}export{J as PlayerHistoryContent,te as default};
