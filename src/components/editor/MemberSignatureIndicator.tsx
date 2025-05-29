
import { User, MapPin } from "lucide-react";
import { MemberSignature } from "@/types";

interface MemberSignatureIndicatorProps {
  memberSignature: MemberSignature | null;
}

const MemberSignatureIndicator = ({ memberSignature }: MemberSignatureIndicatorProps) => {
  if (!memberSignature) return null;

  return (
    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center gap-2 text-green-700">
        <User className="h-4 w-4" />
        <span className="font-medium">Tanda Tangan Otomatis Aktif</span>
      </div>
      <div className="mt-1 text-sm text-green-600 flex items-center gap-4">
        <span>{memberSignature.nama} - {memberSignature.jabatan}</span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {memberSignature.kecamatan}, {memberSignature.kelurahan}
        </span>
      </div>
    </div>
  );
};

export default MemberSignatureIndicator;
