import { useContext, useEffect } from 'react'

import ToolContainer from 'core/map/tools/ToolContainer'
import MapContext from 'core/contexts/MapContext'

import AppLayout from 'components/layouts/AppLayout'
import ControlLayout from 'components/layouts/ControlLayout'

const ControlPage = () => {
  const { map } = useContext(MapContext)

  useEffect(() => {
    console.log('component mount!!!')

    return () => {
      console.log('component Unmount!!!!!!')
    }
  }, [])

  return (
    <AppLayout>
      <ControlLayout>
        <div id="map" style={{ width: '100%', height: '100%' }}>
          <ToolContainer useHorizontal={true} useVertical={true} />
        </div>
      </ControlLayout>
    </AppLayout>
  )
}

export default ControlPage
