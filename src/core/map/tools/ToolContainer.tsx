import { Fragment, useContext, useEffect, useState } from 'react'

import MapContext from 'core/contexts/MapContext'

import { Measurement } from './Measurement'

type Props = {
  useHorizontal: boolean
  useVertical: boolean
}

const ToolContainer = (props: Props) => {
  const { map } = useContext(MapContext)

  const [measurement, setMeasurement] = useState<Measurement>()

  function measurementHandler(tool: 'area' | 'distance') {
    const currentDrawType = measurement.getDrawType()
    const active = measurement.getActive()

    switch (tool) {
      case 'area':
        if (active) {
          map.removeInteraction(measurement.draw)
          if (currentDrawType !== 'Polygon') {
            measurement.addInteraction('Polygon')
          }
        } else {
          measurement.addInteraction('Polygon')
        }
        break
      case 'distance':
        if (active) {
          map.removeInteraction(measurement.draw)
          if (currentDrawType !== 'LineString') {
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
    <Fragment>
      {
        props.useHorizontal &&
        <div className="horizontal-tool-container ol-control">
          <button type="button">h</button>
          <button type="button">o</button>
          <button type="button">r</button>
          <button type="button">i</button>
          <button type="button">z</button>
          <button type="button">o</button>
          <button type="button">n</button>
          <button type="button">t</button>
          <button type="button">a</button>
          <button type="button">l</button>
        </div>
      }
      {
        props.useVertical &&
        <div className="vertical-tool-container ol-control">
          <button type="button" onClick={() => measurementHandler('area')}>
            v
          </button>
          <button type="button" onClick={() => measurementHandler('distance')}>
            e
          </button>
          <button type="button">r</button>
          <button type="button">t</button>
          <button type="button">i</button>
          <button type="button">c</button>
          <button type="button">a</button>
          <button type="button">l</button>
        </div>
      }
    </Fragment>
  )
}
export default ToolContainer
