import { useEffect, useRef, useState } from 'react'
import './MultipleCarousel.css'
import ProductCard from './ProductCard'

const MultipleCarousel = ({arrayCardData, arrayCardData2, cardWidth}) => {
  const [pos, setPos]=useState(0)
  const [width, setWidth]=useState(200)
  const containerRef=useRef()
  const n_items=10
  const base=`0%`
  
  const containerStyle={
    width:`${n_items*100}%`,
    transform:`translateX(${base})`
  }

  useEffect(()=>{
    if (!(cardWidth===undefined)){
      setWidth(cardWidth)
    }
  }, [])
  
  function swipeLeft() {
    containerRef.current.style.transform=`translateX(${-(pos-1)*width}px)`
    setPos(pos-1)
  }
  function swipeRight() {
    containerRef.current.style.transform=`translateX(${-(pos+1)*width}px)`
    setPos(pos+1)
  }

  return (
    <div className='MultipleCarousel'>
      <div className='wrapper'>
        <div className='arrow btnLeft' onClick={swipeLeft}>{`<`}</div>
        <div className='arrow btnRight' onClick={swipeRight}>{`>`}</div>
        <div className='_container' ref={containerRef} style={containerStyle}>
          {
            arrayCardData.map((data, i)=>{
              return (
                <div className='_card' key={i}>
                  <ProductCard data={data} cardWidth={cardWidth}/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default MultipleCarousel