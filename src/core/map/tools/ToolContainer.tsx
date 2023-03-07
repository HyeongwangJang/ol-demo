import { Fragment, MouseEvent, useContext, useEffect, useState } from 'react'

import MapContext from 'core/contexts/MapContext'

import { Measurement } from './Measurement'

type Props = {
  useHorizontal: boolean
  useVertical: boolean
}

const ToolContainer = (props: Props) => {
  const { map } = useContext(MapContext)

  const [measurement, setMeasurement] = useState<Measurement>()

  function measurementHandler(e: MouseEvent<HTMLButtonElement>, tool: 'area' | 'distance') {
    const currentDrawType = measurement.getDrawType()
    const active = measurement.getActive()

    toggleActive(e)

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

  function toggleActive(e: MouseEvent<HTMLButtonElement>) {
    e.currentTarget.classList.toggle('active')
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
        <div className="tool-container horizontal ol-control">
          <button type="button" className='tool-button'>h</button>
          <button type="button" className='tool-button'>o</button>
          <button type="button" className='tool-button'>r</button>
          <button type="button" className='tool-button'>i</button>
          <button type="button" className='tool-button'>z</button>
          <button type="button" className='tool-button'>o</button>
          <button type="button" className='tool-button'>n</button>
          <button type="button" className='tool-button'>t</button>
          <button type="button" className='tool-button'>a</button>
          <button type="button" className='tool-button'>l</button>
        </div>
      }
      {
        props.useVertical &&
        <div className="tool-container vertical ol-control">
          <button type="button" className='tool-button' onClick={(e) => measurementHandler(e, 'area')}>
            v
          </button>
          <button type="button" className='tool-button' onClick={(e) => measurementHandler(e, 'distance')}>
            e
          </button>
          <button type="button" className='tool-button'>r</button>
          <button type="button" className='tool-button'>t</button>
          <button type="button" className='tool-button'>i</button>
          <button type="button" className='tool-button'>c</button>
          <button type="button" className='tool-button'>a</button>
          <button type="button" className='tool-button'>l</button>
        </div>
      }
    </Fragment>
  )
}
export default ToolContainer
