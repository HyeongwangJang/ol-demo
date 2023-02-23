import { useContext } from 'react';
import MapContext from './core/contexts/MapContext';
import './global.css';

function App() {

  const { map } = useContext(MapContext)

  const handleZoomInClick = () => {
    map.getView().setZoom(map.getView().getZoom() + 1);
  };

  const handleZoomOutClick = () => {
      map.getView().setZoom(map.getView().getZoom() - 1);
  };

  return (
    <div className="container">
      hello world

      <div>
        <button onClick={handleZoomInClick}>zoomIn</button>
        <button onClick={handleZoomOutClick}>zoomOut</button>
        <div id="map" style={{ width: '100%', height: 400 }}></div>
      </div>
    </div>
  );
}

export default App;
