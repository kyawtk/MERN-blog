import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
blogSchema.pre("save", function (next) {
  console.log(`Saving blog with title: ${this.title}`);
  next();
});
// Define a virtual for the word count
blogSchema.virtual("wordCount").get(function () {
  return this.content.split(" ").length;
});

 const Blog = model("Blog", blogSchema);
 export default Blog;
