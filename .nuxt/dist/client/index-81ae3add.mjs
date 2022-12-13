import{_ as A,U as j,a as H,g as T,r as w,m as J,p as W,o as a,h as U,l as h,q as P,c as _,T as M,b as n,F,f as G,w as V,s as R,t as x,d as S,x as K,y as Q,z as X,A as L,B as Y,C as B,D as E,j as z,e as k,i as Z}from"./entry-8e6d833f.mjs";const $={__name:"FilterOverlay",props:{show:{type:Boolean,required:!0}},emits:["close","reset-page"],setup(m,{expose:s,emit:g}){s();const e=m,d=j(),{$showToast:b}=H(),c=T({});d.games.forEach(o=>{o.genres.forEach(i=>{Object.prototype.hasOwnProperty.call(c,i)?c[i]++:c[i]=1})});const t=T({});d.games.forEach(o=>{o.completed?Object.prototype.hasOwnProperty.call(t,"Uitgespeeld")?t.Uitgespeeld++:t.Uitgespeeld=1:Object.prototype.hasOwnProperty.call(t,"Niet uitgespeeld")?t["Niet uitgespeeld"]++:t["Niet uitgespeeld"]=1});const l=T({});d.games.forEach(o=>{Object.prototype.hasOwnProperty.call(l,o.platform)?l[o.platform]++:l[o.platform]=1});const f=w([]),u=w([]),v=w([]),p=w(!1);J(()=>e.show,o=>{W(()=>{o?(p.value=!0,N("add","overflow-y-hidden")):N("remove","overflow-y-hidden")})});const N=(o,i)=>{const y=document.documentElement;o==="add"?y.classList.add(i):y.classList.remove(i)},D=()=>{p.value=!1,setTimeout(()=>{g("close")},200)},r={gameStore:d,$showToast:b,props:e,genres:c,completed:t,platforms:l,checkedGenres:f,checkedCompleted:u,checkedPlatforms:v,emit:g,showOverlay:p,toggleHtmlClass:N,handleClose:D,setFilters:async o=>{let i=[],y;d.hasFiltered?(y=await d.getAllGames(),y=y.value):y=JSON.parse(JSON.stringify(d.games)),f.value.length>0&&(i=y.filter(O=>O.genres.some(q=>f.value.includes(q)))),u.value.length>0&&(i=i.length>0?i:y,i=i.filter(O=>u.value.includes("Uitgespeeld")&&O.completed||u.value.includes("Niet uitgespeeld")&&!O.completed)),v.value.length>0&&(i=i.length>0?i:y,i=i.filter(O=>v.value.includes(O.platform))),i.length>0?(d.setHasFiltered(!0),o&&(i=[i[Math.floor(Math.random()*i.length)]],console.log(i)),d.setGames(i),g("reset-page"),D()):b("Geen filters gekozen!","warning")},UseGameStore:j};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}},C=m=>(X("data-v-3f2c65dd"),m=m(),L(),m),ee=["onClick"],te={key:0,class:"flex flex-col h-screen z-70 shadow-md bg-gray-800 text-sm relative mr-auto w-screen sm:w-100 transform p-4 overflow-y-auto overflow-x-hidden"},se={class:"flex text-lg"},ne=C(()=>n("h2",null,"Filters",-1)),oe=C(()=>n("hr",{class:"my-3"},null,-1)),le=C(()=>n("h3",null,"Genres",-1)),ae=["id","value"],re=["for"],ie=C(()=>n("br",null,null,-1)),ce={class:"ml-auto text-gray-500"},de=C(()=>n("h3",{class:"mt-6"},"Uitgespeeld",-1)),ge=["id","value"],ue=["for"],_e=C(()=>n("br",null,null,-1)),me={class:"ml-auto text-gray-500"},pe=C(()=>n("h3",{class:"mt-6"},"Platformen",-1)),fe=["id","value"],ve=["for"],he=C(()=>n("br",null,null,-1)),xe={class:"ml-auto text-gray-500"},be={class:"flex gap-3"};function ye(m,s,g,e,d,b){return a(),U(Q,{to:"body"},[h(M,{name:"dialog"},{default:P(()=>[g.show?(a(),_("div",{key:0,class:"z-50 fixed w-full h-screen flex items-center",style:{background:"rgba(0,0,0,0.5)"},onClick:K(e.handleClose,["self"])},[h(M,{"enter-class":"translate-x-full","leave-to-class":"-translate-x-full","enter-active-class":"transition-all duration-200 ease-in","leave-active-class":"transition-all duration-200 ease-out"},{default:P(()=>[e.showOverlay?(a(),_("div",te,[n("div",se,[ne,n("div",{class:"ml-auto cursor-pointer font-bold",onClick:s[0]||(s[0]=c=>e.emit("close"))},"X")]),oe,le,(a(!0),_(F,null,G(e.genres,(c,t)=>(a(),_("div",{key:t,class:"flex gap-1.5 w-60"},[V(n("input",{id:t,"onUpdate:modelValue":s[1]||(s[1]=l=>e.checkedGenres=l),type:"checkbox",value:t},null,8,ae),[[R,e.checkedGenres]]),n("label",{for:t,class:"text-sm"},x(t),9,re),ie,n("p",ce,x(c),1)]))),128)),de,(a(!0),_(F,null,G(e.completed,(c,t)=>(a(),_("div",{key:t,class:"flex gap-1.5 w-40"},[V(n("input",{id:t,"onUpdate:modelValue":s[2]||(s[2]=l=>e.checkedCompleted=l),type:"checkbox",value:t},null,8,ge),[[R,e.checkedCompleted]]),n("label",{for:t,class:"text-sm"},x(t),9,ue),_e,n("p",me,x(c),1)]))),128)),pe,(a(!0),_(F,null,G(e.platforms,(c,t)=>(a(),_("div",{key:t,class:"flex gap-1.5 w-88"},[V(n("input",{id:t,"onUpdate:modelValue":s[3]||(s[3]=l=>e.checkedPlatforms=l),type:"checkbox",value:t},null,8,fe),[[R,e.checkedPlatforms]]),n("label",{for:t,class:"text-sm"},x(t),9,ve),he,n("p",xe,x(c),1)]))),128)),n("button",{class:"bg-violet-600 hover:bg-violet-800 rounded-md font-bold py-2 px-4 my-3 transition duration-200",onClick:s[4]||(s[4]=c=>e.setFilters(!1))}," Filters toepassen "),n("div",be,[n("button",{class:"bg-gray-600 hover:bg-gray-700 rounded-md font-bold py-2 px-4 transition duration-200 w-full",onClick:s[5]||(s[5]=c=>e.setFilters(!0))}," Kies game! "),n("button",{class:"bg-gray-600 hover:bg-gray-700 rounded-md font-bold py-2 px-4 transition duration-200 w-full",onClick:s[6]||(s[6]=c=>e.gameStore.removeFilters())}," Filters verwijderen ")])])):S("",!0)]),_:1})],8,ee)):S("",!0)]),_:1})])}var Pe=A($,[["render",ye],["__scopeId","data-v-3f2c65dd"]]);const ke={__name:"GamesPaginationButton",props:{isDisabled:{type:Boolean,default:!1}},setup(m,{expose:s}){s();const e={props:m};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}};function we(m,s,g,e,d,b){return a(),_("button",{class:B(["rounded-md font-bold py-2 px-2.5 sm:px-4 my-3 transition duration-200 text-sm",e.props.isDisabled?"bg-violet-800 cursor-not-allowed":"bg-violet-600 hover:bg-violet-800"])},[Y(m.$slots,"default")],2)}var Se=A(ke,[["render",we]]);const Ce={__name:"GamesPagination",props:{currentPage:{type:Number,default:0},numPerPage:{type:Number,default:30}},emits:["next","prev","change"],setup(m,{expose:s,emit:g}){s();const e=m,d=j(),b=E(()=>Math.ceil(d.games.length/e.numPerPage)-1),c=E(()=>{const f=[];let u=e.currentPage,v=0;for(;v<3&&u>=1;)console.log(u),u!==e.currentPage&&f.push(u),v++,u--;return f.reverse()}),t=E(()=>{const f=[];let u=e.currentPage,v=0;for(;v<3&&u<b.value;)u!==e.currentPage&&f.push(u),v++,u++;return f}),l={gameStore:d,props:e,emit:g,lastPage:b,prevRange:c,nextRange:t,UseGameStore:j};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}},Ne={class:"flex justify-between"},Fe={class:"flex gap-2 mx-auto"},Ge=k(" 1 "),Oe={key:0,class:"mt-auto mb-2.5"},Ue={key:2,class:"mt-auto mb-2.5"};function je(m,s,g,e,d,b){const c=z("font-awesome-icon"),t=Se;return a(),_("div",Ne,[h(t,{"is-disabled":e.props.currentPage===0,class:"hidden sm:block",onClick:s[0]||(s[0]=l=>e.emit("prev"))},{default:P(()=>[h(c,{icon:"fa-solid fa-angle-left"})]),_:1},8,["is-disabled"]),n("div",Fe,[h(t,{"is-disabled":e.props.currentPage===0,onClick:s[1]||(s[1]=l=>e.emit("change",0))},{default:P(()=>[Ge]),_:1},8,["is-disabled"]),e.props.currentPage>3?(a(),_("p",Oe,"...")):S("",!0),(a(!0),_(F,null,G(e.prevRange,l=>(a(),U(t,{key:l,"is-disabled":l===e.props.currentPage,onClick:f=>e.emit("change",l)},{default:P(()=>[k(x(l+1),1)]),_:2},1032,["is-disabled","onClick"]))),128)),g.currentPage!==0&&g.currentPage!==e.lastPage?(a(),U(t,{key:1,"is-disabled":""},{default:P(()=>[k(x(g.currentPage+1),1)]),_:1})):S("",!0),(a(!0),_(F,null,G(e.nextRange,l=>(a(),U(t,{key:l,"is-disabled":l===e.props.currentPage,onClick:f=>e.emit("change",l)},{default:P(()=>[k(x(l+1),1)]),_:2},1032,["is-disabled","onClick"]))),128)),e.lastPage-g.currentPage>3?(a(),_("p",Ue,"...")):S("",!0),h(t,{"is-disabled":e.props.currentPage===e.lastPage,onClick:s[2]||(s[2]=l=>e.emit("change",e.lastPage))},{default:P(()=>[k(x(e.lastPage+1),1)]),_:1},8,["is-disabled"])]),h(t,{class:"hidden sm:block","is-disabled":e.props.currentPage===e.lastPage,onClick:s[3]||(s[3]=l=>e.emit("next"))},{default:P(()=>[h(c,{icon:"fa-solid fa-angle-right"})]),_:1},8,["is-disabled"])])}var Be=A(Ce,[["render",je]]);const Ee={__name:"index",async setup(m,{expose:s}){s();let g,e;const d=j(),b=([g,e]=Z(()=>d.getAllGames()),g=await g,e(),g);d.setGames(b);const c=w(!1),t=w(0),l=w(30),f=w(!1),u=r=>{let o="/images/";return r==="Nintendo Entertainment System (NES)"?o+="nes.png":r==="Super Nintendo Entertainment System (SNES)"?o+="snes.png":r==="Nintendo 64"?o+="n64.png":r==="Nintendo GameCube"?o+="gc.png":r==="Wii"?o+="wii.png":r==="Wii U"?o+="wii-u.png":r==="Nintendo Switch"?o+="switch.png":r==="Game Boy"?o+="gb.png":r==="Game Boy Color"?o+="gbc.png":r==="Game Boy Advance"?o+="gba.png":r==="Nintendo DS"?o+="ds.png":r==="Nintendo 3DS"?o+="3ds.png":r==="PlayStation"?o+="ps.png":r==="PlayStation 2"?o+="ps2.png":r==="PlayStation 3"?o+="ps3.png":r==="PlayStation 4"?o+="ps4.png":r==="Xbox"?o+="xbox.png":r==="Xbox 360"?o+="xbox-360.png":r==="Xbox One"?o+="xbox-one.png":o+="md.png",o},v=E(()=>{const r=d.games.slice().reverse();return f.value?r:d.games}),I={gameStore:d,games:b,openFilters:c,page:t,numPerPage:l,isSortedUp:f,getImage:u,gamesArray:v,previousPage:()=>{t.value!==0&&t.value--},nextPage:()=>{t.value++},toggleSorted:()=>{f.value=!f.value},UseGameStore:j};return Object.defineProperty(I,"__isScriptSetup",{enumerable:!1,value:!0}),I}},Ae=m=>(X("data-v-6262a8e6"),m=m(),L(),m),De={class:"flex justify-between text-sm mb-3"},Ie={class:"text-gray-500"},Te={key:0},Ve=k(" Sorteren: "),Re=Ae(()=>n("span",{class:"text-gray-500"},"Toegevoegd ",-1)),ze={class:"text-violet-500 cursor-pointer"},Me=k(" Filters"),Xe={class:"grid grid-cols-12 gap-4 mb-1"},Le=["src"],qe={class:"info absolute top-4 left-0 opacity-0 transition duration-200 w-full"},He={class:"text-center"},Je={class:"text-center mt-3"},We={class:"text-center mt-3"},Ke=k("Platform: "),Qe=["src"],Ye={class:"text-center mt-3"},Ze=k(" Uitgespeeld: "),$e={class:"info absolute bottom-2 left-2 opacity-0 transition duration-200 text-xxs flex gap-2 flex-wrap"};function et(m,s,g,e,d,b){var u,v;const c=Pe,t=z("font-awesome-icon"),l=z("font-awesome-layers"),f=Be;return a(),_("div",null,[h(c,{show:e.openFilters,onResetPage:s[0]||(s[0]=p=>e.page=0),onClose:s[1]||(s[1]=p=>e.openFilters=!1)},null,8,["show"]),n("div",De,[n("div",Ie,[k(x((u=e.gameStore.games)==null?void 0:u.length)+" game",1),((v=e.gameStore.games)==null?void 0:v.length)>1?(a(),_("span",Te,"s")):S("",!0)]),n("p",null,[Ve,Re,h(l,{class:"cursor-pointer",onClick:e.toggleSorted},{default:P(()=>[h(t,{icon:"sort-down",class:B({"text-gray-500":e.isSortedUp})},null,8,["class"]),h(t,{icon:"sort-up",class:B({"text-gray-500":!e.isSortedUp})},null,8,["class"])]),_:1})]),n("p",ze,[n("span",{onClick:s[2]||(s[2]=p=>e.openFilters=!0)},[h(t,{icon:"fa-solid fa-filter"}),Me]),e.gameStore.hasFiltered?(a(),U(t,{key:0,icon:"fa-solid fa-circle-xmark",class:"text-gray-500 ml-1",onClick:s[3]||(s[3]=p=>e.gameStore.removeFilters())})):S("",!0)])]),n("div",Xe,[(a(!0),_(F,null,G(e.gamesArray.slice(e.page*e.numPerPage,e.page*e.numPerPage+e.numPerPage),p=>(a(),_("div",{id:"game",key:p._id,class:"col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2 relative"},[n("img",{src:p.cover,class:"mx-auto rounded-md transition duration-200 border-2 border-gray-700 h-full"},null,8,Le),n("div",qe,[n("h3",He,x(p.name),1),n("p",Je,"Release: "+x(p.releaseDate),1),n("p",We,[Ke,n("img",{src:e.getImage(p.platform),class:"inline"},null,8,Qe)]),n("p",Ye,[Ze,h(t,{icon:`fa-solid fa-${p.completed?"check-circle":"circle-xmark"}`,class:B(p.completed?"text-green-500":"text-red-500")},null,8,["icon","class"])])]),n("div",$e,[(a(!0),_(F,null,G(p.genres,N=>(a(),_("div",{key:N,class:"bg-violet-600 pt-1 pb-0.5 px-2 rounded-full"},x(N),1))),128))])]))),128))]),e.gameStore.games.length>e.numPerPage?(a(),U(f,{key:0,"current-page":e.page,"num-per-page":e.numPerPage,"num-games":e.gameStore.games.length,onNext:e.nextPage,onPrev:e.previousPage,onChange:s[4]||(s[4]=p=>e.page=p)},null,8,["current-page","num-per-page","num-games"])):S("",!0)])}var st=A(Ee,[["render",et],["__scopeId","data-v-6262a8e6"]]);export{st as default};