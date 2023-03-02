import ToolContainer from "../core/map/tools/ToolContainer"

function BPage() {

  return (
    <div className='container'>
      <div id="map" style={{ width: '100%', height: 400, position: 'relative' }}>
        <ToolContainer />
      </div>
    </div>
  )
}

export default BPage