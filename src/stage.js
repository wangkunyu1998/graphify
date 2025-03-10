




import CanvasEvent from '@/utils/canvasEvent'
import QuadTree from '@/utils/quadTree'

class Stage {
  constructor(root,width = 200,height = 200) {
    this.container = root || document.createElement("div")
    document.querySelector('body').appendChild(this.container)
    const canvas = document.createElement("canvas");
    canvas.width = this?.container?.clientWidth  || width 
    canvas.height = this?.container?.clientHeight ||height
  
    const ctx = canvas.getContext("2d");
    this.container.appendChild(canvas);
  
    this.children = [];
    this.ctx = ctx;
    this.quadTree = new QuadTree({
      x: 0,
      y: 0,
      width: ctx.canvas.width,
      height: ctx.canvas.height
    }, 0, this.ctx)
    // 支持那些事件
    const eventTypes = ['click', 'mousedown', 'mouseup', 'mousemove']
    eventTypes.forEach((eventType) => new CanvasEvent(this.ctx.canvas, this, eventType))
    this.isRendering = false; // 是否正在渲染
    this.index = 0;
    this.isQuadTreeUpdate = false;
    this.dragNode = null;
    this.dragNodeMoveX = 0;
    this.dragNodeMoveY = 0;
    this.render();
    this.draging = false;
  };
  getCtx() {
    return this.ctx
  }
  appendChild(...childs) {
    childs.forEach((child) => {
      child.index = this.index;
      this.index = this.index + 1
      this.children.push(child);
    })
    this.isQuadTreeUpdate = true;
    this.render();
  }
  removeChild(index) {
    this.children.splice(index, 1)
    this.isQuadTreeUpdate = true;
    this.render();
  }
  getChildren(filterFunc) {
    if (!filterFunc) {
      return this.children || [];
    }

    const children = this.children || [];
    const results = [];
    children.forEach(function (child) {
      if (filterFunc(child)) {
        results.push(child);
      }
    });
    return results;
  }
  destroyChildren() {
    this.getChildren().forEach((child) => {
      // reset parent to prevent many _setChildrenIndices calls
      child.parent = null;
      child.index = 0;
    });
    this.children = [];
    return this;
  }
  destroy() {
    if (this.hasChildren()) {
      this.destroyChildren();
    }
    super.destroy();
    return this;
  }
  hasChildren() {
    return this.getChildren().length > 0;
  }
  render() {
    if (this.isRendering) {
      return
    }
    this.isRendering = true;
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.children.sort((a, b) => a.zIndex - b.zIndex).forEach((child) => {
        child.render()
      })
      if (this.isQuadTreeUpdate && !this.draging) {
        let level = 0;
        this.children.forEach((child) => {
          this.quadTree.insertNode(child)
          if (child.children.length > 0) {
            child.level = level
            child.children.forEach((item) => {
              item.level = level + 1
              this.quadTree.insertNode(item)
            })
          }
        })
        this.isQuadTreeUpdate = false
      }
      this.isRendering = false
    })
  }
}




// const sector = new Sector(stage, { x: 200, y: 200, bgColor: 'red', startAngle: 0, endAngle: Math.PI * 1.5, borderColor: 'green', borderWidth: 3, radius: 60, zIndex: 1 });
// const line = new Line(stage,
//   {
//     x1: 300, y1: 100,
//     x2: 500, y2: 200,
//     control1: { x: 350, y: 50 },
//     control2: { x: 450, y: 250 }, lineType: 'cubic', borderColor: 'red', lineWidth: 2, lineCap: 'round', showControlPoints: true, controlPointColor: 'blue', controlPointRadius: 10
//   });
// stage.appendChild(sector,rect1,line,);
// const onMousedown = (e) => {
//   // 计算鼠标按下时点与圆心的距离，移动时添加这个距离
//   if (e.target) {
//     stage.draging = true
//     stage.dragNode = e.target
//     stage.dragNodeMoveX = e.x - e.target.x;
//     stage.dragNodeMoveY = e.y - e.target.y;
//   }
// }
// const onMouseup = (e) => {
//   stage.dragNode = null
//   stage.draging = false
// }
// const onMousemove = (e) => {
//   if (stage.dragNode) {
//     stage.dragNode?.setAttr({ x: e.clientX - stage.dragNodeMoveX, y: e.clientY - stage.dragNodeMoveY });
//   }
// }
// sector.addEventListener('mousedown', onMousedown)
// root.addEventListener('mousemove', onMousemove)
// root.addEventListener('mouseup', onMouseup)

// animate(sector, 3000, 'ease-in-out', { attr: 'x', value: 400 })
export default Stage