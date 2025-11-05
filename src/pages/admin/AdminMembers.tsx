import { Input } from '@/components/ui/input';
import { getAllMembers, MembersResponse, createMember, Member } from '@/services/admin/memberServices';
import { SearchIcon, PenIcon, TrashIcon , PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MemberModal from '@/components/admin/MemberModal';
import { memberResponse } from '@/types/member.types';
import { Button } from '@/components/ui/button';
import { normalizeMemberData , validateMemberData, extractUpdatedMemberFields } from '@/utils/member.utils';


const AdminMembers = () => {
  const [members, setMembers] = useState<MembersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [memberDataSnapshot, setMemberDataSnapshot] = useState<any>(null)

  useEffect(() => {
    fetchMembers();
  }, []);
  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const data = await getAllMembers();
      if (!data) {
        toast.error('No members found');
      }
      setMembers(data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
      toast.error('Failed to fetch members');
      setMembers(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (member : memberResponse) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const getYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const handleEditMember = async (FormData : any) => {

  }

  const handleSaveMember = async (formData : any) => {
    try {
      setIsModalOpen(false)
      setIsLoading(true)
      const data = await createMember(formData);
        setMembers({
          ...members,
          data: [...members.data, data]
        });
      toast.success('Member created successfully');
    } catch (error) {
      console.log(error)
      toast.error('Failed to create member');
    }
    finally{
      setIsModalOpen(false)
      setIsLoading(false)
    }
  }



  return (
    <div className="grid gap-4 px-8 py-12">
      <p className="text-4xl font-semibold">Members</p>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative mt-2 max-w-md flex-1">
          <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search members by name..."
            className="bg-white pl-10 shadow-sm"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="create-member-button">
        <Button className="flex items-center gap-2 shadow-md" onClick={handleAddMember}>
          <PlusIcon className="h-4 w-4" />
          Add New Member
        </Button>
        </div>
      </div>

      <div className="members-list-section grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              <p className="text-gray-600">Loading members...</p>
            </div>
          </div>
        ) : members.data && members.data.length > 0 ? (
          members.data.map((member) => (
            <div
              key={member.id}
              className="flex overflow-hidden rounded-lg border-1 border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md max-h-28"
            >
              <div className="w-1/3 bg-gray-100">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="h-full w-full object-fill"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                    <span className="text-lg font-bold">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex w-2/3 flex-col justify-between p-4">
                {/* Header with name and menu */}
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="truncate text-xs text-gray-600">{member.role}</p>
                  </div>
                  <div className="member-card-action-section flex gap-2">
                    <button onClick={() => handleEdit(member)} className="cursor-pointer rounded-md bg-gray-200 p-1.5 text-gray-500 hover:text-gray-700">
                      <PenIcon size={16} />
                    </button>
                    <button className="cursor-pointer rounded-md bg-red-200 p-1.5 text-red-600 shadow-md">
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </div>

                {/* Footer with year and status */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Joined {getYear(member.year)}</span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        member.status === 'ACTIVE' ? 'bg-green-400' : 'bg-gray-400'
                      }`}
                    />
                    <span className="text-xs font-medium text-gray-600">
                      {member.status.toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex min-h-[400px] w-full items-center justify-center">
            <p className="text-gray-600">No members found.</p>
          </div>
        )}
      </div>
      <MemberModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onEdit={handleEditMember}
    onSave={handleSaveMember}
    member={selectedMember}
/>

    </div>
  );
};

export default AdminMembers;
