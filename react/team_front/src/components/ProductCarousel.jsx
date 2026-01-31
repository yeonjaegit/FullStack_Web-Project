import { useNavigate } from 'react-router-dom'
import './ProductCarousel.css'
import { Carousel, CarouselCaption } from "react-bootstrap"

const ProductCarousel = ({arrayAd}) => {
  const navigate=useNavigate()

  return (
    <div className="ProductCarousel">
      <Carousel>
        {
          arrayAd.map((ad, i)=>{
            return (
              <Carousel.Item key={i} onClick={()=>{navigate(`/advertisement`)}}>
                <img 
                  style={{cursor:'pointer'}}
                  alt="carousel_img"
                  src={ad.src}
                  width='100%'
                />
                <CarouselCaption>
                  <h3>{ad.caption}</h3>
                </CarouselCaption>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  )
}
export default ProductCarousel