import { useState, useEffect, useRef } from 'react'

interface SnakeGameProps {
  onClose?: () => void
}

const GRID_SIZE = 20
const CELL_SIZE = 20

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

interface Position {
  x: number
  y: number
}

export default function SnakeGame({ onClose }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT')
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameActive, setGameActive] = useState(true)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameActive) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setNextDirection('UP')
          e.preventDefault()
          break
        case 'ArrowDown':
          if (direction !== 'UP') setNextDirection('DOWN')
          e.preventDefault()
          break
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setNextDirection('LEFT')
          e.preventDefault()
          break
        case 'ArrowRight':
          if (direction !== 'LEFT') setNextDirection('RIGHT')
          e.preventDefault()
          break
        case ' ':
          setGameActive((a) => !a)
          e.preventDefault()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, gameActive])

  // Game loop
  useEffect(() => {
    if (!gameActive || gameOver) return

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const newDirection = nextDirection
        setDirection(newDirection)

        const head = prevSnake[0]
        let newHead: Position

        switch (newDirection) {
          case 'UP':
            newHead = { x: head.x, y: head.y - 1 }
            break
          case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 }
            break
          case 'LEFT':
            newHead = { x: head.x - 1, y: head.y }
            break
          case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y }
            break
        }

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true)
          return prevSnake
        }

        // Check self collision
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1)
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          })
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, 100)

    return () => clearInterval(gameLoopRef.current)
  }, [gameActive, gameOver, food, nextDirection])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#080B12'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#21262D'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, idx) => {
      ctx.fillStyle = idx === 0 ? '#00D9FF' : '#00A8C8'
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      )
    })

    // Draw food
    ctx.fillStyle = '#FF2D78'
    ctx.beginPath()
    ctx.arc(
      (food.x + 0.5) * CELL_SIZE,
      (food.y + 0.5) * CELL_SIZE,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }, [snake, food])

  const handleReset = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood({ x: 15, y: 15 })
    setDirection('RIGHT')
    setNextDirection('RIGHT')
    setScore(0)
    setGameOver(false)
    setGameActive(true)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full px-2">
        <div>
          <p className="font-mono text-accent text-sm">Score: {score}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="border-2 border-accent/30 rounded-lg"
      />

      <div className="text-center text-sm text-text-secondary">
        {gameOver ? (
          <p className="text-pop font-semibold">Game Over!</p>
        ) : gameActive ? (
          <p>Use arrow keys to move • Space to pause</p>
        ) : (
          <p className="text-accent">Paused • Press Space to resume</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setGameActive((a) => !a)}
          className="px-4 py-2 bg-accent text-surface-950 font-semibold rounded-lg hover:bg-accent-dim transition-colors"
        >
          {gameActive ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors"
        >
          New Game
        </button>
      </div>
    </div>
  )
}
