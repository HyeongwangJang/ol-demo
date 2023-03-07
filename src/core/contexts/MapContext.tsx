import { createContext, ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Feature, Map, View } from 'ol'
import { defaults as defaultControls, FullScreen } from 'ol/control'
import { Tile } from 'ol/layer'
import { OSM, Vector, VectorTile } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Fill, Stroke, Style } from 'ol/style'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/layer/VectorTile'
import MVT from 'ol/format/MVT.js';
import { createXYZ } from 'ol/tilegrid'

import 'ol/ol.css'
import { Styles } from '../../styles/ol'
import { addLayer, createVectorLayer } from '../map/layers/layer.core'

import bar from '../../data/countries.json'
import constants from 'core/constants'

type MapProviderProps = {
  children: ReactNode
}

export type MapObj = {
  map: Map
}

const MapContext = createContext<MapObj>({} as MapObj)

export const MapConsumer = MapContext.Consumer
export const MapProvider = (props: MapProviderProps) => {
  const location = useLocation()

  const [mapObj, setMapObj] = useState<MapObj>({} as MapObj)

  function _initMap() {
    const map = new Map({
      controls: defaultControls({ rotate: false }).extend([new FullScreen()]),
      layers: [
        // new Tile({
        //   source: new OSM(),
        // }),
      ],
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([127.9745613, 37.3236563], 'EPSG:3857'),
        zoom: 5,
      }),
    })

    return map
  }

  function _initMeasurementLayer(map: Map) {
    const vectorSource = new Vector({
      features: [],
      wrapX: false,
    })
    const options = {
      source: vectorSource,
      style: Styles.MEASUREMENT__DEFAULT,
    }

    const layer = createVectorLayer(options, constants.layers.measurement, 1)
    addLayer(map, layer)
  }

  function _initBase(map: Map) {
    const layer = new VectorTileLayer({
      source: new VectorTile({
        tileGrid: createXYZ({ maxZoom: 19 }),
        format: new MVT(),
        url: 'http://192.168.0.81:8080/geoserver/gwc/service/tms/1.0.0/testGeoserver:BASE_SIGJ_AS' +
             '@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
      })
    })

    layer.set('id', 'base_layer')

    addLayer(map, layer)
  }
  function _initGas(map: Map) {
    const layer = new VectorTileLayer({
      source: new VectorTile({
        tileGrid: createXYZ({ maxZoom: 19 }),
        format: new MVT(),
        url: 'http://192.168.0.81:8080/geoserver/gwc/service/tms/1.0.0/testGeoserver:GAS_GAPI_LS' +
             '@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
      })
    })

    layer.set('id', 'gas_layer')

    addLayer(map, layer)
  }

  useEffect(() => {
    if (!document.querySelector('#map')) return

    const map = _initMap()
    _initMeasurementLayer(map)
    _initBase(map)
    _initGas(map)

    setMapObj({
      map,
    })

    return () => map.setTarget(undefined)
  }, [location])

  return (
    <MapContext.Provider value={mapObj}>{props.children}</MapContext.Provider>
  )
}

export default MapContext
