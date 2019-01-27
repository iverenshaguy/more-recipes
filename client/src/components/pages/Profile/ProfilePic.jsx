import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { userPropTypes } from '../../../helpers/proptypes';
import { uploadValidation } from '../../../helpers/validations';
import { fileEventAdapter as adaptFileEventToValue, imageUpload } from '../../../utils';

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
    uploadImage: PropTypes.shape({
      error: PropTypes.string,
      success: PropTypes.bool
    }).isRequired,
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
      uploadTask: {},
      uploading: false,
      uploadError: null,
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
    this.setState({
      uploadError: null
    });

    if (!this.state.uploading) {
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

    if (uploadValidation.call(this, file, maxSize, allowedTypes)) {
      adaptFileEventToValue(this.handleImageUpload, this.userImage)(event);
    }
  }

  /**
   * @memberof ProfilePic
   * @param {object} image - image
   * @return {state} returns new state
   */
  handleImageUpload(image) {
    imageUpload.call(
      this,
      image,
      this.props.user.profilePic,
      `users/${Date.now()}`,
      (downloadURL) => {
        // upload imageurl to db
        this.props.updateUserImage(this.props.user.id, downloadURL)
          .then(() => {
            if (!this.props.uploadImage.uploading && this.props.uploadImage.success) {
              this.setState({ uploading: false });
            }

            if (!this.props.uploadImage.uploading && !this.props.uploadImage.success) {
              this.setState({ uploadError: 'Something happened, please try again', uploading: false });
              this.state.uploadTask.delete();
            }
          });
      }
    );
  }

  /**
   * @memberof ProfilePic
   * @return {state} returns new state
   */
  handleCancelImageUpload() {
    const { user } = this.props;
    this.state.uploadTask.cancel();
    // change image source back to former image
    this.userImage.src = user.profilePic ? user.profilePic : this.altImage;
  }

  /**
   * @memberof ProfilePic
   * @returns {JSX} User ProfilePic
   */
  render() {
    const { user } = this.props;
    const { uploading, uploadError } = this.state;

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
          {!uploading && uploadError && <p className="text-danger upload-error">{uploadError}</p>}
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
