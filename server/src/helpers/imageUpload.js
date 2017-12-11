import multer from 'multer';
import path from 'path';
import isEmpty from 'lodash/isEmpty';

const profilePicDestination = path.resolve(__dirname, '../../../client/public/images/profile');
const recipeImageDestination = path.resolve(__dirname, '../../../client/public/images/recipes');
const profilePicFileSize = 2097152; // 2MB
const recipeImageFileSize = 6291456; // 6MB

const profilePicFileName = (req, file, cb) => {
  cb(
    null,
    `${req.session.user.lastname.toLowerCase()}${req.session.user.id}${Date.now()}${path
      .extname(file.originalname)
      .toLowerCase()}`,
  );
};

const recipeImageFileName = (req, file, cb) => {
  cb(
    null,
    `${req.session.user.lastname.toLowerCase()}${req.session.user.id}${
      req.params.recipeId
    }${Date.now()}${path.extname(file.originalname).toLowerCase()}`,
  );
};

const imageFilter = (req, file, cb) => {
  if (!isEmpty(file) && !file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new TypeError('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const uploadImage = (destination, filename, fileSize, field) => {
  const storage = multer.diskStorage({ destination, filename });
  const upload = multer({
    storage,
    limits: { fileSize },
    fileFilter: imageFilter,
  });

  return upload.single(field);
};

const profilePicUpload = uploadImage(
  profilePicDestination,
  profilePicFileName,
  profilePicFileSize,
  'profilePic',
);
const recipeImageUpload = uploadImage(
  recipeImageDestination,
  recipeImageFileName,
  recipeImageFileSize,
  'recipeImage',
);
const formDataOnly = multer().single();

export default {
  uploadImage,
  profilePicUpload,
  recipeImageUpload,
  formDataOnly,
};
