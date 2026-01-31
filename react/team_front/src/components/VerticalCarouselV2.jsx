import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { updateWindowSize } from "../redux/store";
import Footer from "./Footer";

/**
 * arrayComponent: [
 *  {component:<></>,
 *   height: //000vh (viewport) OR integer bigger than 1 (pixcels) OR double equal to or less than 1 (percentage of 100vh)
 *  },
 *  ...
 * ]
 * @param {*} param0 
 * @returns 
 */
function VerticalCarouselV2({ arrayComponent }) {
  const containerRef = useRef()
  const windowSize = useSelector(state => state.windowSize)
  const [arrayHeight, setArrayHeight] = useState([])

  const wrapperStyle = {
    transition: `transform 1s`,
    position: `fixed`,
    width: `100vw`,
    height: `100vh`,
    overflow: `hidden`,
  }
  const containerStyle = {
    display: `flex`,
    flexDirection: `column`,
    margin: 0,
    padding: 0,
    transition: `transform 1s`,
  }

  const isAnimating = useRef(false)
  const n_items = arrayComponent.length
  const [pos, setPos] = useState(0)
  const dispatch = useDispatch()
  const delay = 500

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${arrayHeight[pos]}px)`;
    }
  }, [pos])

  useEffect(() => {
    if (arrayComponent) {
      setArrayHeight([])
      let currentHeight = 0
      arrayComponent.forEach((object, i) => {
        if (i == 0)
          arrayHeight[i] = 0
        if (typeof object.height === 'string' && object.height.endsWith('vh')) { //giving 000vh
          currentHeight += windowSize.height*parseInt(object.height.replace("vh", ""))/100
          arrayHeight[i + 1] = currentHeight
        } else if (object.height <=1 ) {
          currentHeight += Math.round(windowSize.height*object.height)
        } else {
          currentHeight += object.height
        }
        arrayHeight[i + 1] = currentHeight
        if (i == n_items - 1) //handles last item
          arrayHeight[i] = arrayHeight[i - 1] + object.height
      })
      setArrayHeight([...arrayHeight])
    }

    function wheelHandler(e) {
      if (isAnimating.current) return
      isAnimating.current = true

      if (e.deltaY > 0) {
        setPos(prevPos => Math.min(n_items - 1, prevPos + 1))
      } else {
        setPos(prevPos => Math.max(0, prevPos - 1))
      }

      dispatch(updateWindowSize())

      setTimeout(() => {
        isAnimating.current = false
      }, delay)
    }

    window.addEventListener('wheel', wheelHandler)
    return () => {
      window.removeEventListener('wheel', wheelHandler)
    }
  }, [n_items, windowSize])


  return (
    <div className="VerticalCarouselVw">
      <div className="carouselWrapper" style={wrapperStyle}>
        <div className="carouselContainer" ref={containerRef} style={containerStyle}>
          {
            arrayComponent.map((object, i) => <div key={i}>{object.component}</div>)
          }
        </div>
      </div>
    </div>
  )
}
export default VerticalCarouselV2