(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{187:function(e,t,a){e.exports=a(509)},189:function(e,t,a){},193:function(e,t,a){},324:function(e,t,a){},466:function(e,t,a){},467:function(e,t,a){},484:function(e,t,a){},493:function(e,t,a){},509:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=(a(189),a(23)),l=a(16),o=a(17),i=a(19),s=a(18),m=a(20),u=a(24),p=a(180),h=a.n(p),d=a(178),E=a.n(d),f=a(115),y=a.n(f),b=a(114),v=a.n(b),k=a(83),C=a.n(k),g=a(182),O=a.n(g),P=a(30),j=a.n(P),N=a(179),S=a.n(N),w=a(181),D=a.n(w),I=a(87),T=a.n(I),A=a(120),L=a.n(A),x=(a(193),a(46)),K=a.n(x),U=a(47),H=a.n(U),R=a(21),M=a.n(R),F=a(84),Y=a.n(F),_=a(27),B=a.n(_),G=a(85),W=a.n(G),V=a(86),q=a.n(V),J=a(117),$=a.n(J),z=a(119),Q=a.n(z),X=a(118),Z=a.n(X),ee=a(116),te=a.n(ee),ae=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).handleFirstPageButtonClick=function(e){a.props.onChangePage(e,0)},a.handleBackButtonClick=function(e){a.props.onChangePage(e,a.props.page-1)},a.handleNextButtonClick=function(e){a.props.onChangePage(e,a.props.page+1)},a.handleLastPageButtonClick=function(e){a.props.onChangePage(e,Math.max(0,Math.ceil(a.props.count/a.props.rowsPerPage)-1))},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.count,a=e.page,n=e.theme,c=e.rowsPerPage;return r.a.createElement("div",{className:"table-pagination"},r.a.createElement(j.a,{onClick:this.handleFirstPageButtonClick,disabled:0===a,"aria-label":"First Page"},"rtl"===n.direction?r.a.createElement(te.a,null):r.a.createElement($.a,null)),r.a.createElement(j.a,{onClick:this.handleBackButtonClick,disabled:0===a,"aria-label":"Previous Page"},"rtl"===n.direction?r.a.createElement(Z.a,null):r.a.createElement(Q.a,null)),r.a.createElement(j.a,{onClick:this.handleNextButtonClick,disabled:a>=Math.ceil(t/c)-1,"aria-label":"Next Page"},"rtl"===n.direction?r.a.createElement(Q.a,null):r.a.createElement(Z.a,null)),r.a.createElement(j.a,{onClick:this.handleLastPageButtonClick,disabled:a>=Math.ceil(t/c)-1,"aria-label":"Last Page"},"rtl"===n.direction?r.a.createElement($.a,null):r.a.createElement(te.a,null)))}}]),t}(r.a.Component),ne=Object(u.withStyles)({},{withTheme:!0})(ae),re=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={page:0},a.handleChangePage=function(e,t){a.setState({page:t})},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props.data;if(t){var a=this.state.page;return r.a.createElement(K.a,{className:"top-charts-table"},r.a.createElement(Y.a,null,r.a.createElement(B.a,null,r.a.createElement(M.a,null,"#"),r.a.createElement(M.a,null,"Ticker"),r.a.createElement(M.a,null,"Name"),r.a.createElement(M.a,null,"Price (USD)"),r.a.createElement(M.a,null,"24 Hr Change (%)"))),r.a.createElement(H.a,null,t.slice(10*a,10*(a+1)).map(function(t,n){return r.a.createElement(B.a,{className:"cursor-pointer",key:t.CoinInfo.Name,onClick:function(t){return e.props.rowClicked(t,n+10*a)},selected:n===e.props.selectedTickerIndex-10*a},r.a.createElement(M.a,{className:"table-index-coln"},n+1+10*a),r.a.createElement(M.a,{component:"th",scope:"row"},r.a.createElement("img",{className:"ticker-img",src:"https://www.cryptocompare.com/"+t.CoinInfo.ImageUrl,alt:t.CoinInfo.Name}),"\xa0\xa0",t.CoinInfo.Name),r.a.createElement(M.a,null,t.CoinInfo.FullName),r.a.createElement(M.a,null,t.DISPLAY.USD.PRICE),r.a.createElement(M.a,null,r.a.createElement("span",{className:t.RAW.USD.CHANGEPCT24HOUR>0?"green_text":"red_text"},"".concat(t.DISPLAY.USD.CHANGEPCT24HOUR," %"))))})),r.a.createElement(W.a,null,r.a.createElement(B.a,null,r.a.createElement(q.a,{colSpan:5,count:t.length,rowsPerPageOptions:[10],rowsPerPage:10,page:this.state.page,onChangePage:this.handleChangePage,ActionsComponent:ne}))))}return null}}]),t}(n.Component),ce=(a(324),a(174)),le=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.theme.palette.primary.main;if(this.props.data){var t={labels:this.props.data.map(function(e){return new Date(1e3*e.time)}),datasets:[{borderColor:e,backgroundColor:"#FFFFFF",pointRadius:0,data:this.props.data.map(function(e){return e.close})}]},a={tooltips:{enabled:!1},legend:{display:!1},scales:{xAxes:[{type:"time",gridLines:{display:!1},time:{unit:this.props.timePeriod}}],yAxes:[{gridLines:{display:!1},ticks:{callback:function(e,t,a){return"$ "+e}}}]}};return r.a.createElement("div",{className:"simple-price-chart"},r.a.createElement(ce.a,{data:t,options:a}))}return r.a.createElement("div",{className:"simple-price-chart-error"},r.a.createElement("h2",null,"Error loading data"))}}]),t}(n.Component),oe=Object(u.withTheme)()(le),ie=a(176),se=a.n(ie),me=a(89),ue=a.n(me),pe=10,he=120,de=48,Ee="https://cryptodash-frankjia.herokuapp.com/cryptocompare/histoday?",fe="https://cryptodash-frankjia.herokuapp.com/cryptocompare/histohour?",ye="https://cryptodash-frankjia.herokuapp.com/cryptocompare/histominute?",be="day",ve=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).timePeriodSelected=function(e,t){e.preventDefault(),a.setState({timePeriod:t})},a.fetchData=function(){var e,t,n=a.props.ticker.CoinInfo.Name,r=a.state.timePeriod;"day"===r?(t=Ee,e=pe):"hour"===r?(t=fe,e=de):(t=ye,e=he),t+="ticker=".concat(n,"&limit=").concat(e,"&key=").concat(a.props.auth),fetch(t).then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({chartIsLoaded:!0,chartData:e.Data,chartTimePeriod:r})},function(e){a.setState({chartIsLoaded:!0,error:e})})},a.state={error:null,chartIsLoaded:!1,chartData:null,timePeriod:be,chartTimePeriod:be},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props.ticker;if(t){var a=t.CoinInfo,n=t.DISPLAY.USD;return r.a.createElement("div",{className:"coin-details-wrapper"},r.a.createElement("h2",null,a.FullName),r.a.createElement("h4",null,a.Name," | ",n.PRICE),r.a.createElement("div",{className:"coin-details-section"},r.a.createElement("h3",{className:"coin-details-chart-heading"},"Chart"),r.a.createElement("div",{className:"timeperiod-select"},r.a.createElement(se.a,null,r.a.createElement(ue.a,{variant:"outline-primary",active:this.state.timePeriod===be,onClick:function(t){e.timePeriodSelected(t,be)}},"Day"),r.a.createElement(ue.a,{variant:"outline-primary",active:"hour"===this.state.timePeriod,onClick:function(t){e.timePeriodSelected(t,"hour")}},"Hour"),r.a.createElement(ue.a,{variant:"outline-primary",active:"minute"===this.state.timePeriod,onClick:function(t){e.timePeriodSelected(t,"minute")}},"Minute"))),r.a.createElement(oe,{data:this.state.chartData,timePeriod:this.state.chartTimePeriod})),r.a.createElement("div",{className:"coin-details-section"},r.a.createElement("h3",{className:"coin-details-details-heading"},"Details"),r.a.createElement("p",null,r.a.createElement("span",{className:"detail-label"},"Price:")," ",r.a.createElement("span",null,n.PRICE)),r.a.createElement("p",null,r.a.createElement("span",{className:"detail-label"},"Market Cap:")," ",r.a.createElement("span",null,n.MKTCAP)),r.a.createElement("p",null,r.a.createElement("span",{className:"detail-label"},"Change % (24hr):")," ",r.a.createElement("span",null,n.CHANGEPCT24HOUR," %")),r.a.createElement("p",null,r.a.createElement("span",{className:"detail-label"},"Volume (24hr):")," ",r.a.createElement("span",null,n.TOTALVOLUME24HTO)),r.a.createElement("p",null,r.a.createElement("span",{className:"detail-label"},"Open (24hr):")," ",r.a.createElement("span",null,n.OPEN24HOUR)),r.a.createElement("p",null,r.a.createElement("span",{className:"detail-label"},"High (24hr):")," ",r.a.createElement("span",null,n.HIGH24HOUR)),r.a.createElement("p",null,r.a.createElement("span",{className:"detail-label"},"Low (24hr):")," ",r.a.createElement("span",null,n.LOW24HOUR))))}return r.a.createElement("h1",null,"No Ticker Selected")}},{key:"componentDidUpdate",value:function(e,t){e.ticker.CoinInfo.Name===this.props.ticker.CoinInfo.Name&&e.ticker.DISPLAY.USD.PRICE===this.props.ticker.DISPLAY.USD.PRICE||this.fetchData(),t.timePeriod!==this.state.timePeriod&&this.fetchData()}},{key:"componentDidMount",value:function(){this.fetchData()}}]),t}(n.Component),ke=a(49),Ce=a.n(ke),ge=a(88),Oe=a.n(ge),Pe=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).tableRowClicked=function(e,t){e.preventDefault(),a.setState({selectedTickerIndex:t})},a.state={selectedTickerIndex:0},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"content-box"},r.a.createElement(Oe.a,null,r.a.createElement(Ce.a,{xs:"8"},r.a.createElement(re,{data:this.props.data,rowClicked:this.tableRowClicked.bind(this),selectedTickerIndex:this.state.selectedTickerIndex})),r.a.createElement(Ce.a,{xs:"4"},r.a.createElement(ve,{ticker:this.props.data?this.props.data[this.state.selectedTickerIndex]:null,auth:this.props.auth}))))}},{key:"componentDidMount",value:function(){this.props.data&&this.setState({selectedTicker:this.props.data[this.state.selectedTickerIndex]})}},{key:"componentWillReceiveProps",value:function(){this.setState({selectedTicker:this.props.data[this.state.selectedTickerIndex]})}}]),t}(n.Component),je=(a(466),function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e,t=this.props.data;return t?(this.props.showHeaders&&(e=r.a.createElement(Y.a,null,r.a.createElement(B.a,null,r.a.createElement(M.a,null,"Ticker"),r.a.createElement(M.a,null,"Name"),r.a.createElement(M.a,null,"Price (USD)"),r.a.createElement(M.a,null,"24 Hr Change (%)")))),r.a.createElement(K.a,{className:"top-movers-table"},e,r.a.createElement(H.a,null,t.map(function(e,t){return r.a.createElement(B.a,{key:e.CoinInfo.Name},r.a.createElement(M.a,{component:"th",scope:"row"},e.CoinInfo.Name),r.a.createElement(M.a,null,e.CoinInfo.FullName),r.a.createElement(M.a,null,e.DISPLAY.USD.PRICE),r.a.createElement(M.a,null,r.a.createElement("span",{className:e.RAW.USD.CHANGEPCT24HOUR>0?"green_text":"red_text"},"".concat(e.DISPLAY.USD.CHANGEPCT24HOUR," %"))))})))):null}}]),t}(n.Component)),Ne=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"content-box"},r.a.createElement(Oe.a,null,r.a.createElement(Ce.a,{xs:"6"},r.a.createElement("div",{className:"latest-charts-container"},r.a.createElement("h4",null,"Top Gainers"),r.a.createElement(je,{showHeaders:!0,data:this.props.topGainers}))),r.a.createElement(Ce.a,{xs:"6"},r.a.createElement("div",{className:"latest-charts-container"},r.a.createElement("h4",null,"Top Losers"),r.a.createElement(je,{showHeaders:!0,data:this.props.topLosers})))))}}]),t}(n.Component),Se=a(177),we=a.n(Se),De=(a(467),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).handleChangePage=function(e,t){a.setState({page:t})},a.fetchData=function(){fetch("https://cryptodash-frankjia.herokuapp.com/cryptopanic/news?key=".concat(a.props.auth)).then(function(e){return e.json()}).then(function(e){a.setState({isLoaded:!0,data:e.results}),console.log(e.results)},function(e){a.setState({isLoaded:!0,error:e})})},a.state={error:null,isLoaded:!1,data:null,page:0},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=a(172),t=this.state.data,n=this.state.page;return t?r.a.createElement("div",{className:"content-box"},r.a.createElement("div",{className:"news-feed-main-container"},r.a.createElement("h4",null,"Latest News"),r.a.createElement(K.a,{className:"news-feed-table"},r.a.createElement(H.a,null,t.slice(5*n,5*(n+1)).map(function(e,t){return r.a.createElement(B.a,{key:e.id},r.a.createElement(M.a,null,r.a.createElement("div",{className:"news-item"},r.a.createElement("h5",null,r.a.createElement("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},e.title)),r.a.createElement("p",{className:"accent-text"},r.a.createElement(we.a,{format:"LT | MMM DD YYYY"},e.published_at)," | ",r.a.createElement("span",{className:"bolded"},e.source.title)))))})),r.a.createElement(W.a,null,r.a.createElement(B.a,null,r.a.createElement(q.a,{colSpan:1,count:t.length,rowsPerPageOptions:[5],rowsPerPage:5,page:this.state.page,onChangePage:this.handleChangePage,ActionsComponent:ne})))))):r.a.createElement("div",{className:"content-box"},r.a.createElement("div",{className:"loading-animation-content-container"},r.a.createElement("div",{className:"loading-animation-news"},r.a.createElement(e,{name:"double-bounce",color:"orange"}))))}},{key:"componentDidMount",value:function(){var e=this;this.fetchData(),this.fetchInterval=setInterval(function(){e.fetchData()},3e5)}},{key:"componentWillUnmount",value:function(){clearInterval(this.fetchInterval)}}]),t}(n.Component)),Ie=(a(484),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).fetchData=function(){var e="https://cryptodash-frankjia.herokuapp.com/cryptocompare/top?";e+="key=".concat(a.props.keys.cryptocompare),fetch(e).then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({isLoaded:!0,data:e.Data})},function(e){a.setState({isLoaded:!0,error:e})})},a.state={error:null,isLoaded:!1,data:null},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=a(172),t=this.state.data;if(t){var n=t.slice().sort(function(e,t){return e.RAW.USD.CHANGEPCT24HOUR<t.RAW.USD.CHANGEPCT24HOUR}),c=n.slice(0,10),l=n.slice(-10).reverse();return r.a.createElement("div",{className:"market_overview"},r.a.createElement("div",{className:"mkt_overview_header"},r.a.createElement("h1",null,"Market Overview")),r.a.createElement("div",{className:"main_container"},r.a.createElement(Pe,{data:t,auth:this.props.keys.cryptocompare})),r.a.createElement("div",{className:"main_container"},r.a.createElement(Ne,{topGainers:c,topLosers:l})),r.a.createElement("div",{className:"main_container"},r.a.createElement(De,{auth:this.props.keys.cryptopanic})))}return r.a.createElement("div",{className:"loading-animation-container"},r.a.createElement("div",{className:"loading-animation-main"},r.a.createElement(e,{name:"double-bounce",color:"orange"})))}},{key:"componentDidMount",value:function(){var e=this;this.fetchData(),this.fetchInterval=setInterval(function(){e.fetchData()},3e5)}},{key:"componentWillUnmount",value:function(){clearInterval(this.fetchInterval)}}]),t}(n.Component)),Te=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).fetchData=function(){var e="https://cryptodash-frankjia.herokuapp.com/binance/portfolio";e+="?key=".concat(a.props.keys.binance.key,"&secret=").concat(a.props.keys.binance.secret),fetch(e).then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({isLoaded:!0,data:e.Data})},function(e){a.setState({isLoaded:!0,error:e})})},a.state={error:null,isLoaded:!1,data:null},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null)}},{key:"componentDidMount",value:function(){this.fetchData()}}]),t}(n.Component),Ae="Market Overview",Le=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={open:!1,selection:Ae},a.handleDrawerOpen=function(){a.setState({open:!0})},a.handleDrawerClose=function(){a.setState({open:!1})},a.handleSelect=function(e,t){e.preventDefault(),a.setState({selection:t}),a.handleDrawerClose()},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e,t=this,a=this.state.open,n=this.state.selection;return n===Ae?e=r.a.createElement(Ie,{keys:this.props.keys}):"Portfolio"===n&&(e=r.a.createElement(Te,{keys:this.props.keys})),r.a.createElement("div",null,r.a.createElement(E.a,null,r.a.createElement(y.a,null,r.a.createElement(j.a,{color:"inherit",onClick:this.handleDrawerOpen},r.a.createElement(S.a,null)),r.a.createElement("div",{className:"appbar-title"},r.a.createElement(C.a,{variant:"h6",color:"inherit",noWrap:!0},"Cryptocurrency Dashboard")))),r.a.createElement(h.a,{variant:"persistent",anchor:"left",open:a},r.a.createElement(j.a,{onClick:this.handleDrawerClose},r.a.createElement(D.a,null)),r.a.createElement(O.a,null),r.a.createElement(v.a,null,r.a.createElement(T.a,{button:!0,selected:this.state.selection===Ae,key:Ae,onClick:function(e){return t.handleSelect(e,Ae)}},r.a.createElement(L.a,{primary:Ae})),r.a.createElement(T.a,{button:!0,selected:"Portfolio"===this.state.selection,key:"Portfolio",onClick:function(e){return t.handleSelect(e,"Portfolio")}},r.a.createElement(L.a,{primary:"Portfolio"})))),r.a.createElement("div",{className:"overlay",hidden:!this.state.open}),r.a.createElement("main",{className:"dashboard-wrapper"},e))}}]),t}(n.Component),xe=Object(u.withTheme)()(Le),Ke=a(31),Ue=a.n(Ke),He=a(183),Re=a(61),Me=a.n(Re),Fe=a(184),Ye=a.n(Fe),_e=(a(493),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={cryptopanicKey:null,cryptocompareKey:null,binanceKey:null,binanceSecret:null},a.onFieldChanged=function(e,t){a.setState(Object(He.a)({},t,e.target.value))},a.onFormSubmission=function(e,t){e.preventDefault(),a.state.cryptopanicKey&&a.state.cryptocompareKey&&a.state.binanceKey&&a.state.binanceSecret&&t(a.state)},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("form",{className:"api-key-form-container"},r.a.createElement("h4",null,"Please create and enter the following API keys to use the dashboard."),r.a.createElement("p",null,"Sign up directly at ",r.a.createElement("a",{href:"https://min-api.cryptocompare.com/pricing",target:"_blank",rel:"noopener noreferrer"},"CryptoCompare"),"and ",r.a.createElement("a",{href:"https://cryptopanic.com/developers/api/",target:"_blank",rel:"noopener noreferrer"},"CryptoPanic")," for their free API services. These keys will be stored in your browser & will not be shared. Binance READ-ONLY key & secret are also required for portfolio analysis"),r.a.createElement("div",null,r.a.createElement(Me.a,{id:"cryptocompare",label:"CryptoCompare Key",placeholder:"Enter Your API Key",className:"api-form-field",margin:"normal",variant:"outlined",onChange:function(t){e.onFieldChanged(t,"cryptocompareKey")}})),r.a.createElement("div",null,r.a.createElement(Me.a,{id:"cryptopanic",label:"CryptoPanic Key",placeholder:"Enter Your API Key",className:"api-form-field",margin:"normal",variant:"outlined",onChange:function(t){e.onFieldChanged(t,"cryptopanicKey")}})),r.a.createElement("div",null,r.a.createElement(Me.a,{id:"binance-key",label:"Binance Key",placeholder:"Enter Your API Key",className:"api-form-field",margin:"normal",variant:"outlined",onChange:function(t){e.onFieldChanged(t,"binanceKey")}})),r.a.createElement("div",null,r.a.createElement(Me.a,{id:"binance-secret",label:"Binance Secret",placeholder:"Enter Your API Secret",className:"api-form-field",margin:"normal",variant:"outlined",onChange:function(t){e.onFieldChanged(t,"binanceSecret")}})),r.a.createElement("div",null,r.a.createElement(Ye.a,{variant:"contained",color:"primary",className:"api-form-submit",onClick:function(t){return e.onFormSubmission(t,e.props.newKeysEntered)}},"Submit")))}}]),t}(n.Component)),Be=Object(u.withStyles)({})(_e),Ge=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).newKeysEntered=function(e){Ue.a.set("cryptopanicKey",e.cryptopanicKey),Ue.a.set("cryptocompareKey",e.cryptocompareKey),Ue.a.set("binanceKey",e.binanceKey),Ue.a.set("binanceSecret",e.binanceSecret),window.location.reload()},a.state={error:null,isLoaded:!1,keys:{cryptocompare:null,cryptopanic:null,binance:null}},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return this.state.keys.cryptocompare&&this.state.keys.cryptocompare&&this.state.keys.binance?r.a.createElement(xe,{keys:this.state.keys}):r.a.createElement(Be,{newKeysEntered:this.newKeysEntered})}},{key:"componentWillMount",value:function(){var e=Ue.a.get("cryptocompareKey"),t=Ue.a.get("cryptopanicKey"),a=Ue.a.get("binanceKey"),n=Ue.a.get("binanceSecret");if(e&&t&&a&&n){var r={cryptocompare:e,cryptopanic:t,binance:{key:a,secret:n}};this.setState({keys:r})}}}]),t}(n.Component),We=a(185),Ve=a.n(We),qe=a(186),Je=a.n(qe),$e=Object(u.createMuiTheme)({palette:{primary:Ve.a,secondary:Je.a},typography:{useNextVariants:!0,fontFamily:["Roboto","sans-serif"].join(",")}});Object(c.render)(r.a.createElement(function(){return r.a.createElement(u.MuiThemeProvider,{theme:$e},r.a.createElement(Ge,null))},null),document.querySelector("#root"))}},[[187,1,2]]]);
//# sourceMappingURL=main.ee04c9a1.chunk.js.map