import { Style, Stroke, Fill, Circle, Icon } from 'ol/style';

export class Styles {
  /**
   * 측정 기본 스타일
   */
  static MEASUREMENT__DEFAULT = [
    new Style({
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 0.8)',
        width: 6
      })
    }),
    new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: 'rgba(197, 150, 25, 0.8)',
        width: 2
      })
    })
  ]

  static POLYGON__DEFAULT = new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  })

}