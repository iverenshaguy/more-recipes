import storage from '../firebase';

/**
 * Image Upload to Firebase
 * @function imageUplaod
 * @param {object} image - image file
 * @param {object} formerImagePath - former user img
 * @param {string} imagePath - image path
 * @param {function} successCallBack - success callback
 * @returns {function} success callback
 */
function imageUpload(image, formerImagePath, imagePath, successCallBack) {
  // create a storage referencing the current time as filename
  const storageRef = storage.ref(imagePath);
  // upload the file
  const uploadTask = storageRef.put(image);

  // set uploadTask state so that upload can be canceled by user
  this.setState({ uploadTask });

  uploadTask.on(
    'state_changed',
    // image upload progress
    () => {
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({ uploading: true });
    },
    // image upload failure
    () => {
      this.setState({ uploading: false });
    },
    // image upload success
    () => {
      // create a storage referencing the former image
      if (formerImagePath) {
        const formerStorageRef = storage.refFromURL(`${formerImagePath}`);
        // delete file if it exists
        formerStorageRef.delete();
      }
      successCallBack(uploadTask.snapshot.downloadURL);
    }
  );
}

export default imageUpload;
