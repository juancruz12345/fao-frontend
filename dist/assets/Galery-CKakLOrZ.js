import{r as u,j as e,z as f,S as w,y as v,T,O as E,C as P,Q as k,M as F}from"./index-BKcmjB81.js";import{M as m}from"./Modal-m-gOewV2.js";import{I as G}from"./Image-CA1Kp4T7.js";import{R as M,C as S}from"./Row-CY8um4bv.js";import{C as y}from"./Card-Kh-DD9Gn.js";const p=u.forwardRef(({active:t=!1,disabled:r=!1,className:s,style:n,activeLabel:o="(current)",children:c,linkStyle:l,linkClassName:j,as:i=w,...h},a)=>{const d=t||r?"span":i;return e.jsx("li",{ref:a,style:n,className:f(s,"page-item",{active:t,disabled:r}),children:e.jsxs(d,{className:f("page-link",j),style:l,...h,children:[c,t&&o&&e.jsx("span",{className:"visually-hidden",children:o})]})})});p.displayName="PageItem";function g(t,r,s=t){const n=u.forwardRef(({children:o,...c},l)=>e.jsxs(p,{...c,ref:l,children:[e.jsx("span",{"aria-hidden":"true",children:o||r}),e.jsx("span",{className:"visually-hidden",children:s})]}));return n.displayName=t,n}const A=g("First","«"),B=g("Prev","‹","Previous"),R=g("Ellipsis","…","More"),_=g("Next","›"),L=g("Last","»"),C=u.forwardRef(({bsPrefix:t,className:r,size:s,...n},o)=>{const c=v(t,"pagination");return e.jsx("ul",{ref:o,...n,className:f(r,c,s&&`${c}-${s}`)})});C.displayName="Pagination";const x=Object.assign(C,{First:A,Prev:B,Ellipsis:R,Item:p,Next:_,Last:L});function b({show:t,setShow:r,img:s}){const n=()=>r(!1),o=c=>{const l={year:"numeric",month:"long",day:"numeric"};return new Date(c).toLocaleDateString("es-ES",l)};return e.jsxs(m,{show:t,onHide:n,centered:!0,fullscreen:!0,className:"fullscreen-image-modal",children:[e.jsx(m.Header,{closeButton:!0,closeVariant:"white",children:e.jsx(m.Title,{children:(s==null?void 0:s.title)||""})}),e.jsx(m.Body,{className:"text-center p-0",children:e.jsx("div",{className:"image-container",children:e.jsx(G,{src:s==null?void 0:s.url,alt:(s==null?void 0:s.title)||"Image preview",className:"modal-image"})})}),e.jsx(m.Footer,{children:e.jsxs("div",{className:"img-meta",children:[e.jsx(T,{}),e.jsx("span",{children:s!=null&&s.created_at?o(s.created_at):""})]})})]})}const N=u.createContext();function $(){return F({queryKey:["images"],queryFn:async()=>{console.log("Fetching images from API...");const t=await fetch("https://fao-backend.onrender.com/images",{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"});if(!t.ok)throw new Error("Error al cargar las imagenes");return t.json()},staleTime:1e3*60*5,cacheTime:1e3*60*10,refetchOnWindowFocus:!1})}function D(t=1,r=10){const{imgs:s}=u.useContext(N);if(!s)throw new Error("no context");const[n,o]=u.useState(t),{paginatedImgs:c,totalPages:l}=u.useMemo(()=>{const i=(n-1)*r,h=i+r,a=s.slice(i,h),d=Math.ceil(s.length/r);return{paginatedImgs:a,totalPages:d}},[s,n,r]);return{imgs:c,totalPages:l,currentPage:n,goToPage:i=>{o(i)}}}function O({children:t}){const{data:r=[],isLoading:s,error:n}=$();return s?e.jsx(E,{msg:"Cargando galería"}):n?e.jsx(P,{className:"py-5",children:e.jsxs(k,{variant:"danger",children:["Error: ",n]})}):e.jsx(N.Provider,{value:{imgs:r},children:t})}function q(){const[t,r]=u.useState(!1),[s,n]=u.useState({}),{imgs:o,totalPages:c,currentPage:l,goToPage:j}=D(),i=a=>{j(a),window.scrollTo(0,0)},h=a=>{const d=a.currentTarget.src,I=a.currentTarget.alt;if(d!==""||d!==null||d!==void 0)n({url:d,title:I,created_at:a.currentTarget.id}),r(!0);else return};return e.jsxs(P,{className:"py-5",children:[e.jsx("h1",{className:"text-center mb-4",children:"Galería de fotos"}),e.jsx("p",{className:"text-center mb-5",children:"Explora nuestra colección de imágenes."}),e.jsx(M,{xs:1,sm:2,md:3,lg:4,className:"g-4",children:Array.isArray(o)&&(o==null?void 0:o.map((a,d)=>e.jsx(S,{children:e.jsx(y,{className:"h-100",id:"card-galery",children:e.jsx(y.Img,{loading:"lazy",variant:"top",src:a.url,alt:a.title||`Image ${d+1}`,style:{height:"200px",objectFit:"cover"},onClick:h,created_at:a.created_at,id:a.created_at})})},d)))}),e.jsx("div",{className:"d-flex justify-content-center mt-4",children:e.jsxs(x,{children:[e.jsx(x.First,{onClick:()=>i(1),disabled:l===1}),e.jsx(x.Prev,{onClick:()=>i(l-1),disabled:l===1}),[...Array(c).keys()].map(a=>e.jsx(x.Item,{active:a+1===l,onClick:()=>i(a+1),children:a+1},a+1)),e.jsx(x.Next,{onClick:()=>i(l+1),disabled:l===c}),e.jsx(x.Last,{onClick:()=>i(c),disabled:l===c})]})}),e.jsx(b,{show:t,setShow:r,img:s})]})}function V(){return e.jsx(O,{children:e.jsx(q,{})})}export{q as GaleryContent,V as default};
