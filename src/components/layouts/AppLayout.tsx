import { ReactNode, useRef } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const AppLayout = (props: Props) => {
  const navContainerRef = useRef<HTMLDivElement>()
  const contentContainerRef = useRef<HTMLDivElement>()

  function navHandler() {
    navContainerRef.current.classList.toggle('nav--closed')
    contentContainerRef.current.classList.toggle('nav--closed')
  }

  return (
    <div className="app-container">
      {/* App 헤더 */}
      <div className='app-top app-header-container'>
        <div className="left">
          <h1 className='logo'>LOGO</h1>
          <h2>Extra header menu</h2>
        </div>
        <div className="right">
          <span>
            admin
          </span>
        </div>
      </div>

      <div className='app-bottom'>
        {/* App 사이드바 */}
        <div className="app-nav-container" ref={navContainerRef}>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/control">관제</Link>
            <Link to="/extra">Extra</Link>
          </nav>

          <div className='close-button' onClick={navHandler}>Close</div>
        </div>

        {/* App 컨텐츠 영역 */}
        <div className="app-content-container" ref={contentContainerRef}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default AppLayout
