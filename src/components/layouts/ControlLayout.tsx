import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const ControlLayout = (props: Props) => {
  return (
    <div className="control-container">
      <div className="control-nav-container">컨트롤 메뉴입니다.</div>
      <div className="control-map-container">
        {props.children}
      </div>
    </div>
  )
}

export default ControlLayout
