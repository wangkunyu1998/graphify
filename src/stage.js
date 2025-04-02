




import CanvasEvent from '@/utils/canvasEvent'
import QuadTree from '@/utils/quadTree'
import download from '@/utils/download'
const initDownloadOption = {
  show: true,
  imgType: 'png',
  title: "图形",
  icon: `<svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24"
      fill="none" 
      stroke="#000" 
      stroke-width="2"
    >
      <path d="M12 3v12m0 0l-3-3m3 3l3-3"/>
      <path d="M5 21h14"/>
    </svg>`
}
class Stage {
  constructor(root, width, height, downloadOption = initDownloadOption) {
    this.container = root
    const canvas = document.createElement("canvas");
    this.canvas = canvas
    canvas.width = width || this?.container?.clientWidth
    canvas.height = height || this?.container?.clientHeight
    const ctx = canvas.getContext("2d");
    this.container.style.position = 'relative';
    this.container.appendChild(canvas);
    if (initDownloadOption.show) {
      const { right, top } = canvas.getBoundingClientRect();
      const downloadBtn = document.createElement("div");
      // downloadBtn.innerText = '下载图片';
      downloadBtn.innerHTML = initDownloadOption.icon
      downloadBtn.style.position = 'absolute';
      downloadBtn.style.top = `${top + window.scrollY}px`
      downloadBtn.style.left = `${right + window.scrollX - 48}px`
      downloadBtn.style.cursor = 'pointer';
      downloadBtn.addEventListener('click', () => {
        download(this.canvas, downloadOption)
      })
      this.container.appendChild(downloadBtn);
    }


    this.children = [];
    this.ctx = ctx;
    this.quadTree = new QuadTree({
      x: 0,
      y: 0,
      width: ctx.canvas.width,
      height: ctx.canvas.height
    }, 0, this.ctx)
    // 支持那些事件
    const eventTypes = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseenter', 'mouseleave']
    // const eventTypes = ['click']
    eventTypes.forEach((eventType) => new CanvasEvent(canvas, this, eventType))
    this.isRendering = false; // 是否正在渲染
    this.index = 0;
    this.isQuadTreeUpdate = false;
    this.dragNode = null;
    this.dragNodeMoveX = 0;
    this.dragNodeMoveY = 0;
    this.render();
    this.draging = false;
    this.pendingChildren = []; // 新增待处理队列

  };
  getCtx() {
    return this.ctx
  }
  appendChild(...childs) {

    childs.forEach((child) => {
      child.index = this.index;
      this.index = this.index + 1;
      this.children.push(child);
    })

    this.render();
    this.isQuadTreeUpdate = true;

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
    this.render();
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
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.children.sort((a, b) => a.zIndex - b.zIndex).forEach((child) => {
        child.render()
      })
      if (this.isQuadTreeUpdate && !this.draging) {
        let level = 0;
        this.children.forEach((child) => {
          this.quadTree.insertNode(child)
          if (child.children?.length > 0) {
            child.level = level
            child.children.forEach((item) => {
              item.level = level + 1
              this.quadTree.insertNode(item)
            })
          }
        })
        this.isQuadTreeUpdate = false
      }
      this.isRendering = false;
    }, 0)
  }
}

export default Stage