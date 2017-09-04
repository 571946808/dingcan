/*
Copyright 2014, KISSY v1.47
MIT Licensed
build time: May 22 12:19
*/
KISSY.add("dom/selector/parser",[],function(C,v){var m={},q=KISSY,j=function(f){this.rules=[];q.mix(this,f);this.resetInput(this.input)};j.prototype={constructor:function(f){this.rules=[];q.mix(this,f);this.resetInput(this.input)},resetInput:function(f){q.mix(this,{input:f,matched:"",stateStack:[j.STATIC.INITIAL],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},getCurrentRules:function(){var f=this.stateStack[this.stateStack.length-1],d=[],f=this.mapState(f);q.each(this.rules,
function(e){var h=e.state||e[3];h?q.inArray(f,h)&&d.push(e):f===j.STATIC.INITIAL&&d.push(e)});return d},pushState:function(f){this.stateStack.push(f)},popState:function(){return this.stateStack.pop()},getStateStack:function(){return this.stateStack},showDebugInfo:function(){var f=j.STATIC.DEBUG_CONTEXT_LIMIT,d=this.matched,e=this.match,h=this.input,d=d.slice(0,d.length-e.length),d=(d.length>f?"...":"")+d.slice(-f).replace(/\n/," "),e=e+h,e=e.slice(0,f)+(e.length>f?"...":"");return d+e+"\n"+Array(d.length+
1).join("-")+"^"},mapSymbol:function(f){var d=this.symbolMap;return!d?f:d[f]||(d[f]=++this.symbolId)},mapReverseSymbol:function(f){var d=this.symbolMap,e,h=this.reverseSymbolMap;if(!h&&d)for(e in h=this.reverseSymbolMap={},d)h[d[e]]=e;return h?h[f]:f},mapState:function(f){var d=this.stateMap;return!d?f:d[f]||(d[f]=++this.stateId)},lex:function(){var f=this.input,d,e,h,k=this.getCurrentRules();this.match=this.text="";if(!f)return this.mapSymbol(j.STATIC.END_TAG);for(d=0;d<k.length;d++){e=k[d];var D=
e.token||e[0];h=e.action||e[2]||v;if(e=f.match(e.regexp||e[1])){if(d=e[0].match(/\n.*/g))this.lineNumber+=d.length;q.mix(this,{firstLine:this.lastLine,lastLine:this.lineNumber+1,firstColumn:this.lastColumn,lastColumn:d?d[d.length-1].length-1:this.lastColumn+e[0].length});d=this.match=e[0];this.matches=e;this.text=d;this.matched+=d;h=h&&h.call(this);h=h===v?D:this.mapSymbol(h);this.input=f=f.slice(d.length);return h?h:this.lex()}}return v}};j.STATIC={INITIAL:"I",DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"};
var o=new j({rules:[[2,/^\[(?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[3,/^(?:[\t\r\n\f\x20]*)\]/,function(){this.text=KISSY.trim(this.text)}],[4,/^(?:[\t\r\n\f\x20]*)~=(?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[5,/^(?:[\t\r\n\f\x20]*)\|=(?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[6,/^(?:[\t\r\n\f\x20]*)\^=(?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[7,/^(?:[\t\r\n\f\x20]*)\$=(?:[\t\r\n\f\x20]*)/,function(){this.text=
KISSY.trim(this.text)}],[8,/^(?:[\t\r\n\f\x20]*)\*=(?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[9,/^(?:[\t\r\n\f\x20]*)\=(?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[10,/^(?:(?:[\w]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))*)\(/,function(){this.text=KISSY.trim(this.text).slice(0,-1);this.pushState("fn")}],[11,/^[^\)]*/,function(){this.popState()},["fn"]],[12,/^(?:[\t\r\n\f\x20]*)\)/,function(){this.text=KISSY.trim(this.text)}],
[13,/^:not\((?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[14,/^(?:(?:[\w]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))*)/,function(){this.text=this.yy.unEscape(this.text)}],[15,/^"(\\"|[^"])*"/,function(){this.text=this.yy.unEscapeStr(this.text)}],[15,/^'(\\'|[^'])*'/,function(){this.text=this.yy.unEscapeStr(this.text)}],[16,/^#(?:(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))+)/,function(){this.text=this.yy.unEscape(this.text.slice(1))}],
[17,/^\.(?:(?:[\w]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))*)/,function(){this.text=this.yy.unEscape(this.text.slice(1))}],[18,/^(?:[\t\r\n\f\x20]*),(?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[19,/^::?/,0],[20,/^(?:[\t\r\n\f\x20]*)\+(?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[21,/^(?:[\t\r\n\f\x20]*)>(?:[\t\r\n\f\x20]*)/,function(){this.text=KISSY.trim(this.text)}],[22,/^(?:[\t\r\n\f\x20]*)~(?:[\t\r\n\f\x20]*)/,
function(){this.text=KISSY.trim(this.text)}],[23,/^\*/,0],[24,/^(?:[\t\r\n\f\x20]+)/,0],[25,/^./,0]]});m.lexer=o;o.symbolMap={$EOF:1,LEFT_BRACKET:2,RIGHT_BRACKET:3,INCLUDES:4,DASH_MATCH:5,PREFIX_MATCH:6,SUFFIX_MATCH:7,SUBSTRING_MATCH:8,ALL_MATCH:9,FUNCTION:10,PARAMETER:11,RIGHT_PARENTHESES:12,NOT:13,IDENT:14,STRING:15,HASH:16,CLASS:17,COMMA:18,COLON:19,PLUS:20,GREATER:21,TILDE:22,UNIVERSAL:23,S:24,INVALID:25,$START:26,selectors_group:27,selector:28,simple_selector_sequence:29,combinator:30,type_selector:31,
id_selector:32,class_selector:33,attrib_match:34,attrib:35,attrib_val:36,pseudo:37,negation:38,negation_arg:39,suffix_selector:40,suffix_selectors:41};m.productions=[[26,[27]],[27,[28],function(){return[this.$1]}],[27,[27,18,28],function(){this.$1.push(this.$3)}],[28,[29]],[28,[28,30,29],function(){this.$1.nextCombinator=this.$3.prevCombinator=this.$2;this.$3.order=(this.$1.order=this.$1.order||0)+1;this.$3.prev=this.$1;return this.$1.next=this.$3}],[30,[20]],[30,[21]],[30,[22]],[30,[24],function(){return" "}],
[31,[14],function(){return{t:"tag",value:this.$1}}],[31,[23],function(){return{t:"tag",value:this.$1}}],[32,[16],function(){return{t:"id",value:this.$1}}],[33,[17],function(){return{t:"cls",value:this.$1}}],[34,[6]],[34,[7]],[34,[8]],[34,[9]],[34,[4]],[34,[5]],[35,[2,14,3],function(){return{t:"attrib",value:{ident:this.$2}}}],[36,[14]],[36,[15]],[35,[2,14,34,36,3],function(){return{t:"attrib",value:{ident:this.$2,match:this.$3,value:this.$4}}}],[37,[19,10,11,12],function(){return{t:"pseudo",value:{fn:this.$2.toLowerCase(),
param:this.$3}}}],[37,[19,14],function(){return{t:"pseudo",value:{ident:this.$2.toLowerCase()}}}],[38,[13,39,12],function(){return{t:"pseudo",value:{fn:"not",param:this.$2}}}],[39,[31]],[39,[32]],[39,[33]],[39,[35]],[39,[37]],[40,[32]],[40,[33]],[40,[35]],[40,[37]],[40,[38]],[41,[40],function(){return[this.$1]}],[41,[41,40],function(){this.$1.push(this.$2)}],[29,[31]],[29,[41],function(){return{suffix:this.$1}}],[29,[31,41],function(){return{t:"tag",value:this.$1.value,suffix:this.$2}}]];m.table=
{gotos:{"0":{27:8,28:9,29:10,31:11,32:12,33:13,35:14,37:15,38:16,40:17,41:18},2:{31:20,32:21,33:22,35:23,37:24,39:25},9:{30:33},11:{32:12,33:13,35:14,37:15,38:16,40:17,41:34},18:{32:12,33:13,35:14,37:15,38:16,40:35},19:{34:43},28:{28:46,29:10,31:11,32:12,33:13,35:14,37:15,38:16,40:17,41:18},33:{29:47,31:11,32:12,33:13,35:14,37:15,38:16,40:17,41:18},34:{32:12,33:13,35:14,37:15,38:16,40:35},43:{36:50},46:{30:33}},action:{"0":{2:[1,0,1],13:[1,0,2],14:[1,0,3],16:[1,0,4],17:[1,0,5],19:[1,0,6],23:[1,0,
7]},1:{14:[1,0,19]},2:{2:[1,0,1],14:[1,0,3],16:[1,0,4],17:[1,0,5],19:[1,0,6],23:[1,0,7]},3:{1:[2,9,0],2:[2,9,0],12:[2,9,0],13:[2,9,0],16:[2,9,0],17:[2,9,0],18:[2,9,0],19:[2,9,0],20:[2,9,0],21:[2,9,0],22:[2,9,0],24:[2,9,0]},4:{1:[2,11,0],2:[2,11,0],12:[2,11,0],13:[2,11,0],16:[2,11,0],17:[2,11,0],18:[2,11,0],19:[2,11,0],20:[2,11,0],21:[2,11,0],22:[2,11,0],24:[2,11,0]},5:{1:[2,12,0],2:[2,12,0],12:[2,12,0],13:[2,12,0],16:[2,12,0],17:[2,12,0],18:[2,12,0],19:[2,12,0],20:[2,12,0],21:[2,12,0],22:[2,12,0],
24:[2,12,0]},6:{10:[1,0,26],14:[1,0,27]},7:{1:[2,10,0],2:[2,10,0],12:[2,10,0],13:[2,10,0],16:[2,10,0],17:[2,10,0],18:[2,10,0],19:[2,10,0],20:[2,10,0],21:[2,10,0],22:[2,10,0],24:[2,10,0]},8:{1:[0,0,0],18:[1,0,28]},9:{1:[2,1,0],18:[2,1,0],20:[1,0,29],21:[1,0,30],22:[1,0,31],24:[1,0,32]},10:{1:[2,3,0],18:[2,3,0],20:[2,3,0],21:[2,3,0],22:[2,3,0],24:[2,3,0]},11:{1:[2,38,0],2:[1,0,1],13:[1,0,2],16:[1,0,4],17:[1,0,5],18:[2,38,0],19:[1,0,6],20:[2,38,0],21:[2,38,0],22:[2,38,0],24:[2,38,0]},12:{1:[2,31,0],
2:[2,31,0],13:[2,31,0],16:[2,31,0],17:[2,31,0],18:[2,31,0],19:[2,31,0],20:[2,31,0],21:[2,31,0],22:[2,31,0],24:[2,31,0]},13:{1:[2,32,0],2:[2,32,0],13:[2,32,0],16:[2,32,0],17:[2,32,0],18:[2,32,0],19:[2,32,0],20:[2,32,0],21:[2,32,0],22:[2,32,0],24:[2,32,0]},14:{1:[2,33,0],2:[2,33,0],13:[2,33,0],16:[2,33,0],17:[2,33,0],18:[2,33,0],19:[2,33,0],20:[2,33,0],21:[2,33,0],22:[2,33,0],24:[2,33,0]},15:{1:[2,34,0],2:[2,34,0],13:[2,34,0],16:[2,34,0],17:[2,34,0],18:[2,34,0],19:[2,34,0],20:[2,34,0],21:[2,34,0],22:[2,
34,0],24:[2,34,0]},16:{1:[2,35,0],2:[2,35,0],13:[2,35,0],16:[2,35,0],17:[2,35,0],18:[2,35,0],19:[2,35,0],20:[2,35,0],21:[2,35,0],22:[2,35,0],24:[2,35,0]},17:{1:[2,36,0],2:[2,36,0],13:[2,36,0],16:[2,36,0],17:[2,36,0],18:[2,36,0],19:[2,36,0],20:[2,36,0],21:[2,36,0],22:[2,36,0],24:[2,36,0]},18:{1:[2,39,0],2:[1,0,1],13:[1,0,2],16:[1,0,4],17:[1,0,5],18:[2,39,0],19:[1,0,6],20:[2,39,0],21:[2,39,0],22:[2,39,0],24:[2,39,0]},19:{3:[1,0,36],4:[1,0,37],5:[1,0,38],6:[1,0,39],7:[1,0,40],8:[1,0,41],9:[1,0,42]},
20:{12:[2,26,0]},21:{12:[2,27,0]},22:{12:[2,28,0]},23:{12:[2,29,0]},24:{12:[2,30,0]},25:{12:[1,0,44]},26:{11:[1,0,45]},27:{1:[2,24,0],2:[2,24,0],12:[2,24,0],13:[2,24,0],16:[2,24,0],17:[2,24,0],18:[2,24,0],19:[2,24,0],20:[2,24,0],21:[2,24,0],22:[2,24,0],24:[2,24,0]},28:{2:[1,0,1],13:[1,0,2],14:[1,0,3],16:[1,0,4],17:[1,0,5],19:[1,0,6],23:[1,0,7]},29:{2:[2,5,0],13:[2,5,0],14:[2,5,0],16:[2,5,0],17:[2,5,0],19:[2,5,0],23:[2,5,0]},30:{2:[2,6,0],13:[2,6,0],14:[2,6,0],16:[2,6,0],17:[2,6,0],19:[2,6,0],23:[2,
6,0]},31:{2:[2,7,0],13:[2,7,0],14:[2,7,0],16:[2,7,0],17:[2,7,0],19:[2,7,0],23:[2,7,0]},32:{2:[2,8,0],13:[2,8,0],14:[2,8,0],16:[2,8,0],17:[2,8,0],19:[2,8,0],23:[2,8,0]},33:{2:[1,0,1],13:[1,0,2],14:[1,0,3],16:[1,0,4],17:[1,0,5],19:[1,0,6],23:[1,0,7]},34:{1:[2,40,0],2:[1,0,1],13:[1,0,2],16:[1,0,4],17:[1,0,5],18:[2,40,0],19:[1,0,6],20:[2,40,0],21:[2,40,0],22:[2,40,0],24:[2,40,0]},35:{1:[2,37,0],2:[2,37,0],13:[2,37,0],16:[2,37,0],17:[2,37,0],18:[2,37,0],19:[2,37,0],20:[2,37,0],21:[2,37,0],22:[2,37,0],
24:[2,37,0]},36:{1:[2,19,0],2:[2,19,0],12:[2,19,0],13:[2,19,0],16:[2,19,0],17:[2,19,0],18:[2,19,0],19:[2,19,0],20:[2,19,0],21:[2,19,0],22:[2,19,0],24:[2,19,0]},37:{14:[2,17,0],15:[2,17,0]},38:{14:[2,18,0],15:[2,18,0]},39:{14:[2,13,0],15:[2,13,0]},40:{14:[2,14,0],15:[2,14,0]},41:{14:[2,15,0],15:[2,15,0]},42:{14:[2,16,0],15:[2,16,0]},43:{14:[1,0,48],15:[1,0,49]},44:{1:[2,25,0],2:[2,25,0],13:[2,25,0],16:[2,25,0],17:[2,25,0],18:[2,25,0],19:[2,25,0],20:[2,25,0],21:[2,25,0],22:[2,25,0],24:[2,25,0]},45:{12:[1,
0,51]},46:{1:[2,2,0],18:[2,2,0],20:[1,0,29],21:[1,0,30],22:[1,0,31],24:[1,0,32]},47:{1:[2,4,0],18:[2,4,0],20:[2,4,0],21:[2,4,0],22:[2,4,0],24:[2,4,0]},48:{3:[2,20,0]},49:{3:[2,21,0]},50:{3:[1,0,52]},51:{1:[2,23,0],2:[2,23,0],12:[2,23,0],13:[2,23,0],16:[2,23,0],17:[2,23,0],18:[2,23,0],19:[2,23,0],20:[2,23,0],21:[2,23,0],22:[2,23,0],24:[2,23,0]},52:{1:[2,22,0],2:[2,22,0],12:[2,22,0],13:[2,22,0],16:[2,22,0],17:[2,22,0],18:[2,22,0],19:[2,22,0],20:[2,22,0],21:[2,22,0],22:[2,22,0],24:[2,22,0]}}};m.parse=
function(f){var d=this,e=d.lexer,h,k,j=d.table,m=j.gotos,j=j.action,p=d.productions,r=[null],g=[0];for(e.resetInput(f);;){f=g[g.length-1];h||(h=e.lex());if(!h)return!1;k=j[f]&&j[f][h];if(!k){var o=[];j[f]&&q.each(j[f],function(f,e){o.push(d.lexer.mapReverseSymbol(e))});e.showDebugInfo();o.join(", ");return!1}switch(k[0]){case 1:g.push(h);r.push(e.text);g.push(k[2]);h=null;break;case 2:var n=p[k[1]],f=n.symbol||n[0];k=n.action||n[2];var w=(n.rhs||n[1]).length,t=0,u,n=r[r.length-w];u=v;for(d.$$=n;t<
w;t++)d["$"+(w-t)]=r[r.length-1-t];k&&(u=k.call(d));n=u!==v?u:d.$$;w&&(g=g.slice(0,-2*w),r=r.slice(0,-1*w));g.push(f);r.push(n);g.push(m[g[g.length-2]][g[g.length-1]]);break;case 0:return n}}return v};return m});
KISSY.add("dom/selector",["./selector/parser","dom/basic"],function(C,v){function m(a){return a.replace(J,K)}function q(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}function j(a){var b=0,c=0;if("number"===typeof a)c=a;else if("odd"===a)b=2,c=1;else if("even"===a)b=2,c=0;else if(a=a.replace(/\s/g,"").match(L))a[1]?(b=parseInt(a[2]),isNaN(b)&&(b="-"===a[2]?-1:1)):b=0,c=parseInt(a[3])||0;return{a:b,b:c}}function o(a,b,c,d){if(0===b){if(a===c)return d}else if(0<=(a-c)/b&&0===(a-c)%b&&d)return 1}function f(a,
b){return p._selectInternal(a,null,b)}function d(a,b){if(!b)return!0;if(!a||9===a.nodeType)return!1;var c=1,d=b.suffix,f,e;"tag"===b.t&&(c&=E.tag(a,b.value));if(c&&d){f=d.length;for(e=0;c&&e<f;e++){var h=d[e],x=h.t;E[x]&&(c&=E[x](a,h.value))}}return c}function e(a,b){var c=1,f=a,e,h=b;do if(c&=d(a,b)){b=b&&b.prev;if(!b)return!0;e=A[b.nextCombinator];a=q(a,e.dir);if(!e.immediate)return{el:a,match:b}}else if(e=A[b.nextCombinator],e.immediate)break;else return{el:a&&q(a,e.dir),match:b};while(a);return{el:q(f,
A[h.nextCombinator].dir),match:h}}function h(a,b){var c;if(n){if(!(c=a.getAttribute(g)))a.setAttribute(g,c=+new Date+"_"+ ++w)}else if(!(c=a[g]))c=a[g]=+new Date+"_"+ ++w;c=c+"_"+(b.order||0);if(c in t)return t[c];t[c]=k(a,b);return t[c]}function k(a,b){var c=e(a,b);if(!0===c)return!0;a=c.el;for(b=c.match;a;){if(h(a,b))return!0;a=q(a,A[b.nextCombinator].dir)}return!1}function D(a,b,c){G[a]||(G[a]=F.parse(a));var a=G[a],f=0,e=a.length,z,j,x=[];c&&(b=b||c[0].ownerDocument);z=b&&b.ownerDocument||r;for(n=
(j=(b=b||z)&&(b.ownerDocument||b).documentElement)?"html"!==j.nodeName.toLowerCase():!1;f<e;f++){t={};j=a[f];var i=j.suffix,g,l,k,m=c;k=null;if(!m){if(i&&!n){g=0;for(l=i.length;g<l;g++){var s=i[g];if("id"===s.t){k=s.value;break}}}if(k)if(g=!b.getElementById,l=p._contains(z,b),i=g?l?z.getElementById(k):null:b.getElementById(k),!i&&g||i&&u(i,"id")!==k){g=p._getElementsByTagName("*",b);l=g.length;for(s=0;s<l;s++)if(i=g[s],u(i,"id")===k){m=[i];break}s===l&&(m=[])}else l&&i&&b!==z&&(i=p._contains(b,i)?
i:null),m=i?[i]:[];else m=p._getElementsByTagName(j.value||"*",b)}k=0;if(i=m.length)for(;k<i;k++){g=m[k];a:{l=g;var s=void 0,o=j;do{if(!d(l,o)){l=null;break a}o=o.prev;if(!o){l=!0;break a}s=A[o.nextCombinator];l=q(l,s.dir)}while(l&&s.immediate);l=!l?null:{el:l,match:o}}!0===l?x.push(g):l&&h(l.el,l.match)&&x.push(g)}}1<e&&(x=p.unique(x));return x}var F=v("./selector/parser"),p=v("dom/basic"),r=C.Env.host.document,g="_ks_data_selector_id_",G={},n,w=0,t={},u=function(a,b){return n?p._getSimpleAttr(a,
b):p.attr(a,b)},H=p._hasSingleClass,I=p._isTag,L=/^(([+-]?(?:\d+)?)?n)?([+-]?\d+)?$/,J=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,K=function(a,b){var c="0x"+b-65536;return isNaN(c)?b:0>c?String.fromCharCode(c+65536):String.fromCharCode(c>>10|55296,c&1023|56320)};F.lexer.yy={unEscape:m,unEscapeStr:function(a){return this.unEscape(a.slice(1,-1))}};var B={"nth-child":function(a,b){var c=j(b),d=c.a,c=c.b;if(0===d&&0===c)return 0;var f=0,e=a.parentNode;if(e)for(var e=e.childNodes,h=0,g,i=e.length;h<i;h++)if(g=
e[h],1===g.nodeType&&(f++,g=o(f,d,c,g===a),void 0!==g))return g;return 0},"nth-last-child":function(a,b){var c=j(b),d=c.a,c=c.b;if(0===d&&0===c)return 0;var e=0,f=a.parentNode;if(f)for(var f=f.childNodes,h=f.length-1,g;0<=h;h--)if(g=f[h],1===g.nodeType&&(e++,g=o(e,d,c,g===a),void 0!==g))return g;return 0},"nth-of-type":function(a,b){var c=j(b),f=c.a,c=c.b;if(0===f&&0===c)return 0;var d=0,e=a.parentNode;if(e)for(var e=e.childNodes,g=a.tagName,h=0,i,k=e.length;h<k;h++)if(i=e[h],i.tagName===g&&(d++,
i=o(d,f,c,i===a),void 0!==i))return i;return 0},"nth-last-of-type":function(a,b){var c=j(b),e=c.a,c=c.b;if(0===e&&0===c)return 0;var f=0,d=a.parentNode;if(d)for(var d=d.childNodes,h=a.tagName,g=d.length-1,i;0<=g;g--)if(i=d[g],i.tagName===h&&(f++,i=o(f,e,c,i===a),void 0!==i))return i;return 0},lang:function(a,b){var c,b=m(b.toLowerCase());do if(c=n?a.getAttribute("xml:lang")||a.getAttribute("lang"):a.lang)return c=c.toLowerCase(),c===b||0===c.indexOf(b+"-");while((a=a.parentNode)&&1===a.nodeType);
return!1},not:function(a,b){return!E[b.t](a,b.value)}},y={empty:function(a){for(var a=a.childNodes,b=0,c=a.length-1,d;b<c;b++)if(d=a[b],d=d.nodeType,1===d||3===d||4===d||5===d)return 0;return 1},root:function(a){return a.ownerDocument&&a===a.ownerDocument.documentElement},"first-child":function(a){return B["nth-child"](a,1)},"last-child":function(a){return B["nth-last-child"](a,1)},"first-of-type":function(a){return B["nth-of-type"](a,1)},"last-of-type":function(a){return B["nth-last-of-type"](a,
1)},"only-child":function(a){return y["first-child"](a)&&y["last-child"](a)},"only-of-type":function(a){return y["first-of-type"](a)&&y["last-of-type"](a)},focus:function(a){var b=a.ownerDocument;return b&&a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&!(!a.type&&!(a.href||0<=a.tabIndex))},target:function(a){var b=location.hash;return b&&b.slice(1)===u(a,"id")},enabled:function(a){return!a.disabled},disabled:function(a){return a.disabled},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===
b&&a.checked||"option"===b&&a.selected}},M={"~=":function(a,b){return!b||-1<b.indexOf(" ")?0:-1!==(" "+a+" ").indexOf(" "+b+" ")},"|=":function(a,b){return-1!==(" "+a).indexOf(" "+b+"-")},"^=":function(a,b){return b&&C.startsWith(a,b)},"$=":function(a,b){return b&&C.endsWith(a,b)},"*=":function(a,b){return b&&-1!==a.indexOf(b)},"=":function(a,b){return a===b}},E={tag:I,cls:H,id:function(a,b){return u(a,"id")===b},attrib:function(a,b){var c=b.ident;n||(c=c.toLowerCase());var c=u(a,c),d=b.match;if(!d&&
void 0!==c)return 1;if(d){if(void 0===c)return 0;if(d=M[d])return d(c+"",b.value+"")}return 0},pseudo:function(a,b){var c,d;if(d=b.fn){if(!(c=B[d]))throw new SyntaxError("Syntax error: not support pseudo: "+d);return c(a,b.param)}if(c=b.ident){if(!y[c])throw new SyntaxError("Syntax error: not support pseudo: "+c);return y[c](a)}return 0}},A={">":{dir:"parentNode",immediate:1}," ":{dir:"parentNode"},"+":{dir:"previousSibling",immediate:1},"~":{dir:"previousSibling"}};"sourceIndex"in r.documentElement&&
(p._compareNodeOrder=function(a,b){return a.sourceIndex-b.sourceIndex});p._matchesInternal=f;p._selectInternal=D;return{parse:function(a){return F.parse(a)},select:D,matches:f}});
