import { useState } from 'react';
import { FileText, Sparkles, Tag, Building2, Users, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import './Analyze.css';

const Analyze = () => {
  const [formData, setFormData] = useState({
    headline: '',
    short_description: '',
    authors: '',
    date: ''
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(API_ENDPOINTS.analyze, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setResults(data);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to API. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.headline.trim() && formData.short_description.trim();

  return (
    <div className="analyze-page">
      <div className="analyze-container">
        <div className="analyze-header">
          <h1 className="analyze-title">Analyze News Article</h1>
          <p className="analyze-subtitle">
            Enter article details to extract AI-powered insights including category, entities, and intelligent summary
          </p>
        </div>

        <div className="analyze-content">
          <div className="input-section">
            <h2 className="section-title">
              <div className="section-icon">
                <FileText size={18} />
              </div>
              Article Details
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="headline">
                  Headline <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="headline"
                  name="headline"
                  className="form-input"
                  placeholder="Enter article headline..."
                  value={formData.headline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="short_description">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  id="short_description"
                  name="short_description"
                  className="form-textarea"
                  placeholder="Enter article description or summary..."
                  value={formData.short_description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="authors">
                  Author(s)
                </label>
                <input
                  type="text"
                  id="authors"
                  name="authors"
                  className="form-input"
                  placeholder="Author name(s)..."
                  value={formData.authors}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="date">
                  Date
                </label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  className="form-input"
                  placeholder="Publication date (e.g., 2024-01-15)..."
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <button 
                type="submit" 
                className="analyze-button" 
                disabled={loading || !isFormValid}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Analyze Article
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="results-section">
            <h2 className="section-title">
              <div className="section-icon">
                <Sparkles size={18} />
              </div>
              Analysis Results
            </h2>

            {error && (
              <div className="error-message">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {!results && !error && (
              <div className="results-placeholder">
                <div className="placeholder-icon">
                  <Sparkles size={40} />
                </div>
                <p className="placeholder-text">
                  Fill in the article details and click "Analyze Article" to see AI-powered insights
                </p>
              </div>
            )}

            {results && results.success && (
              <div className="results-content">
                <div className="result-card">
                  <div className="result-card-title">
                    <Tag className="result-card-icon" size={16} />
                    Category
                  </div>
                  <div className="category-badge">
                    <CheckCircle size={18} />
                    {results.data.category}
                  </div>
                  <div className="confidence-bar">
                    <div className="confidence-label">
                      <span>Confidence</span>
                      <span>{Math.round(results.data.confidence * 100)}%</span>
                    </div>
                    <div className="confidence-track">
                      <div 
                        className="confidence-fill" 
                        style={{ width: `${results.data.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="result-card">
                  <div className="result-card-title">
                    <FileText className="result-card-icon" size={16} />
                    Summary
                  </div>
                  <p className="result-value">{results.data.summary}</p>
                </div>

                <div className="result-card">
                  <div className="result-card-title">
                    <Users className="result-card-icon" size={16} />
                    Entities
                  </div>
                  <div className="entities-grid">
                    <div className="entity-group">
                      <div className="entity-group-title">People</div>
                      {results.data.entities.people.length > 0 ? (
                        <div className="entity-tags">
                          {results.data.entities.people.map((person, i) => (
                            <span key={i} className="entity-tag">{person}</span>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-state">No people detected</div>
                      )}
                    </div>

                    <div className="entity-group">
                      <div className="entity-group-title">Organizations</div>
                      {results.data.entities.organizations.length > 0 ? (
                        <div className="entity-tags">
                          {results.data.entities.organizations.map((org, i) => (
                            <span key={i} className="entity-tag">{org}</span>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-state">No organizations detected</div>
                      )}
                    </div>

                    <div className="entity-group">
                      <div className="entity-group-title">Locations</div>
                      {results.data.entities.locations.length > 0 ? (
                        <div className="entity-tags">
                          {results.data.entities.locations.map((loc, i) => (
                            <span key={i} className="entity-tag">{loc}</span>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-state">No locations detected</div>
                      )}
                    </div>
                  </div>
                </div>

                {results.data.key_dates && results.data.key_dates.length > 0 && (
                  <div className="result-card">
                    <div className="result-card-title">
                      <Calendar className="result-card-icon" size={16} />
                      Key Dates
                    </div>
                    <div className="entity-tags">
                      {results.data.key_dates.map((date, i) => (
                        <span key={i} className="entity-tag">{date}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="result-card">
                  <div className="result-card-title">
                    <Building2 className="result-card-icon" size={16} />
                    Analysis Provider
                  </div>
                  <div className="provider-badge">
                    <div className="provider-dot"></div>
                    {results.provider.toUpperCase()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
