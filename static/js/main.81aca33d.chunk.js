(this["webpackJsonpkeadatabase-clientsearch"]=this["webpackJsonpkeadatabase-clientsearch"]||[]).push([[0],{106:function(e,n,a){e.exports=a(299)},294:function(e,n,a){},299:function(e,n,a){"use strict";a.r(n);var r=a(0),t=a.n(r),l=a(7),o=a.n(l),u=a(53),c=a(104),i=a(101),s=a(102),m=a(103),d=a(105),b=a(54),p=a(18),f=(a(292),a(293),{Metal:"M",Uncoloured:"M","Pale Orange":"PO","Neon Orange":"NO","Fluoro Orange":"NO","Pale Pink":"PP","Neon Pink":"NP","Fluoro Pink":"NP","Hot Pink":"NP","Dark Pink":"CP","Pale Blue":"PB","Light Blue":"LB","Medium Blue":"B","Dark Blue":"DB","Neon Green":"NG","Fluoro Green":"NG","Light Green":"LG","Lime Green":"LG","Pale Green":"PG","Medium Green":"G","Dark Green":"DG","Light Purple":"LPu",Black:"K",Grey:"Gr",White:"W",Red:"R",Orange:"O",Yellow:"Y",Pink:"P",Crimson:"CP",Purple:"Pu",Blue:"B",Green:"G",Brown:"Br"}),v={metal:"M",uncoloured:"M",paleorange:"PO",neonorange:"NO",fluoroorange:"NO",palepink:"PP",neonpink:"NP",fluoropink:"NP",hotpink:"NP",crimson:"CP",darkpink:"CP",lightpurple:"LPu",paleblue:"PB",lightblue:"LB",mediumblue:"B",darkblue:"DB",neongreen:"NG",fluorogreen:"NG",lightgreen:"LG",limegreen:"LG",palegreen:"PG",mediumgreen:"G",darkgreen:"DG",black:"K",grey:"Gr",white:"W",red:"R",orange:"O",yellow:"Y",pink:"P",purple:"Pu",blue:"B",green:"G",brown:"Br"},k=function(e,n){return Object.keys(n).reduce((function(e,a){return e.replace(new RegExp("\\b".concat(a,"\\b"),"gi"),n[a])}),e)},g=function(e){return k(k(e,f),v)},y=a(13),E=y.compile({symbol:{match:/\S+\son\s/,value:function(e){return e.match(/\S+/)[0]}},symbolColour:/^[a-zA-Z]+/,bandColour:/[a-zA-Z]+$/,WS:/[ \t]+/,error:y.error}),h=y.compile({bandColour:/^[a-zA-Z]+/,inscription:{match:/\(\S+\)/,value:function(e){return e.match(/[^()]+/)[0]}},error:y.error}),B=y.compile({symbolBand:/\w+\s\S+\son\s\w+/,partSeparator:/\/\//,bandSeparator:/\//,legSeparator:/-/,colouredIdBand:/[a-zA-Z]+\(\S+\)/,uncolouredIdBand:/\(\S+\)/,nullBand:/x/,colouredBand:/[a-zA-Z]+/,WS:/[ \t]+/,error:y.error}),P=function(e){return B.reset(e),Array.from(B).map((function(e){switch(e.type){case"symbolBand":E.reset(e.value);break;case"uncolouredIdBand":h.reset("M".concat(e.value));break;case"colouredIdBand":h.reset(e.value)}switch(e.type){case"symbolBand":return Object.assign({},e,{type:"tokenisedSymbolBand"},{tokens:Array.from(E)});case"uncolouredIdBand":case"colouredIdBand":return Object.assign({},e,{type:"tokenisedIdBand"},{tokens:Array.from(h)});default:return e}})).filter((function(e){return"WS"!==e.type}))},C={M:{label:"Metal",value:"linear-gradient(to right,#808080, #ddd, #808080)"},PO:{label:"Pale Orange",value:"#FFD03B"},NO:{label:"Neon Orange",value:"#FFB343"},PP:{label:"Pale Pink",value:"#FBC6B7"},NP:{label:"Neon Pink",value:"#FF4BF2"},LPu:{label:"Light Purple",value:"#AE5DFF"},PB:{label:"Pale Blue",value:"#9EC7F8"},LB:{label:"Light Blue",value:"#2B8FB3"},B:{label:"Medium Blue",value:"#0060EE"},DB:{label:"Dark Blue",value:"#0000D6"},NG:{label:"Neon Green",value:"#00FF00"},LG:{label:"Light Green",value:"#ABFE82"},PG:{label:"Pale Green",value:"#4DC350"},G:{label:"Medium Green",value:"#00A800"},DG:{label:"Dark Green",value:"#003A00"},K:{label:"Black",value:"#000000"},Gr:{label:"Grey",value:"#808080"},W:{label:"White",value:"#ffffff"},R:{label:"Red",value:"#DA0000"},O:{label:"Orange",value:"#FF6600"},Y:{label:"Yellow",value:"#F4EE00"},P:{label:"Pink",value:"#FE94FE"},CP:{label:"Crimson",value:"#CC044B"},Pu:{label:"Purple",value:"#9900CC"},Br:{label:"Brown",value:"#996633"}},N=function e(n){return n.map((function(n){var a=["symbolColour","bandColour","colouredBand"].includes(n.type);return Object.assign({},n,{isColourToken:a},a&&{colour:C[n.value]},n.tokens&&{tokens:e(n.tokens)})}))},F=function(e,n){return e.reduce((function(e,a){return a.includes(n)?e+=1:e}),0)},G=function(e){return e.filter((function(e){return e.type.includes("Separator")})).map((function(e){return e.type})).join(" ").trim()},O=function(e){return Object.values(e).reduce((function(e,n){return n.validator&&e}),!0)},S=function(e){return F(G(e).split(" "),"legSeparator")<=1},w=function(e){return G(e).split("legSeparator").reduce((function(e,n){return F(n.split(" "),"partSeparator")<=1&&e}),!0)},j=function e(n){return n.reduce((function(n,a){var r=Object.assign({},a.tokens&&{areChildrenValid:{validator:e(a.tokens)}},a.isColourToken&&{validColour:{validator:void 0!==a.colour}},{validPredecessors:{validator:n}});return O(r)}),!0)},L=function(e){var n={legSeparators:{label:"Leg separators valid?",validator:S(e)},partSeparators:{label:"Part separators valid?",validator:w(e)},colours:{label:"Colours valid?",validator:j(e)}};return{isValid:O(n),validators:n}},D=function(e){var n=N(P(g(e)));return L(n).isValid?n:void 0},M=(a(294),function(e){var n=e.colour;return t.a.createElement(t.a.Fragment,null,t.a.createElement("div",{className:"d-inline-block mr-1",style:{background:C[n].value,width:10,height:10,border:"1px solid #000"}}),C[n].label)}),R=function(e){var n=e.bandCombo;return t.a.createElement("div",{className:"col-md-3"},t.a.createElement("div",{className:"card mb-3"},t.a.createElement("div",{className:"card-body"},t.a.createElement("div",{className:"card-text"},t.a.createElement("small",null,n.bird.slug),t.a.createElement("h2",{className:"h5"},n.name),t.a.createElement("dl",{className:"mb-0"},n.colours&&t.a.createElement(t.a.Fragment,null,t.a.createElement("dt",null,"Colours"),n.colours.map((function(e){return t.a.createElement("dd",{key:e,className:"mr-2 d-inline-block"},t.a.createElement(M,{key:e,colour:e}))}))),n.symbols&&t.a.createElement(t.a.Fragment,null,t.a.createElement("dt",null,"Symbols"),n.symbols.map((function(e){return t.a.createElement("dd",{key:e,className:"mr-2 d-inline-block"},e)}))))))))},T=function(e){var n=e.bandCombos;return t.a.createElement("div",{className:"BandCombos"},t.a.createElement("div",{className:"row"},n.map((function(e){return t.a.createElement(R,{key:e.bird.slug,bandCombo:e})}))))},A=function e(n){return n&&n.reduce((function(n,a){return n.concat(a.tokens&&e(a.tokens)||a)}),[])},W=function(e){return Object(b.a)(new Set(e.filter((function(e){return e&&e.isColourToken})).map((function(e){return e.value}))))},z=function(e){return Object(b.a)(new Set(e.filter((function(e){return e&&"symbol"===e.type})).map((function(e){return e.value}))))},I=function(e){Object(d.a)(a,e);var n=Object(m.a)(a);function a(e){var r;return Object(i.a)(this,a),(r=n.call(this,e)).state={selected:[]},r}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.props.lazyFetchBandCombos()}},{key:"render",value:function(){var e=this;if(!this.props.bandCombosFetch)return null;var n,a=this.props,r=a.bandCombosFetch,l=Object(c.a)(a,["bandCombosFetch"]);if(r.pending)return t.a.createElement("span",null,"Loading");if(r.rejected)return t.a.createElement("span",null,"Error");if(r.fulfilled){var o=r.value.results.map((function(e){var n=D(e.name),a=A(n);return Object.assign({},e,{tokens:n,flattenedTokens:A(n)},n&&{colours:W(a),symbols:z(a)})})),u=(n=o.map((function(e){return e.flattenedTokens})))&&n.reduce((function(e,n){return e.concat(n)}),[]),i=z(u).sort(),s=W(u).sort(),m=[].concat(i.map((function(e){return Object.assign({},{symbol:e,label:e},{isSymbol:!0,isColour:!1})}))).concat(s.map((function(e){return Object.assign({},{colour:e},{isColour:!0,isSymbol:!1},C[e])}))),d=o.filter((function(n){return!(e.state.selected.length>0)||e.state.selected.reduce((function(e,a){return a.isColour&&n.colours?n.colours.includes(a.colour)&&e:a.isSymbol&&n.symbols?n.symbols.includes(a.symbol)&&e:e}),!0)}));return t.a.createElement(t.a.Fragment,null,t.a.createElement("button",{onClick:this.props.lazyFetchBandCombos,className:"btn btn-primary mb-3"},"Refresh"),t.a.createElement("div",{className:"card mb-3"},t.a.createElement("div",{className:"card-body"},t.a.createElement("div",{className:"card-text"},t.a.createElement("dl",{className:"mb-0"},t.a.createElement("dt",null,"Colours"),s.map((function(e){return t.a.createElement("dd",{key:e,className:"mr-2 d-inline-block"},t.a.createElement(M,{key:e,colour:e}))})),t.a.createElement("dt",null,"Symbols"),i.map((function(e){return t.a.createElement("dd",{key:e,className:"mr-2 d-inline-block"},e)})))))),t.a.createElement(p.Typeahead,{className:"BandComboTypeahead mb-3",options:m,selectHintOnEnter:!0,highlightOnlyResult:!0,name:"bandCombo",placeholder:"Type band symbol or colour",id:"bandCombo",ignoreDiacritics:!1,maxResults:100,paginationText:"Display more\u2026",multiple:!0,selected:this.state.selected,onChange:function(n){return e.setState({selected:n})},renderToken:function(e,n,a){return e.isColour?t.a.createElement(p.Token,{onRemove:n.onRemove,option:e,key:a,className:"token-colour"},t.a.createElement(M,{colour:e.colour})):e.isSymbol?t.a.createElement(p.Token,{onRemove:n.onRemove,option:e,key:a,className:"token-symbol"},t.a.createElement("strong",null,e.label)):t.a.createElement(p.Token,{onRemove:n.onRemove,option:e},t.a.createElement(t.a.Fragment,null,e))},renderMenuItemChildren:function(e,n,a){return e.isColour?t.a.createElement(t.a.Fragment,null,t.a.createElement(M,{colour:e.colour}),t.a.createElement("small",{className:"ml-2"},"(Colour)")):e.isSymbol?t.a.createElement(t.a.Fragment,null,e.label,t.a.createElement("small",{className:"ml-2"},"(Symbol)")):t.a.createElement(t.a.Fragment,null,e)}}),t.a.createElement(T,Object.assign({bandCombos:d},l)))}}}]),a}(r.Component),x=Object(u.connect)((function(e){return{lazyFetchBandCombos:function(){return{bandCombosFetch:{url:"".concat("https://data.keadatabase.nz/band_combos/"),force:!0}}}}}))(I),Z=function(){return t.a.createElement("main",null,t.a.createElement("div",{className:"container my-3"},t.a.createElement("h1",null,"Band Combo Engine ",t.a.createElement("small",null,"NZBBTEF PoC")),t.a.createElement(x,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(295),a(296),a(298);o.a.render(t.a.createElement(t.a.StrictMode,null,t.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[106,1,2]]]);
//# sourceMappingURL=main.81aca33d.chunk.js.map