"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[298],{9298:function(e,s,n){n.r(s),n.d(s,{default:function(){return R}});var t=n(4165),a=n(4942),r=n(5861),i=n(885),d=n(7689),o={header:"MessagesMain_header__EMkYa",user:"MessagesMain_user__TDMJA",userImg:"MessagesMain_userImg__Mop0A",name:"MessagesMain_name__58IH7",online:"MessagesMain_online__FByeQ",dots:"MessagesMain_dots__9N9pU",container:"MessagesMain_container__c2E6N",input:"MessagesMain_input__R5zJ0",send:"MessagesMain_send__tKhge",textArea:"MessagesMain_textArea__v6811",messages:"MessagesMain_messages__eWIbA",empty:"MessagesMain_empty__Un+PR",messagesMe:"MessagesMain_messagesMe__Go3UK",messagesFriend:"MessagesMain_messagesFriend__4kSKR",messageContainerMe:"MessagesMain_messageContainerMe__GIXeF",messageContainerFriend:"MessagesMain_messageContainerFriend__6diH7",dateMe:"MessagesMain_dateMe__XY83U",dateFriend:"MessagesMain_dateFriend__Iu9Pj",dateMessages:"MessagesMain_dateMessages__HlrtQ",deletedInput:"MessagesMain_deletedInput__caMDW"},c=n(1694),u=n.n(c),f=n(9434),l=n(2791);var g=n.p+"static/media/send.e6e41f470c70eedfe79bcc21222a7720.svg",m=n(184);function h(e){var s=e.setSizeWindow,n=e.scrollRef,t=e.sendMess,a=e.text,r=e.setMessageText,i=e.handleEvent,c=e.innerRef;(0,d.bx)().height.current;return(0,l.useEffect)((function(){function e(){var e=window.visualViewport.height;window.innerHeight;s(e),document.body.style.height=" ".concat(e,"px")}return console.log(n),window.addEventListener("resize",e),function(){e()}}),[]),(0,m.jsxs)("section",{className:o.textArea,ref:c,children:[(0,m.jsx)("textarea",{placeholder:"Enter your message",onKeyDown:i,value:a,onChange:function(e){return r(e.target.value)},name:"messages",id:"textarea",type:"text",className:o.input,rows:"1"}),(0,m.jsx)("button",{onClick:function(){return t()},type:"submit",className:o.send,children:(0,m.jsx)("img",{src:g,alt:"Send"})})]})}var p=n(9062),M=n(3249);function _(e){var s=e.sizeWindow,n=e.setSizeWindow,t=e.infoChat,a=e.scrollRef,r=(0,f.v9)((function(e){return e.message.messages})),i=(0,f.v9)((function(e){return e.user})),d=r.find((function(e){return e.chatId===t.id})),c=(0,p.ad)(),g=(0,f.I0)(),h=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return(0,l.useEffect)((function(){a.current.scrollTop=a.current.scrollHeight}),[r,s]),(0,l.useEffect)((function(){return window.addEventListener("onload",n(window.visualViewport.height)),function(){return window.addEventListener("resize",n(window.visualViewport.height))}}),[r,window.innerHeight]),(0,l.useEffect)((function(){var e=(0,p.cf)((0,p.JU)(c,"chats",t.id),(function(e){if(!e.data())return!1;var s=e.data(),n=t.id;s.messages.map((function(e){var s=e.userId,t=e.messageText,a=e.id,r=e.date,i=h[r.toDate().getDay()],d=r.toDate().getHours(),o=r.toDate().getMinutes().toString();1===o.length&&(o="0".concat(o));var c="".concat(i," ").concat(d,":").concat(o);g((0,M.Hz)({chatId:n,userId:s,messageText:t,datePush:c,messageId:a}))}))}));return function(){e()}}),[t.id]),r.length>0&&d?d.messages.map((function(e){return e.userId===i.id?(0,m.jsx)("div",{className:o.messageContainerMe,children:(0,m.jsxs)("span",{className:u()("message",o.messagesMe),children:[e.text,(0,m.jsx)("span",{className:u()(o.dateMessages,o.dateMe),children:e.date})]})},e.messageId):(0,m.jsx)("div",{className:o.messageContainerFriend,children:(0,m.jsxs)("span",{className:u()("message",o.messagesFriend),children:[e.text,(0,m.jsx)("span",{className:u()(o.dateMessages,o.dateFriend),children:e.date})]})},e.messageId)})):(0,m.jsx)("div",{className:u()(o.empty),children:"No Messages"})}var v,x={randomUUID:"undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},w=new Uint8Array(16);function y(){if(!v&&!(v="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return v(w)}for(var I=[],j=0;j<256;++j)I.push((j+256).toString(16).slice(1));function N(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return(I[e[s+0]]+I[e[s+1]]+I[e[s+2]]+I[e[s+3]]+"-"+I[e[s+4]]+I[e[s+5]]+"-"+I[e[s+6]]+I[e[s+7]]+"-"+I[e[s+8]]+I[e[s+9]]+"-"+I[e[s+10]]+I[e[s+11]]+I[e[s+12]]+I[e[s+13]]+I[e[s+14]]+I[e[s+15]]).toLowerCase()}var U=function(e,s,n){if(x.randomUUID&&!s&&!e)return x.randomUUID();var t=(e=e||{}).random||(e.rng||y)();if(t[6]=15&t[6]|64,t[8]=63&t[8]|128,s){n=n||0;for(var a=0;a<16;++a)s[n+a]=t[a];return s}return N(t)},E=n(3825),b=n(4229);function R(){var e=(0,f.v9)((function(e){return e.friend.friend})),s=(0,f.v9)((function(e){return e.user})),n=(0,d.bx)(),c=(0,l.useRef)(),g=(0,l.useRef)(),M=(0,l.useRef)(),v=(0,p.ad)(),x=Object.values((0,d.UO)()),w=(0,i.Z)(x,1)[0],y=e.find((function(e){return e.id===w})),I=(0,f.I0)(),j=(0,l.useState)(!1),N=(0,i.Z)(j,2),R=N[0],S=N[1],C=(0,l.useState)(""),D=(0,i.Z)(C,2),F=D[0],T=D[1],H=function(){var e=(0,r.Z)((0,t.Z)().mark((function e(){var n,r,i,d,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=F,T(""),""===n){e.next=15;break}return i=U(),d=p.EK.now(),e.next=7,(0,p.r7)((0,p.JU)(v,"chats",y.id),{messages:(0,p.vr)({id:i,messageText:n,userId:s.id,date:d})});case 7:return e.next=9,(0,p.r7)((0,p.JU)(v,"chatsList",s.id),(r={},(0,a.Z)(r,y.id+".lastMessage",{messageText:n}),(0,a.Z)(r,y.id+".date",(0,p.Bt)()),r));case 9:return e.next=11,(0,p.QT)((0,p.JU)(v,"chatsList",y.friendId));case 11:if(!e.sent.exists()){e.next=15;break}return e.next=15,(0,p.r7)((0,p.JU)(v,"chatsList",y.friendId),(o={},(0,a.Z)(o,y.id+".lastMessage",{messageText:n}),(0,a.Z)(o,y.id+".date",(0,p.Bt)()),o));case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,l.useEffect)((function(){var e=(0,p.cf)((0,p.JU)(v,"chatsList",s.id),(function(e){var s=Object.entries(e.data());if(s){var n=s.find((function(e){return e[0]===y.id}));if(n){var t=y.id,a=n[1].userInfo.displayName?n[1].userInfo.displayName:"",r=n[1].userInfo.photo;if("deleted"===n[1].userInfo.acc)return I((0,b.aE)({name:a,photo:r,friendInfo:t})),void S(!0);I((0,b.aE)({name:a,photo:r,friendInfo:t})),S(!1)}}}));return function(){e()}}),[e.name,e.photo,e.email]);var Z=(0,l.useState)(window.visualViewport.height),k=(0,i.Z)(Z,2),z=k[0],W=k[1];return(0,l.useEffect)((function(){if(null!==g.current){var e=n.navRef.current.offsetHeight,s=c.current.offsetHeight,t=M.current.offsetHeight,a=window.visualViewport.height-(e+s+t);g.current.style.height="".concat(a,"px")}}),[z]),(0,m.jsx)("section",{className:o.messagesSec,children:(0,m.jsxs)("div",{className:u()(o.container,"container"),children:[(0,m.jsx)("header",{className:o.header,ref:c,children:(0,m.jsxs)("div",{className:o.user,children:[(0,m.jsx)("div",{className:o.userImg,children:(0,m.jsx)("img",{src:null!==y.photo?y.photo:E,alt:"User"})}),(0,m.jsx)("div",{className:o.about,children:(0,m.jsx)("h2",{className:o.name,children:y.name})})]})}),(0,m.jsx)("section",{ref:g,id:"scroll",className:o.messages,children:(0,m.jsx)(_,{sizeWindow:z,setSizeWindow:W,scrollRef:g,infoChat:y})}),R?(0,m.jsx)("div",{ref:M,className:u()(o.deletedInput),children:"Account has been deleted"}):(0,m.jsx)(h,{scrollRef:g,setSizeWindow:W,innerRef:M,handleEvent:function(e){"Enter"===e.code&&!1===e.ctrlKey&&!1===e.shiftKey&&(e.preventDefault(),H())},sendMess:H,text:F,setMessageText:T})]})})}}}]);
//# sourceMappingURL=298.05ea6dda.chunk.js.map