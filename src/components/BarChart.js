
import Rect from './Rect'
import animation from '@/utils/animation'
class BarChart {
  constructor(stage, options = {}) {
    this.ctx = stage.getCtx();;
    this.stage = stage;
    this.canvas = this.ctx.canvas;
    this.data = options.data
    this.options = {
      margin: 50,
      axisColor: '#666',
      barColor: ['#4A90E2', '#7ED321', '#F5A623'], // 支持多种颜色
      animationDuration: 1000,
      ...options
    }
    
    // 初始化计算
    this.width =   this.canvas.width
    this.height =  this.canvas.height
    this.chartWidth = this.width - 2*this.options.margin
    this.chartHeight = this.height - 2*this.options.margin
    this.maxValue = Math.max(...options.data.map(d => d.value))
    this.animationStart = null
    this.drawBars()
    const div = document.createElement('div');
    div.id = 'graphify-tooltip'
    this.stage.container.appendChild(div)
    // 绑定事件
    this.canvas.addEventListener('mousemove', this.showTooltip.bind(this))
  }


  // 绘制坐标系
  render() {
    // this.drawBars()
    this.drawGrid()
    this.drawAxes()
   
  }

  // 绘制XY轴
  drawAxes() {
    this.ctx.save()
    this.ctx.fillStyle = '#666'
    this.ctx.strokeStyle = this.options.axisColor
    this.ctx.lineWidth = 1
    
    // Y轴
    this.ctx.beginPath()
    this.ctx.moveTo(this.options.margin, this.options.margin)
    this.ctx.lineTo(this.options.margin, this.height - this.options.margin)
    this.ctx.stroke()
    
    // X轴
    this.ctx.beginPath()
    this.ctx.moveTo(this.options.margin, this.height - this.options.margin)
    this.ctx.lineTo(this.width - this.options.margin, this.height - this.options.margin)
    this.ctx.stroke()
    
    // Y轴刻度
    this.ctx.textAlign = 'right'
    this.ctx.textBaseline = 'middle'
    const ySteps = 5
    for(let i = 0; i <= ySteps; i++) {
      const y = this.height - this.options.margin - (i * this.chartHeight / ySteps)
      const value = Math.round((i / ySteps) * this.maxValue)
      
      this.ctx.fillText(
        value,
        this.options.margin - 10,
        y
      )
    }
    
    // X轴标签
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'top'
    const barWidth = this.chartWidth / this.data.length
    this.data.forEach((d, i) => {
      this.ctx.fillText(
        d.label,
        this.options.margin + (i * barWidth) + barWidth/2,
        this.height - this.options.margin + 10
      )
    })
    
    this.ctx.restore()
  }

  // 绘制网格线
  drawGrid() {
    this.ctx.save()
    this.ctx.strokeStyle = '#EEE'
    this.ctx.setLineDash([5, 5])
    
    const ySteps = 5
    for(let i = 1; i < ySteps; i++) {
      const y = this.height - this.options.margin - (i * this.chartHeight / ySteps)
      this.ctx.beginPath()
      this.ctx.moveTo(this.options.margin, y)
      this.ctx.lineTo(this.width - this.options.margin, y)
      this.ctx.stroke()
    }
    
    this.ctx.restore()
  }

  // 绘制柱状图（带动画进度）
  drawBars() {
    let barWidth = this.chartWidth / this.data.length * 0.8
    let spacing = barWidth * 0.2;
    this.data.forEach((d, i) => {
      const x = this.options.margin + (i * (barWidth + spacing))  + 20
      const targetHeight = (d.value / this.maxValue) * this.chartHeight
      const rect = new Rect(this.stage,{
        x,
        y:this.height - this.options.margin - targetHeight,
        width:barWidth,
        height:targetHeight,
        fillStyle: this.options.barColor[i % this.options.barColor.length]
      })
      this.stage.appendChild(rect)
    })
    this.stage.appendChild(this)
  }

  // 显示数值提示
  showTooltip(e) {
    const rect = this.canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const barWidth = this.chartWidth / this.data.length * 0.8
    const spacing = barWidth * 0.2
    const tooltipDom = document.getElementById('graphify-tooltip')
     let tooltip = ``
   const res =  this.data.some((d, i) => {
      const xStart = this.options.margin + (i * (barWidth + spacing))
      const xEnd = xStart + barWidth
      
      if(mouseX > xStart && mouseX < xEnd && 
         mouseY < this.height - this.options.margin && 
         mouseY > this.options.margin) {
        tooltip = `<div  style="box-sizing: content-box; height:50px; position: absolute; left: ${mouseX + 20}px; top: ${mouseY + 20}px; background-color: rgb(255, 255, 255);  box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; padding: 10px; width: 200px; pointer-events: none;  border-radius: 8px; flex-direction: column; gap: 10px;"><div style="font-size: 16px;">${d.label}</div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="margin-top:5px;width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; background-color: ${ this.options.barColor[i % this.options.barColor.length]};"></div> 
          <div></div>
          <div style="margin-left: auto; ">${d.value}</div>
        </div>
        </div>`
      tooltipDom.style.display = 'block'
        return true
      }
       tooltipDom.style.display = 'none'
      return false
    })
    if(res){
      tooltipDom.innerHTML = tooltip
    }
   
  }
}
export default BarChart