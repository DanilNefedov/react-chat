"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[737],{1737:function(e,a,r){r.r(a),r.d(a,{default:function(){return _e}});var t=r(4942),n=r(4165),o=r(5861),s=r(885),l=r(1694),i=r.n(l),d=r(9434),c="Profile_nameSection__TqdwX",p="Profile_emailSection__uBeH5",u="Profile_profile__CNjja",m="Profile_container__DAQbH",f="Profile_nameEmail__6lDNe",h="Profile_userInfo__FC82a",y="Profile_photoSection__cDFb8",v="Profile_loadPhoto__eOozl",_="Profile_containerBtn__GUjq7",x="Profile_btnDelete__1hWuW",j="Profile_editPhoto__3h4M9",N="Profile_iconBtn__qVzQs",w="Profile_editUserInfo__qqlCn",g="Profile_downloadImg__fTg54",Z="Profile_deletePhoto__jdqsu",E="Profile_editName__s5AkF",P="Profile_editEmail__O+BDF",C="Profile_userPhoto__XtQye",F="Profile_editAbout__pRsLI",b="Profile_editField__UJW8q",M="Profile_nameUser__VFdA3",k="Profile_emailUser__y+r9r",A="Profile_btnUpdate__1a50g",U="Profile_updateSection__ak8lA",R="Profile_infoSize__Xjvfs",I="Profile_err__Y2kSC",S="Profile_selected__fmGJN",D="Profile_containerEditUser__tBMHC",W="Profile_containerUserInfo__WzqsD",J=r(2791),L=r(4453),q=r(3002),B=r(9850),z=r(9062),H="Modal_containerModal__qkAvk",X="Modal_header__X+KYy",O="Modal_input__1BZdg",T="Modal_btn__5E4V4",G="Modal_exitBtn__OHyqS",Q="Modal_exitImg__8WWAm",V="Modal_err__9iujb";var Y=r.p+"static/media/back-dark.0645de5e8c6159eb4cd2606e1c4042ec.svg",K=r(4426),$=r(1413),ee={photo:null,selectedPhoto:null,name:"",email:"",emailClassError:!1,nameClassError:!1,modalReAuth:!1,deletedFriend:!1,passwordModalReAuth:""};function ae(e,a){switch(a.type){case"setPhoto":return(0,$.Z)((0,$.Z)({},e),{},{photo:a.payload});case"selectedPhoto":return(0,$.Z)((0,$.Z)({},e),{},{selectedPhoto:a.payload});case"setName":return(0,$.Z)((0,$.Z)({},e),{},{name:a.payload});case"setEmail":return(0,$.Z)((0,$.Z)({},e),{},{email:a.payload});case"emailClassError":return(0,$.Z)((0,$.Z)({},e),{},{emailClassError:a.payload});case"nameClassError":return(0,$.Z)((0,$.Z)({},e),{},{nameClassError:a.payload});case"modalReAuth":return(0,$.Z)((0,$.Z)({},e),{},{modalReAuth:a.payload});case"deletedFriend":return(0,$.Z)((0,$.Z)({},e),{},{deletedFriend:a.payload});case"passwordModalReAuth":return(0,$.Z)((0,$.Z)({},e),{},{passwordModalReAuth:a.payload});case"resetSomeField":return function(e){var a=Object.assign(ee,ee,(0,t.Z)({},e[0],e[1]));return console.log(a),(0,$.Z)({},a)}(a.payload);case"resetProfile":return function(e){return(0,$.Z)({},e)}(a.payload)}}var re=r(184);function te(e){var a=e.stateProfile,r=e.deleteAccount,t=e.submiteUpdates,n=e.state;return(0,re.jsxs)("div",{className:a[0].modalReAuth||a[0].deletedFriend?"modal active-modal":"modal",children:[(0,re.jsx)("div",{onClick:function(e){e.preventDefault(),a[1]({type:"resetSomeField",payload:["passwordModalReAuth",ee.passwordModalReAuth]}),a[1]({type:"deletedFriend",payload:!1}),a[1]({type:"modalReAuth",payload:!1}),"Error in re-authorization"===n[0].informationAboutError&&n[1]({type:"resetModal",payload:K.fI})},className:i()(G),children:(0,re.jsx)("img",{className:i()(Q),src:Y,alt:"Back"})}),(0,re.jsxs)("div",{className:H,children:[(0,re.jsx)("p",{className:i()(X,"head-name"),children:"Enter Your Password"}),(0,re.jsx)("input",{className:"Error in re-authorization"===n[0].informationAboutError?i()(O,V):i()(O),value:a[0].passwordModalReAuth,onChange:function(e){return a[1]({type:"passwordModalReAuth",payload:e.target.value})},type:"password"}),(0,re.jsx)("button",{className:i()(T,"head-name"),onClick:function(e){a[0].deletedFriend?r(e):t(e)},children:a[0].deletedFriend?"Delete":"Log In"})]})]})}var ne=r(4229),oe=r(3249),se=r(2010),le=r(3825);function ie(e){var a=e.stateProfile,r=(0,d.v9)((function(e){return e.user}));return(0,re.jsx)(re.Fragment,{children:a.selectedPhoto?(0,re.jsx)("div",{className:i()(y,"photo"),children:(0,re.jsx)("div",{className:i()(C,"user-photo"),children:(0,re.jsx)("img",{src:a.selectedPhoto,alt:"user"})})}):r.photo?(0,re.jsx)("div",{className:i()(y,"photo"),children:(0,re.jsx)("div",{className:i()(C,"user-photo"),children:(0,re.jsx)("img",{src:r.photo,alt:"user"})})}):(0,re.jsx)("div",{className:i()(y,"photo"),children:(0,re.jsx)("div",{className:i()(C,"user-photo"),children:(0,re.jsx)("img",{src:le,alt:"user"})})})})}var de=r.p+"static/media/delete-acc.aacc3623367959073fcf172978d7e05c.svg";function ce(e){var a=e.stateProfile;return(0,re.jsxs)("div",{className:i()(_,"btn-delete"),children:[(0,re.jsx)("img",{className:i()(N),src:de,alt:"delete"}),(0,re.jsx)("button",{onClick:function(e){e.preventDefault(),a({type:"modalReAuth",payload:!0}),a({type:"deletedFriend",payload:!0})},className:i()(x),children:"Delete Account"})]})}var pe=r.p+"static/media/download.a03a720eceda925bb61ccd9421ba3baf.svg";var ue=r.p+"static/media/add.fcc2e62b8f34216f112ad5b485f24800.svg";var me=r.p+"static/media/edit.666b6fca3a40a0415e39054d202d0667.svg";var fe=r.p+"static/media/email.6810d75c8386a8ea7d241227a74ff391.svg";var he=r.p+"static/media/done.07989f3acab39c07ec7701417d68ddf4.svg";function ye(e){var a=e.state,r=e.stateProfile,s=(0,d.v9)((function(e){return e.user})),l=(0,d.v9)((function(e){return e.friend.friend})),u=(0,d.I0)(),m=(0,z.ad)(),f=(0,q.v0)();(0,J.useEffect)((function(){var e=(0,z.cf)((0,z.JU)(m,"users",s.id),(function(e){var a=e.data();if(a){var r=a.name,t=a.photoURL,n=a.email;u((0,B.Nq)({name:r,photo:t,email:n}))}}));return function(){e()}}),[s.name,s.photoURL,s.email]);var h=function(e){if(window.FileReader){r[1]({type:"setPhoto",payload:e.target.files[0]});var a=e.target.files[0],t=new FileReader;a&&a.type.match("image.*")&&(t.onload=function(e){r[1]({type:"selectedPhoto",payload:e.target.result})},t.readAsDataURL(a))}};return(0,re.jsxs)(re.Fragment,{children:[s.photo?(0,re.jsxs)(re.Fragment,{children:[(0,re.jsxs)("div",{className:i()(j,"edit-photo"),children:[(0,re.jsx)("img",{className:i()(N),src:pe,alt:"download"}),(0,re.jsx)("label",{className:g,htmlFor:v,children:"Edit Photo"}),(0,re.jsx)("input",{id:v,type:"file",onChange:function(e){return h(e)},accept:"image/*, .png, .jpg, .web"}),r[0].selectedPhoto?(0,re.jsx)("span",{className:i()(S),children:(0,re.jsx)("img",{src:he,alt:"done"})}):(0,re.jsx)(re.Fragment,{}),(0,re.jsx)("span",{className:R,children:"*.png, .jpg, .web"})]}),(0,re.jsxs)("div",{className:i()(Z,"delete-photo"),children:[(0,re.jsx)("img",{className:i()(N),src:de,alt:"delete"}),(0,re.jsx)("button",{onClick:function(e){return function(e){if(e.preventDefault(),null!==s.photo){var i=(0,L.cF)(),d=(0,L.iH)(i,s.photo);(0,L.oq)(d).then((0,o.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u((0,B.Nm)()),e.next=3,(0,z.r7)((0,z.JU)(m,"users",s.id),{photoURL:null});case 3:return e.next=5,(0,q.ck)(f.currentUser,{photoURL:""}).then((function(){a[1]({type:"resetModal",payload:K.fI})})).catch((function(){a[1]({type:"activeModalWindow",payload:!0}),a[1]({type:"errorClassName",payload:"Error during photo deletion"})}));case 5:l.map(function(){var e=(0,o.Z)((0,n.Z)().mark((function e(a){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,z.r7)((0,z.JU)(m,"chatsList",a.friendId),(0,t.Z)({},a.id+".userInfo",{id:s.id,displayName:""!==r[0].name?r[0].name:s.name,photo:null}));case 3:e.next=8;break;case 5:return e.prev=5,e.t0=e.catch(0),e.abrupt("return");case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(a){return e.apply(this,arguments)}}()),a[1]({type:"resetModal",payload:K.fI});case 7:case"end":return e.stop()}}),e)})))).catch((function(){a[1]({type:"activeModalWindow",payload:!0}),a[1]({type:"errorClassName",payload:"Error during photo deletion"})}))}""===r[0].email&&r[1]({type:"resetSomeField",payload:["emailClassError",ee.emailClassError]}),""===r[0].name&&r[1]({type:"resetSomeField",payload:["nameClassError",ee.nameClassError]})}(e)},className:i()(x,"delete"),children:"Delete Photo"})]})]}):(0,re.jsxs)("div",{className:i()(j,"edit-photo"),children:[(0,re.jsx)("img",{className:i()(N),src:ue,alt:"add"}),(0,re.jsx)("label",{className:g,htmlFor:v,children:"Download Photo"}),(0,re.jsx)("input",{id:v,type:"file",onChange:function(e){return h(e)},accept:"image/*, .png, .jpg, .web"}),r[0].selectedPhoto?(0,re.jsx)("span",{className:i()(S),children:(0,re.jsx)("img",{src:he,alt:"done"})}):(0,re.jsx)(re.Fragment,{}),(0,re.jsx)("span",{className:R,children:"*.png, .jpg, .web"})]}),(0,re.jsxs)("div",{className:i()(c,"name"),children:[(0,re.jsx)("img",{className:i()(N),src:me,alt:"edit"}),(0,re.jsx)("span",{className:i()(b,"head-name"),children:"Edit Name: "}),(0,re.jsx)("input",{value:r[0].name,onChange:function(e){return r[1]({type:"setName",payload:e.target.value})},placeholder:"Enter name",type:"text",className:r[0].nameClassError?i()("edit-field",E,I):i()("edit-field",E)}),(0,re.jsx)("span",{className:R,children:"*name length no more than 20 characters"})]}),(0,re.jsxs)("div",{className:i()(p,"email"),children:[(0,re.jsx)("img",{className:i()(N),src:fe,alt:"edit"}),(0,re.jsx)("span",{className:i()(b,"head-name"),children:"Edit Email: "}),(0,re.jsx)("input",{value:r[0].email,onChange:function(e){return r[1]({type:"setEmail",payload:e.target.value})},placeholder:"Enter email",type:"email",className:r[0].emailClassError?i()("edit-field",P,I):i()("edit-field",P)})]})]})}var ve=r(2789);function _e(){var e=(0,d.v9)((function(e){return e.user})),a=(0,d.v9)((function(e){return e.friend.friend})),r=(0,J.useReducer)(K.ro,K.fI),l=(0,s.Z)(r,2),c=l[0],p=l[1],y=(0,J.useReducer)(ae,ee),v=(0,s.Z)(y,2),_=v[0],x=v[1],j=(0,q.v0)(),N=(0,d.I0)(),g=(0,z.ad)(),Z=function(){var r=(0,o.Z)((0,n.Z)().mark((function r(s){var l,i,d,c,u;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s.preventDefault(),r.prev=1,""===_.email){r.next=7;break}return l=q.w9.credential(j.currentUser.email,_.passwordModalReAuth),i=j.currentUser,r.next=7,(0,q.aF)(i,l).then((0,o.Z)((0,n.Z)().mark((function a(){return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,(0,q.s)(i,_.email).then((0,o.Z)((0,n.Z)().mark((function a(){return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,(0,q.ck)(j.currentUser,{email:""!==_.email?_.email:e.email}).then((function(){x({type:"resetSomeField",payload:["setEmail",ee.email]}),p({type:"resetModal",payload:K.fI})})).catch((function(){p({type:"activeModalWindow",payload:!0}),p({type:"errorClassName",payload:"Error in email update"})}));case 2:return a.next=4,(0,z.r7)((0,z.JU)(g,"users",e.id),{email:""!==_.email?_.email:e.email});case 4:x({type:"resetSomeField",payload:["setEmail",ee.email]}),x({type:"resetSomeField",payload:["emailClassError",ee.emailClassError]});case 6:case"end":return a.stop()}}),a)})))).catch((function(){x({type:"emailClassError",payload:!0})}));case 2:""===_.name&&x({type:"resetSomeField",payload:["emailClassError",ee.emailClassError]}),p({type:"resetModal",payload:K.fI}),x({type:"resetSomeField",payload:["passwordModalReAuth",ee.passwordModalReAuth]}),x({type:"resetSomeField",payload:["setEmail",ee.email]}),x({type:"modalReAuth",payload:!0});case 7:case"end":return a.stop()}}),a)})))).catch((function(){x({type:"resetSomeField",payload:["passwordModalReAuth",ee.passwordModalReAuth]}),x({type:"resetSomeField",payload:["modalReAuth",ee.modalReAuth]}),p({type:"errorClassName",payload:"Error in re-authorization"})}));case 7:if(_.photo&&(d=(0,L.cF)(),c=(0,L.iH)(d,"avatar/".concat(e.name)),(u=(0,L.B0)(c,_.photo)).on("state_changed",(function(e){if(e.bytesTransferred/e.totalBytes*100<100)return(0,re.jsx)(ve.a,{});p({type:"resetModal",payload:K.fI})}),(function(){p({type:"activeModalWindow",payload:!0}),p({type:"errorClassName",payload:"Error while downloading a file"})}),(function(){(0,L.Jt)(u.snapshot.ref).then(function(){var r=(0,o.Z)((0,n.Z)().mark((function r(s){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,q.ck)(j.currentUser,{photoURL:s}).then((function(){p({type:"resetModal",payload:K.fI})})).catch((function(){p({type:"activeModalWindow",payload:!0}),p({type:"errorClassName",payload:"Error in photo update"})}));case 2:return r.next=4,(0,z.r7)((0,z.JU)(g,"users",e.id),{photoURL:s});case 4:a.map(function(){var a=(0,o.Z)((0,n.Z)().mark((function a(r){return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!r.friendId){a.next=3;break}return a.next=3,(0,z.r7)((0,z.JU)(g,"chatsList",r.friendId),(0,t.Z)({},r.id+".userInfo",{id:e.id,displayName:""!==_.name?_.name:e.name,photo:s}));case 3:if(void 0!==r.friendId){a.next=5;break}return a.abrupt("return");case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}());case 5:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())})),""===_.email&&x({type:"resetSomeField",payload:["emailClassError",ee.emailClassError]}),""===_.name&&x({type:"resetSomeField",payload:["nameClassError",ee.nameClassError]})),_.name.length>20&&(x({type:"nameClassError",payload:!0}),""===_.email&&x({type:"resetSomeField",payload:["emailClassError",ee.emailClassError]})),!(_.name.length<=20&&""!==_.name)){r.next=16;break}return r.next=12,(0,q.ck)(j.currentUser,{displayName:""!==_.name?_.name:e.name}).then((function(){x({type:"resetSomeField",payload:["nameClassError",ee.nameClassError]}),p({type:"resetModal",payload:K.fI})})).catch((function(e){p({type:"activeModalWindow",payload:!0}),p({type:"errorClassName",payload:"Error updating name or photo"}),console.error(e)}));case 12:return r.next=14,(0,z.r7)((0,z.JU)(g,"users",e.id),{name:""!==_.name?_.name:e.name});case 14:a.map(function(){var a=(0,o.Z)((0,n.Z)().mark((function a(r){return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!r.friendId){a.next=3;break}return a.next=3,(0,z.r7)((0,z.JU)(g,"chatsList",r.friendId),(0,t.Z)({},r.id+".userInfo",{id:e.id,displayName:""!==_.name?_.name:e.name,photo:e.photo}));case 3:if(void 0!==r.friendId){a.next=5;break}return a.abrupt("return");case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()),x({type:"resetSomeField",payload:["emailClassError",ee.emailClassError]});case 16:p({type:"resetModal",payload:K.fI}),r.next=23;break;case 19:r.prev=19,r.t0=r.catch(1),p({type:"activeModalWindow",payload:!0}),console.error(r.t0);case 23:case"end":return r.stop()}}),r,null,[[1,19]])})));return function(e){return r.apply(this,arguments)}}();return(0,re.jsxs)("section",{className:i()(u,"profile"),children:[(0,re.jsxs)("div",{className:i()(m,"container"),children:[(0,re.jsx)("div",{className:i()(h,"user-info"),children:(0,re.jsxs)("div",{className:i()(W,"container-userInfo"),children:[(0,re.jsx)(ie,{stateProfile:_}),(0,re.jsxs)("div",{className:i()(f,"name-email"),children:[(0,re.jsxs)("p",{className:i()(M,"name-user"),children:[(0,re.jsx)("span",{className:i()(F,"head-name"),children:"Name:"}),(0,re.jsx)("span",{className:"header",children:e.name})]}),(0,re.jsxs)("p",{className:i()(k,"emailUser header"),children:[(0,re.jsx)("span",{className:i()(F,"head-name"),children:" Email:"}),(0,re.jsx)("span",{className:"header",children:e.email})]}),(0,re.jsx)(ce,{stateProfile:x})]})]})}),(0,re.jsx)("div",{className:i()(w,"edit-user-info"),children:(0,re.jsxs)("div",{className:i()(D,"container"),children:[(0,re.jsx)(ye,{state:[c,p],stateProfile:[_,x]}),(0,re.jsx)("div",{className:i()(U,"update"),children:(0,re.jsx)("button",{onClick:function(e){""!==_.email?x({type:"modalReAuth",payload:!0}):Z(e)},className:i()(A),children:"Update"})})]})})]}),(0,re.jsx)(te,{state:[c,p],stateProfile:[_,x],deleteAccount:function(e){e.preventDefault();var r=j.currentUser,s=q.w9.credential(j.currentUser.email,_.passwordModalReAuth);(0,q.aF)(r,s).then((function(){x({type:"deletedFriend",payload:!0}),(0,q.h8)(r).then((0,o.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,z.oe)((0,z.JU)(g,"users",r.uid));case 2:a.map(function(){var e=(0,o.Z)((0,n.Z)().mark((function e(a){var o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,z.r7)((0,z.JU)(g,"chatsList",r.uid),(o={},(0,t.Z)(o,a.id,(0,z.AK)()),(0,t.Z)(o,"acc","deleted"),o));case 2:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()),a.map(function(){var e=(0,o.Z)((0,n.Z)().mark((function e(a){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,z.r7)((0,z.JU)(g,"chatsList",a.friendId),(0,t.Z)({},a.id+".userInfo",{photo:null,displayName:"Deleted",acc:"deleted"}));case 2:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()),(0,q.w7)(j).then((function(){N((0,B.kX)()),N((0,ne.Uq)()),N((0,oe.Gd)()),p({type:"resetModal",payload:K.fI})})).catch((function(){p({type:"activeModalWindow",payload:!0}),p({type:"errorClassName",payload:"Error when logging out of your account"})})),p({type:"resetModal",payload:K.fI});case 6:case"end":return e.stop()}}),e)})))).catch((function(){p({type:"activeModalWindow",payload:!0}),p({type:"errorClassName",payload:"Error in time to delete the account"})})),p({type:"resetModal",payload:K.fI}),x({type:"deletedFriend",payload:!1})})).catch((function(){x({type:"deletedFriend",payload:!0}),x({type:"resetSomeField",payload:["passwordModalReAuth",ee.passwordModalReAuth]}),p({type:"errorClassName",payload:"Error in re-authorization"})}))},submiteUpdates:Z}),c.activeModalWindow?(0,re.jsx)(se.T,{state:[c,p]}):(0,re.jsx)(re.Fragment,{})]})}}}]);
//# sourceMappingURL=737.906a1500.chunk.js.map