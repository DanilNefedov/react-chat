"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[298],{9298:function(e,s,n){n.r(s),n.d(s,{default:function(){return b}});var t=n(4165),a=n(4942),r=n(5861),i=n(885),d=n(7689),o={header:"MessagesMain_header__EMkYa",user:"MessagesMain_user__TDMJA",userImg:"MessagesMain_userImg__Mop0A",name:"MessagesMain_name__58IH7",online:"MessagesMain_online__FByeQ",dots:"MessagesMain_dots__9N9pU",container:"MessagesMain_container__c2E6N",input:"MessagesMain_input__R5zJ0",send:"MessagesMain_send__tKhge",textArea:"MessagesMain_textArea__v6811",messages:"MessagesMain_messages__eWIbA",empty:"MessagesMain_empty__Un+PR",messagesMe:"MessagesMain_messagesMe__Go3UK",messagesFriend:"MessagesMain_messagesFriend__4kSKR",messageContainerMe:"MessagesMain_messageContainerMe__GIXeF",messageContainerFriend:"MessagesMain_messageContainerFriend__6diH7",dateMe:"MessagesMain_dateMe__XY83U",dateFriend:"MessagesMain_dateFriend__Iu9Pj",dateMessages:"MessagesMain_dateMessages__HlrtQ",deletedInput:"MessagesMain_deletedInput__caMDW"},c=n(1694),u=n.n(c),f=n(9434),l=n(2791);var g=n.p+"static/media/send.e6e41f470c70eedfe79bcc21222a7720.svg",m=n(184);function h(e){var s=e.setSet2,n=(e.setSet3,e.setSet,e.sendMess),t=e.text,a=e.setMessageText,r=e.handleEvent,i=e.innerRef;return console.log(window.visualViewport),(0,l.useEffect)((function(){function e(){s(window.visualViewport.height)}function n(){s(window.visualViewport.height)}return window.addEventListener("keyboardDidShow",e),window.addEventListener("keyboardDidHide",n),console.log("w"),function(){e(),n()}}),[]),(0,m.jsxs)("section",{className:o.textArea,ref:i,children:[(0,m.jsx)("textarea",{placeholder:"Enter your message",onKeyDown:r,value:t,onChange:function(e){return a(e.target.value)},name:"messages",id:"textarea",type:"text",className:o.input,rows:"1"}),(0,m.jsx)("button",{onClick:function(){return n()},type:"submit",className:o.send,children:(0,m.jsx)("img",{src:g,alt:"Send"})})]})}var M=n(9062),p=n(3249);function _(e){var s=e.infoChat,n=e.scrollRef,t=e.reloadMess,a=(0,f.v9)((function(e){return e.message.messages})),r=(0,f.v9)((function(e){return e.user})),i=a.find((function(e){return e.chatId===s.id})),d=(0,M.ad)(),c=(0,f.I0)(),g=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return(0,l.useEffect)((function(){n.current.scrollTop=n.current.scrollHeight}),[a]),(0,l.useEffect)((function(){return window.addEventListener("onload",t),t(),function(){return window.addEventListener("resize",t)}}),[a,window.innerHeight]),(0,l.useEffect)((function(){var e=(0,M.cf)((0,M.JU)(d,"chats",s.id),(function(e){if(!e.data())return!1;var n=e.data(),t=s.id;n.messages.map((function(e){var s=e.userId,n=e.messageText,a=e.id,r=e.date,i=g[r.toDate().getDay()],d=r.toDate().getHours(),o=r.toDate().getMinutes().toString();1===o.length&&(o="0".concat(o));var u="".concat(i," ").concat(d,":").concat(o);c((0,p.Hz)({chatId:t,userId:s,messageText:n,datePush:u,messageId:a}))}))}));return function(){e()}}),[s.id]),a.length>0&&i?i.messages.map((function(e){return e.userId===r.id?(0,m.jsx)("div",{className:o.messageContainerMe,children:(0,m.jsxs)("span",{className:u()("message",o.messagesMe),children:[e.text,(0,m.jsx)("span",{className:u()(o.dateMessages,o.dateMe),children:e.date})]})},e.messageId):(0,m.jsx)("div",{className:o.messageContainerFriend,children:(0,m.jsxs)("span",{className:u()("message",o.messagesFriend),children:[e.text,(0,m.jsx)("span",{className:u()(o.dateMessages,o.dateFriend),children:e.date})]})},e.messageId)})):(0,m.jsx)("div",{className:u()(o.empty),children:"No Messages"})}var v,x={randomUUID:"undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},w=new Uint8Array(16);function y(){if(!v&&!(v="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return v(w)}for(var I=[],j=0;j<256;++j)I.push((j+256).toString(16).slice(1));function N(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return(I[e[s+0]]+I[e[s+1]]+I[e[s+2]]+I[e[s+3]]+"-"+I[e[s+4]]+I[e[s+5]]+"-"+I[e[s+6]]+I[e[s+7]]+"-"+I[e[s+8]]+I[e[s+9]]+"-"+I[e[s+10]]+I[e[s+11]]+I[e[s+12]]+I[e[s+13]]+I[e[s+14]]+I[e[s+15]]).toLowerCase()}var U=function(e,s,n){if(x.randomUUID&&!s&&!e)return x.randomUUID();var t=(e=e||{}).random||(e.rng||y)();if(t[6]=15&t[6]|64,t[8]=63&t[8]|128,s){n=n||0;for(var a=0;a<16;++a)s[n+a]=t[a];return s}return N(t)},S=n(3825),E=n(4229);function b(){var e=(0,f.v9)((function(e){return e.friend.friend})),s=(0,f.v9)((function(e){return e.user})),n=(0,d.bx)(),c=(0,l.useRef)(),g=(0,l.useRef)(),p=(0,l.useRef)(),v=(0,M.ad)(),x=Object.values((0,d.UO)()),w=(0,i.Z)(x,1)[0],y=e.find((function(e){return e.id===w})),I=(0,f.I0)(),j=(0,l.useState)(!1),N=(0,i.Z)(j,2),b=N[0],D=N[1],R=(0,l.useState)(""),C=(0,i.Z)(R,2),H=C[0],Z=C[1],k=function(){var e=(0,r.Z)((0,t.Z)().mark((function e(){var n,r,i,d,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=H,Z(""),""===n){e.next=15;break}return i=U(),d=M.EK.now(),e.next=7,(0,M.r7)((0,M.JU)(v,"chats",y.id),{messages:(0,M.vr)({id:i,messageText:n,userId:s.id,date:d})});case 7:return e.next=9,(0,M.r7)((0,M.JU)(v,"chatsList",s.id),(r={},(0,a.Z)(r,y.id+".lastMessage",{messageText:n}),(0,a.Z)(r,y.id+".date",(0,M.Bt)()),r));case 9:return e.next=11,(0,M.QT)((0,M.JU)(v,"chatsList",y.friendId));case 11:if(!e.sent.exists()){e.next=15;break}return e.next=15,(0,M.r7)((0,M.JU)(v,"chatsList",y.friendId),(o={},(0,a.Z)(o,y.id+".lastMessage",{messageText:n}),(0,a.Z)(o,y.id+".date",(0,M.Bt)()),o));case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,l.useEffect)((function(){var e=(0,M.cf)((0,M.JU)(v,"chatsList",s.id),(function(e){var s=Object.entries(e.data());if(s){var n=s.find((function(e){return e[0]===y.id}));if(n){var t=y.id,a=n[1].userInfo.displayName?n[1].userInfo.displayName:"",r=n[1].userInfo.photo;if("deleted"===n[1].userInfo.acc)return I((0,E.aE)({name:a,photo:r,friendInfo:t})),void D(!0);I((0,E.aE)({name:a,photo:r,friendInfo:t})),D(!1)}}}));return function(){e()}}),[e.name,e.photo,e.email]);var F=(0,l.useState)(""),T=(0,i.Z)(F,2),L=T[0],A=T[1],J=(0,l.useState)(""),K=(0,i.Z)(J,2),V=K[0],z=K[1],B=(0,l.useState)(""),O=(0,i.Z)(B,2),P=O[0],Q=O[1];return(0,m.jsx)("section",{className:o.messagesSec,children:(0,m.jsxs)("div",{className:u()(o.container,"container"),children:[(0,m.jsx)("header",{className:o.header,ref:c,children:(0,m.jsxs)("div",{className:o.user,children:[(0,m.jsx)("div",{className:o.userImg,children:(0,m.jsx)("img",{src:null!==y.photo?y.photo:S,alt:"User"})}),(0,m.jsx)("div",{className:o.about,children:(0,m.jsxs)("h2",{className:o.name,children:[y.name,L,"window ".concat(window.innerHeight),V,P]})})]})}),(0,m.jsx)("section",{ref:g,id:"scroll",className:o.messages,children:(0,m.jsx)(_,{reloadMess:function(){if(null!==g.current){var e=n.navRef.current.offsetHeight,s=c.current.offsetHeight,t=p.current.offsetHeight,a=window.innerHeight-(e+s+t);g.current.style.height="".concat(a,"px")}},scrollRef:g,infoChat:y})}),b?(0,m.jsx)("div",{ref:p,className:u()(o.deletedInput),children:"Account has been deleted"}):(0,m.jsx)(h,{setSet2:z,setSet3:Q,set:L,setSet:A,innerRef:p,handleEvent:function(e){"Enter"===e.code&&!1===e.ctrlKey&&!1===e.shiftKey&&(e.preventDefault(),k())},sendMess:k,text:H,setMessageText:Z})]})})}}}]);
//# sourceMappingURL=298.bd12950c.chunk.js.map