import { Fill, Stroke, Style } from "ol/style"

const constants = {
  layers: {
    measurement: 'measurement_layer'
  },

  styles: {
    measurement_layer: [
    new Style({
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 0.8)',
        width: 6,
      }),
    }),
    new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: 'rgba(197, 150, 25, 0.8)',
        width: 2,
      }),
    }),
  ]
  }
}

export default constants