"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[682],{6306:function(t,e,o){o(2791);e.Z=o.p+"static/media/done.07989f3acab39c07ec7701417d68ddf4.svg"},8552:function(t,e,o){o(2791);e.Z=o.p+"static/media/edit.666b6fca3a40a0415e39054d202d0667.svg"},9682:function(t,e,o){o.r(e),o.d(e,{default:function(){return k}});var a=o(4165),r=o(4942),n=o(5861),i=o(885),c=o(9062),s=o(4453),p=o(2791),d=o(9434),u=o(7689),l=o(1087),h=o(9232),m=o(4426),_=o(4778),f=o(2789),G=o(4456),g={photoState:"EditGroup_photoState__HZZYi",editGroup:"EditGroup_editGroup__hM2KC",container:"EditGroup_container__GuEbf",photoGroup:"EditGroup_photoGroup__lVbZN",nameGroup:"EditGroup_nameGroup__R8J3k",photo:"EditGroup_photo__xSmAO",editPhoto:"EditGroup_editPhoto__9CFim",iconEdit:"EditGroup_iconEdit__pn8BT",iconAdd:"EditGroup_iconAdd__E6+pT",editPhotoInput:"EditGroup_editPhotoInput__smbSd",inputName:"EditGroup_inputName__TGRlT",aboutName:"EditGroup_aboutName__em67c",infoPhoto:"EditGroup_infoPhoto__f1KY5",accept:"EditGroup_accept__lIgm0",btnAccept:"EditGroup_btnAccept__oiv8v",errorName:"EditGroup_errorName__rvdLM",editPhotoGroup:"EditGroup_editPhotoGroup__V5yK2",labelPhoto:"EditGroup_labelPhoto__dkRR7",selecPhoto:"EditGroup_selecPhoto__5Nytd",back:"EditGroup_back__PfG5t"},x=o(8552),N=o(1694),v=o.n(N),j=o(184);function P(t){var e=t.state,o=t.stateGroup;return(0,j.jsxs)("div",{className:g.nameGroup,children:[(0,j.jsx)("img",{className:g.iconEdit,src:x.Z,alt:"edit name"}),(0,j.jsx)("input",{className:o[0].lengthNameErr?v()(g.inputName,g.errorName):g.inputName,type:"text",placeholder:e.name,onChange:function(t){t.target.value.trim().length>0&&o[1]({type:"name",payload:t.target.value.trim()})}}),(0,j.jsx)("span",{className:g.aboutName,children:"*name length no more than 20 characters"})]})}var b=o(9403),E=o(3825),y=o(6306);function Z(t){var e=t.state,o=t.stateGroup;return(0,j.jsxs)("div",{className:g.photoGroup,children:[(0,j.jsx)("div",{className:g.photo,children:o[0].selectedPhoto?(0,j.jsx)("img",{className:g.photoState,src:o[0].selectedPhoto,alt:"Photo group"}):e.photo?(0,j.jsx)("img",{className:g.photoState,src:e.photo,alt:"Photo group"}):(0,j.jsx)("img",{className:g.photoState,src:E,alt:"Photo group"})}),(0,j.jsxs)("div",{className:g.editPhoto,children:[(0,j.jsx)("img",{className:v()(g.iconEdit,g.iconAdd),src:b.Z,alt:"dedit photo"}),(0,j.jsx)("input",{id:g.editPhotoGroup,className:g.editPhotoInput,type:"file",onChange:function(t){return function(t){if(window.FileReader){o[1]({type:"photo",payload:t.target.files[0]});var e=t.target.files[0],a=new FileReader;e&&e.type.match("image.*")&&(a.onload=function(t){o[1]({type:"selectedPhotoGroup",payload:t.target.result})},a.readAsDataURL(e))}}(t)},accept:"image/*, .png, .jpg, .web"}),(0,j.jsx)("label",{className:g.labelPhoto,htmlFor:g.editPhotoGroup,children:"Edit Photo"}),(0,j.jsx)("span",{className:g.infoPhoto,children:"*.png, .jpg, .web"}),o[0].loadPhotoGroup&&(0,j.jsx)("span",{className:g.selecPhoto,children:(0,j.jsx)("img",{className:g.imgSelect,src:y.Z,alt:"done"})})]})]})}var w=o(1285);function k(){var t=(0,u.TH)().state,e=(0,p.useReducer)(h.Yj,h.m5),o=(0,i.Z)(e,2),x=o[0],N=o[1],v=(0,d.I0)(),b=(0,c.ad)(),E=(0,p.useReducer)(m.ro,m.fI),y=(0,i.Z)(E,2),k=y[0],A=y[1],I=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){var o,i,p,d,u,l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=t.id,i=Object.entries(t.users),null!==x.photo&&(p=(0,s.cF)(),d=(0,s.iH)(p,"groups/ID-".concat(o)),(u=(0,s.B0)(d,x.photo)).on("state_changed",(function(t){var e=t.bytesTransferred/t.totalBytes*100;N(e<100?{type:"loadPhotoGroup",payload:!0}:{type:"loadPhotoGroup",payload:h.m5.loadPhotoGroup})}),(function(){A({type:"activeModalWindow",payload:!0}),A({type:"errorClassName",payload:"Error while downloading a file"})}),(function(){(0,s.Jt)(u.snapshot.ref).then(function(){var t=(0,n.Z)((0,a.Z)().mark((function t(e){var s;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:s=e,v((0,_.qc)({photo:s,combinedId:o})),i.map(function(){var t=(0,n.Z)((0,a.Z)().mark((function t(n){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!1!==n[1].deleted){t.next=3;break}return t.next=3,(0,c.r7)((0,c.JU)(b,"chatsList",n[0]),(0,r.Z)({},"".concat(o,".photo.photo"),e));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}))),x.name.length<20&&""!==x.name?(l=x.name,v((0,_.wf)({combinedId:o,name:l})),i.map(function(){var t=(0,n.Z)((0,a.Z)().mark((function t(e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!1!==e[1].deleted){t.next=3;break}return t.next=3,(0,c.r7)((0,c.JU)(b,"chatsList",e[0]),(0,r.Z)({},"".concat(o,".name.name"),l));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())):x.name.length>20&&N({type:"lengthNameErr",payload:!0});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return x.loadPhotoGroup?(0,j.jsx)(f.a,{}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("section",{className:g.editGroup,children:[(0,j.jsxs)("div",{className:g.container,children:[(0,j.jsx)(Z,{state:t,stateGroup:[x,N]}),(0,j.jsx)(P,{state:t,stateGroup:[x,N]}),(0,j.jsx)("div",{className:g.accept,children:(0,j.jsx)("button",{onClick:function(){return I()},className:g.btnAccept,children:"Accept"})})]}),(0,j.jsx)(l.rU,{to:"/".concat(t.id),className:g.back,children:(0,j.jsx)("img",{src:w.Z,alt:"back"})})]}),k.activeModalWindow?(0,j.jsx)(G.T,{state:[k,A]}):(0,j.jsx)(j.Fragment,{})]})}}}]);
//# sourceMappingURL=682.6487d6e4.chunk.js.map