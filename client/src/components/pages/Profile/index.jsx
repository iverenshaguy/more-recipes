import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { MiniPreLoader } from '../../shared/PreLoader';
import RecipeItems from '../../shared/RecipeItems';
import { toggleModal } from '../../../actions/ui';
import { fetchUserRecipes } from '../../../actions/recipes';
import { updateUserImage } from '../../../actions/auth';
import { userPropTypes, multiRecipePropTypes, urlMatchPropTypes } from '../../../helpers/proptypes';
import { uploadValidation } from '../../../helpers/validations';
import { fileEventAdapter as adaptFileEventToValue, imageUpload } from '../../../utils';
import './Profile.scss';

/**
 * @exports
 * @class Profile
 * @extends Component
 * @classdesc Returns User Profile Page
 * @returns {JSX} User Profile
 */
class Profile extends Component {
  static propTypes = {
    ...userPropTypes,
    ...urlMatchPropTypes,
    ...multiRecipePropTypes,
    uploadImage: PropTypes.shape({
      error: PropTypes.string,
      success: PropTypes.bool
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  /**
   * @memberof Profile
   * @constructor
   * @returns {JSX} Profile
   */
  constructor() {
    super();

    this.state = {
      limit: 5,
      uploadTask: {},
      currentPage: 1,
      uploading: false,
      uploadError: null
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.showAddRecipeModal = this.showAddRecipeModal.bind(this);
    this.handleChangeImageClick = this.handleChangeImageClick.bind(this);
    this.handleCancelImageUpload = this.handleCancelImageUpload.bind(this);
  }

  /**
   * @memberof Profile
   * @returns {nothing} returns nothing
   */
  componentWillMount() {
    const { match, user, dispatch } = this.props;
    if (match.params.username !== user.username) {
      dispatch(push(`/${user.username}`));
    }

    dispatch(fetchUserRecipes(this.props.user.id, this.state.currentPage, this.state.limit));
  }

  /**
   * @memberof Home
   * @param {number} page
   * @returns {state} home
   */
  handlePageChange(page) {
    this.setState({
      currentPage: page
    }, () => this.props.dispatch(fetchUserRecipes(this.props.user.id, page, this.state.limit)));
  }

  /**
   * @memberof Profile
   * @returns {nothing} Returns nothing
   */
  showAddRecipeModal() {
    this.props.dispatch(toggleModal('addRecipe'));
  }

  /**
   * @memberof Profile
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
   * @memberof Profile
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
   * @memberof Profile
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
        this.props.dispatch(updateUserImage(this.props.user.id, downloadURL))
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
   * @memberof Profile
   * @return {state} returns new state
   */
  handleCancelImageUpload() {
    const { user } = this.props;
    this.state.uploadTask.cancel();
    // change image source back to former image
    this.userImage.src = user.profilePic ? user.profilePic : 'images/user-image-placeholder.png';
  }

  /**
   * @memberof Profile
   * @returns {JSX} User Profile
   */
  render() {
    const {
      user, isFetching, recipes, metadata
    } = this.props;

    const { uploading, uploadError } = this.state;

    const altImage = 'images/user-image-placeholder.png';

    return (
      <div className="user-profile pb-4">
        <div className="container-fluid user-profile-div">
          <div className="row justify-content-start user-info py-4 px-3 px-md-5">
            <div className="col-5 col-md-4 profile-picture align-self-center">
              <img
                src={user.profilePic ? user.profilePic : altImage}
                ref={(ref) => { this.userImage = ref; }}
                style={{ opacity: uploading ? 0.3 : 1 }}
                className="d-block d-md-inline rounded-circle img-fluid img-thumbnail user-img align-middle"
                alt="Profile"
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
            </div>
            <div className="col-7 col-md-8 name-div align-self-center">
              <p className="name pt-2">{`${user.firstname} ${user.lastname}`}</p>
              <small className="text-muted username pt-1">{`@${user.username}`}</small>
              <p className="about-me pt-2">{user.aboutMe}</p>
            </div>
          </div>
        </div>
        <div className="container-fluid text-center user-profile-recipe-cards-wrapper mb-5 mt-1">
          <Button
            onClick={this.showAddRecipeModal}
            className="btn-default btn-lg d-none d-md-inline-block"
            id="home-add-recipe-btn"
            title="New Recipe"
          >
            Add a New Recipe
          </Button>
          {isFetching &&
            <div className="justify-content-center py-5">
              <MiniPreLoader />
            </div>}
          {!isFetching &&
            <div className="row justify-content-center user-profile-recipe-cards px-5 px-sm-5 px-md-0 mt-0">
              <RecipeItems
                title="MY RECIPES"
                recipes={recipes}
                handlePageChange={this.handlePageChange}
                metadata={metadata}
              />
            </div>}
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetching: state.isFetching,
  recipes: state.recipes.items,
  metadata: state.recipes.metadata,
  uploadImage: state.uploadImage
});

export { Profile as ProfileComponent };
export default connect(mapStateToProps)(Profile);
