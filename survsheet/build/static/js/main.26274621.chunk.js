(this.webpackJsonpsurvsheet=this.webpackJsonpsurvsheet||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),s=n(8),l=n.n(s),i=n(3),r=n(4),o=n(2),d=n(6),u=n(5),h=n(0),b=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).addToRefs=function(t){t&&!e.cellRefs.includes(t)&&e.cellRefs.push(t),console.log(e.cellRefs)},e.state={data:[],selectedFile:null,fileName:"",comment:"",id:null},e.addRow=e.addRow.bind(Object(o.a)(e)),e.handleUpload=e.handleUpload.bind(Object(o.a)(e)),e.cellRefs=[],e}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.addRow()}},{key:"headerCreator",value:function(){for(var e=[],t=0;t<10;t++)e.push(Object(h.jsx)("th",{children:Object(h.jsx)("input",{type:"text",className:"no-bdr-input text-center h5",name:"field".concat(t+1),placeholder:"Field ".concat(t+1)})}));return e}},{key:"addRow",value:function(){var e=this.state.data;e.push(e.length),this.setState({data:e})}},{key:"updateInputValue",value:function(e){this.setState({inputValue:e.target.value})}},{key:"handleUpload",value:function(e,t){var n=this;t.preventDefault(),console.log(t.target.id);var a=new FormData;a.append("file".concat(e+1)),a.append("filename","fileName".concat(e+2)),a.append("comment","Comment".concat(e+3)),a.append("id","".concat(e+3)),console.log(a),fetch("http://localhost:8000/upload",{method:"POST",body:a}).then((function(e){e.json().then((function(e){n.setState({selectedFile:"http://localhost:8000/".concat(e.file)})}))}))}},{key:"rowCreator",value:function(e){for(var t=this,n=[],a=30*e,c=function(){var c=a+3*s,l=10*e+s;n.push(Object(h.jsx)("td",{children:Object(h.jsx)("form",{method:"POST",ref:t.addToRefs,id:"formCell".concat(l),onSubmit:function(e){return t.handleUpload(c,e)},children:Object(h.jsxs)("small",{className:"input-group container",children:[Object(h.jsx)("input",{type:"file",className:"mx-auto p-0 row",name:"file".concat(c+1),id:c+1}),Object(h.jsx)("input",{className:" my-2 ",size:"33",type:"text",name:"fileName".concat(c+2),placeholder:"Name the file with extension"}),Object(h.jsx)("input",{className:"mb-2",size:"33",type:"text",id:c+3,name:"Comment".concat(c+3),placeholder:"Comment",value:t.state.comment,onChange:t.updateInputValue}),Object(h.jsx)("button",{className:"submit",type:"submit",children:"Upload"})]})})}))},s=0;s<10;s++)c();return n}},{key:"render",value:function(){var e=this;return Object(h.jsxs)("div",{className:"text-center",children:[Object(h.jsx)("div",{children:Object(h.jsx)("button",{className:"btn btn-md btn-secondary m-4",id:"addBtn",type:"button",onClick:this.addRow,children:"Add new Row"})}),Object(h.jsx)("div",{className:"table-responsive",children:Object(h.jsxs)("table",{className:"table table-bordered table-striped",children:[Object(h.jsx)("thead",{className:"bg-warning",children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("input",{type:"text",className:"no-bdr-input text-center text-light h5",placeholder:"Sheet Name"})}),this.headerCreator()]})}),Object(h.jsx)("tbody",{id:"tbody",children:this.state.data.map((function(t){return Object(h.jsxs)("tr",{id:t,children:[Object(h.jsx)("td",{className:"align-middle ",children:Object(h.jsx)("div",{className:"cell",children:Object(h.jsx)("input",{type:"text",placeholder:t+1,className:"no-bdr-input text-center"})})}),e.rowCreator(t)]})}))})]})})]})}}]),n}(c.a.Component);function j(e){return Object(h.jsxs)("div",{className:"container text-center",children:[Object(h.jsx)("div",{className:"description p-5 mt-5",children:Object(h.jsx)("p",{className:"lead",children:"You don't have any existing survsheet. Create your new SurvSheet now!"})}),Object(h.jsx)("button",{value:1,className:"btn btn-warning m-5",onClick:e.createnew,children:"Create new SurvSheet"})]})}n(14);var p=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={renderView:0},a.createnew=a.createnew.bind(Object(o.a)(a)),a}return Object(r.a)(n,[{key:"createnew",value:function(e){this.setState({renderView:+e.target.value})}},{key:"render",value:function(){switch(this.state.renderView){case 1:return Object(h.jsx)(b,{});default:return Object(h.jsx)(j,{createnew:this.createnew})}}}]),n}(c.a.Component),m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,l=t.getTTFB;n(e),a(e),c(e),s(e),l(e)}))};n(15),n(16);l.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(p,{})}),document.getElementById("root")),m()}},[[17,1,2]]]);
//# sourceMappingURL=main.26274621.chunk.js.map