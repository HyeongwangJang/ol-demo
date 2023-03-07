import { createContext, ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Feature, Map, View } from 'ol'
import { defaults as defaultControls, FullScreen } from 'ol/control'
import { Tile } from 'ol/layer'
import { OSM, Vector } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Fill, Stroke, Style } from 'ol/style'

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
        new Tile({
          source: new OSM(),
        }),
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

  function _initVectorLayer(map: Map) {
    const style = new Style({
      fill: new Fill({
        color: '#eeeeee',
      }),
    })
    const vectorSource = new VectorSource({
      url: 'https://openlayers.org/data/vector/ecoregions.json',
      format: new GeoJSON(),
    })
    const options = {
      background: '#1a2b39',
      source: vectorSource,
      style: (feature: Feature) => {
        const color = feature.get('COLOR') || '#eeeeee'
        style.getFill().setColor(color)
        return style
      },
    }

    const layer = createVectorLayer(options, 'vector_layer')
    addLayer(map, layer)
  }

  function _initCountryLayer(map: Map) {
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(bar, {
        featureProjection: 'EPSG:3857',
      }),
    })

    const options = {
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: '#fff',
        }),
        stroke: new Stroke({
          color: '#2d2d2d',
          width: 3,
        }),
      }),
    }
    const vectorLayer = createVectorLayer(options, 'country_layer', 10)
    addLayer(map, vectorLayer)
  }

  useEffect(() => {
    if (!document.querySelector('#map')) return

    const map = _initMap()
    _initMeasurementLayer(map)
    // _initVectorLayer(map)
    // _initCountryLayer(map)

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
