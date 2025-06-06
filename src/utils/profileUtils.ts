
import { MemberPhotoService } from "@/services/memberPhotoService";
import { UserData } from "@/types";

export const getProfileImageUrl = (userData: UserData | null): string => {
  if (!userData) return "";
  
  const memberPhotoData = MemberPhotoService.getMemberByNIK(userData.id);
  
  if (!memberPhotoData?.pasfoto_convert) return "";
  
  // Convert Google Drive sharing links to direct image URLs
  if (memberPhotoData.pasfoto_convert.includes('drive.google.com/file/d/')) {
    const fileId = memberPhotoData.pasfoto_convert.match(/\/d\/(.+?)\//)?.[1];
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}` : memberPhotoData.pasfoto_convert;
  }
  
  return memberPhotoData.pasfoto_convert;
};

export const getUserInitials = (name: string): string => {
  return name.split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};
