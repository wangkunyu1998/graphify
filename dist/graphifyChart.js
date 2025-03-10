"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t={x:10,y:10,width:100,height:100,bgColor:"blue",borderColor:"rgba(0,0,0,0)",borderWidth:1,radius:20,zIndex:0},i={x:10,y:10,radius:50,startAngle:0,endAngle:2*Math.PI,bgColor:"blue",borderColor:"rgba(0,0,0,0)",borderWidth:1,zIndex:0},e={x:10,y:10,bgColor:"blue",startAngle:0,endAngle:1.5*Math.PI,borderColor:"rgba(0,0,0,0)",borderWidth:1,radius:60,zIndex:0};let s=0;const h=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){let i=+new Date,e=Math.max(1e3/60,1e3/60-(i-s));return s=i+e,setTimeout(t,e)},r=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame||clearTimeout,n={linear:function(t,i,e,s){return e*t/s+i},ease:function(t,i,e,s){return-e*((t=t/s-1)*t*t*t-1)+i},"ease-in":function(t,i,e,s){return e*(t/=s)*t*t+i},"ease-out":function(t,i,e,s){return e*((t=t/s-1)*t*t+1)+i},"ease-in-out":function(t,i,e,s){return(t/=s/2)<1?e/2*t*t*t+i:e/2*((t-=2)*t*t+2)+i},bounce:function(t,i,e,s){return(t/=s)<1/2.75?e*(7.5625*t*t)+i:t<2/2.75?e*(7.5625*(t-=1.5/2.75)*t+.75)+i:t<2.5/2.75?e*(7.5625*(t-=2.25/2.75)*t+.9375)+i:e*(7.5625*(t-=2.625/2.75)*t+.984375)+i}};let o=null;class d{constructor(t,i,e){this.canvas=t;const s=t.getBoundingClientRect();this.hitQueue=[],t.addEventListener(e,(t=>{const h=t.clientX-s.left,r=t.clientY-s.top,n=i.quadTree.query(h,r).filter((t=>t.contains(h,r))).sort(((t,i)=>i.index-t.index));this.hitQueue=n[0]?[n[0]]:[],this.bindEvent(h,r,e)}))}bindEvent(t,i,e){let s=!0;const h={target:null,stopPropagation:()=>{s=!1}};this.hitQueue.forEach((r=>{s&&(h.target=r,r.listener[e]&&r.listener[e].forEach((e=>{e({...h,x:t,y:i})})))}))}}class a{constructor(t,i=0,e){this.boundary=t,this.nodes=[],this.divided=!1,this.maxCapacity=10,this.children=[],this.depth=i,this.ctx=e}insertNode(t){if(!this.intersects(t.getBox()))return!1;if(t.depth=this.depth,!this.divided&&this.nodes.length<this.maxCapacity)return this.nodes.push(t),!0;this.divided||this.quadrant();return this.children.map((i=>i.insertNode(t))).some((t=>t))}intersects(t){return!(t.x>this.boundary.x+this.boundary.width||t.x+t.width<this.boundary.x||t.y>this.boundary.y+this.boundary.height||t.y+t.height<this.boundary.y)}quadrant(){const t=this.boundary.x,i=this.boundary.y,e=this.boundary.width/2,s=this.boundary.height/2,h={x:t+e,y:i,width:e,height:s},r={x:t+e,y:i+s,width:e,height:s},n={x:t,y:i+s,width:e,height:s},o={x:t,y:i,width:e,height:s},d=this.ctx;d.beginPath(),d.moveTo(t,i+s),d.lineTo(t+2*e,i+s),d.moveTo(t+e,i),d.lineTo(t+e,i+2*s),d.strokeStyle="red",d.closePath(),d.stroke(),this.children=[new a(h,this.depth+1,this.ctx),new a(r,this.depth+1,this.ctx),new a(n,this.depth+1,this.ctx),new a(o,this.depth+1,this.ctx)],this.divided=!0,this.nodes.forEach((t=>{this.children.forEach(((i,e)=>{i.insertNode(t)}))})),this.nodes=[]}query(t,i,e=[]){return this.containsPoint(t,i)?(e.push(...this.nodes),this.divided&&(this.children[0].query(t,i,e),this.children[1].query(t,i,e),this.children[2].query(t,i,e),this.children[3].query(t,i,e)),e):e}containsPoint(t,i){return t>=this.boundary.x&&t<=this.boundary.x+this.boundary.width&&i>=this.boundary.y&&i<=this.boundary.y+this.boundary.height}}exports.Circle=class{constructor(t,e){this.ctx=t.getCtx(),this.stage=t,this.type="circle";for(let s in i)this[s]=(null==e?void 0:e[s])||i[s];this.children=[],this.listener={}}contains(t,i){const e=this.x-this.radius,s=this.x+this.radius,h=this.y-this.radius,r=this.y+this.radius;if(!(t>=e&&t<=s&&i>=h&&i<=r))return!1;const n=t-this.x,o=i-this.y;return n*n+o*o<=this.radius*this.radius}getBox(){return{x:this.x-this.radius,y:this.y-this.radius,width:2*this.radius,height:2*this.radius}}setAttr(t){Object.keys(t).forEach((i=>this[i]=t[i])),this.stage.render()}appendChild(...t){t.length>0&&(t.forEach((t=>{this.children.push(t)})),this.stage.render())}addEventListener(t,i){this.listener[t]||(this.listener[t]=[]),this.listener[t].push(i)}render(){const{x:t,y:i,radius:e,startAngle:s,endAngle:h,bgColor:r,borderColor:n,borderWidth:o}=this,d=this.ctx;d.save(),d.beginPath(),d.arc(t,i,e,s,h),d.fillStyle=r,d.strokeStyle=n||"rgba(0,0,0,0)",d.lineWidth=o,d.fill(),d.stroke(),d.closePath(),d.restore()}},exports.Line=class{constructor(t,i){this.stage=t,this.ctx=t.getCtx(),this.type="line",this.lineType=i.lineType||"line",this.x1=i.x1||0,this.y1=i.y1||0,this.x2=i.x2||100,this.y2=i.y2||100,this.controlX1=i.control1.x,this.controlY1=i.control1.y,this.controlX2=i.control2.x,this.controlY2=i.control2.y,this.borderColor=i.borderColor,this.lineWidth=i.lineWidth,this.lineCap=i.lineCap,this.children=[],this.listener={},this.showControlPoints=i.showControlPoints,this.controlPointColor=i.controlPointColor,this.controlPointRadius=i.controlPointRadius}contains(t,i){return!1}setAttr(t){Object.keys(t).forEach((i=>this[i]=t[i])),this.stage.render()}appendChild(...t){t.length>0&&(t.forEach((t=>{this.children.push(t)})),this.stage.render())}addEventListener(t,i){this.listener[t]||(this.listener[t]=[]),this.listener[t].push(i)}getBox(){return{x:this.x,y:this.y,width:this.width,height:this.height}}render(){const t=this.ctx;switch(t.save(),t.beginPath(),t.moveTo(this.x1,this.y1),this.lineType){case"quadratic":t.quadraticCurveTo(this.controlX1,this.controlY1,this.x2,this.y2);break;case"cubic":t.bezierCurveTo(this.controlX1,this.controlY1,this.controlX2,this.controlY2,this.x2,this.y2);break;default:t.lineTo(this.x2,this.y2)}t.strokeStyle=this.borderColor,t.lineWidth=this.lineWidth,t.lineCap=this.lineCap,t.stroke(),t.closePath(),t.restore(),this.showControlPoints&&this.drawControlPoints(t),this.children.length>0&&this.children.sort(((t,i)=>t.zIndex-i.zIndex)).forEach((t=>{t.render()}))}drawControlPoints(t){const i=[[this.x1,this.y1],[this.x2,this.y2]].map((t=>new Circle(this.stage,{x:t[0],y:t[1],radius:this.controlPointRadius,startAngle:0,endAngle:2*Math.PI,bgColor:this.controlPointColor,zIndex:2})));this.appendChild(...i)}},exports.Rect=class{constructor(i,e){this.ctx=i.getCtx(),this.stage=i,this.type="rect";for(let s in t)this[s]=(null==e?void 0:e[s])||t[s];this.children=[],this.listener={}}contains(t,i){return t>=this.x&&t<this.x+this.width&&i>=this.y&&i<this.y+this.height}setAttr(t){Object.keys(t).forEach((i=>this[i]=t[i])),this.stage.render()}appendChild(...t){t.length>0&&(t.forEach((t=>{this.children.push(t)})),this.stage.render())}addEventListener(t,i){this.listener[t]||(this.listener[t]=[]),this.listener[t].push(i)}getBox(){return{x:this.x,y:this.y,width:this.width,height:this.height}}render(){const{x:t,y:i,width:e,height:s,bgColor:h,borderColor:r,borderWidth:n,radius:o}=this,d=this.ctx;d.save(),d.fillStyle=h,d.lineWidth=n,d.strokeStyle=r,o?(d.lineWidth=2*n,d.beginPath(),d.moveTo(t+o,i),d.lineTo(t+e-2*o,i),d.arcTo(t+e,i,t+e,i+o,o),d.lineTo(t+e,i+s-o),d.arcTo(t+e,i+s,t+e-o,i+s,o),d.lineTo(t+o,i+s),d.arcTo(t,i+s,t,i+s-o,o),d.lineTo(t,i+o),d.arcTo(t,i,t+o,i,o),d.closePath(),d.stroke(),d.fill()):(d.fillRect(t,i,e,s),d.strokeRect(t,i,e,s)),d.restore(),this.children.length>0&&this.children.sort(((t,i)=>t.zIndex-i.zIndex)).forEach((t=>{t.render()}))}},exports.Sector=class{constructor(t,i){this.stage=t,this.ctx=t.getCtx(),this.type="sector";for(let s in e)this[s]=(null==i?void 0:i[s])||e[s];this.children=[],this.listener={}}contains(t,i){const e=t-this.x,s=i-this.y;if(e*e+s*s>this.radius*this.radius)return!1;const h=this.endAngle-this.startAngle;if(Math.abs(h%(2*Math.PI))<1e-6)return!0;let r=Math.atan2(s,e);r=r<0?r+2*Math.PI:r;let n=this.startAngle%(2*Math.PI);n=n<0?n+2*Math.PI:n;let o=this.endAngle%(2*Math.PI);return o=o<0?o+2*Math.PI:o,n<o?r>=n&&r<=o:r>=n||r<=o}setAttr(t){Object.keys(t).forEach((i=>this[i]=t[i])),this.stage.render()}appendChild(...t){t.length>0&&(t.forEach((t=>{this.children.push(t)})),this.stage.render())}addEventListener(t,i){this.listener[t]||(this.listener[t]=[]),this.listener[t].push(i)}getBox(){return{x:this.x-this.radius,y:this.y-this.radius,width:this.x+this.radius,height:this.y+this.radius}}render(){const t=this.ctx;t.save(),t.beginPath(),t.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle),t.lineTo(this.x,this.y),t.closePath(),t.fillStyle=this.bgColor,t.fill(),t.lineWidth=this.borderWidth,t.strokeStyle=this.borderColor,t.stroke(),t.restore()}},exports.Stage=class{constructor(t,i=200,e=200){var s;this.container=t;const h=document.createElement("canvas");h.width=(null==(s=null==this?void 0:this.container)?void 0:s.clientWidth)||i,h.height=this.container.clientHeight||e;const r=h.getContext("2d");this.container.appendChild(h),this.children=[],this.ctx=r,this.quadTree=new a({x:0,y:0,width:r.canvas.width,height:r.canvas.height},0,this.ctx);["click","mousedown","mouseup","mousemove"].forEach((t=>new d(this.ctx.canvas,this,t))),this.isRendering=!1,this.index=0,this.isQuadTreeUpdate=!1,this.dragNode=null,this.dragNodeMoveX=0,this.dragNodeMoveY=0,this.render(),this.draging=!1}getCtx(){return this.ctx}appendChild(...t){t.forEach((t=>{t.index=this.index,this.index=this.index+1,this.children.push(t)})),this.isQuadTreeUpdate=!0,this.render()}removeChild(t){this.children.splice(t,1),this.isQuadTreeUpdate=!0,this.render()}getChildren(t){if(!t)return this.children||[];const i=this.children||[],e=[];return i.forEach((function(i){t(i)&&e.push(i)})),e}destroyChildren(){return this.getChildren().forEach((t=>{t.parent=null,t.index=0})),this.children=[],this}destroy(){return this.hasChildren()&&this.destroyChildren(),super.destroy(),this}hasChildren(){return this.getChildren().length>0}render(){this.isRendering||(this.isRendering=!0,requestAnimationFrame((()=>{if(this.ctx.clearRect(0,0,this.container.clientWidth,this.container.clientHeight),this.children.sort(((t,i)=>t.zIndex-i.zIndex)).forEach((t=>{t.render()})),this.isQuadTreeUpdate&&!this.draging){let t=0;this.children.forEach((i=>{this.quadTree.insertNode(i),i.children.length>0&&(i.level=t,i.children.forEach((i=>{i.level=t+1,this.quadTree.insertNode(i)})))})),this.isQuadTreeUpdate=!1}this.isRendering=!1})))}},exports.animation=function(t,i,e="linear",s){const d=Date.now();r(o),function r(){const a=Math.min(i,Date.now()-d),l=n[e](a,0,1,i);a<i&&(t.setAttr({[s.attr]:s.value*l}),o=h(r))}()},exports.runApp=()=>{console.log("App started")};
