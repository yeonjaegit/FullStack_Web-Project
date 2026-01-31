import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './Inquiry.css'

const Inquiry = () => {
  const navigate = useNavigate()
  const [InquiryList, setInquiryList] = useState([
    {
      id: 0,
      title: "",
      author: "",
      createDate: ""
    }
  ])

  return (
    <div className="inquiry-container">
      <h1>문의사항</h1>

      <table className="inquiry-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {
            InquiryList.map((inquiry, i) => (
              <tr key={i}>
                <td>{inquiry.id}</td>
                <td><Link to={`/inquiry/${inquiry.id}`}>{inquiry.title}</Link></td>
                <td>{inquiry.author}</td>
                <td>{inquiry.createDate}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="inquiry-write-container" onClick={() => { navigate("/write?from=inquiry") }}>
        <Link className="inquiry-write-button">등록</Link>
      </div>
    </div>
  )
}

export default Inquiry