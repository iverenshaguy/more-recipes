const getUserObject = user => ({
  id: user.id,
  firstname: user.firstname,
  lastname: user.lastname,
  username: user.username,
  email: user.email.toLowerCase(),
  image: user.profilePic,
  aboutMe: user.aboutMe,
  occupation: user.occupation,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

export default getUserObject;
