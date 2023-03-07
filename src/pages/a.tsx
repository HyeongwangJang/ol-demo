import { useContext, useEffect } from 'react'

import ToolContainer from '../core/map/tools/ToolContainer'
import MapContext from '../core/contexts/MapContext'
import { getLayerById } from '../core/map/map.core'

function APage() {
  const { map } = useContext(MapContext)

  function toggleLayer() {
    const vectorLayer = getLayerById(map, 'vector_layer')
    if (vectorLayer) vectorLayer.setVisible(!vectorLayer.getVisible())
  }

  function toggleCountryLayer() {
    const vectorLayer = getLayerById(map, 'country_layer')
    if (vectorLayer) vectorLayer.setVisible(!vectorLayer.getVisible())
  }

  useEffect(() => {
    console.log('component mount!!!')

    return () => {
      console.log('component Unmount!!!!!!')
    }
  }, [])

  return (
    <h1>
      이 페이지는 레이아웃이 없습니다....
    </h1>
  )
}

export default APage
