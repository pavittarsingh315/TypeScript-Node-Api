import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
   email: string;
   name: string;
   password: string;
   createdAt: Date;
   updatedAt: Date;
   comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
      },
      name: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

// Used for loggin in
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
   const user = this as UserDocument;

   return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
   let user = this as UserDocument;

   // Only hash password if it is new or modified
   if (!user.isModified("password")) return next();

   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hashSync(user.password, salt);
   user.password = hash;

   return next();
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
