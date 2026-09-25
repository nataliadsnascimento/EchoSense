import './App.css';
import logoImg from './assets/icon.png'; 

function App() {
  return (
    <div className="splash-container">
      <div className="top-bar"></div>

      <main className="main-content">
        <div className="logo-container">
          <img src={logoImg} alt="EchoSense Logo Principal" className="main-logo" />
        </div>

        <h2 className="tagline">Sons que viram alerta</h2>
        
        <p className="description">
          Tecnologia que transforma sons<br />
          importantes em alertas visuais<br />
          e luz para sua segurança<br />
        </p>
      </main>

      <div className="bottom-indicator">
        <div className="pagination-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <p className="swipe-text">Deslize para continuar ➔</p>
      </div>
    </div>
  );
}

export default App;