// Load required packages
var mongoose = require('mongoose');

// Define our Sale schema
var SaleSchema   = new mongoose.Schema({
  bicycleId: {type: Schema.Types.ObjectId, ref: 'Bicycle'},
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Sale', SaleSchema);

// Alternative to Many-To-Many --> https://wanago.io/2018/12/31/mongodb-relationships-documents-typescript-express-tutorial-5/

// const postSchema = new mongoose.Schema({
//   authors: [
//     {
//       ref: 'User',
//       type: mongoose.Schema.Types.ObjectId,
//     },
//   ],
//   content: String,
//   title: String,
// });

// const userSchema = new mongoose.Schema({
//   address: addressSchema,
//   email: String,
//   name: String,
//   password: String,
//   posts: [
//     {
//       ref: 'Post',
//       type: mongoose.Schema.Types.ObjectId,
//     },
//   ],
// });

// private createPost = async (request: RequestWithUser, response: express.Response) => {
//   const postData: CreatePostDto = request.body;
//   const createdPost = new this.post({
//     ...postData,
//     authors: [request.user._id],
//   });
//   const user = await this.user.findById(request.user._id);
//   user.posts = [...user.posts, createdPost._id];
//   await user.save();
//   const savedPost = await createdPost.save();
//   await savedPost.populate('authors', '-password').execPopulate();
//   response.send(savedPost);
// }