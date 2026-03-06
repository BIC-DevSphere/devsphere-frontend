import { getAllMembers } from "@/services/admin/memberServices";
import { Member } from "@/types/member.types";
import { useEffect, useState } from "react";
import MemberCard from "@/components/MemberCard";

const MemberUserCard = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        const active = data.filter((m) => m.status === "ACTIVE");
        setMembers(active);
      } catch (error) {
        console.error("Failed to fetch members", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <p className="text-center py-10">Loading members...</p>;
  if (!members.length) return <p className="text-center py-10">No members found.</p>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
};

export default MemberUserCard;