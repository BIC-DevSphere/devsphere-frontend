import { Input } from '@/components/ui/input';
import { getAllMembers, createMember, getMemberById, updateMember } from '@/services/admin/memberServices';
import { SearchIcon, PenIcon, TrashIcon, PlusIcon, FilterIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MemberModal, { MemberData } from '@/components/admin/MemberModal';
import { Member } from '@/types/member.types';
import { Button } from '@/components/ui/button';
import { normalizeMemberData, extractUpdatedMemberFields } from '@/utils/member.utils';
import { useParams } from 'react-router-dom';
import { normalizeProjectData } from '@/utils/project.utils';


const AdminMembers = () => {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member>(null)
  const [memberDataSnapshot, setMemberDataSnapshot] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')


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

  const handleEdit = (member: Member) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleDelete = (member :Member) => {
    const newMembers = members.filter(m => m.id != member.id)
    setMembers(newMembers)
  }

  const handleAddMember = () => {
    setIsModalOpen(true);
  };

  const getYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const handleEditMember = async (memberData: MemberData) => {
    try {
      setIsLoading(true)
      closeModel()
      const normalizedPreviousData = normalizeMemberData(memberData)
      const updatedMemberField = extractUpdatedMemberFields(selectedMember, normalizedPreviousData)

      if (!updatedMemberField || Object.keys(updatedMemberField).length === 0) {
        toast.error("No changes detected to update")
        return;
      }

      try {
        const data = await updateMember(selectedMember.id, updatedMemberField)
        console.log("members", members)
        console.log("data", data)

        setMembers(prevMembers =>
          prevMembers.map(member =>
            member.id === data.id ? data : member
          )
        );

        toast.success('Member updated successfully');
      } catch (error) {
        toast.error("Failed to update member")
        console.log("Error update member: ", error)
      }

    } catch (error) {
      console.log(error)
      toast.error('Failed to update member');
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleSaveMember = async (formData: MemberData) => {
    try {
      setIsLoading(true)
      closeModel()
      const data = await createMember(formData);
      setMembers(members ? [...members, data] : [data]);
      toast.success('Member created successfully');
    } catch (error) {
      console.log(error)
      toast.error('Failed to create member');
    }
    finally {
      setIsLoading(false)
    }
  }

  const closeModel = () => {
    setIsModalOpen(false)
    setSelectedMember(null)
  }

  // Filter members based on search query and status
  const filteredMembers = members?.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase())
    let matchesStatus = true
    if (filterStatus === 'active') {
      matchesStatus = member.status === 'ACTIVE'
    } else if (filterStatus === 'inactive') {
      matchesStatus = member.status !== 'ACTIVE'
    }
    return matchesSearch && matchesStatus
  }) || []


  return (
    <div className="grid gap-4 px-8 py-12">
      <p className="text-4xl font-semibold">Members</p>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 space-y-3">
          <div className="relative max-w-md">
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search members by name..."
              className="bg-white pl-10 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <FilterIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 font-medium">Filter:</span>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'active' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(filterStatus === 'active' ? 'all' : 'active')}
                className={`transition-all duration-200 ${
                  filterStatus === 'active'
                    ? "bg-green-500 hover:bg-green-600 text-white shadow-md" 
                    : "border-gray-300 hover:bg-gray-50 hover:border-green-300"
                }`}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'inactive' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(filterStatus === 'inactive' ? 'all' : 'inactive')}
                className={`transition-all duration-200 ${
                  filterStatus === 'inactive'
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-md"
                    : "border-gray-300 hover:bg-gray-50 hover:border-red-300"
                }`}
              >
                Inactive
              </Button>
            </div>
            {filterStatus !== 'all' && (
              <span className="text-sm text-gray-500">
                ({filteredMembers.length} {filterStatus})
              </span>
            )}
          </div>
        </div>
        <div className="create-member-Button ">
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
        ) : filteredMembers && filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className="flex overflow-hidden rounded-lg border-1 border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md max-h-28"
            >
              <div className="w-1/3 bg-gray-100">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
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
                    <Button  onClick={() => handleEdit(member)} className="cursor-pointer rounded-md bg-gray-200 p-1.5 text-gray-500 hover:text-gray-700">
                      <PenIcon size={16} />
                    </Button >
                  </div>
                </div>

                {/* Footer with year and status */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Joined {getYear(member.year)}</span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`h-2 w-2 rounded-full ${member.status === 'ACTIVE' ? 'bg-green-400' : 'bg-gray-400'
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
            <div className="text-center">
              <p className="text-gray-600">
                {members && members.length > 0 
                  ? (searchQuery || filterStatus !== 'all'
                      ? `No members found matching ${searchQuery ? `"${searchQuery}"` : ''} ${filterStatus !== 'all' ? `${filterStatus} filter` : ''}`.trim()
                      : 'No members found.')
                  : 'No members found.'}
              </p>
              {(searchQuery || filterStatus !== 'all') && members && members.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('')
                    setFilterStatus('all')
                  }}
                  className="mt-2 text-blue-500 hover:text-blue-600"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      <MemberModal
        isOpen={isModalOpen}
        onClose={closeModel}
        onEdit={handleEditMember}
        onSave={handleSaveMember}
        member={selectedMember}
      />

    </div>
  );
};

export default AdminMembers;
