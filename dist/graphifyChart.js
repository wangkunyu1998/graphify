"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t={x:0,y:0,width:100,height:100,fillStyle:"blue",borderColor:"rgba(0,0,0,0)",borderWidth:1,radius:0,zIndex:0},i={x:10,y:10,radius:50,startAngle:0,endAngle:2*Math.PI,fillStyle:"blue",borderColor:"rgba(0,0,0,0)",borderWidth:1,zIndex:0},e={x:10,y:10,fillStyle:"blue",startAngle:0,endAngle:1.5*Math.PI,borderColor:"rgba(0,0,0,0)",borderWidth:1,radius:60,zIndex:0};class s{drag(){this.addEventListener("mousedown",(t=>{t.target&&(this.draging=!0,this.stage.draging=!0,this.dragNodeMoveX=t.x-this.x,this.dragNodeMoveY=t.y-this.y)}));this.stage.container.addEventListener("mousemove",(t=>{this.draging&&(null==this||this.setAttr({x:t.offsetX-this.dragNodeMoveX,y:t.offsetY-this.dragNodeMoveY}))})),this.stage.container.addEventListener("mouseup",(t=>{this.stage.draging=!1,this.draging=!1}))}}class h extends s{constructor(i,e={}){super(i,e),this.ctx=i.getCtx(),this.stage=i,this.type="rect";for(let s in t)this[s]=(null==e?void 0:e[s])||t[s];this.children=[],this.listener={},this.draging=!1,this.draggable=e.draggable,this.draggable&&this.drag()}contains(t,i){return t>=this.x&&t<this.x+this.width&&i>=this.y&&i<this.y+this.height}setAttr(t){Object.keys(t).forEach((i=>this[i]=t[i])),this.stage.render()}addEventListener(t,i){this.listener[t]||(this.listener[t]=[]),this.listener[t].push(i)}getBox(){return{x:this.x,y:this.y,width:this.width,height:this.height}}render(){const{x:t,y:i,width:e,height:s,fillStyle:h,borderColor:n,borderWidth:r,radius:o}=this,a=this.ctx;a.save(),a.fillStyle=h,a.lineWidth=r,a.strokeStyle=n,o?(a.lineWidth=2*r,a.beginPath(),a.moveTo(t+o,i),a.lineTo(t+e-2*o,i),a.arcTo(t+e,i,t+e,i+o,o),a.lineTo(t+e,i+s-o),a.arcTo(t+e,i+s,t+e-o,i+s,o),a.lineTo(t+o,i+s),a.arcTo(t,i+s,t,i+s-o,o),a.lineTo(t,i+o),a.arcTo(t,i,t+o,i,o),a.closePath(),a.stroke(),a.fill()):(a.fillRect(t,i,e,s),a.strokeRect(t,i,e,s)),a.restore()}}let n=0;const r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){let i=+new Date,e=Math.max(1e3/60,1e3/60-(i-n));return n=i+e,setTimeout(t,e)};let o=[];const a={linear:function(t,i,e,s){return e*t/s+i},ease:function(t,i,e,s){return-e*((t=t/s-1)*t*t*t-1)+i},"ease-in":function(t,i,e,s){return e*(t/=s)*t*t+i},"ease-out":function(t,i,e,s){return e*((t=t/s-1)*t*t+1)+i},"ease-in-out":function(t,i,e,s){return(t/=s/2)<1?e/2*t*t*t+i:e/2*((t-=2)*t*t+2)+i},bounce:function(t,i,e,s){return(t/=s)<1/2.75?e*(7.5625*t*t)+i:t<2/2.75?e*(7.5625*(t-=1.5/2.75)*t+.75)+i:t<2.5/2.75?e*(7.5625*(t-=2.25/2.75)*t+.9375)+i:e*(7.5625*(t-=2.625/2.75)*t+.984375)+i}};function l(t,i,e,s="linear"){const h=Date.now();return function n(){const l=Math.min(i,Date.now()-h),d=a[s](l,0,1,i);l<i&&(e.forEach((i=>{t.setAttr({[i.attr]:i.value*d+(i.init||0)})})),c=n,o.push(c),1===o.length&&r((function(){const t=o;o=[],t.forEach((function(t){t()}))})));var c}(),null}class d{constructor(t,i,e){this.canvas=t;const s=t.getBoundingClientRect();this.hitQueue=[],t.addEventListener(e,(t=>{var h;const n=t.clientX-s.left+window.scrollX,r=t.clientY-s.top+window.scrollY,o=i.quadTree.query(n,r).filter((t=>t.contains(n,r))),a=Math.max(...o.map((t=>t.zIndex)));let l=o;0!=a&&(null==(h=o.filter((t=>t.zIndex==a)))?void 0:h.length)<=1?l=o.sort(((t,i)=>i.zIndex-t.zIndex)):l.sort(((t,i)=>i.index-t.index)),this.hitQueue=l[0]?[l[0]]:[],this.bindEvent(n,r,e)}))}bindEvent(t,i,e){let s=!0;const h={target:null,stopPropagation:()=>{s=!1}};this.hitQueue.forEach((n=>{s&&(h.target=n,n.listener[e]&&n.listener[e].forEach((e=>{e({...h,x:t,y:i})})))}))}}class c{constructor(t,i=0,e){this.boundary=t,this.nodes=[],this.divided=!1,this.maxCapacity=10,this.children=[],this.depth=i,this.ctx=e,this.nodeType=["circle","rect","group","sector"]}insertNode(t){var i;if(!this.nodeType.includes(t.type)||!this.intersects(null==(i=null==t?void 0:t.getBox)?void 0:i.call(t)))return!1;if(t.depth=this.depth,!this.divided&&this.nodes.length<this.maxCapacity)return this.nodes.push(t),!0;this.divided||this.quadrant();return this.children.map((i=>i.insertNode(t))).some((t=>t))}intersects(t){return!(t.x>this.boundary.x+this.boundary.width||t.x+t.width<this.boundary.x||t.y>this.boundary.y+this.boundary.height||t.y+t.height<this.boundary.y)}quadrant(){const t=this.boundary.x,i=this.boundary.y,e=this.boundary.width/2,s=this.boundary.height/2,h={x:t+e,y:i,width:e,height:s},n={x:t+e,y:i+s,width:e,height:s},r={x:t,y:i+s,width:e,height:s},o={x:t,y:i,width:e,height:s};this.ctx,this.children=[new c(h,this.depth+1,this.ctx),new c(n,this.depth+1,this.ctx),new c(r,this.depth+1,this.ctx),new c(o,this.depth+1,this.ctx)],this.divided=!0,this.nodes.forEach((t=>{this.children.forEach(((i,e)=>{i.insertNode(t)}))})),this.nodes=[]}query(t,i,e=[]){return this.containsPoint(t,i)?(e.push(...this.nodes),this.divided&&(this.children[0].query(t,i,e),this.children[1].query(t,i,e),this.children[2].query(t,i,e),this.children[3].query(t,i,e)),e):e}containsPoint(t,i){return t>=this.boundary.x&&t<=this.boundary.x+this.boundary.width&&i>=this.boundary.y&&i<=this.boundary.y+this.boundary.height}}const g={show:!0,imgType:"png",title:"图形",icon:'<svg \n      xmlns="http://www.w3.org/2000/svg" \n      width="24" \n      height="24" \n      viewBox="0 0 24 24"\n      fill="none" \n      stroke="#000" \n      stroke-width="2"\n    >\n      <path d="M12 3v12m0 0l-3-3m3 3l3-3"/>\n      <path d="M5 21h14"/>\n    </svg>'};exports.BarChart=class{constructor(t,i={}){this.ctx=t.getCtx(),this.stage=t,this.canvas=this.ctx.canvas,this.data=i.data,this.options={margin:50,axisColor:"#666",barColor:["#4A90E2","#7ED321","#F5A623"],animationDuration:1e3,animation:!0,...i},this.font=`16px ${window.getComputedStyle(document.body,null).getPropertyValue("font-family")}`,this.width=this.canvas.width,this.height=this.canvas.height,this.chartWidth=this.width-2*this.options.margin,this.chartHeight=this.height-2*this.options.margin,this.maxValue=Math.max(...i.data.map((t=>t.value))),this.animationStart=null,this.drawBars();const e=document.createElement("div");e.id="graphify-tooltip",this.stage.container.appendChild(e),this.canvas.addEventListener("mousemove",this.showTooltip.bind(this))}render(){this.drawGrid(),this.drawAxes()}drawAxes(){this.ctx.save(),this.ctx.fillStyle="#666",this.ctx.strokeStyle=this.options.axisColor,this.ctx.lineWidth=1,this.ctx.beginPath(),this.ctx.moveTo(this.options.margin,this.options.margin),this.ctx.lineTo(this.options.margin,this.height-this.options.margin),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(this.options.margin,this.height-this.options.margin),this.ctx.lineTo(this.width-this.options.margin,this.height-this.options.margin),this.ctx.stroke(),this.ctx.textAlign="right",this.ctx.textBaseline="middle";for(let i=0;i<=5;i++){const t=this.height-this.options.margin-i*this.chartHeight/5,e=Math.round(i/5*this.maxValue);this.ctx.fillText(e,this.options.margin-10,t)}this.ctx.textAlign="center",this.ctx.textBaseline="top";const t=this.chartWidth/this.data.length;this.data.forEach(((i,e)=>{this.ctx.fillText(i.label,this.options.margin/2+e*t+t/2,this.height-this.options.margin+10)})),this.ctx.restore()}drawGrid(){this.ctx.save(),this.ctx.strokeStyle="#EEE",this.ctx.setLineDash([5,5]);for(let t=1;t<5;t++){const i=this.height-this.options.margin-t*this.chartHeight/5;this.ctx.beginPath(),this.ctx.moveTo(this.options.margin,i),this.ctx.lineTo(this.width-this.options.margin,i),this.ctx.stroke()}this.ctx.restore()}drawBars(){const{animationDuration:t,animation:i}=this.options;let e=this.chartWidth/this.data.length*.8,s=.2*e;this.data.forEach(((n,r)=>{const o=this.options.margin+r*(e+s)+20,a=n.value/this.maxValue*this.chartHeight,d=this.height-this.options.margin-a,c=new h(this.stage,{x:o,y:d,width:e,height:a,fillStyle:this.options.barColor[r%this.options.barColor.length]});i&&l(c,t,[{attr:"y",value:-a,init:d+a},{attr:"height",value:a}]),this.stage.appendChild(c)})),this.stage.appendChild(this)}showTooltip(t){const i=this.canvas.getBoundingClientRect(),e=t.clientX-i.left,s=t.clientY-i.top,h=this.chartWidth/this.data.length*.8,n=.2*h,r=document.getElementById("graphify-tooltip");let o="";this.data.some(((t,i)=>{const a=this.options.margin+i*(h+n);return e>a&&e<a+h&&s<this.height-this.options.margin&&s>this.options.margin?(o=`<div  style="box-sizing: content-box; height:50px; position: absolute; left: ${e+20}px; top: ${s+20}px; background-color: rgb(255, 255, 255);  box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; padding: 10px; width: 200px; pointer-events: none;  border-radius: 8px; flex-direction: column; gap: 10px;"><div style="font-size: 16px;">${t.label}</div>\n        <div style="display: flex; align-items: center; gap: 8px;">\n          <div style="margin-top:5px;width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; background-color: ${this.options.barColor[i%this.options.barColor.length]};"></div> \n          <div></div>\n          <div style="margin-left: auto; ">${t.value}</div>\n        </div>\n        </div>`,r.style.display="block",!0):(r.style.display="none",!1)}))&&(r.innerHTML=o)}},exports.Circle=class extends s{constructor(t,e={}){super(t,e),this.ctx=t.getCtx(),this.stage=t,this.type="circle";for(let s in i)this[s]=(null==e?void 0:e[s])||i[s];this.children=[],this.listener={},this.draging=!1,this.draggable=e.draggable,this.draggable&&this.drag()}contains(t,i){const e=this.x-this.radius,s=this.x+this.radius,h=this.y-this.radius,n=this.y+this.radius;if(!(t>=e&&t<=s&&i>=h&&i<=n))return!1;const r=t-this.x,o=i-this.y;return r*r+o*o<=this.radius*this.radius}getBox(){return{x:this.x-this.radius,y:this.y-this.radius,width:2*this.radius,height:2*this.radius}}setAttr(t){Object.keys(t).forEach((i=>this[i]=t[i])),this.stage.render()}appendChild(...t){t.length>0&&(t.forEach((t=>{this.children.push(t)})),this.stage.render())}addEventListener(t,i){this.listener[t]||(this.listener[t]=[]),this.listener[t].push(i)}render(){const{x:t,y:i,radius:e,startAngle:s,endAngle:h,fillStyle:n,borderColor:r,borderWidth:o}=this,a=this.ctx;a.save(),a.beginPath(),a.arc(t,i,e,s,h),a.fillStyle=n,a.strokeStyle=r||"rgba(0,0,0,0)",a.lineWidth=o,a.fill(),a.stroke(),a.closePath(),a.restore()}},exports.Group=class extends s{constructor(t,i={}){super(t,i),this.ctx=t.getCtx(),this.stage=t,this.type="group",this.x=0,this.y=0,this.children=[],this.listener={},this.childrenPosition=[],this.draging=!1,this.draggable=i.draggable,this.draggable&&this.drag()}contains(t,i){return this.children.some((e=>e.contains(t,i)))}setAttr(t){const{x:i=0,y:e=0}=t;this.x=i,this.y=e,this.children.forEach(((s,h)=>{const n={...t,x:i+this.childrenPosition[h].x,y:e+this.childrenPosition[h].y};s.setAttr(n)})),this.stage.render()}appendChild(...t){t.length>0&&(t.forEach((t=>{this.children.push(t),this.childrenPosition.push({x:t.x,y:t.y})})),this.stage.render())}getBox(){return!0}addEventListener(t,i){this.listener[t]||(this.listener[t]=[]),this.listener[t].push(i)}render(){this.children.length>0&&this.children.sort(((t,i)=>t.zIndex-i.zIndex)).forEach((t=>{t.render()}))}},exports.Line=class{constructor(t,i={}){var e,s,h,n;this.stage=t,this.ctx=t.getCtx(),this.type="line",this.lineType=i.lineType||"line",this.x1=i.x1||0,this.y1=i.y1||0,this.x2=i.x2||100,this.y2=i.y2||100,this.controlX1=null==(e=i.control1)?void 0:e.x,this.controlY1=null==(s=i.control1)?void 0:s.y,this.controlX2=null==(h=i.control2)?void 0:h.x,this.controlY2=null==(n=i.control2)?void 0:n.y,this.borderColor=i.borderColor||"red",this.lineWidth=i.lineWidth,this.lineCap=i.lineCap,this.children=[],this.listener={},this.showControlPoints=i.showControlPoints,this.controlPointColor=i.controlPointColor,this.controlPointRadius=i.controlPointRadius}contains(t,i){return!1}setAttr(t){Object.keys(t).forEach((i=>this[i]=t[i])),this.stage.render()}addEventListener(t,i){this.listener[t]||(this.listener[t]=[]),this.listener[t].push(i)}getBox(){return{x:this.x,y:this.y,width:this.width,height:this.height}}render(){const t=this.ctx;switch(t.save(),t.beginPath(),t.moveTo(this.x1,this.y1),this.lineType){case"quadratic":t.quadraticCurveTo(this.controlX1,this.controlY1,this.x2,this.y2);break;case"cubic":t.bezierCurveTo(this.controlX1,this.controlY1,this.controlX2,this.controlY2,this.x2,this.y2);break;default:t.lineTo(this.x2,this.y2)}t.strokeStyle=this.borderColor,t.lineWidth=this.lineWidth,t.lineCap=this.lineCap,t.stroke(),t.closePath(),t.restore(),this.showControlPoints&&this.drawControlPoints(t)}drawControlPoints(t){const i=[[this.x1,this.y1],[this.x2,this.y2]].map((t=>new Circle(this.stage,{x:t[0],y:t[1],radius:this.controlPointRadius,startAngle:0,endAngle:2*Math.PI,fillStyle:this.controlPointColor,zIndex:2})));this.appendChild(...i)}},exports.LineChart=class{constructor(t,i={}){this.ctx=t.getCtx(),this.stage=t,this.canvas=this.ctx.canvas,this.options={margin:30,axisColor:"#000",lineColor:"blue",pointRadius:0,fontSize:12,...i},this.width=this.canvas.width,this.height=this.canvas.height,this.chartWidth=this.width-2*this.options.margin,this.chartHeight=this.height-2*this.options.margin,this.render();const e=document.createElement("div");e.id="graphify-tooltip",this.stage.container.appendChild(e),this.canvas.addEventListener("mousemove",this.showTooltip.bind(this))}calculateYAxis(){const t=Math.max(...this.options.data.map((t=>t.value)));this.yMax=10*Math.ceil(t/10),this.yStep=this.yMax/5}drawAxes(){const{ctx:t,options:i}=this;t.save(),t.strokeStyle=i.axisColor,t.lineWidth=1,t.beginPath(),t.moveTo(i.margin,i.margin),t.lineTo(i.margin,this.height-i.margin),t.stroke(),t.beginPath(),t.moveTo(i.margin,this.height-i.margin),t.lineTo(this.width-i.margin,this.height-i.margin),t.stroke(),t.textAlign="right",t.textBaseline="middle",t.font=`12px ${window.getComputedStyle(document.body,null).getPropertyValue("font-family")}`;for(let e=0;e<=5;e++){const s=this.height-i.margin-e*this.chartHeight/5,h=e*this.yStep;t.fillText(h.toFixed(0),i.margin-10,s)}t.textAlign="center",t.textBaseline="top",i.data.forEach(((e,s)=>{const h=i.margin+s*this.chartWidth/(i.data.length-1);t.fillText(e.label,h,this.height-i.margin+10)})),t.restore()}drawLine(){const{ctx:t,options:i}=this;t.save(),t.beginPath(),t.strokeStyle=i.lineColor,t.lineWidth=2,t.moveTo(0,0);const e=i.data.map(((t,e)=>({x:i.margin+e*this.chartWidth/(i.data.length-1),y:this.height-i.margin-t.value*this.chartHeight/this.yMax})));i.smooth?this.drawSmoothCurve(e):e.forEach(((i,e)=>{0===e?t.moveTo(i.x,i.y):t.lineTo(i.x,i.y)})),t.stroke(),e.forEach((e=>{t.beginPath(),t.arc(e.x,e.y,i.pointRadius,0,2*Math.PI),t.fillStyle=i.lineColor,t.fill()})),t.restore()}drawSmoothCurve(t){}calculateControlPoint(t,i,e,s){const h=.5*s,n=i>0?t[i-1]:t[i],r=e<t.length-1?t[e+1]:t[e];return{x:t[i].x+h*(r.x-n.x),y:t[i].y+h*(r.y-n.y)}}showTooltip(t){const i=this.canvas.getBoundingClientRect(),e=t.clientX-i.left,s=t.clientY-i.top;this.ctx.clearRect(0,0,this.width,this.height),this.drawAxes(),this.drawLine();const h=document.getElementById("graphify-tooltip");let n="";this.options.data.some(((t,i)=>{const r=this.options.margin+i*this.chartWidth/(this.options.data.length-1),o=this.height-this.options.margin-t.value*this.chartHeight/this.yMax;return Math.abs(e-r)<10&&Math.abs(s-o)<10?(n=`<div  style="box-sizing: content-box; height:50px; position: absolute; left: ${r+10}px; top: ${o+10}px; background-color: rgb(255, 255, 255);  box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; padding: 10px; width: 200px; pointer-events: none;  border-radius: 8px; flex-direction: column; gap: 10px;"><div style="font-size: 16px;">${t.label}</div>\n          <div style="display: flex; align-items: center; gap: 8px;">\n            <div style="margin-top:5px;width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; background-color: #0052D9;"></div> \n            <div></div>\n            <div style="margin-left: auto; ">${t.value}</div>\n          </div>\n          </div>`,h.style.display="block",!0):(h.style.display="none",!1)}))&&(h.innerHTML=n)}render(){this.calculateYAxis(),this.drawAxes(),this.drawLine(),this.stage.appendChild(this)}},exports.PieChart=class{constructor(t,i){this.ctx=t.getCtx(),this.stage=t,this.canvas=this.ctx.canvas,this.options={radius:150,innerRadius:0,colors:["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEEAD"],hoverOffset:15,labelFont:"14px Arial",...i},this.data=i.data,this.center={x:this.canvas.width/2,y:this.canvas.height/2},this.total=this.data.reduce(((t,i)=>t+i.value),0),this.hoverIndex=-1,this.render()}render(){this.clear(),this.drawSegments(),this.drawLabels(),-1!==this.hoverIndex&&this.drawTooltip(),this.stage.appendChild(this)}drawSegments(){let t=-Math.PI/2;const{radius:i,innerRadius:e,colors:s,hoverOffset:h}=this.options;this.data.forEach(((n,r)=>{const o=t+n.value/this.total*Math.PI*2,a=r===this.hoverIndex?h:0,l=(t+o)/2;this.ctx.save(),this.ctx.translate(Math.cos(l)*a,Math.sin(l)*a),this.ctx.beginPath(),this.ctx.moveTo(this.center.x,this.center.y),this.ctx.arc(this.center.x,this.center.y,i,t,o),e>0&&this.ctx.arc(this.center.x,this.center.y,e,o,t,!0),this.ctx.closePath(),this.ctx.fillStyle=s[r%s.length],this.ctx.fill(),this.ctx.restore(),t=o}))}drawLabels(){const{radius:t,innerRadius:i,labelFont:e}=this.options,s=i>0?t+35:.6*t;this.ctx.fillStyle="#333",this.ctx.font=e,this.ctx.textAlign="center",this.ctx.textBaseline="middle";let h=-Math.PI/2;this.data.forEach((t=>{const i=t.value/this.total*Math.PI*2,e=h+i/2,n=this.center.x+Math.cos(e)*s,r=this.center.y+Math.sin(e)*s;this.ctx.fillText(`${t.label} (${(t.value/this.total*100).toFixed(1)}%)`,n,r),h+=i}))}drawTooltip(){const t=this.data[this.hoverIndex],{innerRadius:i}=this.options,e=i>0?this.center.y+i/2:this.center.y;this.ctx.fillStyle="#333",this.ctx.font=this.options.labelFont,this.ctx.textAlign="center",this.ctx.fillText(`${t.label}: ${t.value}`,this.center.x,e)}handleHover(t){const i=this.canvas.getBoundingClientRect(),e=t.clientX-i.left-this.center.x,s=t.clientY-i.top-this.center.y,h=Math.sqrt(e*e+s*s),n=Math.atan2(s,e),{radius:r,innerRadius:o}=this.options,a=o>0?h<=r&&h>=o:h<=r;this.hoverIndex=a?this.getHoverIndex(n):-1,this.draw()}getHoverIndex(t){let i=-Math.PI/2;for(let e=0;e<this.data.length;e++){const s=i+this.data[e].value/this.total*Math.PI*2,h=(t+2.5*Math.PI)%(2*Math.PI);if(h>=i&&h<s)return e;i=s}return-1}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}},exports.Rect=h,exports.Sector=class extends s{constructor(t,i={}){super(t,i),this.stage=t,this.ctx=t.getCtx(),this.type="sector";for(let s in e)this[s]=(null==i?void 0:i[s])||e[s];this.children=[],this.listener={},this.draging=!1,this.draggable=i.draggable,this.draggable&&this.drag()}contains(t,i){const e=t-this.x,s=i-this.y;if(e*e+s*s>this.radius*this.radius)return!1;const h=this.endAngle-this.startAngle;if(Math.abs(h%(2*Math.PI))<1e-6)return!0;let n=Math.atan2(s,e);n=n<0?n+2*Math.PI:n;let r=this.startAngle%(2*Math.PI);r=r<0?r+2*Math.PI:r;let o=this.endAngle%(2*Math.PI);return o=o<0?o+2*Math.PI:o,r<o?n>=r&&n<=o:n>=r||n<=o}setAttr(t){Object.keys(t).forEach((i=>this[i]=t[i])),this.stage.render()}addEventListener(t,i){this.listener[t]||(this.listener[t]=[]),this.listener[t].push(i)}getBox(){return{x:this.x-this.radius,y:this.y-this.radius,width:this.x+this.radius,height:this.y+this.radius}}render(){const t=this.ctx;t.save(),t.beginPath(),t.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle),t.lineTo(this.x,this.y),t.closePath(),t.fillStyle=this.fillStyle,t.fill(),t.lineWidth=this.borderWidth,t.strokeStyle=this.borderColor,t.stroke(),t.restore()}},exports.Stage=class{constructor(t,i,e,s=g){this.container=t;const h=document.createElement("canvas");this.canvas=h;const n=null==this?void 0:this.container.getBoundingClientRect(),r=window.devicePixelRatio;h.width=(i||n.width)*r,h.height=(e||n.height)*r,h.style.transform=`scale(${1/r},${1/r})`,h.style.position="relative",h.style.left="-50%",h.style.top="-50%";const o=h.getContext("2d");if(o.font=`24px ${window.getComputedStyle(document.body,null).getPropertyValue("font-family")}`,this.container.style.position="relative",this.container.appendChild(h),g.show){const t=document.createElement("div");t.innerHTML=g.icon,t.style.position="absolute",t.style.top="12px",t.style.left=h.width-48+"px",t.style.cursor="pointer",t.addEventListener("click",(()=>{!function(t,{title:i,imgType:e}){let s=t.toDataURL(`image/${e}`),h=document.createElement("a");document.body.appendChild(h),h.href=s,h.download=i,h.click()}(this.canvas,s)})),this.container.appendChild(t)}this.children=[],this.ctx=o,this.quadTree=new c({x:0,y:0,width:o.canvas.width,height:o.canvas.height},0,this.ctx);["click","dblclick","mousedown","mouseup","mousemove","mouseenter","mouseleave"].forEach((t=>new d(h,this,t))),this.isRendering=!1,this.index=0,this.isQuadTreeUpdate=!1,this.dragNode=null,this.dragNodeMoveX=0,this.dragNodeMoveY=0,this.render(),this.draging=!1,this.pendingChildren=[]}getCtx(){return this.ctx}appendChild(...t){t.forEach((t=>{t.index=this.index,this.index=this.index+1,this.children.push(t)})),this.render(),this.isQuadTreeUpdate=!0}getChildren(t){if(!t)return this.children||[];const i=this.children||[],e=[];return i.forEach((function(i){t(i)&&e.push(i)})),e}destroyChildren(){return this.getChildren().forEach((t=>{t.parent=null,t.index=0})),this.children=[],this.render(),this}destroy(){return this.hasChildren()&&this.destroyChildren(),super.destroy(),this}hasChildren(){return this.getChildren().length>0}render(){this.isRendering||(this.isRendering=!0,requestAnimationFrame((()=>{if(this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.children.sort(((t,i)=>t.zIndex-i.zIndex)).forEach((t=>{t.render()})),this.isQuadTreeUpdate&&!this.draging){let t=0;this.children.forEach((i=>{var e;this.quadTree.insertNode(i),(null==(e=i.children)?void 0:e.length)>0&&(i.level=t,i.children.forEach((i=>{i.level=t+1,this.quadTree.insertNode(i)})))})),this.isQuadTreeUpdate=!1}this.isRendering=!1}),0))}},exports.animation=l;
