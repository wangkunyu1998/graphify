
class LineChart {
  constructor(stage, options = {}) {
    this.ctx = stage.getCtx();;
    this.stage = stage;
    this.canvas = this.ctx.canvas;
    this.options = {
      margin: 30,
      axisColor: '#000',
      lineColor: 'blue',
      pointRadius: 0,
      fontSize: 12,
      ...options
    };
    // console.log(this.options)
    // 初始化尺寸
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.chartWidth = this.width - 2 * this.options.margin;
    this.chartHeight = this.height - 2 * this.options.margin;
    this.render()
    const div = document.createElement('div');
    div.id = 'graphify-tooltip'
    this.stage.container.appendChild(div)
    // 绑定事件
    this.canvas.addEventListener('mousemove', this.showTooltip.bind(this));
  }

  // 计算Y轴最大值和步长
  calculateYAxis() {
    const maxValue = Math.max(...this.options.data.map(d => d.value));
    this.yMax = Math.ceil(maxValue / 10) * 10;
    this.yStep = this.yMax / 5;
  }

  // 绘制坐标轴
  drawAxes() {
    const { ctx, options } = this;
    ctx.save();
    ctx.strokeStyle = options.axisColor;
    ctx.lineWidth = 1;

    // Y轴
    ctx.beginPath();
    ctx.moveTo(options.margin, options.margin);
    ctx.lineTo(options.margin, this.height - options.margin);
    ctx.stroke();

    // X轴
    ctx.beginPath();
    ctx.moveTo(options.margin, this.height - options.margin);
    ctx.lineTo(this.width - options.margin, this.height - options.margin);
    ctx.stroke();

    // Y轴刻度
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font= `${'12px'} ${window.getComputedStyle(document.body, null).getPropertyValue('font-family')}`
    for (let i = 0; i <= 5; i++) {
      const y = this.height - options.margin - (i * this.chartHeight / 5);
      const value = i * this.yStep;
      
      ctx.fillText(
        value.toFixed(0),
        options.margin - 10,
        y
      );
    }

    // X轴标签
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    options.data.forEach((d, i) => {
      const x = options.margin + (i * this.chartWidth / (options.data.length - 1));
      ctx.fillText(
        d.label,
        x,
        this.height - options.margin + 10
      );
    });

    ctx.restore();
  }

  // 绘制折线
  drawLine() {
    const { ctx, options } = this;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.lineColor;
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    const points =options.data.map((d, i) => ({
      x: options.margin + (i * this.chartWidth/(options.data.length-1)),
      y: this.height - options.margin - (d.value * this.chartHeight/this.yMax)
    }));
    if(options.smooth) {
      // 平滑曲线绘制逻辑
      this.drawSmoothCurve(points);
    } else {
      // 原始直线绘制逻辑
      points.forEach((p, i) => {
        if(i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
    }
    ctx.stroke();

    // 绘制数据点
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, options.pointRadius, 0, Math.PI * 2);
      ctx.fillStyle = options.lineColor;
      ctx.fill();
    });

    ctx.restore();
   
  }
  
  // 新增平滑曲线绘制方法
  drawSmoothCurve(points) {
    // const ctx = this.ctx;
    // ctx.beginPath();
    
    // // 绘制第一个点
    // ctx.moveTo(points[0].x, points[0].y);

    // for (let i = 1; i < points.length; i++) {
    //   const prev = points[i - 1];
    //   const current = points[i];
      
    //   // 计算控制点（增加张力系数调整）
    //   const cp1 = this.calculateControlPoint(points, i - 1, i, 0.3);
    //   const cp2 = this.calculateControlPoint(points, i, i - 1, 0.3);

    //   ctx.bezierCurveTo(
    //     points[0].x + (current.x - points[0].x) /3,
    //     points[0].y + (current.y - points[0].y) /3,
    //     points[0].x + (current.x - points[0].x) /3 * 2,
    //     points[0].y + (current.y - points[0].y) /3 * 2,
    //     current.x, current.y
    //   );
    // }
    
    // ctx.stroke();
  }

  // 计算控制点（基于相邻点）
  calculateControlPoint(points, a, b, tension) {
    const delta = tension * 0.5;
    const prev = a > 0 ? points[a - 1] : points[a];
    const next = b < points.length - 1 ? points[b + 1] : points[b];
    
    return {
      x: points[a].x + delta * (next.x - prev.x),
      y: points[a].y + delta * (next.y - prev.y)
    };
  }
  // 显示提示框
  showTooltip(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawAxes();
    this.drawLine();
    const tooltipDom = document.getElementById('graphify-tooltip')
    let tooltip = ``
    const res =this.options.data.some((d, i) => {
      const x = this.options.margin + (i * this.chartWidth / (this.options.data.length - 1));
      const y = this.height - this.options.margin - (d.value * this.chartHeight / this.yMax);
     
      // display: none;
       
      // 检测鼠标附近的数据点
      if (Math.abs(mouseX - x) < 10 && Math.abs(mouseY - y) < 10) {
        tooltip = `<div  style="box-sizing: content-box; height:50px; position: absolute; left: ${x + 10}px; top: ${y + 10}px; background-color: rgb(255, 255, 255);  box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; padding: 10px; width: 200px; pointer-events: none;  border-radius: 8px; flex-direction: column; gap: 10px;"><div style="font-size: 16px;">${d.label}</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="margin-top:5px;width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; background-color: #0052D9;"></div> 
            <div></div>
            <div style="margin-left: auto; ">${d.value}</div>
          </div>
          </div>`
        tooltipDom.style.display = 'block'
        return true
      }else{
        tooltipDom.style.display = 'none'
        return false
      }
     
    });
    if(res){
      tooltipDom.innerHTML = tooltip
    }
  }

  // 初始化图表
  render() {
    this.calculateYAxis();
    this.drawAxes();
    this.drawLine();
    this.stage.appendChild(this)
  }
}
export default LineChart