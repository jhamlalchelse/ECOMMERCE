const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");


exports.registerUser = catchAsyncError( async (req, res,next) => {
    const {name,email, password} = req.body
    const user = await userModel.create({
        name,email, password, 
        avatar:{
            public_id: 'avatarpublicid',
            url: 'avatarurl'
        }
    }
    );
    if (!user) {
      return next(new ErrorHandler('User Not Found', 404))
    }
    sendToken(user, 200, res);
  });
  


  // Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
  });


  // Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });
  

  // Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});


// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    user
  });
  sendToken(user, 200, res);
});


// update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  let user = await userModel.findById(req.params.id)
  if(!user){
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  // if (req.body.avatar !== "") {
  //   const user = await userModel.findById(req.user.id);

  //   const imageId = user.avatar.public_id;

  //   await cloudinary.v2.uploader.destroy(imageId);

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });

  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }

  user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
  });
  res.status(200).json({
    success: true,
    user
  });
})


// Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find();
  const totalUsers = await userModel.countDocuments()
  res.status(200).json({
    success: true,
    users,
    totalUsers
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  // const imageId = user.avatar.public_id;
  // await cloudinary.v2.uploader.destroy(imageId);
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  let user = await userModel.findById(req.params.id)
  if(!user){
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });
  res.status(200).json({
    success: true,
    user
  });
});