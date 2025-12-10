// import { v2 as cloudinary } from 'cloudinary';
// cloudinary.config({
//     cloud_name:process.env.CLODINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET_KEY
// })

// const uploadImageClodinary = async (image) => {
//   const buffer =image?.buffer || Buffer.from(await image.arrayBuffer());
//   const uploadImage = await new Promise((resolve, reject) => {
//     cloudinary.uploader.upload_stream({ folder: "binkeyit" }, (error, uploadResult) => {
//       if (error) return reject(error);
//       return resolve(uploadResult);
//     }).end(buffer);
//   });
//   return uploadImage;
// };

// export default uploadImageClodinary;

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const uploadImageClodinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "binkeyit",
        quality: "auto",         // <-- AI optimization
        fetch_format: "auto",    // <-- convert to WebP/AVIF
        transformation: [
          { width: 600, height: 600, crop: "fill" }  // <-- resize + crop clean
        ]
      },
      (error, uploadResult) => {
        if (error) return reject(error);
        return resolve(uploadResult);
      }
    ).end(buffer);
  });

  return uploadImage;
};

export default uploadImageClodinary;
