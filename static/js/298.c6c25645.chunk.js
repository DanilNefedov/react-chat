"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[298],{9298:function(e,s,n){n.r(s),n.d(s,{default:function(){return C}});var a=n(4165),t=n(4942),r=n(5861),i=n(885),d=n(7689),c={header:"MessagesMain_header__EMkYa",user:"MessagesMain_user__TDMJA",userImg:"MessagesMain_userImg__Mop0A",name:"MessagesMain_name__58IH7",online:"MessagesMain_online__FByeQ",dots:"MessagesMain_dots__9N9pU",container:"MessagesMain_container__c2E6N",input:"MessagesMain_input__R5zJ0",send:"MessagesMain_send__tKhge",textArea:"MessagesMain_textArea__v6811",messages:"MessagesMain_messages__eWIbA",empty:"MessagesMain_empty__Un+PR",messagesMe:"MessagesMain_messagesMe__Go3UK",messagesFriend:"MessagesMain_messagesFriend__4kSKR",messageContainerMe:"MessagesMain_messageContainerMe__GIXeF",messageContainerFriend:"MessagesMain_messageContainerFriend__6diH7",dateMe:"MessagesMain_dateMe__XY83U",dateFriend:"MessagesMain_dateFriend__Iu9Pj",dateMessages:"MessagesMain_dateMessages__HlrtQ",deletedInput:"MessagesMain_deletedInput__caMDW"},o=n(1694),u=n.n(o),f=n(9434),l=n(2791);var g=n.p+"static/media/send.e6e41f470c70eedfe79bcc21222a7720.svg",m=n(184);function M(e){var s=e.reloadMess,n=e.sendMess,a=e.text,t=e.setMessageText,r=e.handleEvent,i=e.innerRef;return(0,m.jsxs)("section",{className:c.textArea,ref:i,children:[(0,m.jsx)("textarea",{onClick:function(){return s()},placeholder:"Enter your message",onKeyDown:r,value:a,onChange:function(e){return t(e.target.value)},name:"messages",id:"textarea",type:"text",className:c.input,rows:"1"}),(0,m.jsx)("button",{onClick:function(){return n()},type:"submit",className:c.send,children:(0,m.jsx)("img",{src:g,alt:"Send"})})]})}var h=n(9062),_=n(3249);function p(e){var s=e.infoChat,n=e.scrollRef,a=e.reloadMess,t=(0,f.v9)((function(e){return e.message.messages})),r=(0,f.v9)((function(e){return e.user})),i=t.find((function(e){return e.chatId===s.id})),d=(0,h.ad)(),o=(0,f.I0)(),g=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return(0,l.useEffect)((function(){n.current.scrollTop=n.current.scrollHeight}),[t]),(0,l.useEffect)((function(){return window.addEventListener("onload",a),a(),function(){return window.addEventListener("resize",a)}}),[t,window.innerHeight]),(0,l.useEffect)((function(){var e=(0,h.cf)((0,h.JU)(d,"chats",s.id),(function(e){if(!e.data())return!1;var n=e.data(),a=s.id;n.messages.map((function(e){var s=e.userId,n=e.messageText,t=e.id,r=e.date,i=g[r.toDate().getDay()],d=r.toDate().getHours(),c=r.toDate().getMinutes().toString();1===c.length&&(c="0".concat(c));var u="".concat(i," ").concat(d,":").concat(c);o((0,_.Hz)({chatId:a,userId:s,messageText:n,datePush:u,messageId:t}))}))}));return function(){e()}}),[s.id]),t.length>0&&i?i.messages.map((function(e){return e.userId===r.id?(0,m.jsx)("div",{className:c.messageContainerMe,children:(0,m.jsxs)("span",{className:u()("message",c.messagesMe),children:[e.text,(0,m.jsx)("span",{className:u()(c.dateMessages,c.dateMe),children:e.date})]})},e.messageId):(0,m.jsx)("div",{className:c.messageContainerFriend,children:(0,m.jsxs)("span",{className:u()("message",c.messagesFriend),children:[e.text,(0,m.jsx)("span",{className:u()(c.dateMessages,c.dateFriend),children:e.date})]})},e.messageId)})):(0,m.jsx)("div",{className:u()(c.empty),children:"No Messages"})}var v,x={randomUUID:"undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},y=new Uint8Array(16);function I(){if(!v&&!(v="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return v(y)}for(var j=[],N=0;N<256;++N)j.push((N+256).toString(16).slice(1));function U(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return(j[e[s+0]]+j[e[s+1]]+j[e[s+2]]+j[e[s+3]]+"-"+j[e[s+4]]+j[e[s+5]]+"-"+j[e[s+6]]+j[e[s+7]]+"-"+j[e[s+8]]+j[e[s+9]]+"-"+j[e[s+10]]+j[e[s+11]]+j[e[s+12]]+j[e[s+13]]+j[e[s+14]]+j[e[s+15]]).toLowerCase()}var w=function(e,s,n){if(x.randomUUID&&!s&&!e)return x.randomUUID();var a=(e=e||{}).random||(e.rng||I)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,s){n=n||0;for(var t=0;t<16;++t)s[n+t]=a[t];return s}return U(a)},b=n(3825),E=n(4229);function C(){var e=(0,f.v9)((function(e){return e.friend.friend})),s=(0,f.v9)((function(e){return e.user})),n=(0,d.bx)(),o=(0,l.useRef)(),g=(0,l.useRef)(),_=(0,l.useRef)(),v=(0,h.ad)(),x=Object.values((0,d.UO)()),y=(0,i.Z)(x,1)[0],I=e.find((function(e){return e.id===y})),j=(0,f.I0)(),N=(0,l.useState)(!1),U=(0,i.Z)(N,2),C=U[0],R=U[1],D=(0,l.useState)(""),F=(0,i.Z)(D,2),T=F[0],k=F[1],H=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(){var n,r,i,d,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=T,k(""),""===n){e.next=15;break}return i=w(),d=h.EK.now(),e.next=7,(0,h.r7)((0,h.JU)(v,"chats",I.id),{messages:(0,h.vr)({id:i,messageText:n,userId:s.id,date:d})});case 7:return e.next=9,(0,h.r7)((0,h.JU)(v,"chatsList",s.id),(r={},(0,t.Z)(r,I.id+".lastMessage",{messageText:n}),(0,t.Z)(r,I.id+".date",(0,h.Bt)()),r));case 9:return e.next=11,(0,h.QT)((0,h.JU)(v,"chatsList",I.friendId));case 11:if(!e.sent.exists()){e.next=15;break}return e.next=15,(0,h.r7)((0,h.JU)(v,"chatsList",I.friendId),(c={},(0,t.Z)(c,I.id+".lastMessage",{messageText:n}),(0,t.Z)(c,I.id+".date",(0,h.Bt)()),c));case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,l.useEffect)((function(){var e=(0,h.cf)((0,h.JU)(v,"chatsList",s.id),(function(e){var s=Object.entries(e.data());if(s){var n=s.find((function(e){return e[0]===I.id}));if(n){var a=I.id,t=n[1].userInfo.displayName?n[1].userInfo.displayName:"",r=n[1].userInfo.photo;if("deleted"===n[1].userInfo.acc)return j((0,E.aE)({name:t,photo:r,friendInfo:a})),void R(!0);j((0,E.aE)({name:t,photo:r,friendInfo:a})),R(!1)}}}));return function(){e()}}),[e.name,e.photo,e.email]);var S=function(){if(null!==g.current){var e=n.navRef.current.offsetHeight,s=o.current.offsetHeight,a=_.current.offsetHeight,t=window.innerHeight-(e+s+a);g.current.style.height="".concat(t,"px")}};return(0,m.jsx)("section",{className:c.messagesSec,children:(0,m.jsxs)("div",{className:u()(c.container,"container"),children:[(0,m.jsx)("header",{className:c.header,ref:o,children:(0,m.jsxs)("div",{className:c.user,children:[(0,m.jsx)("div",{className:c.userImg,children:(0,m.jsx)("img",{src:null!==I.photo?I.photo:b,alt:"User"})}),(0,m.jsx)("div",{className:c.about,children:(0,m.jsx)("h2",{className:c.name,children:I.name})})]})}),(0,m.jsx)("section",{ref:g,id:"scroll",className:c.messages,children:(0,m.jsx)(p,{reloadMess:S,scrollRef:g,infoChat:I})}),C?(0,m.jsx)("div",{ref:_,className:u()(c.deletedInput),children:"Account has been deleted"}):(0,m.jsx)(M,{reloadMess:S,innerRef:_,handleEvent:function(e){"Enter"===e.code&&!1===e.ctrlKey&&!1===e.shiftKey&&(e.preventDefault(),H())},sendMess:H,text:T,setMessageText:k})]})})}}}]);
//# sourceMappingURL=298.c6c25645.chunk.js.map