import { useContext, useEffect } from "react";

import ToolContainer from "../core/map/tools/ToolContainer"
import MapContext from "../core/contexts/MapContext";
import { getLayerById } from "../core/map/map.core";



function APage() {
  const { map } = useContext(MapContext)

  function toggleLayer() {
    const vectorLayer = getLayerById(map, 'vector_layer')
    if(vectorLayer) vectorLayer.setVisible(!vectorLayer.getVisible())
  }

  function toggleCountryLayer() {
    const vectorLayer = getLayerById(map, 'country_layer')
    if(vectorLayer) vectorLayer.setVisible(!vectorLayer.getVisible())
  }

  useEffect(() => {
    console.log('component mount!!!');
    
    return () => {
      console.log('component Unmount!!!!!!');
    }
  }, [])

  return (
    <div className='container'>
      <div id="map" style={{ width: '100%', height: 400, position: 'relative' }}>
        <ToolContainer />
      </div>

      <div>
        <button onClick={toggleLayer}>벡터 토글</button>
        <button onClick={toggleCountryLayer}>컨트리 토글</button>
      </div>
    </div>
  )
}

export default APage