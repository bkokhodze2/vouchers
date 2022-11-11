import {useCallback, useEffect, useState} from 'react'

const useDocumentHeight = () => {
  const hasWindow = typeof window !== 'undefined';

  const getHeight = useCallback(
      () => hasWindow && window.visualViewport ? window.visualViewport.height : hasWindow && window.innerHeight,
      [],
  )
  // @ts-ignore
  const [height, setHeight] = useState<number>(getHeight())


  useEffect(() => {
    const handleResize = (e: Event) => {
      // @ts-ignore
      setHeight(getHeight())
    }

    hasWindow && window.addEventListener('resize', handleResize)
    // From the top of my head this used to be required for older browsers since
    // this didn't trigger a resize event. Keeping it in to be safe.
    hasWindow && window.addEventListener('orientationchange', handleResize)
    // This is needed on iOS to resize the viewport when the Virtual/OnScreen
    // Keyboard opens. This does not trigger any other event, or the standard
    // resize event.
    hasWindow && window.visualViewport?.addEventListener('resize', handleResize)

    return () => {
      hasWindow && window.removeEventListener('resize', handleResize)
      hasWindow && window.removeEventListener('orientationchange', handleResize)
      hasWindow && window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [getHeight])

  return height

}

export default useDocumentHeight