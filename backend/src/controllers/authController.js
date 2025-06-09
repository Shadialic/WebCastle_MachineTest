import jwt from 'jsonwebtoken';

export const googleCallback = async (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('access_token', token, {
      httpOnly: true,              
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Lax',
      maxAge: 3600000              
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error('Error in googleCallback:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const loginFailure = (req, res) => {
  res.status(401).send('Failed to authenticate');
};

export const logout = (req, res) => {
    console.log('--');
    
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // send only over HTTPS in production
    sameSite: 'strict',
  });

  return res.status(200).json({ message: 'Logged out successfully' });
};

