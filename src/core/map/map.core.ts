import { Map } from 'ol'
import { Group } from 'ol/layer'
import BaseLayer from 'ol/layer/Base'

export function getLayerById(map: Map, layerId: string) {
  let result: BaseLayer

  map.getLayers().forEach((layer) => {
    if (layer.get('id') === layerId) {
      result = layer
    } else if (layer instanceof Group) {
      const childLayers = layer.getLayers()
      childLayers.forEach((childLayer) => {
        if (childLayer.get('id') === layerId) {
          result = childLayer
        }
      })
    }
  })

  return result
}
