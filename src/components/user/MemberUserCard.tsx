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
      <div className="mb-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="block h-px w-6 bg-red-700" />
          <h2 className="text-xs font-bold tracking-widest uppercase text-red-700">
            Team
          </h2>
        </div>
        <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Meet our people
        </h3>
      </div>
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-12 sm:gap-x-16 md:gap-x-20 pb-12 md:pb-24 pt-4">
        {members.map((member, index) => (
          <div 
            key={member.id} 
            className={index % 2 !== 0 ? "translate-y-8 md:translate-y-16" : ""}
          >
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemberUserCard;