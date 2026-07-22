import { useState, useRef, useMemo, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'
import Spinner from '../../../components/Spinner.jsx'

const Home = () => {
    const { loading, generateReport, reports, deleteReport } = useInterview()
    const { user } = useAuth()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ minLoading, setMinLoading ] = useState(true)
    const [ loadingPhase, setLoadingPhase ] = useState(1)
    const [ isGenerating, setIsGenerating ] = useState(false)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => setMinLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [])

    const averageScore = useMemo(() => {
        if (!reports || reports.length === 0) return 0;
        const total = reports.reduce((acc, curr) => acc + (curr.matchScore || 0), 0);
        return Math.round(total / reports.length);
    }, [reports]);

    const handleGenerateReport = async () => {
        if (!jobDescription || jobDescription.trim() === '') {
            alert("Please enter a Target Job Description.");
            return;
        }

        const resumeFile = resumeInputRef.current?.files[ 0 ]
        if (!resumeFile && (!selfDescription || selfDescription.trim() === '')) {
            alert("Please provide either a Resume or a Quick Self-Description.");
            return;
        }

        setIsGenerating(true)
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        setIsGenerating(false)
        if (data && data._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if (isGenerating) {
        return (
            <main className="loading-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-color)', position: 'relative' }}>
                <h1 className="login-splash-text" style={{ animation: 'phase2Anim 1.5s infinite ease-in-out' }}>
                    GENERATING YOUR<br/>INFORMATION...
                </h1>
            </main>
        )
    }

    if ((loading || minLoading) && !isGenerating) {
        return (
            <main className="loading-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-color)', position: 'relative' }}>
                
                {loadingPhase === 1 && (
                    <h1 className="login-splash-text" style={{ animation: 'phase1Anim 1.5s ease-in-out forwards' }}>
                        WELCOME {user?.username?.toUpperCase() || ''}
                    </h1>
                )}

                <style>{`
                    @keyframes phase1Anim {
                        0% { opacity: 0; transform: translateY(20px); }
                        20% { opacity: 1; transform: translateY(0); }
                        80% { opacity: 1; transform: translateY(0); }
                        100% { opacity: 0; transform: translateY(-20px); }
                    }
                    @keyframes phase2Anim {
                        0% { opacity: 0; transform: translateY(20px); }
                        20% { opacity: 1; transform: translateY(0); }
                        80% { opacity: 1; transform: translateY(0); }
                        100% { opacity: 0; transform: translateY(-20px); }
                    }
                `}</style>
            </main>
        )
    }

    return (
        <div className='dashboard-page'>
            <header className="dashboard-header">
                <h1>Overview</h1>
            </header>

            <div className='dashboard-grid'>
                {/* Banner Card */}
                <div className='glass-card banner-card'>
                    <div className="banner-content">
                        <span className="badge">Recommendation</span>
                        <h2>Interview insight</h2>
                        <p>You have generated {reports.length} custom plans.<br/>Keep preparing to ace your next role.</p>
                    </div>
                    <div className="banner-graphics">
                        <div className="mock-window">
                            <div className="mock-line"></div>
                            <div className="mock-line short"></div>
                        </div>
                        <div className="mock-code">
                            <div className="mock-line"></div>
                            <div className="mock-line"></div>
                            <div className="mock-line"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className='glass-card stats-card'>
                    <div className="stats-header">
                        <h3>Performance Snapshot</h3>
                        <span className="live-badge">Live • Updated now</span>
                    </div>
                    
                    <div className="stat-ring-container">
                        <div className="stat-ring" style={{ '--score': `${averageScore}%` }}>
                            <div className="ring-inner">
                                <span className="score">{averageScore}</span>
                                <span className="label">Avg Match</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-details">
                        <div className="stat-item">
                            <div className="stat-icon">📄</div>
                            <div className="stat-text">
                                <span className="stat-label">Total Plans</span>
                                <span className="stat-value">{reports.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Generate Card */}
                <div className='glass-card generate-card'>
                    <h3>Create New Plan</h3>
                    <div className="generate-form">
                        <div className="input-group">
                            <label>Target Job Description</label>
                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job description here..."
                            />
                        </div>
                        
                        <div className="form-row">
                            <div className="input-group">
                                <label>Upload Resume</label>
                                <input ref={resumeInputRef} type='file' accept='.pdf,.docx' className="file-input" />
                            </div>
                            <div className="divider">OR</div>
                            <div className="input-group">
                                <label>Quick Self-Description</label>
                                <input
                                    type="text"
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    placeholder="e.g. Senior React Developer with 5 YOE..."
                                />
                            </div>
                        </div>

                        <button onClick={handleGenerateReport} className='button primary-button full-width'>
                            Generate AI Strategy
                        </button>
                    </div>
                </div>

                {/* Recent Plans Card */}
                <div className='glass-card list-card'>
                    <div className="list-header">
                        <h3>Recent Plans</h3>
                        <span className="view-all">View All</span>
                    </div>
                    <ul className='reports-list'>
                        {reports.slice(0, 4).map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <div className="report-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                </div>
                                <div className="report-info">
                                    <h4>{report.title || 'Untitled Position'}</h4>
                                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="report-score">
                                    {report.matchScore}%
                                </div>
                                <button 
                                    className="delete-plan-btn" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm("Are you sure you want to delete this plan?")) {
                                            deleteReport(report._id);
                                        }
                                    }}
                                    title="Delete Plan"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </li>
                        ))}
                        {reports.length === 0 && (
                            <li className="empty-state">No plans generated yet. Create one above!</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home