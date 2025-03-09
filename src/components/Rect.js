import {defaultRect} from '@/utils/defaultAttr'
class Rect {
  constructor(stage, config) {
    this.ctx = stage.getCtx();;
    this.stage = stage;
    /**
     * 基础属性
     * {x : 10, y : 10, width :100, height :100, bgColor:'red', borderColor :'green', borderWidth :6, radius : 20, zIndex :0}
     */
    this.type= 'rect'
    
    for(let key in defaultRect) {
      this[key] = config[key] || defaultRect[key];
    }
    this.children = [];
    this.listener = {};//事件监听池
  }
  contains(x,y){
    return (
        x >= this.x && x<this.x + this.width &&y>=this.y && y<this.y + this.height
      )
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
      x:this.x,y:this.y,width:this.width,height:this.height
    }
  }
  render() {
    const { x, y, width, height, bgColor, borderColor, borderWidth, radius } = this;
    const ctx = this.ctx
    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor
  
    if (radius) {
      ctx.lineWidth = borderWidth * 2;
      //
      ctx.beginPath();
      // 移动到左上角起点
      ctx.moveTo(x + radius, y);
      // 上边和右上圆角
      ctx.lineTo(x + width - radius * 2, y);
      ctx.arcTo(x + width, y, x + width, y + radius, radius);
      // 右边和右下圆角
      ctx.lineTo(x + width, y + height - radius);
      ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
      // 下边和左下圆角
      ctx.lineTo(x + radius, y + height);
      ctx.arcTo(x, y + height, x, y + height - radius, radius);
      // 左边和左上圆角
      ctx.lineTo(x, y + radius);
      ctx.arcTo(x, y, x + radius, y, radius);
      ctx.closePath();

      ctx.stroke()
      ctx.fill()
    } else {
      // 图形
      ctx.fillRect(x, y, width, height)
      //边框
      ctx.strokeRect(x, y, width, height);
    }
    ctx.restore();
    if(this.children.length > 0){
      this.children.sort((a, b) => a.zIndex - b.zIndex).forEach((child) => {
        child.render()
      })
    }
   
  }
}
export default Rect