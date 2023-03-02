import * as ol from 'ol'
import { LineString, Polygon } from 'ol/geom'
import { getLength, getArea } from 'ol/sphere'
import Draw from 'ol/interaction/Draw'
import { unByKey } from 'ol/Observable'
import { Coordinate } from 'ol/coordinate'
import { getLayerById } from '../map.core'
import VectorLayer from 'ol/layer/Vector'
import * as interaction from 'ol/interaction'
import { Type } from 'ol/geom/Geometry'

import { Styles } from '../../../styles/ol'

export class Measurement {
  /**
   * Currently drawn feature.
   */
  sketch: ol.Feature

  /**
   * The help tooltip element.
   */
  helpTooltipElement: HTMLElement

  /**
   * Overlay to show the help messages.
   */
  helpTooltip: ol.Overlay

  /**
   * The measure tooltip element.
   */
  measureTooltipElement: HTMLElement

  /**
   * Overlay to show the measurement.
   */
  measureTooltip: ol.Overlay

  drawType: Type

  /**
   * Message to show when the user is drawing a polygon.
   */
  readonly continuePolygonMsg = 'Click to continue drawing the polygon';

  /**
   * Message to show when the user is drawing a line.
   */
  readonly continueLineMsg = 'Click to continue drawing the line';

  draw: interaction.Draw; // global so we can remove it later

  constructor(
    private map: ol.Map
  ) {}

  /**
   * @deprecated
   */
  pointerMoveHandler(evt: ol.MapBrowserEvent<any>) {
    if (evt.dragging) {
      return;
    }
    let helpMsg = '';
  
    if (this.sketch) {
      const geom = this.sketch.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = this.continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = this.continueLineMsg;
      }
    }
    
    this.helpTooltipElement.innerHTML = helpMsg;
    this.helpTooltip.setPosition(evt.coordinate);
  
    this.helpTooltipElement.classList.remove('hidden');
  }

  /**
   * Format length output.
   */
  formatLength(line: LineString) {
    const length = getLength(line);
    let output
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm'
    }
    return output
  }

  /**
   * Format area output.
   */
  formatArea(polygon: Polygon) {
    const area = getArea(polygon);
    let output
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>'
    }
    return output
  }

  addInteraction(type: 'Polygon' | 'LineString') {
    const measurementLayer = getLayerById(this.map, 'measurement_layer')
    const source = (measurementLayer as VectorLayer<any>).getSource()

    this.draw = new Draw({
      source: source,
      type: type,
      style: Styles.MEASUREMENT__DEFAULT
    })
    this.map.addInteraction(this.draw)
    this.drawType = type
  
    this.createMeasureTooltip();
    this.createHelpTooltip();
  
    let listener: any;
    this.draw.on('drawstart', (evt: any) => {
      // set sketch
      this.sketch = evt.feature

      let tooltipCoord: Coordinate | undefined = evt.coordinate

      listener = this.sketch.getGeometry().on('change', (evt) => {
        const geom = evt.target
        let output
        if (geom instanceof Polygon) {
          output = this.formatArea(geom)
          tooltipCoord = geom.getInteriorPoint().getCoordinates()
        } else if (geom instanceof LineString) {
          output = this.formatLength(geom)
          tooltipCoord = geom.getLastCoordinate()
        }
        this.measureTooltipElement.innerHTML = output
        this.measureTooltip.setPosition(tooltipCoord)
      });
    });
  
    this.draw.on('drawend', () => {
      this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static'
      this.measureTooltip.setOffset([0, -7])
      // unset sketch
      this.sketch = null
      // unset tooltip so that a new one can be created
      this.measureTooltipElement = null
      this.createMeasureTooltip()
      unByKey(listener)
    })
  }

  /**
   * Creates a new help tooltip
   */
  createHelpTooltip() {
    if (this.helpTooltipElement) {
      this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    }
    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'ol-tooltip hidden';
    this.helpTooltip = new ol.Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    });
    this.map.addOverlay(this.helpTooltip);
  }

  /**
   * Creates a new measure tooltip
   */
  createMeasureTooltip() {
    if(this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    }
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    this.measureTooltip = new ol.Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false,
    });
    this.map.addOverlay(this.measureTooltip);
  }

  getDrawType() {
    return this.drawType
  }

  getActive() {
    return this.draw ? this.draw.getActive() : false
  }

  setActive(active: boolean) {
    if(active) this.createMeasureTooltip()
    this.draw.setActive(active)
  }

}