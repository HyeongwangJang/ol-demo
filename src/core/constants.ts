import { Stroke, Style } from "ol/style"

const constants = {
  layers: {
    measurement: 'measurement_layer'
  },

  styles: {
    tt: new Style({
      stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    })
  }
}

export default constants