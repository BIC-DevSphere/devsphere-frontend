import { Member } from "@/types/member.types";
import { Linkedin, Instagram } from "lucide-react";
import { FaDiscord } from "react-icons/fa";


interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    member.name
  )}&background=random&size=200`;

  return (
    <div className="flex flex-col items-center text-center px-4 py-8 gap-3">
      {/* Avatar */}
      <div className="w-40 h-40 rounded-[1.5rem] overflow-hidden">
        <img
          src={member.avatarUrl ?? fallbackAvatar}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <h3 className="text-[#0f051d] text-xl font-bold leading-tight">
        {member.name}
      </h3>
      <p className="text-[#7b7583] text-sm mt-1">{member.role}</p>

      {/* Social Icons */}
      <div className="flex items-center gap-5 mt-4 text-[#0f051d]">
        {member.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:opacity-70 transition-opacity"
          >
            <Linkedin size={18} />
          </a>
        )}
        {member.discordUrl && (
          <a
            href={member.discordUrl.startsWith('http') ? member.discordUrl : `https://discord.com/users/${member.discordUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="hover:opacity-70 transition-opacity"
          >
            <FaDiscord/>
          </a>
        )}
        {member.instagramUrl && (
          <a
            href={member.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:opacity-70 transition-opacity"
          >
            <Instagram size={18} />
          </a>
        )}
      </div>
    </div>
  );
};

export default MemberCard;