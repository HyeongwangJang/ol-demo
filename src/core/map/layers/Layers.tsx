import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Layers = (props: Props) => {
  return <div>{props.children}</div>
}
export default Layers