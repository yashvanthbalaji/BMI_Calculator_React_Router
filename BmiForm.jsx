import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BmiForm.css'

export default function BmiForm() {
  const navigate = useNavigate()
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const newErrors = {}
    const h = parseFloat(height)
    const w = parseFloat(weight)

    if (!height.trim()) {
      newErrors.height = 'Height is required.'
    } else if (isNaN(h) || h <= 0) {
      newErrors.height = 'Enter a valid positive number.'
    } else if (h < 50 || h > 300) {
      newErrors.height = 'Height must be between 50 cm and 300 cm.'
    }

    if (!weight.trim()) {
      newErrors.weight = 'Weight is required.'
    } else if (isNaN(w) || w <= 0) {
      newErrors.weight = 'Enter a valid positive number.'
    } else if (w < 2 || w > 700) {
      newErrors.weight = 'Weight must be between 2 kg and 700 kg.'
    }

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    navigate('/result', { state: { height: parseFloat(height), weight: parseFloat(weight) } })
  }

  return (
    <div className="form-wrapper">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="form-card">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back
        </button>

        <div className="form-header">
          <div className="form-icon">📏</div>
          <h1>Enter Your Details</h1>
          <p>Fill in your measurements to calculate your BMI</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Height */}
          <div className={`input-group ${errors.height ? 'has-error' : ''}`}>
            <label htmlFor="height">Height</label>
            <div className="input-wrapper">
              <input
                id="height"
                type="number"
                placeholder="e.g. 175"
                value={height}
                onChange={e => { setHeight(e.target.value); setErrors(prev => ({ ...prev, height: '' })) }}
                min="1"
              />
              <span className="unit-badge">cm</span>
            </div>
            {errors.height && <p className="error-msg">⚠ {errors.height}</p>}
          </div>

          {/* Weight */}
          <div className={`input-group ${errors.weight ? 'has-error' : ''}`}>
            <label htmlFor="weight">Weight</label>
            <div className="input-wrapper">
              <input
                id="weight"
                type="number"
                placeholder="e.g. 70"
                value={weight}
                onChange={e => { setWeight(e.target.value); setErrors(prev => ({ ...prev, weight: '' })) }}
                min="1"
              />
              <span className="unit-badge">kg</span>
            </div>
            {errors.weight && <p className="error-msg">⚠ {errors.weight}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Calculate BMI
            <span className="btn-arrow">→</span>
          </button>
        </form>
      </div>
    </div>
  )
}
