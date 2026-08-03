import { useEffect, useState } from 'react'
import './App.css'
import { CHANNEL_INFO } from './data/channel'
import { VIDEO_CATEGORIES, VIDEOS } from './data/videos'

function thumb(id, size = 'maxresdefault') {
  return `https://i.ytimg.com/vi/${id}/${size}.jpg`
}

const FALLBACK_THUMB = 'https://via.placeholder.com/480x270/f3ede3/c96f4a?text=Liu%E9%98%BF%E6%A6%AE%E5%93%88'

function videoUrl(id, isShort) {
  return isShort
    ? `https://www.youtube.com/shorts/${id}`
    : `https://www.youtube.com/watch?v=${id}`
}

function Header({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)')
    const handler = (e) => { if (e.matches) setMenuOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a
          href={CHANNEL_INFO.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="logo"
          aria-label="前往 YouTube 頻道"
          onClick={() => setMenuOpen(false)}
        >
          <div className="logo-avatar" style={{ backgroundImage: `url(${CHANNEL_INFO.avatarUrl})` }} />
          <div className="logo-text">
            <span className="logo-name">{CHANNEL_INFO.name}</span>
            <span className="logo-handle">{CHANNEL_INFO.handle}</span>
          </div>
        </a>
        <nav className={`nav ${menuOpen ? 'active' : ''}`} aria-label="主要導覽">
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home') }}>首頁</a></li>
            <li><a href="#themes" onClick={(e) => { e.preventDefault(); scrollTo('themes') }}>頻道主題</a></li>
            <li><a href="#videos" onClick={(e) => { e.preventDefault(); scrollTo('videos') }}>精選影片</a></li>
            <li><a href="#story" onClick={(e) => { e.preventDefault(); scrollTo('story') }}>頻道故事</a></li>
            <li>
              <a
                href={CHANNEL_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fa-brands fa-youtube" /> 訂閱頻道
              </a>
            </li>
          </ul>
        </nav>
        <div
          className={`nav-backdrop ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '關閉選單' : '開啟選單'}
          aria-expanded={menuOpen}
        >
          <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  const progress = Math.min((CHANNEL_INFO.subscribers / CHANNEL_INFO.subscriberGoal) * 100, 100)

  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="hero-badge">
            <i className="fa-brands fa-youtube" /> YouTube 創作者・18 年教育生涯
          </span>
          <h1 className="hero-title">{CHANNEL_INFO.name}</h1>
          <p className="hero-handle">{CHANNEL_INFO.handle}</p>
          <p className="hero-tagline">{CHANNEL_INFO.tagline}</p>
          <p className="hero-description">{CHANNEL_INFO.description}</p>
          <div className="hero-actions">
            <a
              href={CHANNEL_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <i className="fa-brands fa-youtube" /> 前往訂閱頻道
            </a>
            <a
              href="#videos"
              className="btn btn-secondary btn-lg"
              onClick={(e) => { e.preventDefault(); document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <i className="fa-solid fa-play" /> 觀看精選影片
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{CHANNEL_INFO.subscribers.toLocaleString()}</span>
              <span className="stat-label">訂閱者</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{CHANNEL_INFO.videos}</span>
              <span className="stat-label">部影片</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{CHANNEL_INFO.years}</span>
              <span className="stat-label">年經營</span>
            </div>
          </div>
        </div>
        <div className="hero-side">
          <div className="hero-avatar" style={{ backgroundImage: `url(${CHANNEL_INFO.avatarUrl})` }} aria-hidden="true" />
          <div className="goal-card">
            <div className="goal-head">
              <span className="goal-label"><i className="fa-solid fa-bullseye" /> 1000 訂閱里程碑</span>
              <span className="goal-value">{CHANNEL_INFO.subscribers} / {CHANNEL_INFO.subscriberGoal}</span>
            </div>
            <div className="goal-bar">
              <div className="goal-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="goal-note">
              破 1000 訂閱，阿榮老師說要做一件「突破的事」！
            </p>
          </div>
        </div>
      </div>
      <div className="hero-wave" aria-hidden="true" />
    </section>
  )
}

function Themes() {
  return (
    <section id="themes" className="section themes-section">
      <div className="container">
        <header className="section-header">
          <span className="section-eyebrow">頻道主題</span>
          <h2 className="section-title">四個生活主軸</h2>
          <p className="section-subtitle">頻道裡最常出現的風景，都是最真實的日常</p>
        </header>
        <div className="themes-grid">
          {CHANNEL_INFO.themes.map((theme, i) => (
            <article key={theme.id} className="theme-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="theme-icon"><i className={theme.icon} /></div>
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
              <blockquote className="theme-quote">「{theme.tag}」</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoWall() {
  const [category, setCategory] = useState('全部')
  const [visible, setVisible] = useState(8)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const filtered = category === '全部'
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === category)
  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  return (
    <section id="videos" className="section videos-section">
      <div className="container">
        <header className="section-header">
          <span className="section-eyebrow">精選影片</span>
          <h2 className="section-title">真實的每一支影片</h2>
          <p className="section-subtitle">從頻道中挑選的 16 支代表作品，點擊即可前往 YouTube 觀看</p>
        </header>
        <div className="category-filters" role="tablist" aria-label="影片分類篩選">
          {VIDEO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={category === cat}
              className={`filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => { setCategory(cat); setVisible(8) }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="videos-grid">
          {shown.map((video, i) => (
            <a
              key={video.id}
              href={videoUrl(video.id, video.isShort)}
              target="_blank"
              rel="noopener noreferrer"
              className="video-card animate-in"
              style={{ animationDelay: `${(i % 8) * 0.06}s` }}
            >
              <div className="video-thumbnail">
                <img
                  src={thumb(video.id, isMobile ? 'hqdefault' : 'maxresdefault')}
                  alt={`影片縮圖：${video.title}`}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget
                    if (img.src.includes('/maxresdefault')) {
                      img.src = thumb(video.id, 'hqdefault')
                    } else if (img.src.includes('/hqdefault')) {
                      img.src = FALLBACK_THUMB
                    }
                  }}
                />
                <span className={`video-duration ${video.isShort ? 'short' : ''}`}>
                  {video.isShort ? <><i className="fa-solid fa-bolt" /> Shorts</> : video.duration}
                </span>
                <span className="video-category-tag">{video.category}</span>
                <div className="video-overlay">
                  <span className="play-btn"><i className="fa-solid fa-play" /></span>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
                <div className="video-meta">
                  <span><i className="fa-solid fa-eye" /> {video.views.toLocaleString()} 觀看</span>
                  <span><i className="fa-regular fa-clock" /> {video.publishedAt}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        {hasMore && (
          <div className="load-more-wrapper">
            <button className="btn btn-outline" onClick={() => setVisible((prev) => prev + 8)}>
              載入更多影片 <i className="fa-solid fa-chevron-down" />
            </button>
          </div>
        )}
        <div className="section-cta">
          <a href={`${CHANNEL_INFO.youtubeUrl}/videos`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <i className="fa-brands fa-youtube" /> 前往頻道查看全部 {CHANNEL_INFO.videos}+ 支影片
          </a>
        </div>
      </div>
    </section>
  )
}

function StoryTimeline() {
  return (
    <section id="story" className="section story-section">
      <div className="container">
        <header className="section-header">
          <span className="section-eyebrow">頻道故事</span>
          <h2 className="section-title">從 2008 走到 1000 的旅程</h2>
          <p className="section-subtitle">整理自阿榮老師在頻道上的貼文與分享</p>
        </header>
        <div className="story-grid">
          <div className="quotes">
            {CHANNEL_INFO.quotes.map((quote, i) => (
              <blockquote key={i} className="quote-card animate-in" style={{ animationDelay: `${i * 0.12}s` }}>
                <i className="fa-solid fa-quote-left" />
                <p>{quote.text}</p>
                <footer>— {quote.source}</footer>
              </blockquote>
            ))}
          </div>
          <div className="timeline">
            {CHANNEL_INFO.timeline.map((item, i) => (
              <div key={i} className={`timeline-item ${i === CHANNEL_INFO.timeline.length - 1 ? 'active' : ''}`}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const progress = Math.min((CHANNEL_INFO.subscribers / CHANNEL_INFO.subscriberGoal) * 100, 100)
  const remaining = CHANNEL_INFO.subscriberGoal - CHANNEL_INFO.subscribers

  return (
    <section id="cta" className="section cta-section">
      <div className="container cta-inner">
        <div className="cta-emoji" aria-hidden="true">🎉</div>
        <h2 className="cta-title">一起見證 1000 訂閱的時刻</h2>
        <p className="cta-description">
          還差 <strong>{remaining}</strong> 位訂閱者，就能迎接阿榮老師的「突破的事」。
          每一個訂閱，都是 18 年創作路上最溫暖的肯定。
        </p>
        <div className="cta-progress">
          <div className="cta-progress-head">
            <span>{CHANNEL_INFO.subscribers} 位訂閱者</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="cta-progress-bar">
            <div className="cta-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="cta-progress-scale">
            <span>0</span>
            <span>500</span>
            <span>{CHANNEL_INFO.subscriberGoal}</span>
          </div>
        </div>
        <div className="cta-actions">
          <a href={CHANNEL_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xl">
            <i className="fa-brands fa-youtube" /> 立即訂閱，一起衝破 1000
          </a>
        </div>
        <p className="cta-note">
          <i className="fa-solid fa-shield-heart" /> 訂閱是免費的，卻能給創作者最大的動力
        </p>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href={CHANNEL_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer" className="footer-logo">
              <div className="footer-avatar" style={{ backgroundImage: `url(${CHANNEL_INFO.avatarUrl})` }} />
              <span>{CHANNEL_INFO.name}</span>
            </a>
            <p className="footer-desc">{CHANNEL_INFO.tagline}：教育・家庭・信仰・音樂</p>
            <p className="footer-tagline">有夢最美，希望相隨。</p>
            <div className="footer-social">
              <a href={CHANNEL_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube 頻道">
                <i className="fa-brands fa-youtube" />
              </a>
            </div>
          </div>
          <div className="footer-links">
            <h4>快速連結</h4>
            <ul>
              <li><a href="#themes" onClick={(e) => { e.preventDefault(); document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth' }) }}>頻道主題</a></li>
              <li><a href="#videos" onClick={(e) => { e.preventDefault(); document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' }) }}>精選影片</a></li>
              <li><a href="#story" onClick={(e) => { e.preventDefault(); document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }) }}>頻道故事</a></li>
              <li><a href="#cta" onClick={(e) => { e.preventDefault(); document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }) }}>訂閱里程碑</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>頻道資訊</h4>
            <ul>
              <li><i className="fa-solid fa-user" /> 創作者：Liu阿榮哈</li>
              <li><i className="fa-solid fa-calendar" /> 成立：2008 年 3 月</li>
              <li><i className="fa-solid fa-video" /> 影片：{CHANNEL_INFO.videos}+ 支</li>
              <li><i className="fa-solid fa-users" /> 訂閱：{CHANNEL_INFO.subscribers}+ 人</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {year} {CHANNEL_INFO.name}. 保留所有權利。</p>
          <p className="footer-note">粉絲製作的非官方展示頁面・數據擷取自 YouTube 公開資訊</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      document.body.classList.toggle('scrolled-page', window.scrollY > 400)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.body.classList.remove('scrolled-page')
    }
  }, [])

  return (
    <>
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <Themes />
        <VideoWall />
        <StoryTimeline />
        <CTASection />
      </main>
      <Footer />
      <a href="#home" className="scroll-top" aria-label="回到頂部" title="回到頂部">
        <i className="fa-solid fa-arrow-up" />
      </a>
    </>
  )
}

export default App
