/*
 * @Author: pinguo-xujian
 * @Date: 2023-03-27 17:42:23
 * @LastEditors: pinguo-xujian
 * @LastEditTime: 2023-04-21 00:27:34
 * @Description:
 */
const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(imageSrc: string, pixelCrop: any, rotation = 2) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(pixelCrop.width, pixelCrop.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, pixelCrop.width, pixelCrop.height);
  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );
  // const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // ctx.putImageData(
  //   data,
  //   Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
  //   Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  // );

  return new Promise((resolve) => {
    // return resolve(canvas.toDataURL('image/jpeg'));
    canvas.toBlob((file) => {
      resolve(file);
    }, 'image/jpeg');
  });
}
