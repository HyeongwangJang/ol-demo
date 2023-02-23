import { createContext, ReactNode, useEffect, useState } from "react";

import { Map, View } from 'ol'
import { defaults, Attribution } from 'ol/control'
import { Tile } from 'ol/layer'
import { OSM } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import 'ol/ol.css'

type MapProviderProps = {
  children: ReactNode
}

export type MapObj = {
  map: Map,
}

const MapContext = createContext<MapObj>({} as MapObj)

export const MapConsumer = MapContext.Consumer
export const MapProvider = (props: MapProviderProps) => {

  const [mapObj, setMapObj] = useState<MapObj>({} as MapObj)

  useEffect(() => {
    const map = new Map({
      controls: defaults({ zoom: false, rotate: false }).extend([]),
      layers: [
        new Tile({
          source: new OSM(),
        })
      ],
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([127.9745613, 37.3236563], 'EPSG:3857'),
        zoom: 15,
      })
    })

    setMapObj({
      map
    })

    return () => map.setTarget(undefined)
  }, [])

  return (
    <MapContext.Provider value={mapObj}>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContext