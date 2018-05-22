import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import MiniPreLoader from '../../shared/PreLoader/MiniPreLoader';
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
  }

  /**
   * @memberof ProfilePic
   * @param {object} nextProps
   * @returns {nothing} Returns nothing
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (this.props.uploadImageObj.error || this.state.uploadError) {
        this.userImage.src = this.props.user.profilePic;
      }
    }
  }

  /**
   * @memberof ProfilePic
   * @param {object} e
   * @returns {nothing} Returns nothing
   */
  handleChangeImageClick(e) {
    e.preventDefault();
    const { clearUploadError } = this.props;
    clearUploadError();
    this.setState({
      uploadError: null
    });

    return this.imageUploader.click();
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

    if (!uploadValidation(file, maxSize, allowedTypes)) {
      adaptFileEventToValue(this.handleImageUpload, this.userImage)(event);
    } else {
      this.setState({
        uploadError: uploadValidation(file, maxSize, allowedTypes)
      });

      // reset input box
      event.target.value = '';
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
   * @returns {JSX} User ProfilePic
   */
  render() {
    const { user, uploadImageObj: { uploading, error } } = this.props;
    const mainError = error || this.state.uploadError;
    const show = uploading ? 'show' : null;

    return (
      <div className="col-5 col-md-4 profile-picture align-self-center text-center">
        <div className="profile-img-div">
          <img
            src={user.profilePic ? user.profilePic : this.altImage}
            onError={(e) => { e.target.src = this.altImage; }}
            ref={(ref) => { this.userImage = ref; }}
            className="rounded-circle img-fluid img-thumbnail user-img align-middle"
            alt="profile"
          />
          <a
            className={`image-overlay rounded-circle ${show}`}
            href="#profile-photo"
            onClick={this.handleChangeImageClick}
          >
            {!uploading && <FontAwesome name="plus-square-o" tag="i" />}
            {uploading && <MiniPreLoader />}
          </a>
        </div>
        {!uploading && mainError && <p className="d-block text-center text-danger upload-error">{mainError}</p>}
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
