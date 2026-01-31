import { Breadcrumb } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function Bread({ location }) {
  const navigate = useNavigate()
  /**
   * return url to be used in navigator
   * @param {Array} bread 
   * @param {Number} idx 
   * @returns 
   */
  function getUrl(bread, idx) {
    let i = 0
    let url = "/"
    for (let loc of bread) {
      if (url !== "/")
        url += "/"
      url += loc
      if (idx === i)
        break
      i++
    }
    return url
  }
  let bread = location.pathname.split('/')

  if (location === undefined) {
    bread = ["/"]
  }
  if (location.pathname === "/") {
    return
  } else {
    return (
      <div className="Bread">
        <Breadcrumb>
          {
            bread.map((loc, i) => {
              return (
                <Breadcrumb.Item key={i} onClick={() => {
                  navigate(getUrl(bread, i))
                  console.log('getUrl: ', getUrl(bread, i))
                }}>{String(loc).charAt(0).toUpperCase() + loc.slice(1)}</Breadcrumb.Item>
              )
            })
          }
        </Breadcrumb>
      </div>
    )
  }
}

export default Bread