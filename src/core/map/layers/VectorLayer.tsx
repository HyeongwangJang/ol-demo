import { FC, useContext, useEffect } from "react"
import OLVectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Style } from "ol/style"

import MapContext from "../../contexts/MapContext"

type Props = {
  source: VectorSource
  style: Style
  zIndex?: number
}

const VectorLayer: FC<Props> = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext)

  useEffect(() => {
    if (!map) return
    let vectorLayer = new OLVectorLayer({
      source,
      style
    })
    map.addLayer(vectorLayer)
    vectorLayer.setZIndex(zIndex)

    return () => {
      if (map) {
        map.removeLayer(vectorLayer)
      }
    }
  }, [map])
  return null
}
export default VectorLayer;