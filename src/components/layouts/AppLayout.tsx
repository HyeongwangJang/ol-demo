import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const AppLayout = (props: Props) => {
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
        <div className="app-nav-container">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/control">관제</Link>
            <Link to="/extra">Extra</Link>
          </nav>
        </div>

        {/* App 컨텐츠 영역 */}
        <div className="app-content-container">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default AppLayout
