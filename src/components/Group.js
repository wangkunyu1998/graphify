import {defaultRect} from '@/utils/defaultAttr'
import Drag from '@/utils/drag.js'
class Group extends Drag {
  constructor(stage,config) {
    super(stage,config)
    this.ctx = stage.getCtx();;
    this.stage = stage;
    /**
     * 支持属性
     * {x : 10, y : 10,  zIndex :0}
     */
    this.type= 'group'
    
    this.x = 0;
    this.y = 0
    this.children = [];
    this.listener = {};//事件监听池
    this.childrenPosition = []
    this.draging = false;
    this.draggable = config.draggable;
    if(this.draggable){
      this.drag()
    }
  }
  contains(x,y){
    return this.children.some(v => v.contains(x,y))
  }
  setAttr(attr) {
    const {x =0,y =0} = attr;
    Object.keys(attr).forEach((key) => this[key] = attr[key] );
    this.children.forEach((child,index) => {
      const attrCache = {
        ...attr,
        x:x + this.childrenPosition[index].x,
        y:y + this.childrenPosition[index].y
      }
      child.setAttr(attrCache)
    })
    this.stage.render()
  }
  appendChild(...childs) {
    
    if(childs.length > 0){
      childs.forEach((child) => {
        this.children.push(child);
        this.childrenPosition.push({x:child.x,y:child.y})
      })
      this.stage.render()
    }
  }

  getBox(){
    return true
  }
  render() {
    
    if(this.children.length > 0){
      this.children.sort((a, b) => a.zIndex - b.zIndex).forEach((child) => {
        child.render()
      })
    }
   
  }
}
export default Group