import { Map } from 'ol'
import BaseLayer from 'ol/layer/Base'

import VectorLayer from 'ol/layer/Vector'

export function createTileLayer() {}

export function createVectorLayer(options: any, id: string, zIndex = 0) {
  const layer = new VectorLayer(options)
  layer.setZIndex(zIndex)
  layer.set('id', id)

  return layer
}

export function addLayer(map: Map, layer: BaseLayer) {
  map.addLayer(layer)
}
