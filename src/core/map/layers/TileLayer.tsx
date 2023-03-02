import { FC, useContext, useEffect } from "react"
import OLTileLayer from "ol/layer/Tile"
import TileSource from "ol/source/Tile"

import MapContext from "../../contexts/MapContext"

type Props = {
  source: TileSource
  zIndex: number
}

const TileLayer: FC<Props> = ({ source, zIndex = 0 }) => {
  const { map } = useContext(MapContext)
  useEffect(() => {
    if (!map) return
    
    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    })
    map.addLayer(tileLayer)
    tileLayer.setZIndex(zIndex)
    return () => {
      if (map) {
        map.removeLayer(tileLayer)
      }
    }
  }, [map])
  return null
}
export default TileLayer