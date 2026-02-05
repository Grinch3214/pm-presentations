<template>
  <div class="canvas">
    <canvas class="canvas__item" ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId = 0

const PARTICLE_COUNT = 180
const MAX_CONNECTION_DISTANCE = 180
const MOUSE_RADIUS = 180

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
}

const particles: Particle[] = []
let mouse = { x: -9999, y: -9999, down: false }

let time = 0

function initParticles() {
  if (!canvasRef.value) return
  particles.length = 0

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvasRef.value.width,
      y: Math.random() * canvasRef.value.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      color: 'rgba(220, 230, 255, 0.5)',
    })
  }
}

function updateParticles() {
  if (!canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height

  particles.forEach((p) => {
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0 || p.x > w) p.vx *= -0.92
    if (p.y < 0 || p.y > h) p.vy *= -0.92

    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.hypot(dx, dy)

    if (dist < MOUSE_RADIUS && dist > 0) {
      const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
      const dirX = dx / dist
      const dirY = dy / dist

      const power = mouse.down ? -3.5 : 2.2
      p.vx += dirX * force * power
      p.vy += dirY * force * power
    }

    p.vx *= 0.985
    p.vy *= 0.985
  })

  time += 0.016
}

function draw() {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height

  ctx.fillStyle = 'rgba(8, 10, 25, 0.12)'
  ctx.fillRect(0, 0, w, h)

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i]
      const p2 = particles[j]

      if (!p1 || !p2) continue

      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)

      if (dist < MAX_CONNECTION_DISTANCE) {
        const opacityBase = (1 - dist / MAX_CONNECTION_DISTANCE) * 0.5
        const pulse = Math.sin(time * 3 + (p1.x + p2.y) * 0.008) * 0.15 + 0.85
        const opacity = opacityBase * pulse

        ctx.strokeStyle = `rgba(220, 230, 255, ${opacity})`
        ctx.lineWidth = 0.8 + Math.sin(time * 4 + i * 0.3) * 0.4

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }
  }

  particles.forEach((p) => {
    ctx!.shadowBlur = 8
    ctx!.shadowColor = 'rgba(220, 230, 255, 0.6)'

    ctx!.fillStyle = p.color
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, 2.4, 0, Math.PI * 2)
    ctx!.fill()

    ctx!.shadowBlur = 0
  })

  if (mouse.x > 0 && mouse.y > 0) {
    const gradient = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      0,
      mouse.x,
      mouse.y,
      MOUSE_RADIUS * 1.3,
    )
    gradient.addColorStop(0, 'rgba(220, 230, 255, 0.12)')
    gradient.addColorStop(0.5, 'rgba(180, 200, 255, 0.05)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
  }
}

function animate() {
  updateParticles()
  draw()
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles()
  }

  resize()
  window.addEventListener('resize', resize)

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', () => {
    mouse.down = true
  })
  canvas.addEventListener('mouseup', () => {
    mouse.down = false
  })
  window.addEventListener('mouseup', () => {
    mouse.down = false
  })

  initParticles()
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
})
</script>

<style lang="scss">
.canvas {
  position: absolute;
  inset: 0;
  pointer-events: auto;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 55, 138, 0.7), rgb(0 0 0 / 0.8));
    pointer-events: none;
  }
}
.canvas__item {
  width: 100%;
  height: 100%;
}
</style>
