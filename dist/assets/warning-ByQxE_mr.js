import{r as n,ai as m}from"./index-BHeBwaQY.js";import{u as g}from"./useWillUnmount-km8qQ_co.js";function l(){const e=n.useRef(!0),r=n.useRef(()=>e.current);return n.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]),r.current}const i=2**31-1;function f(e,r,t){const u=t-Date.now();e.current=u<=i?setTimeout(r,u):setTimeout(()=>f(e,r,t),i)}function E(){const e=l(),r=n.useRef();return g(()=>clearTimeout(r.current)),n.useMemo(()=>{const t=()=>clearTimeout(r.current);function u(c,o=0){e()&&(t(),o<=i?r.current=setTimeout(c,o):f(r,c,Date.now()+o))}return{set:u,clear:t,handleRef:r}},[])}var s,a;function w(){if(a)return s;a=1;var e=function(){};return s=e,s}var T=w();const v=m(T);export{E as u,v as w};
