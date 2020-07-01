(this["webpackJsonpkeadatabase-clientsearch"]=this["webpackJsonpkeadatabase-clientsearch"]||[]).push([[0],{35:function(e,a,n){e.exports=n(72)},67:function(e,a,n){},72:function(e,a,n){"use strict";n.r(a);var r=n(0),t=n.n(r),l=n(13),o=n.n(l),u=n(33),i=n(27),c=n(28),s=n(32),m=n(34),d=n(15),b=n(29),p=n(14),f=(n(66),{Metal:"M",Uncoloured:"M","Pale Orange":"PO","Neon Orange":"NO","Fluoro Orange":"NO","Pale Pink":"PP","Neon Pink":"NP","Fluoro Pink":"NP","Hot Pink":"NP","Dark Pink":"CP","Pale Blue":"PB","Light Blue":"LB","Medium Blue":"B","Dark Blue":"DB","Neon Green":"NG","Fluoro Green":"NG","Light Green":"LG","Lime Green":"LG","Pale Green":"PG","Medium Green":"G","Dark Green":"DG","Light Purple":"LPu",Black:"K",Grey:"Gr",White:"W",Red:"R",Orange:"O",Yellow:"Y",Pink:"P",Crimson:"CP",Purple:"Pu",Blue:"B",Green:"G",Brown:"Br"}),y={metal:"M",uncoloured:"M",paleorange:"PO",neonorange:"NO",fluoroorange:"NO",palepink:"PP",neonpink:"NP",fluoropink:"NP",hotpink:"NP",crimson:"CP",darkpink:"CP",lightpurple:"LPu",paleblue:"PB",lightblue:"LB",mediumblue:"B",darkblue:"DB",neongreen:"NG",fluorogreen:"NG",lightgreen:"LG",limegreen:"LG",palegreen:"PG",mediumgreen:"G",darkgreen:"DG",black:"K",grey:"Gr",white:"W",red:"R",orange:"O",yellow:"Y",pink:"P",purple:"Pu",blue:"B",green:"G",brown:"Br"},v=function(e,a){return Object.keys(a).reduce((function(e,n){return e.replace(new RegExp("\\b".concat(n,"\\b"),"gi"),a[n])}),e)},k=function(e){return v(v(e,f),y)},g=n(10),B=g.compile({symbol:{match:/\S+\son\s/,value:function(e){return e.match(/\S+/)[0]}},symbolColour:/^[a-zA-Z]+/,bandColour:/[a-zA-Z]+$/,WS:/[ \t]+/,error:g.error}),E=g.compile({bandColour:/^[a-zA-Z]+/,inscription:{match:/\(\S+\)/,value:function(e){return e.match(/[^()]+/)[0]}},error:g.error}),h=g.compile({symbolBand:/\w+\s\S+\son\s\w+/,partSeparator:/\/\//,bandSeparator:/\//,legSeparator:/-/,colouredIdBand:/[a-zA-Z]+\(\S+\)/,uncolouredIdBand:/\(\S+\)/,nullBand:/x/,colouredBand:/[a-zA-Z]+/,WS:/[ \t]+/,error:g.error}),P=function(e){return h.reset(e),Array.from(h).map((function(e){switch(e.type){case"symbolBand":B.reset(e.value);break;case"uncolouredIdBand":E.reset("M".concat(e.value));break;case"colouredIdBand":E.reset(e.value)}switch(e.type){case"symbolBand":return Object.assign({},e,{type:"tokenisedSymbolBand"},{tokens:Array.from(B)});case"uncolouredIdBand":case"colouredIdBand":return Object.assign({},e,{type:"tokenisedIdBand"},{tokens:Array.from(E)});default:return e}})).filter((function(e){return"WS"!==e.type}))},N={M:{label:"Metal",value:"linear-gradient(to right,#808080, #ddd, #808080)"},PO:{label:"Pale Orange",value:"#FFD03B"},NO:{label:"Neon Orange",value:"#FFB343"},PP:{label:"Pale Pink",value:"#FBC6B7"},NP:{label:"Neon Pink",value:"#FF4BF2"},LPu:{label:"Light Purple",value:"#AE5DFF"},PB:{label:"Pale Blue",value:"#9EC7F8"},LB:{label:"Light Blue",value:"#2B8FB3"},B:{label:"Medium Blue",value:"#0060EE"},DB:{label:"Dark Blue",value:"#0000D6"},NG:{label:"Neon Green",value:"#00FF00"},LG:{label:"Light Green",value:"#ABFE82"},L:{label:"Light Green",value:"#ABFE82"},PG:{label:"Pale Green",value:"#4DC350"},G:{label:"Medium Green",value:"#00A800"},DG:{label:"Dark Green",value:"#003A00"},K:{label:"Black",value:"#000000"},Gr:{label:"Grey",value:"#808080"},W:{label:"White",value:"#ffffff"},R:{label:"Red",value:"#DA0000"},O:{label:"Orange",value:"#FF6600"},Y:{label:"Yellow",value:"#F4EE00"},P:{label:"Pink",value:"#FE94FE"},CP:{label:"Crimson",value:"#CC044B"},Pu:{label:"Purple",value:"#9900CC"},Br:{label:"Brown",value:"#996633"}},O=function e(a){return a.map((function(a){var n=["symbolColour","bandColour","colouredBand"].includes(a.type);return Object.assign({},a,{isColourToken:n},n&&{colour:N[a.value]},a.tokens&&{tokens:e(a.tokens)})}))},C=function(e,a){return e.reduce((function(e,n){return n.includes(a)?e+=1:e}),0)},G=function(e){return e.filter((function(e){return e.type.includes("Separator")})).map((function(e){return e.type})).join(" ").trim()},F=function(e){return Object.values(e).reduce((function(e,a){return a.validator&&e}),!0)},S=function(e){return C(G(e).split(" "),"legSeparator")<=1},w=function(e){return G(e).split("legSeparator").reduce((function(e,a){return C(a.split(" "),"partSeparator")<=1&&e}),!0)},j=function e(a){return a.reduce((function(a,n){var r=Object.assign({},n.tokens&&{areChildrenValid:{validator:e(n.tokens)}},n.isColourToken&&{validColour:{validator:void 0!==n.colour}},{validPredecessors:{validator:a}});return F(r)}),!0)},A=function(e){var a={legSeparators:{label:"Leg separators valid?",validator:S(e)},partSeparators:{label:"Part separators valid?",validator:w(e)},colours:{label:"Colours valid?",validator:j(e)}};return{isValid:F(a),validators:a}},L=function(e){var a=O(P(k(e)));return A(a).isValid?a:void 0},D=(n(67),function(e){var a=e.colour;return t.a.createElement(t.a.Fragment,null,t.a.createElement("div",{className:"d-inline-block mr-1",style:{background:N[a].value,width:10,height:10,border:"1px solid #000"}}),N[a].label)}),M=function(e){var a=e.bird;return t.a.createElement("div",{className:"col-md-3"},t.a.createElement("div",{className:"card mb-3"},t.a.createElement("div",{className:"card-body"},t.a.createElement("div",{className:"card-text"},t.a.createElement("small",null,a.slug),t.a.createElement("h2",{className:"h5"},a.name),t.a.createElement("h3",{className:"h6"},a.band_combo),t.a.createElement("p",null,a.primary_band," \xb7 ",a.study_area),t.a.createElement("dl",{className:"mb-0"},a.colours&&t.a.createElement(t.a.Fragment,null,t.a.createElement("dt",null,"Colours"),a.colours.map((function(e){return t.a.createElement("dd",{key:e,className:"mr-2 d-inline-block"},t.a.createElement(D,{key:e,colour:e}))}))),a.symbols&&t.a.createElement(t.a.Fragment,null,t.a.createElement("dt",null,"Symbols"),a.symbols.map((function(e){return t.a.createElement("dd",{key:e,className:"mr-2 d-inline-block"},e)}))))))))},_=function(e){var a=e.birds;return t.a.createElement("div",{className:"Birds"},t.a.createElement("div",{className:"row"},a.map((function(e){return t.a.createElement(M,{key:e.slug,bird:e})}))))},R=function e(a){return a&&a.reduce((function(a,n){return a.concat(n.tokens&&e(n.tokens)||n)}),[])},z=function(e){return Object(d.a)(new Set(e.filter((function(e){return e&&e.isColourToken})).map((function(e){return e.value}))))},T=function(e){return Object(d.a)(new Set(e.filter((function(e){return e&&"symbol"===e.type})).map((function(e){return e.value}))))},W=function(e){Object(m.a)(n,e);var a=Object(s.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=a.call(this,e)).state={selected:[]},r}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.props.lazyFetchBirds()}},{key:"render",value:function(){var e=this;if(!this.props.birdsFetch)return null;var a=this.props,n=a.birdsFetch,r=Object(u.a)(a,["birdsFetch"]);if(n.pending)return t.a.createElement("span",null,"Loading");if(n.rejected)return t.a.createElement("span",null,"Error");if(n.fulfilled){var l=n.value.results.filter((function(e){return null!==e.band_combo})).map((function(e){var a=L(e.band_combo),n=R(a);return Object.assign({},e,{tokens:a,flattenedTokens:R(a)},a&&{colours:z(n),symbols:T(n)})})),o=l.map((function(e){return e.flattenedTokens})).flat(),i=T(o).sort(),c=z(o).sort(),s=function(e){return e.filter((function(e){return e.name})).map((function(e){return e.name}))}(l).sort(),m=function(e){return e.filter((function(e){return e.primary_band})).map((function(e){return e.primary_band}))}(l).sort(),b=function(e){return Object(d.a)(new Set(e.filter((function(e){return e.study_area})).map((function(e){return e.study_area}))))}(l).sort(),f={isColour:!1,isSymbol:!1,isName:!1,isPrimaryBand:!1,isStudyArea:!1},y=[].concat(c.map((function(e){return Object.assign({},{colour:e},f,{isColour:!0},N[e])}))).concat(i.map((function(e){return Object.assign({},{symbol:e,label:e},f,{isSymbol:!0})}))).concat(s.map((function(e){return Object.assign({},{name:e,label:e},f,{isName:!0})}))).concat(m.map((function(e){return Object.assign({},{primaryBand:e,label:e},f,{isPrimaryBand:!0})}))).concat(b.map((function(e){return Object.assign({},{studyArea:e,label:e},f,{isStudyArea:!0})}))),v=0===this.state.selected.length?l:l.filter((function(a){return e.state.selected.every((function(e){return e.isColour&&a.colours?a.colours.includes(e.colour):e.isSymbol&&a.symbols?a.symbols.includes(e.symbol):e.isName&&a.name?e.name===a.name:e.isPrimaryBand&&a.primary_band?e.primaryBand===a.primary_band:!(!e.isStudyArea||!a.study_area)&&e.studyArea===a.study_area}))}));return t.a.createElement(t.a.Fragment,null,t.a.createElement("button",{onClick:this.props.lazyFetchBirds,className:"btn btn-primary mb-3"},"Refresh"),t.a.createElement("div",{className:"card mb-3"},t.a.createElement("div",{className:"card-body"},t.a.createElement("div",{className:"card-text"},t.a.createElement("dl",{className:"mb-0"},t.a.createElement("dt",null,"Colours"),c.map((function(e){return t.a.createElement("dd",{key:e,className:"mr-2 d-inline-block"},t.a.createElement(D,{key:e,colour:e}))})),t.a.createElement("dt",null,"Symbols"),i.map((function(e){return t.a.createElement("dd",{key:e,className:"mr-2 d-inline-block"},e)})),t.a.createElement("dt",null,"Study Areas"),b.map((function(e){return t.a.createElement("dd",{key:e,className:"mr-2 d-inline-block"},e)})))))),t.a.createElement(p.b,{className:"BirdTypeahead mb-3",options:y,selectHintOnEnter:!0,highlightOnlyResult:!0,name:"bird",placeholder:"Type band symbol, colour, name or primary (metal) band",id:"bird",ignoreDiacritics:!1,maxResults:100,paginationText:"Display more\u2026",multiple:!0,selected:this.state.selected,onChange:function(a){return e.setState({selected:a})},labelKey:function(e){return e.label},renderToken:function(e,a,n){return e.label?t.a.createElement(p.a,{onRemove:a.onRemove,option:e,key:n,className:(e.isColour?"token-colour":e.isSymbol&&"token-symbol")||e.isName&&"token-name"||e.isPrimaryBand&&"token-primaryBand"||e.isStudyArea&&"token-studyArea"},e.isColour?t.a.createElement(D,{colour:e.colour}):e.label):t.a.createElement(p.a,{onRemove:a.onRemove,option:e},t.a.createElement(t.a.Fragment,null,e))},renderMenuItemChildren:function(e,a,n){return e.label?t.a.createElement(t.a.Fragment,null,e.isColour?t.a.createElement(D,{colour:e.colour}):e.label,t.a.createElement("small",{className:"ml-2"},"(",(e.isColour?"Colour":e.isSymbol&&"Symbol")||e.isName&&"Name"||e.isPrimaryBand&&"Primary Band"||e.isStudyArea&&"Study Area",")")):t.a.createElement(t.a.Fragment,null,e)}}),t.a.createElement(_,Object.assign({birds:v},r)))}}}]),n}(r.Component),I=Object(b.connect)((function(e){return{lazyFetchBirds:function(){return{birdsFetch:{url:"".concat("https://data.keadatabase.nz/birds/?page_size=10000"),force:!0}}}}}))(W),x=function(){return t.a.createElement("main",null,t.a.createElement("div",{className:"container my-3"},t.a.createElement("h1",null,"Band Combo Engine ",t.a.createElement("small",null,"NZBBTEF PoC")),t.a.createElement(I,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(68),n(69),n(71);o.a.render(t.a.createElement(t.a.StrictMode,null,t.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[35,1,2]]]);
//# sourceMappingURL=main.d0ba768d.chunk.js.map