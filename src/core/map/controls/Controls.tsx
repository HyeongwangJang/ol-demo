import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Controls = (props: Props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Controls