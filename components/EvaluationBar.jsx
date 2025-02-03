export function EvaluationBar({ evaluation }) {
    // Limita la evaluación entre -8 y 8
    const clampedEval = Math.max(-8, Math.min(8, evaluation));

    // Calcula el porcentaje de la parte blanca (de 0% a 100%)
    const whitePercentage = ((clampedEval + 8) / 16) * 100; // Mapea -8 a 0%, 0 a 50% y 8 a 100%

    return (
      <div style={{display:"flex",}}>
        <span style={{fontSize:"1.5rem", alignSelf:"center"}}>{evaluation}</span>
         <div className="evaluation-bar" style={{
          
          width: "40px",
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
      }}>
       
        <div style={{ flex: `${100 - whitePercentage} 1 0%`, backgroundColor: "black" }} />
    
        <div style={{ flex: `${whitePercentage} 1 0%`, backgroundColor: "white" }} />

      </div>
      </div>
     
    );
}
