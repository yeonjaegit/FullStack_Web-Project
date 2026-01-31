async function _(){

}

const axiosBoard={
/**
 * log in with username and password. JWT handler included.
 * @param {*} dispatch 
 * @param {*} payload 
 */
  getBoardList:_getBoardList,
  getBoard:_getBoard,
  getNoticeList:_getNoticeList,
  getNotice:_getNotice,
  getInquiryList:_getInquiryList,
  getInqiury:_getInqiury,
  postBoard:_postBoard,
  postNotice:_postNotice,
  postInquiry:_postInquiry,
  postAnswer:_postAnswer,
  postReply:_postReply,
  //put, delete, ...
}

export default axiosBoard