import { Map } from 'ol'
import { Control } from 'ol/control'

export function createControl() {}

export function addControl(map: Map, control: Control) {
  map.addControl(control)
}
