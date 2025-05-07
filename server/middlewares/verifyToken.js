const verifyToken = (req, res, next) => {
    const { auth } = req;
  
    if (!auth || !auth.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  
    req.userId = auth.userId;
    next();
  };
  
  export default verifyToken;
  