import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './Result.css'

function getCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: 'underweight', emoji: '🌙' }
  if (bmi < 25)   return { label: 'Normal weight', color: 'normal',      emoji: '✅' }
  if (bmi < 30)   return { label: 'Overweight',    color: 'overweight',  emoji: '⚠️' }
  return            { label: 'Obese',              color: 'obese',       emoji: '🔴' }
}

function getAdvice(color) {
  const advice = {
    underweight: 'Consider increasing caloric intake with nutrient-rich foods and consult a dietitian.',
    normal:      'Great job! Maintain your healthy lifestyle with balanced diet and regular exercise.',
    overweight:  'Consider incorporating more physical activity and balanced dietary choices.',
    obese:       'Consult a healthcare provider for a personalised weight management plan.',
  }
  return advice[color]
}

export default function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // Guard: redirect if accessed directly without state
  useEffect(() => {
    if (!state?.height || !state?.weight) {
      navigate('/bmi', { replace: true })
    }
  }, [state, navigate])

  if (!state?.height || !state?.weight) return null

  const { height, weight } = state
  const heightM = height / 100
  const bmi = weight / (heightM * heightM)
  const bmiFormatted = bmi.toFixed(1)
  const { label, color, emoji } = getCategory(bmi)
  const advice = getAdvice(color)

  // Progress bar fill (clamped 10–100%)
  const barFill = Math.min(100, Math.max(10, ((bmi - 10) / 30) * 100))

  return (
    <div className="result-wrapper">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="result-card">
        <div className="result-header">
          <div className="result-icon">{emoji}</div>
          <h1>Your BMI Result</h1>
        </div>

        {/* BMI Score Ring */}
        <div className={`bmi-ring ${color}`}>
          <span className="bmi-number">{bmiFormatted}</span>
          <span className="bmi-label-small">BMI</span>
        </div>

        {/* Category Badge */}
        <div className={`category-badge ${color}`}>
          {label}
        </div>

        {/* Progress bar */}
        <div className="bmi-scale">
          <div className="scale-track">
            <div className="scale-fill" style={{ width: `${barFill}%` }} />
            <div className="scale-marker" style={{ left: `${barFill}%` }} />
          </div>
          <div className="scale-labels">
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
            <span>Obese</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-value">{height} cm</span>
            <span className="stat-label">Height</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-box">
            <span className="stat-value">{weight} kg</span>
            <span className="stat-label">Weight</span>
          </div>
        </div>

        {/* Advice */}
        <div className={`advice-box ${color}`}>
          <p>{advice}</p>
        </div>

        <button className="recalc-btn" onClick={() => navigate('/bmi')}>
          ← Calculate Again
        </button>
      </div>
    </div>
  )
}
