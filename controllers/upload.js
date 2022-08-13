const path = require('path');
const multer = require('multer');
const User = require('../models/Users');
const Post = require('../models/Post');

// multer config
const storage = multer.diskStorage({

    destination: function(req, file, callback) {

      callback(null, './ups');
  },
    filename: function (req, file, callback) {

      //  console.log(req.user);
        const ext = file.mimetype.split('/')[1];
         callback(null, `user-${req.user.id}-${Date.now()}.${ext}`);
        // callback(null, `user-${Date.now()}.${ext}`);
 }
   
});

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){ 
        cb(null, true);
    }else {
        cb('Not an image! please upload an image or gif', false);
    }
};

exports.getUploadPage = async (req, res) => {
       // console.log(req.user);
   try {
    const user = await User.findById(req.user.id);
    res.render('videos/video', {
       title: 'Upload',
       userAuth: user
   });
  } catch(err) {
      console.error(err);
  }
  
}

exports.getSuccessPage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.render('videos/success', {
            title: 'Success',
            userAuth: user
        });
    } catch(err) {
        console.error(err);
    }
     
}

exports.uploadVideo = async (req, res) => {
    const errors = [];
    //console.log(req.file);
    console.log(req.body);              
    let post;

     //res.end("File is uploaded");
     // console.log(req.file);
     post = new Post({
         name: '',
         path: '',
         author: req.user.id,
         description: req.body.description,
         title: req.body.title
        });
        try {
            await post.save();
            res.redirect('/upload/success');
      } catch(err) {
          console.error(err);
      }

}

// exports.uploadVideo = (req, res) => {
//     const errors = [];
//     //console.log(req.file);
//     // console.log(req.body.video);              
//     let post;
//     const upload = multer({ 
//         storage: storage,
//         fileFilter: multerFilter 
//     }).single('video');
//     upload(req, res, async function(err) {
//         if(!req.file){
//             errors.push({ msg: "please upload an image" });
//             return res.render('videos/video', {
//                 title: 'Upload',
//                 errors,
//                 userAuth: true
//             });
//         }    
//      //   console.log(req.file); 
//        if(err) {
//            errors.push({ msg: "please enter a valid image format" });
// 	       console.log('Error uploading file.');
//            return res.render('videos/video', {
//             title: 'Upload',
//             errors,
//             userAuth: true
//         });
//         }
//         //res.end("File is uploaded");
//         res.redirect('/upload/success');
//        // console.log(req.file);
//         console.log("File uploaded successfully"); 
        
//         post = new Post({
//             name: req.file.originalname,
//             path: req.file.filename,
//             author: req.user.id,
//             description: req.body.description,
//             title: req.body.title
//         });
//         try {
//             await post.save();
//         } catch(err) {
//             console.error(err);
//         }
//   });
// }