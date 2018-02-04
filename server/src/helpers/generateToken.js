import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email.toLowerCase(),
      image: user.profilePic,
      aboutMe: user.aboutMe,
      occupation: user.occupation
    },
    process.env.SECRET,
    {
      expiresIn: 86400 // expires in 24 hours
    }
  );

  return token;
};

export default generateToken;
