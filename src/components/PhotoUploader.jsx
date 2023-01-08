import React from 'react'
import {useState} from 'react'

export const PhotoUploader = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)

  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.addEventListener('load', (evt) => {
        resolve(evt.currentTarget.result)
      })

      fileReader.addEventListener('error', (evt) => {
        reject(new Error(evt.currentTarget.error))
      })

      fileReader.readAsDataURL(file)
    })
  }
  const handleSelect = async (evt) => {
    setLoading(true)
    const files = [...evt.target.files]
    const urls = await Promise.all(files.map((o) => fileToDataUrl(o)))
    //console.log('urls', urls)
    setPhotos((prev) => [...new Set([...prev, ...urls])])
    setLoading(false)
  }

  const removePhoto = (photo) => {
    setPhotos((prev) => prev.filter((img) => img !== photo))
  }

  return (
    <div>
      <div className="container">
        <form>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <label className="input-file">
              <input
                type="file"
                name="file"
                onChange={(e) => handleSelect(e)}
                accept="image/png, image/jpeg"
                disabled={loading}
                multiple
              />
              <span className="input-file-btn">Выберите файл</span>
            </label>
          )}
        </form>

        <div className="images">
          {photos.map((img, ind) => (
            <div key={ind}>
              <img src={img} alt={'img_' + ind} />
              <span className="close" onClick={() => removePhoto(img)}></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
