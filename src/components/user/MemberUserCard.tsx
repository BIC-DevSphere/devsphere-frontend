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
    <section>
      <h2 className="text-red-700 mb-10 text-center text-5xl font-bold">
        Meet Our Team
      </h2>
      <div className="flex flex-wrap justify-center sm:justify-between gap-x-20">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
};

export default MemberUserCard;