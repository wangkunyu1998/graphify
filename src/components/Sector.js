import {defaultSector} from '@/utils/defaultAttr'
class Sector {
  constructor(stage, config) {
    this.stage = stage
    this.ctx = stage.getCtx();
      /**
     * 基础属性
     * { x:200, y:200, bgColor:'red', startAngle:0, endAngle:Math.PI * 1.5, borderColor:'green', borderWidth:3, radius:60,zIndex:1}
     */
    this.type = 'sector';
    for(let key in defaultSector) {
      this[key] = config[key] || defaultSector[key];
    }
    this.children = [];
    this.listener = {};//事件监听
  
  }
  contains(x,y){
     // 计算点与圆心的相对坐标
     const dx = x - this.x;
     const dy = y - this.y;
     
     // 判断是否在圆外
     const distanceSq = dx * dx + dy * dy;
     if (distanceSq > this.radius * this.radius) return false;
 
     // 处理完整圆的情况（角度差为2π的整数倍）
     const angleDiff = this.endAngle - this.startAngle;
     if (Math.abs(angleDiff % (2 * Math.PI)) < 1e-6) return true;
 
     // 计算点的极角（转换为0~2π范围）
     let theta = Math.atan2(dy, dx);
     theta = theta < 0 ? theta + 2 * Math.PI : theta;
 
     // 标准化起始和结束角度到0~2π范围
     let s = this.startAngle % (2 * Math.PI);
     s = s < 0 ? s + 2 * Math.PI : s;
     let e = this.endAngle % (2 * Math.PI);
     e = e < 0 ? e + 2 * Math.PI : e;
 
     // 判断角度是否在扇形范围内
     if (s < e) {
         return theta >= s && theta <= e;
     } else {
         return theta >= s || theta <= e;
     }
  }
  setAttr(attr) {
    Object.keys(attr).forEach((key) => this[key] = attr[key] );
    this.stage.render()
  }
  appendChild(...childs) {
    if(childs.length > 0){
      childs.forEach((child) => {
        this.children.push(child);
      })
      this.stage.render()
    }
  }
  addEventListener(type,callback){
    //如果没监听过这个事件，则初始化
    if(!this.listener[type]){
      this.listener[type] = []
    }
    // 放进当前监听事件回调
    this.listener[type].push(callback)
  }
  getBox(){
    return{
      x:this.x - this.radius,y:this.y-this.radius,width:this.x + this.radius,height:this.y + this.radius
    }
  }
  render() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    
    // 填充
    ctx.fillStyle = this.bgColor;
    ctx.fill();
    
    // 描边
    ctx.lineWidth = this.borderWidth;
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
    ctx.restore();
  }
}
export default Sector