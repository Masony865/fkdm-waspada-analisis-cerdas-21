
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MemberPhotoService } from "@/services/memberPhotoService";
import { UserService } from "@/services/userService";

const MemberTable = () => {
  // Get member photo data
  const memberPhotoData = MemberPhotoService.getAllMemberData();
  
  // Get user data to match with member photos and get wilayah info
  const allUsers = UserService.getAllUserData();

  // Merge data to get complete member information
  const membersWithDetails = memberPhotoData.map(member => {
    const userInfo = allUsers.find(user => user.password === member.password);
    const wilayah = userInfo?.wilayah || 'Admin'; // Changed from 'Tidak Diketahui' to 'Admin'
    
    return {
      ...member,
      wilayah,
      is_admin: userInfo?.is_admin || false,
      email: userInfo?.email || ''
    };
  });

  // Convert Google Drive sharing links to direct image URLs
  const getDirectImageUrl = (driveUrl: string) => {
    if (driveUrl.includes('drive.google.com/file/d/')) {
      const fileId = driveUrl.match(/\/d\/(.+?)\//)?.[1];
      return fileId ? `https://drive.google.com/thumbnail?id=${fileId}` : driveUrl;
    }
    return driveUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Anggota FKDM</CardTitle>
        <CardDescription>
          Daftar lengkap anggota FKDM dengan foto profil dan informasi wilayah kerja.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>NIK</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Wilayah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Barcode</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {membersWithDetails.map((member, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={getDirectImageUrl(member.pasfoto_convert)} 
                      alt={member.nama}
                    />
                    <AvatarFallback>
                      {member.nama.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-mono text-sm">{member.password}</TableCell>
                <TableCell className="font-medium">{member.nama}</TableCell>
                <TableCell>{member.wilayah}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    member.is_admin 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {member.is_admin ? 'Admin' : 'Anggota'}
                  </span>
                </TableCell>
                <TableCell>
                  <img 
                    src={member.barcode_convert} 
                    alt={`Barcode ${member.nama}`}
                    className="h-8 w-16 object-contain"
                  />
                </TableCell>
              </TableRow>
            ))}
            {membersWithDetails.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Tidak ada data anggota ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MemberTable;
