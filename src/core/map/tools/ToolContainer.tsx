import { useContext, useEffect, useState } from "react"

import MapContext from "../../contexts/MapContext"
import { Measurement } from "./Measurement"

type Props = {
}

const ToolContainer = (props: Props) => {

  const { map } = useContext(MapContext)

  const [measurement, setMeasurement] = useState<Measurement>()

  function measurementHandler(tool: 'area' | 'distance') {
    const currentDrawType = measurement.getDrawType()
    const active = measurement.getActive()
    
    switch(tool) {
      case 'area':
        if(active) {
          map.removeInteraction(measurement.draw)
          if(currentDrawType !== 'Polygon') {
            measurement.addInteraction('Polygon')
          }
        } else {
          measurement.addInteraction('Polygon')
        }
        break
      case 'distance':
        if(active) {
          map.removeInteraction(measurement.draw)
          if(currentDrawType !== 'LineString') {
            measurement.addInteraction('LineString')
          }
        } else {
          measurement.addInteraction('LineString')
        }
        break
    }
  }

  useEffect(() => {
    if (!map) return
    const measurement = new Measurement(map)
    setMeasurement(measurement)
  }, [map])

  return (
    <div className="map-toolbox ol-control">
      <button type="button" onClick={() => measurementHandler('area')}>
        1
      </button>
      <button type="button" onClick={() => measurementHandler('distance')}>
        2
      </button>
      <button type="button">
        3
      </button>
    </div>
  )
}
export default ToolContainer