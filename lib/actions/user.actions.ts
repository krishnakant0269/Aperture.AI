"use server";
import User from "@/lib/database/models/user.model";
import connectToDatabase from "@/lib/database/mongoose";
import { handleError } from "../utils";


export async function createUser(user: CreateUserParams) {
  await connectToDatabase();
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log(`User created with ID ${newUser._id}`);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
}

export async function getUserById(userId: string): Promise<typeof User | null> {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function updateUser(clerkId:string, user: UpdateUserParams) {
  await connectToDatabase();
  try {
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser) {
      console.error(`User with Clerk ID ${clerkId} not found`);
      throw new Error(`User with Clerk ID ${clerkId} not found`);
    }
    console.log(`User with Clerk ID ${clerkId} updated`);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
}
export async function deleteUser(clerkId: string) {
  await connectToDatabase();
  try {
    const deletedUser = await User.findOneAndDelete({ clerkId });
    if (!deletedUser) {
      console.error(`User with Clerk ID ${clerkId} not found`);
      throw new Error(`User with Clerk ID ${clerkId} not found`);
    }
    console.log(`User with Clerk ID ${clerkId} deleted`);
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    if(!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}


// import { revalidatePath } from "next/cache";

// import User from "../database/models/user.model";
// import { connectToDatabase } from "../database/mongoose";
// import { handleError } from "../utils";

// // CREATE
// export async function createUser(user: CreateUserParams) {
//   try {
//     await connectToDatabase();

//     const newUser = await User.create(user);

//     return JSON.parse(JSON.stringify(newUser));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // READ
// export async function getUserById(userId: string) {
//   try {
//     await connectToDatabase();

//     const user = await User.findOne({ clerkId: userId });

//     if (!user) throw new Error("User not found");

//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // UPDATE
// export async function updateUser(clerkId: string, user: UpdateUserParams) {
//   try {
//     await connectToDatabase();

//     const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
//       new: true,
//     });

//     if (!updatedUser) throw new Error("User update failed");

//     return JSON.parse(JSON.stringify(updatedUser));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // DELETE
// export async function deleteUser(clerkId: string) {
//   try {
//     await connectToDatabase();

//     // Find user to delete
//     const userToDelete = await User.findOne({ clerkId });

//     if (!userToDelete) {
//       throw new Error("User not found");
//     }

//     // Delete user
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id);
//     revalidatePath("/");

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
//   } catch (error) {
//     handleError(error);
//   }
// }

// // USE CREDITS
// export async function updateCredits(userId: string, creditFee: number) {
//   try {
//     await connectToDatabase();

//     const updatedUserCredits = await User.findOneAndUpdate(
//       { _id: userId },
//       { $inc: { creditBalance: creditFee }},
//       { new: true }
//     )

//     if(!updatedUserCredits) throw new Error("User credits update failed");

//     return JSON.parse(JSON.stringify(updatedUserCredits));
//   } catch (error) {
//     handleError(error);
//   }
// }
