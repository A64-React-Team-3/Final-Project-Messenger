import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase-config";
/**
 * Uploads an image to Firebase Storage and returns the public URL of the uploaded image.
 * @param file The image file to upload
 * @returns A promise that resolves to the public URL of the uploaded image
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `avatars/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};
