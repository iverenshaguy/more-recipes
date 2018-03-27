import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { userPropTypes, uploadPropTypes } from '../../../helpers/proptypes';
import { uploadValidation } from '../../../helpers/validations';
import { fileEventAdapter as adaptFileEventToValue } from '../../../utils';

/**
 * @exports
 * @class ProfilePic
 * @extends Component
 * @classdesc Returns User ProfilePic
 * @returns {JSX} User ProfilePic
 */
class ProfilePic extends Component {
  static propTypes = {
    ...userPropTypes,
    ...uploadPropTypes,
    updateUserImage: PropTypes.func.isRequired
  }

  /**
   * @memberof ProfilePic
   * @constructor
   * @returns {JSX} ProfilePic
   */
  constructor() {
    super();

    this.state = {
      uploadError: null
    };

    this.altImage = '/images/user-image-placeholder.png';
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeImageClick = this.handleChangeImageClick.bind(this);
    this.handleCancelImageUpload = this.handleCancelImageUpload.bind(this);
  }

  /**
   * @memberof ProfilePic
   * @param {object} e
   * @returns {nothing} Returns nothing
   */
  handleChangeImageClick(e) {
    e.preventDefault();
    const { clearUploadError, uploadImageObj: { uploading } } = this.props;
    clearUploadError();

    if (!uploading) {
      return this.imageUploader.click();
    }
    return this.handleCancelImageUpload();
  }

  /**
   * @memberof ProfilePic
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleChangeImage(event) {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB max size
    const allowedTypes = ['image/gif', 'image/jpeg', 'image/png'];

    this.setState({
      uploadError: uploadValidation(file, maxSize, allowedTypes)
    });

    if (!uploadValidation(file, maxSize, allowedTypes)) {
      adaptFileEventToValue(this.handleImageUpload, this.userImage)(event);
    }
  }

  /**
   * @memberof ProfilePic
   * @param {object} image - image
   * @return {state} returns new state
   */
  handleImageUpload(image) {
    const { uploadImageObj: { uploadTask } } = this.props;
    return this.props.uploadImage(image, this.props.user.profilePic, `users/${Date.now()}`, downloadURL =>
      this.props.updateUserImage(this.props.user.id, downloadURL, uploadTask));
  }

  /**
   * @memberof ProfilePic
   * @return {state} returns new state
   */
  handleCancelImageUpload() {
    const { user, uploadImageObj: { uploadTask } } = this.props;
    uploadTask.cancel();
    // change image source back to former image
    this.userImage.src = user.profilePic ? user.profilePic : this.altImage;
  }

  /**
   * @memberof ProfilePic
   * @returns {JSX} User ProfilePic
   */
  render() {
    const { user, uploadImageObj: { uploading, error } } = this.props;
    const mainError = error || this.state.uploadError;

    return (
      <div className="col-5 col-md-4 profile-picture align-self-center">
        <img
          src={user.profilePic ? user.profilePic : this.altImage}
          ref={(ref) => { this.userImage = ref; }}
          style={{ opacity: uploading ? 0.3 : 1 }}
          className="d-block d-md-inline rounded-circle img-fluid img-thumbnail user-img align-middle"
          alt="profile"
        />
        &nbsp; &nbsp;
        {/* {uploading &&
        !uploadError &&
        <Progress color="light" value={uploadProgress} className="w-50" />} */}
        <div className="d-block d-md-inline-block align-middle">
          {!uploading && mainError && <p className="text-danger upload-error">{mainError}</p>}
          <a href="#profile-photo" onClick={this.handleChangeImageClick}>{!uploading ? 'Change Picture' : 'Cancel Upload'}</a>
        </div>
        <input
          type="file"
          accept="image/gif, image/jpeg, image/png"
          ref={(ref) => { this.imageUploader = ref; }}
          onChange={this.handleChangeImage}
          style={{ display: 'none' }}
        />
      </div>);
  }
}

export default ProfilePic;
