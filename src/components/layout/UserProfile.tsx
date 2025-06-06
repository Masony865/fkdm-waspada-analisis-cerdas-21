
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types";
import { getProfileImageUrl, getUserInitials } from "@/utils/profileUtils";

interface UserProfileProps {
  userData: UserData;
  className?: string;
}

const UserProfile = ({ userData, className = "" }: UserProfileProps) => {
  const profileImageUrl = getProfileImageUrl(userData);
  const userInitials = getUserInitials(userData.nama);

  return (
    <div className={`flex items-center gap-3 bg-gradient-to-r from-fkdm-red/5 to-fkdm-gold/5 px-4 py-2 rounded-lg border border-fkdm-gold/20 ${className}`}>
      <Avatar className="h-12 w-12 border-2 border-fkdm-gold/50">
        <AvatarImage src={profileImageUrl} alt={userData.nama} />
        <AvatarFallback className="bg-fkdm-red text-white font-medium text-sm">
          {userInitials}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold text-fkdm-red">
          {userData.nama}
        </p>
        <p className="text-xs text-muted-foreground">
          NIK: {userData.id}
        </p>
        <p className="text-xs text-fkdm-gold font-medium">
          {userData.jabatan} | {userData.wilayah}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
