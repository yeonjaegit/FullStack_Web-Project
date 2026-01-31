import axiosInstance from "./axiosInstance"


async function _getImageByUrl(onFullfilled, onRejected) {
  await axiosInstance
    .get(`/images/${id}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getAllImages(onFullfilled, onRejected) {
  await axiosInstance
    .get('/images/all')
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _postImages(files, onFullfilled, onRejected) {
  await axiosInstance
    .post('/images', files)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _deleteImage(id, onFullfilled, onRejected) {
  await axiosInstance
    .delete(`/images/${id}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getImageByUrl(url, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/images/url?url=${url}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getImagesByFilename(filename, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/images?filename=${filename}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

async function _getImagesByUuid(uuid, onFullfilled, onRejected) {
  await axiosInstance
    .get(`/images/uuid?uuid=${uuid}`)
    .then(response => onFullfilled && onFullfilled(response))
    .catch(error => onRejected && onRejected(error))
}

const axiosImage = {
  getImageByUrl: _getImageByUrl,
  getAllImages: _getAllImages,
  getImagesByFilename: _getImagesByFilename,
  getImagesByUuid: _getImagesByUuid,
  postImages: _postImages,
  deleteImage: _deleteImage,

}

export default axiosImage