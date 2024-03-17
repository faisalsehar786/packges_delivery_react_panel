import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Cropper from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'

interface UploadModalProps {
  image: string
  setImage: (image: string) => void
  imagetype?: any
}

const UploadModal: React.FC<UploadModalProps> = ({ image, setImage, imagetype }) => {
  const [showModal, setShowModal] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState<any>()

  const handleShow = () => setShowModal(true)
  const handleClose = () => {
    setShowModal(false)
    setImage('')
  }

  const createImage = (url: string) =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (error) => reject(error))
      image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
      image.src = url
    })

  function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180
  }

  /**
   * Returns the new bounding area of a rotated rectangle.
   */
  function rotateSize(width: number, height: number, rotation: number) {
    const rotRad = getRadianAngle(rotation)

    return {
      width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
      height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    }
  }

  async function getCroppedImg(
    imageSrc: any,
    pixelCrop: { width: number; height: number; x: number; y: number },
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image: any = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return null
    }

    const rotRad = getRadianAngle(rotation)

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth
    canvas.height = bBoxHeight

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.rotate(rotRad)
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.width / 2, -image.height / 2)

    // draw rotated image
    ctx.drawImage(image, 0, 0)

    const croppedCanvas = document.createElement('canvas')

    const croppedCtx = croppedCanvas.getContext('2d')

    if (!croppedCtx) {
      return null
    }

    // Set the size of the cropped canvasfill
    croppedCanvas.width = pixelCrop.width
    croppedCanvas.height = pixelCrop.height

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    // As Base64 string
    // return croppedCanvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve) => {
      croppedCanvas.toBlob(
        (file: any) => {
          resolve(URL.createObjectURL(file!))
        },
        imagetype === 'png' ? 'image/png' : 'image/jpeg'
      )
    })
  }

  const handleCropComplete = async (croppedArea: any, croppedAreaPixels: Area) => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels)
    setCroppedImage(croppedImage)!
  }

  const handleSave = async () => {
    setImage(croppedImage)
    handleClose()
  }

  useEffect(() => {
    if (image) {
      handleShow()
    }
  }, [image])

  return (
    <Modal className='upload-modal' size='sm' show={showModal} onHide={handleClose}>
      <Modal.Body>
        <div className='crop-container'>
          {image && (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
              style={{
                containerStyle: {
                  height: '300px',
                },
              }}
            />
          )}
        </div>
        <div className='controls'>
          <input
            type='range'
            title='range'
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='Zoom'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setZoom(parseFloat(e.target.value))
            }}
            className='zoom-range'
          />
        </div>
        <div className=' d-flex mb-5 justify-content-between mb-4 mt-2 px-2'>
          <button className='btn btn-sm btn-light' onClick={handleClose}>
            Avbryt
          </button>
          <button type='button' className='btn btn-primary authbgcolor ' onClick={handleSave}>
            Lagre
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default UploadModal
