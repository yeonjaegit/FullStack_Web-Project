import { useEffect, useRef, useState } from 'react'
import './VerticalCarousel.css'
import Footer from './Footer'

const VerticalCarousel = ({ arrayAd, windowSize }) => {
  const [pos, setPos] = useState(0)
  const [showLastItem, setShowLastItem]=useState(false)
  const [lastItemHeight, setLastItemHeight] = useState(0)
  const containerRef = useRef()
  const isAnimating = useRef(false)
  const n_items = arrayAd.length
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(${-(pos * windowSize.height)}px)`
    }
  }, [pos, windowSize.height])
  
  useEffect(() => {
    console.log(n_items, "n_items")
    console.log(pos, showLastItem)
    const handleWheel = (e) => {
      if (isAnimating.current) {
        return;
      }
      isAnimating.current = true

      if (e.deltaY > 0) {
        if (!showLastItem && pos==n_items-1){
          setShowLastItem(true)
          containerRef.current.style.transform = `translateY(${-(pos * windowSize.height)-lastItemHeight}px)`
        } else{
          setPos(prevPos => Math.min(n_items - 1, prevPos + 1))
        }
      } else {
        //고장....
        if (showLastItem && pos===n_items-1){
          setShowLastItem(false)
          containerRef.current.style.transform = `translateY(${-(pos * windowSize.height)}px)`
        } else{
          setPos(prevPos => Math.max(0, prevPos - 1))
        }
      }

      setTimeout(() => {
        isAnimating.current = false
      }, 500)
    }

    window.addEventListener('wheel', handleWheel)

    return () => {
      window.removeEventListener('wheel', handleWheel)
    };
  }, [n_items, pos]);

  const lastItemStyle={
    
  }

  return (
    <div className='VerticalCarousel' style={{zIndex:10}}>
      <div className='wrapper'>
        <div className='_container' ref={containerRef} style={{ height: `${n_items * 100+lastItemHeight}%`}}>
          {
            arrayAd.map((data, i) => (
              <div className='_card' key={i} style={{backgroundImage:`url(${import.meta.env.BASE_URL}${data.src}`}}>
              </div>
            ))
          }
          <div className="lastItem" style={lastItemStyle}>
            <Footer setLastItemHeight={setLastItemHeight} windowSize={windowSize} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerticalCarousel