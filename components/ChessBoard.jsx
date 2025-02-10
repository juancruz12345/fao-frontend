import { useEffect, useState } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { IconChevronLeftPipe, IconChevronRightPipe, IconChevronLeft, IconChevronRight } from "./Icons"
import "./ChessBoard.css"
import { EvaluationBar } from "./EvaluationBar"

export function ChessBoard({ pgnUrl }) {
  const [game, setGame] = useState(new Chess())
  const [fen, setFen] = useState("start")
  const [loading, setLoading] = useState(true)
  const [moves, setMoves] = useState([])
  const [moveIndex, setMoveIndex] = useState(0)
  const [evaluation, setEvaluation] = useState(null)
  const [bestMove, setBestMove] = useState(null)
  const [continuationArray, setContinuationArray] = useState()
  const [autoEvaluate, setAutoEvaluate] = useState(false)
  const [error, setError] = useState(null)
  const [white, setWhite] = useState('')
  const [black, setBlack] = useState('')
  const [opening, setOpening] = useState('')
  const [boardWidth, setBoardWidth] = useState(400)

  useEffect(() => {

    const updateBoardSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 800) {
        setBoardWidth(screenWidth * 0.5)
      } else {
        setBoardWidth(400)
      }
    };

    updateBoardSize()

    window.addEventListener("resize", updateBoardSize)

    return () => window.removeEventListener("resize", updateBoardSize)
  }, [])

  

  useEffect(() => {
    if (pgnUrl) {
      fetchPGN(pgnUrl)
    }
  }, [pgnUrl])

  useEffect(() => {
    if (autoEvaluate) {
      evaluatePosition()
    }
  }, [autoEvaluate, moveIndex]) // Removed unnecessary dependency: fen

  const fetchPGN = async (url) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Error al cargar PGN: ${response.status}`)
      }
      const pgn = await response.text()
      
      const sanitizedPGN = sanitizePGN(pgn)
      console.log("PGN cargado desde URL:", sanitizedPGN)
      const newGame = new Chess()
      newGame.loadPgn(sanitizedPGN)

      const movesList = newGame.history()

      setGame(newGame)
      setMoves(movesList)
      setMoveIndex(movesList.length)
      setFen(newGame.fen())
      setLoading(false)
      setError(null)
    } catch (error) {
      console.error("Error al obtener PGN:", error)
      setError("Error al cargar la partida. Por favor, inténtelo de nuevo.")
      setLoading(false)
    }
  }

  const updateBoard = (index) => {
    const newGame = new Chess()
    const movesCopy = [...moves]

    for (let i = 0; i < index; i++) {
      newGame.move(movesCopy[i])
    }

    setGame(newGame)
    setFen(newGame.fen())
    setMoveIndex(index)
  }

  useEffect(() => {
    
    const handleKeyPress = (event) => {
      if (event.key === "ArrowRight") {
        nextMove()
      } else if (event.key === "ArrowLeft") {
        prevMove()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [moveIndex]) 
 

  const extractMoveAndEvaluation = (text) => {
    const regex = /Move \S+ → \S+ (\(\S+\)): \[([^\]]+)\]/
    const match = text.match(regex)
  
    if (match) {
      const move = match[1]
      const evaluation = match[2]
      return { move, evaluation }
    } else {
      console.warn("Formato inesperado en la respuesta de la API:", text)
      return { move: "N/A", evaluation: "N/A" }
    }
  }
  

  async function postChessApi(data = {}) {
    const response = await fetch("https://chess-api.com/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  const evaluatePosition = async () => {
    try {
      setError(null)
      const currentFen = game.fen()
      const data = await postChessApi({ fen: currentFen })
  
      if (data && data.text) {
      
        const { move, evaluation } = extractMoveAndEvaluation(data.text)
        const resultado = move.replace(/[()]/g, '')
  
        let uciMove = null
        try {
          uciMove = sanToUci(resultado, currentFen)
          data.continuationArr.unshift(uciMove)
          console.log(data.continuationArr)
        } catch (error) {
          console.error("Error al convertir SAN a UCI:", error.message)
        }
  
        const sanMoves = uciToSan(data.continuationArr, currentFen)
  
        setBestMove(resultado)
        setContinuationArray(sanMoves)
  
        if (move && evaluation) {
          setEvaluation({ move, evaluation })
        } else {
          throw new Error("No se pudo extraer el movimiento y la valoración del texto.")
        }
      } else {
        throw new Error("La API no devolvió datos válidos.")
      }
    } catch (error) {
      console.error("Error al evaluar la posición:", error)
      setError("Error al evaluar la posición. Por favor, inténtelo de nuevo.")
    }
  }
  

  const nextMove = () => {
    if (moveIndex < moves.length) {
      updateBoard(moveIndex + 1)
    }
  }

  const prevMove = () => {
    if (moveIndex > 0) {
      updateBoard(moveIndex - 1)
    }
  }

  const goToStart = () => {
    updateBoard(0)
  }

  const goToEnd = () => {
    updateBoard(moves.length)
  }

 


  function sanitizePGN(pgn) {
    const lines = pgn.trim().split("\n")
    const metadataIndex = lines.findIndex((line) => line.startsWith("1."))
    
    const strWhitePlayer = lines[4]
    const matchWhite = strWhitePlayer.match(/"([^"]+)"/)
    const whitePlayer = matchWhite ? matchWhite[1] : null
    setWhite(whitePlayer)
    const strBlackPlayer = lines[5]
    const matchBlack = strBlackPlayer.match(/"([^"]+)"/)
    const blackPlayer = matchBlack ? matchBlack[1] : null
    setBlack(blackPlayer)
    
    const strOpening = lines[10]
    const openingMatch = strOpening.match(/"([^"]+)"/)
    const openingVar = openingMatch ? openingMatch[1] : null
    setOpening(openingVar)
  
    if (metadataIndex > 0 && lines[metadataIndex - 1] !== "") {
      lines.splice(metadataIndex, 0, "")
    }
    let sanitizedPGN = lines.join("\n")
    if (!sanitizedPGN.match(/(1-0|0-1|1\/2-1\/2|\*)$/)) {
      sanitizedPGN += " *"
    }
    return sanitizedPGN
  }
  
  const onDrop = (sourceSquare, targetSquare) => {
    if (!sourceSquare || !targetSquare) return
  
    const piece = game.get(sourceSquare)
    console.log(piece)
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece?.type === "p" && (targetSquare[1] === "8" || targetSquare[1] === "1") ? "q" : undefined,
    })
  
    console.log("Movimiento realizado:", move)
  
    if (move) {
      setGame(new Chess(game.fen()))
      setFen(game.fen())
      evaluatePosition()
    }
  }
  



function sanToUci(sanMove, fen) {
  const chess = new Chess(fen)

  const move = chess.move(sanMove, { sloppy: true })
  if (!move) {
      throw new Error(`Movimiento inválido: ${sanMove}`)
  }
  return move.from + move.to
}


function uciToSan(uciMoves, fen) {
  
  const chess = new Chess(fen)
  const sanMoves = []
 
  for (const uciMove of uciMoves) {
      try {
        
          const from = uciMove.slice(0, 2)
          const to = uciMove.slice(2, 4)

          const move = chess.move({ from, to, promotion: 'q' })
          if (move) {
              sanMoves.push(move.san)
          } else {
              console.error(`Movimiento inválido: ${uciMove}`)
          }
      } catch (error) {
          console.error(`Error al procesar el movimiento ${uciMove}:`, error.message)
      }
  }

  return sanMoves
}


  

  return (
    <Container className="chess-container">
      <h2 className="chess-title">{white} - {black}</h2>
      {loading ? (
        <p className="chess-loading">Cargando partida...</p>
      ) : error ? (
        <p className="chess-error">{error}</p>
      ) : (
        <Row>
          <Col lg={8}>
            <div className="chessboard-container">
            <div className="div-chessboard">
            <EvaluationBar id='evalution-bar' evaluation={evaluation?.evaluation} />
            <div className="chessboard-wrapper">
           <div className="board">
           <Chessboard arePiecesDraggable={true} onPieceDrop={onDrop} position={fen} boardWidth={boardWidth} id="board" />

           </div>
           <div className="chess-controls mt-3">
                <Button variant="outline-primary" onClick={goToStart}>
                  <IconChevronLeftPipe />
                </Button>
                <Button variant="outline-primary" onClick={prevMove}>
                  <IconChevronLeft />
                </Button>
                <Button variant="outline-primary" onClick={nextMove}>
                  <IconChevronRight />
                </Button>
                <Button variant="outline-primary" onClick={goToEnd}>
                  <IconChevronRightPipe />
                </Button>
              </div>
            </div>
         
             
            </div>
              
            </div>
          </Col>
          <Col lg={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Evaluación</Card.Title>
                <Form.Check
                  type="switch"
                  id="auto-evaluate-switch"
                  label="Evaluación automática"
                  checked={autoEvaluate}
                  onChange={(e) => setAutoEvaluate(e.target.checked)}
                />
                {evaluation && (
                  <div>
                   
                    <p><strong>Movimiento:</strong> {bestMove}</p>
                    <p><strong>Continuación:</strong></p>
                      {
                       continuationArray?.length>0 ? continuationArray?.map((e,i)=>
                          (
                         
                          i<continuationArray.length && i>0
                          ? <span key={i}>, {e}</span>
                          : <span key={i}> {e}</span>
                           ))
                       :<></>
                      }
                  
                  
                  </div>
                )}
                <br></br>
                <p><strong>Apertura:</strong> {opening}</p>
              
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Notación</Card.Title>
                <div className="moves-list">
                  {moves.map((move, index) => (
                    <Button
                      key={index}
                      variant={index === moveIndex - 1 ? "primary" : "outline-primary"}
                      onClick={() => updateBoard(index + 1)}
                      className="move-btn"
                    >
                      {`${Math.floor(index / 2) + 1}${index % 2 === 0 ? "." : "..."} ${move}`}
                    </Button>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}



