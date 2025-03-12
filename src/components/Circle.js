import {defaultCircle} from '@/utils/defaultAttr'
import Drag from '@/utils/drag.js'
class Circle extends Drag {
  constructor(stage, config ={}) {
    super(stage,config)
    this.ctx = stage.getCtx();
    this.stage = stage
    /**
     * 基础属性
     * x:200, y:200, radius:50, startAngle:0, endAngle:Math.PI * 2, fillStyle:'blue', borderColor :'yellow', borderWidth :5, zIndex :1
     */
    this.type = 'circle'
    for(let key in defaultCircle) {
      this[key] = config?.[key] || defaultCircle[key];
    }
    this.children = [];
    this.listener = {};//事件监听
    this.draging = false;
    this.draggable = config.draggable;
    if(this.draggable){
      this.drag()
    }
  }
  contains(pointX,pointY){
      // const boundingBox = {
      //   // 包围盒
      //   x:this.x - this.radius,
      //   y:this.y - this.radius,
      //   width: 2*radius,
      //   height: 2*radius
      // }

      // 简化
      const boundingBox = {
        left:this.x - this.radius,
        right:this.x + this.radius,
        top:this.y - this.radius,
        bottom:this.y + this.radius
      }
      
      const isBoundingBox = pointX >= boundingBox.left && 
      pointX <= boundingBox.right &&
      pointY >= boundingBox.top &&
      pointY <= boundingBox.bottom;
      if(!isBoundingBox){
        return false
      }
      const dx = pointX - this.x
      const dy = pointY - this.y
      return dx * dx + dy*dy<=this.radius * this.radius
  }
  getBox(){
    return{
      x:this.x - this.radius,y:this.y - this.radius,width:2*this.radius,height:2*this.radius,
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
  render() {
    const { x, y, radius, startAngle, endAngle, fillStyle, borderColor, borderWidth } = this;
    const ctx = this.ctx
    ctx.save()
   
  
    ctx.beginPath(); // 开始一个新的路径
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = borderColor || 'rgba(0,0,0,0)'; // 边框颜色
    ctx.lineWidth = borderWidth; // 边框宽度
    ctx.fill();
    ctx.stroke()
    ctx.closePath();
    ctx.restore();
  }
}
export default Circle