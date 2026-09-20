import './AIPipeline.css';

const AIPipeline = () => {
  return (
    <section className="ai-pipeline">
      <div className="ai-pipeline-container">
        <div className="section-header">
          <span className="section-label">Architecture</span>
          <h2 className="section-title">AI Analysis Pipeline</h2>
          <p className="section-description">
            Multi-stage processing that transforms raw articles into structured intelligence
          </p>
        </div>

        <div className="pipeline-flow">
          <div className="pipeline-stage">
            <div className="stage-header">
              <div className="stage-number">1</div>
              <h3 className="stage-title">Article Input</h3>
            </div>
            <div className="stage-content">
              <div className="stage-visual article-visual">
                <div className="article-preview">
                  <div className="article-line long"></div>
                  <div className="article-line"></div>
                  <div className="article-line medium"></div>
                  <div className="article-line long"></div>
                  <div className="article-line"></div>
                  <div className="article-line medium"></div>
                </div>
              </div>
              <p className="stage-description">Raw news article text from URL or manual input</p>
            </div>
          </div>

          <div className="pipeline-connector">→</div>

          <div className="pipeline-stage">
            <div className="stage-header">
              <div className="stage-number">2</div>
              <h3 className="stage-title">Text Processing</h3>
            </div>
            <div className="stage-content">
              <div className="stage-visual processing-visual">
                <div className="processing-bars">
                  <div className="bar" style={{ width: '80%' }}></div>
                  <div className="bar" style={{ width: '60%' }}></div>
                  <div className="bar" style={{ width: '90%' }}></div>
                  <div className="bar" style={{ width: '70%' }}></div>
                </div>
              </div>
              <p className="stage-description">Tokenization, parsing, and feature extraction</p>
            </div>
          </div>

          <div className="pipeline-connector">→</div>

          <div className="pipeline-stage">
            <div className="stage-header">
              <div className="stage-number">3</div>
              <h3 className="stage-title">AI Understanding</h3>
            </div>
            <div className="stage-content">
              <div className="stage-visual ai-visual">
                <div className="neural-network">
                  <div className="node"></div>
                  <div className="node"></div>
                  <div className="node"></div>
                  <div className="node center"></div>
                  <div className="node"></div>
                  <div className="node"></div>
                  <div className="node"></div>
                </div>
              </div>
              <p className="stage-description">LLM inference and NLP model analysis</p>
            </div>
          </div>

          <div className="pipeline-connector">→</div>

          <div className="pipeline-stage">
            <div className="stage-header">
              <div className="stage-number">4</div>
              <h3 className="stage-title">Classification</h3>
            </div>
            <div className="stage-content">
              <div className="stage-visual analysis-visual">
                <div className="analysis-items">
                  <div className="analysis-item">
                    <div className="item-label">Category</div>
                    <div className="item-bar" style={{ width: '85%' }}></div>
                  </div>
                  <div className="analysis-item">
                    <div className="item-label">Sentiment</div>
                    <div className="item-bar" style={{ width: '70%' }}></div>
                  </div>
                  <div className="analysis-item">
                    <div className="item-label">Entities</div>
                    <div className="item-bar" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
              <p className="stage-description">Multi-dimensional categorization and scoring</p>
            </div>
          </div>

          <div className="pipeline-connector">→</div>

          <div className="pipeline-stage">
            <div className="stage-header">
              <div className="stage-number">5</div>
              <h3 className="stage-title">Structured Insights</h3>
            </div>
            <div className="stage-content">
              <div className="stage-visual insights-visual">
                <div className="insight-card">
                  <div className="insight-icon">✓</div>
                  <div className="insight-text">
                    <div className="insight-line short"></div>
                    <div className="insight-line"></div>
                  </div>
                </div>
              </div>
              <p className="stage-description">JSON output with complete analysis results</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPipeline;
