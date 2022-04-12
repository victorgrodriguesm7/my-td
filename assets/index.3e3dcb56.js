var R=Object.defineProperty;var B=(r,t,e)=>t in r?R(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var n=(r,t,e)=>(B(r,typeof t!="symbol"?t+"":t,e),e);const I=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const h of s)if(h.type==="childList")for(const a of h.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const h={};return s.integrity&&(h.integrity=s.integrity),s.referrerpolicy&&(h.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?h.credentials="include":s.crossorigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function i(s){if(s.ep)return;s.ep=!0;const h=e(s);fetch(s.href,h)}};I();class L{constructor(t){n(this,"canvas");n(this,"context");n(this,"screenSize");n(this,"components",[]);n(this,"background");this.canvas=t,this.context=t.getContext("2d"),this.screenSize={width:t.width,height:t.height}}addComponent(t){this.components.push(t)}changeBackground(t){this.background=t}clearCanvas(){const{width:t,height:e}=this.screenSize;this.context.clearRect(0,0,t,e)}run(){const e=16.666666666666668;let s=Date.now();const h=()=>{requestAnimationFrame(h);const a=Date.now(),o=a-s;if(o>e){this.clearCanvas(),s=a-o%e;const l={components:this.components,screenSize:this.screenSize,context:this.context,deltaTime:o,addComponent:this.addComponent.bind(this)};this.background&&this.background.update(l);for(const c of this.components)c.update(l)}};h()}}class A{constructor(){n(this,"canvas");n(this,"listeners",{})}init(t){this.canvas=t,t.addEventListener("click",this.handleClick.bind(this))}static get instance(){return this._instance||(this._instance=new this)}getCursorPosition(t){if(this.canvas){const e=this.canvas.getBoundingClientRect(),i=t.clientX-e.left,s=t.clientY-e.top;return{x:i,y:s}}throw new Error("InputHandlerError: Canvas not defined")}handleClick(t){const{x:e,y:i}=this.getCursorPosition(t),s=this.listeners.click;if(!!s)for(const h of s)h({type:"click",x:e,y:i})}addListener({event:t,strategy:e="none",component:i,callback:s}){var a;this.listeners[t]||(this.listeners[t]=[]),s=s.bind(i);const h=o=>{const{type:l,x:c,y:u}=o;(e==="none"||e==="hitbox"&&l==="click"&&typeof c!="undefined"&&typeof u!="undefined"&&i.x<c&&i.x+i.width>c&&i.y<u&&i.y+i.height>u)&&s(o)};(a=this.listeners[t])==null||a.push(h)}}n(A,"_instance");function M({origin:r,target:t}){return Math.atan2(r.y-t.y,r.x-t.x)*180/Math.PI}var p={between:M};function g(r){return{x:r.x+r.width/2,y:r.y+r.height/2}}class x{constructor({height:t,width:e,x:i,y:s}){n(this,"height");n(this,"width");n(this,"x");n(this,"y");this.height=t,this.width=e,this.x=i,this.y=s}update(t){}}class U{constructor({x:t,y:e,width:i,height:s,firerate:h,radius:a,baseValue:o,maxLife:l}){n(this,"x");n(this,"y");n(this,"width");n(this,"height");n(this,"firerate");n(this,"radius");n(this,"lastShoot",0);n(this,"selected",!1);n(this,"targetAngle",0);n(this,"currentAngle",0);n(this,"level",1);n(this,"MAX_LEVEL",3);n(this,"baseValue");n(this,"life");n(this,"maxLife");this.x=t,this.y=e,this.width=i,this.height=s,this.firerate=h,this.radius=a,this.baseValue=o,this.maxLife=l,this.life=l,A.instance.addListener({event:"click",strategy:"hitbox",callback:this.toggleRadius,component:this})}get currentValue(){return this.baseValue*(this.level+1/10)}get upgradeValue(){return this.baseValue*(this.level+1/10)}get sellValue(){const t=this.baseValue*(this.level/10);return t-t*.2}get repairCost(){return 100-this.life*this.currentValue/this.maxLife}findNearestEnemy(t){let e=null;for(let i of t)if(i instanceof x){const s=Math.sqrt((this.x-i.x)**2+(this.y-i.y)**2);this.radius>=s&&(e&&e.distance>s&&(e={distance:s,enemy:i}),e={distance:s,enemy:i})}return e}canShoot(){const t=Date.now(),e=1e3/this.firerate;return t-this.lastShoot>e}findAngle(t){const e={turret:g(this),enemy:g(t)},i=p.between({origin:e.turret,target:e.enemy});i<0?this.targetAngle=i+360:this.targetAngle=i}aim(){if(Math.round(this.currentAngle)===Math.round(this.targetAngle))return!0;const e=this.targetAngle-this.currentAngle,i=Math.min(360-Math.abs(e),360);return e<0&&Math.abs(e)<i?this.currentAngle<0?this.currentAngle=360:this.currentAngle-=1:i<=e?this.currentAngle<0?this.currentAngle=360:this.currentAngle-=1:this.currentAngle>360?this.currentAngle=0:this.currentAngle+=1,!1}toggleRadius(){this.selected=!this.selected}showRadius(t){t.beginPath(),t.lineWidth=1,t.strokeStyle="rgba(52, 152, 219, 0.5)";const e=g(this);t.arc(e.x,e.y,this.radius,0,2*Math.PI),t.stroke()}showLifeBar(t){const e=this.life/this.maxLife;e!==1&&(t.fillStyle="#F00",t.fillRect(this.x,this.y+this.height,this.width,4),t.fillStyle="#0F0",t.fillRect(this.x,this.y+this.height,this.width*e,4))}update(t){}}var V="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACPElEQVRYhe2Wz2sTQRTHPyl79LBCCfVHocRgIWKS2gaD4q1RUAiC5BAoptBCC0G0PfQfEK/WS8BLpUKKZwUPxd5EaWliYqTCSlIK9VAKwRy8r4cw283u7GyqjXrI9zS8eTPf78x7895AH330CJFY2ozE0qafn3bSpGK8sroMwMw05tfPbwI9EyAjBXhRfEvDqLOyuqwU4ansT0idePL4ITPTC8hEdC3ATjq/mLfsX2oGHzY2lGuHhke4m7nD86cFlwhfAYL4+uSkZWsYdQ729zr8cj8a0vUvT1+wxvOLeZcITRDIricSS5uCWEYqcLlp8MlhuzLQmV72W7PfZqC5NGgaFZ3Zw4hr453qaykhwGZ113NOhXu3MwDowfMAaKcevWMc2DkTl26+Wd1lu+ZOrEQ07Ely8dVVa2xUdEpTBU9/7eezFADfsluWURAm4yEluWrOqOgd9u1anUQ0bJ18aHiEg/29dh0wKjqz6wuuzR7cv3kscsue3SKQ9faxQ7uxfg1wJ6GsjMrI51JBAMq5DKWpgjWfiIZJRMNWONYurQHQOvzeseeAr0QF5lJByrkM5Vw7sSaKeamfCEcyHnLNae9vfWyHQHLi42b66FiLko+PKwf8XoEK4uQqOJPRiUBzadAE+SuQxdxpmyjmGR1rAUdx9lqXjIc4d3YcOLoJZSGyN5puIYuzHU4Bnq8A2r2821LshCjFoheIUiyIBf55M/r/27GfmL/2IfldMSryExHgJ0ZF3lN0+y3vo49ffIIzOqtlX4YAAAAASUVORK5CYII=",F="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABS0lEQVRYhe1Xvc6CMBQ9EqODwOCiiYkbkw/Dy/gAvBIP48Rm8iUSEwZ+Bh2sgykpX2+ht+STfAlno+095/RSbi/AjBkEwvVBhOuD+Abfklrsb3efhwKifPwsxor38XnU4rN/R13k7dgYcQCoixxn/w5/u9P4PCowub4QR4GrroY4CpBcX+Scll7VYRwFSLMKAMB9FZJH5aB4SFLVxGm/wuX2ZJmQ8WqsKb6XkCIaMsGNGdyRJAw3C5SN6CXkrLU2YEvsIm5tYEjAVZxlwCTUzjmIsw2oJkzgfq5OZdZkwqVsT54BshQPiYcbXUOOce+O//EVTFoH/roS9p4Bta7bEMq5shE47VcdDhMmvw21DPzuB7ji6trL7dlpbKhskC2ZFHdtRtSYNKtaE/Yt2dHrdDFjkWYVkiN93MiWTGahLnKn3Y/m++Z/wYzJ8QYpzQ1JBIJebgAAAABJRU5ErkJggg==";class q{constructor({x:t,y:e,height:i,width:s,speed:h,target:a}){n(this,"x");n(this,"y");n(this,"height");n(this,"width");n(this,"target");n(this,"angle",0);n(this,"speed");this.x=t,this.y=e,this.height=i,this.width=s,this.speed=h,this.target=a,this.findAngle()}findAngle(){const t={turret:g(this),enemy:g(this.target)},e=p.between({origin:t.turret,target:t.enemy});e<0?this.angle=e+360:this.angle=e}turnTowards(t){t.translate(this.x+this.width/2,this.y+this.height/2),t.rotate(this.angle*Math.PI/180),t.translate(-this.x-this.width/2,-this.y-this.height/2)}moveTowards(){const t=1e3/this.speed,e=(this.x-this.target.x)/t*-1,i=(this.y-this.target.y)/t*-1;this.x+=e*this.speed,this.y+=i*this.speed}update(t){}}class O extends q{constructor({x:t,y:e,enemy:i}){super({x:t,y:e,height:1,width:10,speed:10,target:i})}update(t){const{context:e}=t;this.findAngle(),e.save(),e.fillStyle="#FF0",this.turnTowards(e),e.fillRect(this.x,this.y,this.width,this.height),e.restore(),this.moveTowards()}}class P extends U{constructor({x:e,y:i}){super({x:e,y:i,height:32,width:32,radius:200,firerate:1,maxLife:100,baseValue:100});n(this,"i",0);this.targetAngle=180}draw(e){const i=document.createElement("img");i.src=V;const s=document.createElement("img");s.src=F,e.drawImage(s,this.x,this.y),e.save(),e.translate(this.x+this.width/2,this.y+this.height/2),e.rotate(this.currentAngle*Math.PI/180),e.translate(-this.x-this.width/2,-this.y-this.height/2),e.drawImage(i,this.x,this.y),e.restore(),this.i++}update(e){const{context:i,components:s,addComponent:h}=e;this.selected&&this.showRadius(i);const a=this.findNearestEnemy(s);if(a){const{enemy:o}=a;if(this.findAngle(o),this.aim()&&this.canShoot()){const c=new O({x:this.x,y:this.y,enemy:o});h(c),this.lastShoot=Date.now()}}this.showLifeBar(i),this.draw(i)}}class T extends x{constructor({width:t,height:e,x:i,y:s}){super({width:t,height:e,x:i,y:s}),A.instance.addListener({event:"click",callback:this.onClick,component:this})}onClick(t){typeof t.x!="undefined"&&typeof t.y!="undefined"&&(this.x=t.x,this.y=t.y)}update({context:t}){t.fillStyle="#F00",t.fillRect(this.x,this.y,this.width,this.height)}}var Q="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAd1JREFUWIW9V0tqxTAMVIPBBkM2uUvP0LP1rtkEAg4E2kUj4zcZ+ZOWDrzFcyxpon/ePj/ev+TCfpzSi+jd7ayUj9419UXvZGoptcCUl/L7cTb17ccpEyqK3nURse6Myk7KRH/s0jIHWeYwZKSX6ESfyt2F65aqhsJ1Fz2q//EllMSNQOkJJfHEOCZhqaM8d61sVRJ6BxMNFTIjSKLU4RhbhpG4j+hwImP1/1eGFbcyRCxzuFVIj2J9XruzH+drEmKWMgHWN55A9WQClvF1SzcjWCk1I8G7XCUoK3LlgBpiUOORlFpP7qxbymFkcExxaRCfWfdbJCzkENRiaXWx6F0zb2qI3onDA4Z0xRKhMV7m0Awha2QiIq4nqzVxWFhabbqmV4RUgVXvT8oNZQLpuBOOXYuEnqMre4mxEIp0lGGPMmuWlGHDaajneRjVjFnkSkWtgYbPVdZcSNQ4w7olSgpfBBsQ66jVYZSOcyg0PSQQeSdUsEytge2TCvQUuzOVrHFo/Ade/GXFtUZGS7eUHfk+MJOQCVmK2MhmMnQli9e8ThWmqAS33d/si9kDI8mH3bNXjs0dJ/JTbrjh9Ox7mLSWjPXdIELKENmO9AlWjq1lttoJGYked6Nc2Q/QS99vNXtXpUji5wAAAABJRU5ErkJggg==";function b(r,t){const e=r.width*r.height;return{horizontal:r.width/t,vertical:r.height/t,total:e/(t*t)}}const m={dirt:Q};class z{constructor(t){n(this,"x",0);n(this,"y",0);n(this,"width");n(this,"height");n(this,"screenSize");n(this,"background");n(this,"loading",!0);this.width=t.width,this.height=t.height,this.screenSize=t}async generateMap(t){this.loading=!0;const{width:e,height:i}=this.screenSize,s=Object.keys(m),h=document.createElement("canvas");h.width=e,h.height=i;const a=b(this.screenSize,32),o=h.getContext("2d");if(o){for(let l=0;l<a.horizontal;l++)for(let c=0;c<a.vertical;c++){const u=c+a.horizontal*l,E=t[u];for(const k of E){const y=s[k];if(y){const S=m[y],w=document.createElement("img");w.src=S,await new Promise(v=>{w.onload=()=>{o.drawImage(w,l*32,c*32,32,32),v()}})}}}this.background=document.createElement("img"),this.background.src=h.toDataURL(),this.background.onload=()=>{this.loading=!1}}}update({context:t}){this.background&&t.drawImage(this.background,this.x,this.y,this.width,this.height)}}const d=document.querySelector("canvas"),f={width:32*20,height:32*20},C=new z(f),W=b(f,32),Y=new Array(W.total).fill([0]);C.generateMap(Y);if(d){d.width=f.width,d.height=f.height;const r=new L(d);A.instance.init(d);const e=new P({x:d.width/2,y:d.height/2}),i=new T({width:32,height:32,x:0,y:0});r.changeBackground(C),r.addComponent(e),r.addComponent(i),r.run()}
