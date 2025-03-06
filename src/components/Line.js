class Line {
  constructor(stage,config) {
    this.stage = stage;
    this.ctx = stage.getCtx();
    this.type= 'line'
    // 基础属性
    this.lineType =config.lineType || 'line'; // 线段类型：line/quadratic/cubic
    this.x1 = config.x1 || 0;
    this.y1 = config.y1 || 0;
    this.x2 = config.x2 || 100;
    this.y2 = config.y2 || 100;
    
    // 贝塞尔曲线控制点
    this.controlX1 = config.control1.x;  // 二次/三次曲线控制点1
    this.controlY1 = config.control1.y;
    this.controlX2 = config.control2.x;  // 三次曲线控制点2
    this.controlY2 = config.control2.y;
    // 样式属性
    this.borderColor = config.borderColor;
    this.lineWidth = config.lineWidth;
    this.lineCap = config.lineCap ; //两端样式
    this.children = [];
    this.listener = {};//事件监听
  
    // 控制点标记样式
    this.showControlPoints = config.showControlPoints ; // 是否显示控制点
    this.controlPointColor = config.controlPointColor ;
    this.controlPointRadius = config.controlPointRadius;
   
  }
  contains(x,y){
    return false
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
    const ctx = this.ctx
    ctx.save();
    // 绘制主路径
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    
    switch(this.lineType) {
      case 'quadratic':
        ctx.quadraticCurveTo(
          this.controlX1, 
          this.controlY1,
          this.x2,
          this.y2
        );
        break;
      case 'cubic':
        ctx.bezierCurveTo(
          this.controlX1,
          this.controlY1,
          this.controlX2,
          this.controlY2,
          this.x2,
          this.y2
        );
        break;
      default: // 直线
        ctx.lineTo(this.x2, this.y2);
    }
    // 绘制样式
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = this.lineCap;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    // 绘制控制点和连接线
    if(this.showControlPoints) {
      this.drawControlPoints(ctx);
    }
    
    if( this.children.length > 0 ) {
      this.children.sort((a, b) => a.zIndex - b.zIndex).forEach((child) => {
        child.render()
      })
    }
   
   
  }
   // 绘制控制点标记
   drawControlPoints(ctx) {
    const controlPoints = [[this.x1,this.y1],[this.x2,this.y2]];
  
    const points =controlPoints.map(point => {
    return  new Circle(this.stage, { x: point[0], y: point[1], radius: this.controlPointRadius, startAngle: 0, endAngle: Math.PI * 2, bgColor:this.controlPointColor,zIndex: 2 })
    });
    this.appendChild(...points)
  }
}
export default Line