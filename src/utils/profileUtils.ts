
import { MemberPhotoService } from "@/services/memberPhotoService";
import { UserData } from "@/types";

export const getProfileImageUrl = (userData: UserData | null): string => {
  if (!userData) return "";
  
  console.log("Getting profile image for user:", userData.nama, "NIK:", userData.id);
  
  const memberPhotoData = MemberPhotoService.getMemberByNIK(userData.id);
  console.log("Member photo data found:", memberPhotoData);
  
  if (!memberPhotoData?.pasfoto_convert) {
    console.log("No photo data found for NIK:", userData.id);
    return "";
  }
  
  let imageUrl = memberPhotoData.pasfoto_convert;
  
  // Convert Google Drive sharing links to direct image URLs
  if (imageUrl.includes('drive.google.com/file/d/')) {
    const fileIdMatch = imageUrl.match(/\/d\/(.+?)\//);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`;
      console.log("Converted Google Drive URL:", imageUrl);
    }
  }
  
  console.log("Final image URL:", imageUrl);
  return imageUrl;
};

export const getUserInitials = (name: string): string => {
  if (!name) return "??";
  
  return name.split(' ')
    .map(part => part.trim())
    .filter(part => part.length > 0)
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};
