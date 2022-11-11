import {useEffect} from 'react'

const useOnScreenKeyboardScrollFix = () => {
  const hasWindow = typeof window !== 'undefined';

  useEffect(() => {
    const handleScroll = () => {
      hasWindow && window.scrollTo(0, 0)
    }

    hasWindow && window.addEventListener('scroll', handleScroll)

    return () => {
      hasWindow && window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}

export default useOnScreenKeyboardScrollFix