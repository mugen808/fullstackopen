(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{40:function(e,t,n){"use strict";n.r(t);var r=n(16),c=n.n(r),o=n(5),a=n(3),s=n(1),i=n(0),u=function(){return Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})},d=n(4),l=n.n(d),j="https://shielded-tundra-65261.herokuapp.com/api/persons",b={getData:function(){return l.a.get(j).then((function(e){return e.data}))},insertPerson:function(e){return l.a.post(j,e).then((function(e){return e})).catch((function(e){return console.log("error:",e)}))},deletePerson:function(e){return l.a.delete("".concat(j,"/").concat(e)).then((function(e){return e}))},updatePerson:function(e,t){return l.a.put("".concat(j,"/").concat(t),e).then((function(e){return e}))}},p=function(e){var t=e.setNewName,n=e.persons,r=e.setPersons,c=e.newName,o=e.newNumber,a=e.setNewNumber,s=e.handleAlert,d=function(){return n.map((function(e){return e.name.toUpperCase()})).includes(c.toUpperCase())},l=function(){t(""),a("")};return Object(i.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t={name:c,number:o},a="".concat(c," is already included in the list. Do you want to update it?"),i=n.find((function(e){return e.name.toUpperCase()===c.toUpperCase()}));return!0===d()&&!0===window.confirm(a)?(b.updatePerson(t,i.id).then((function(e){return r(n.map((function(t){return t.id!==i.id?t:e.data})))})),s("".concat(t.name," was updated succesfuly from the list!"),"green"),l()):!1===d()&&(b.insertPerson(t).then((function(e){r(n.concat([e.data])),s("".concat(t.name," was correctly added to the phonebook"),"green")})),l()),null},children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:c,onChange:function(e){t(e.target.value)},type:"text",required:!0})]}),Object(i.jsxs)("div",{children:["number:"," ",Object(i.jsx)("input",{value:o,onChange:function(e){a(e.target.value)},type:"number",required:!0})]}),Object(i.jsx)(u,{})]})},f=function(e){var t=e.filter,n=e.setFilter;return Object(i.jsxs)("div",{children:["filter: ",Object(i.jsx)("input",{value:t,onChange:function(e){n(e.target.value)}})]})},h=function(e){var t=e.persons,n=e.filter,r=e.setFilter,c=e.setPersons,o=e.handleAlert,a=t.map((function(e){return!0===e.name.toUpperCase().startsWith(n.toUpperCase())&&Object(i.jsx)("div",{children:Object(i.jsxs)("p",{children:[e.name," ",e.number,Object(i.jsx)("button",{onClick:function(){return function(e){if(!0===window.confirm("Do you whant to dele this entry?")){var n=t.find((function(t){return t.id===e}));b.deletePerson(e).then(b.getData().then((function(e){c(e),o("".concat(n.name," was deleted correctly from the phonebook"),"green")}))).catch((function(e){o("".concat(n.name," was already deleted previously"),"red")}))}}(e.id)},children:"Delete"})]})},e.id)}));return Object(i.jsxs)("div",{children:[Object(i.jsx)(f,{filter:n,setFilter:r}),Object(i.jsx)("div",{children:a})]})},m=n(7),O=n.n(m),x=function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{className:O.a.title,children:"Phonebook"}),Object(i.jsx)("h2",{className:O.a.add,children:"Add new phone"})]})},g={color:"black",border:"2px solid green",borderRadius:"10px",backgroundColor:"#DCDCDC",fontSize:"30px",fontFamily:"Arial",padding:"15px 15px"},v={color:"black",border:"2px solid red",borderRadius:"10px",backgroundColor:"#DCDCDC",fontSize:"30px",fontFamily:"Arial",padding:"15px 15px"},w=function(e){var t=e.alert;return t.message&&"green"===t.color?Object(i.jsx)("div",{children:Object(i.jsx)("p",{style:g,children:t.message})}):t.message&&"red"===t.color?Object(i.jsx)("div",{children:Object(i.jsx)("p",{style:v,children:t.message})}):null},C=function(){var e=Object(s.useState)([]),t=Object(a.a)(e,2),n=t[0],r=t[1],c=Object(s.useState)(""),u=Object(a.a)(c,2),d=u[0],l=u[1],j=Object(s.useState)(""),f=Object(a.a)(j,2),m=f[0],O=f[1],g=Object(s.useState)(""),v=Object(a.a)(g,2),C=v[0],y=v[1],N=Object(s.useState)({message:"",color:""}),D=Object(a.a)(N,2),k=D[0],P=D[1],A=function(e,t){P((function(n){return Object(o.a)(Object(o.a)({},n),{},{message:e,color:t})})),setTimeout((function(){P((function(e){return Object(o.a)(Object(o.a)({},e),{},{message:"",color:""})}))}),3e3)};return Object(s.useEffect)((function(){b.getData().then((function(e){return r(e)}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)(x,{}),Object(i.jsx)(w,{alert:k}),Object(i.jsx)(p,{setNewName:l,persons:n,setPersons:r,newName:d,newNumber:m,setNewNumber:O,setAlert:P,handleAlert:A}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(h,{persons:n,setPersons:r,filter:C,setFilter:y,setAlert:P,handleAlert:A})]})};c.a.render(Object(i.jsx)(C,{}),document.getElementById("root"))},7:function(e,t,n){e.exports={title:"Header_title__3na8O",add:"Header_add__3s6KT"}}},[[40,1,2]]]);
//# sourceMappingURL=main.fcd3e670.chunk.js.map