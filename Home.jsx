import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-wrapper">
      {/* Floating orbs for visual depth */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="home-card">
        <div className="home-icon">⚖️</div>
        <h1 className="home-title">BMI Calculator</h1>
        <p className="home-subtitle">
          Understand your body composition in seconds. Enter your height and
          weight to get an instant, accurate BMI reading along with your
          personalised health category.
        </p>

        <div className="features">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Instant results</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span>Accurate formula</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span>Health categories</span>
          </div>
        </div>

        <button
          className="cta-button"
          onClick={() => navigate('/bmi')}
        >
          Start Calculation
          <span className="btn-arrow">→</span>
        </button>
      </div>

      <p className="disclaimer">
        Developed by <strong>BALAJI A</strong> &nbsp;|&nbsp; Reg.No: 212223040023
      </p>
    </div>
  )
}
