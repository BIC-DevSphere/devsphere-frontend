import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { X, Upload, User, Loader2 } from 'lucide-react';
import { useMemberForm } from '@/hooks/useMemberForm';

export interface MemberData {
  name: string;
  role: string;
  year: string;
  status: 'ACTIVE' | 'INACTIVE';
  avatar?: File;
  avatarUrl?: string;
  discordUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
}

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (data: MemberData) => void;
  onSave: (data: MemberData) => void;
  member?: MemberData | null;
  isSaving?: boolean;
}

const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  onSave,
  member,
  isSaving = false,
}) => {
  const {
    createMemberData: formData,
    setMemberData,
    handleInputChange,
    handleStatusChange,
    handleAvatarChange,
    removeAvatar,
    validateForm,
    resetForm,
    formErrors: errors,
  } = useMemberForm();

  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string>('');

  // Utility to validate and normalize URLs
  const getSafeUrl = (url?: string) => {
    if (!url) return undefined;
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return url;
      }
    } catch {
      // Invalid URL
    }
    return undefined;
  };

  useEffect(() => {
    if (member) {
      setMemberData(member);
      if (member.avatarUrl) {
        setPreview(member.avatarUrl);
      }
    } else {
      resetForm();
      setPreview('');
    }
  }, [member, isOpen, setMemberData, resetForm]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  const handleStatusChangeWrapper = (value: string) => {
    handleStatusChange(value as 'ACTIVE' | 'INACTIVE');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPreview(blobUrl);
      handleAvatarChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    console.log('File : ', file);
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const blobUrl = URL.createObjectURL(file);
      setPreview(blobUrl);
      handleAvatarChange(file);
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    try {
      onSave(formData);
    } catch (error) {
      console.error('Failed to save member data:', error);
      alert('An error occurred while saving. Please try again.');
    }
  };

  const handleEdit = () => {
    if (!validateForm()) {
      return;
    }
    try {
      onEdit(formData);
    } catch (error) {
      console.error('Failed to save member data:', error);
      alert('An error occurred while saving. Please try again.');
    }
  };

  // Safe URLs for social media
  const safeLinkedinUrl = getSafeUrl(formData.linkedinUrl);
  const safeInstagramUrl = getSafeUrl(formData.instagramUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-card border-border animate-in fade-in-50 zoom-in-95 w-full max-w-lg overflow-hidden rounded-xl border shadow-xl duration-200">
        {/* Header */}
        <div className="border-border/50 flex items-center justify-between border-b p-6 pb-4">
          <div>
            <h2 id="modal-title" className="text-foreground font-heading text-xl font-semibold">
              {member ? 'Edit Member' : 'Add New Member'}
            </h2>
            <p id="modal-description" className="text-muted-foreground mt-1 text-sm">
              {member ? 'Update member information' : 'Add a new team member to your organization'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isSaving}
            className="text-muted-foreground hover:text-foreground h-8 w-8 shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6 p-6">
          {/* Avatar Upload Section */}
          <div className="space-y-3">
            <Label className="text-foreground text-sm font-medium">Profile Picture</Label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="border-border bg-muted h-20 w-20 overflow-hidden rounded-full border-2">
                  {preview ? (
                    <img
                      src={preview ?? formData.avatarUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="bg-secondary flex h-full w-full items-center justify-center">
                      <User className="text-muted-foreground h-8 w-8" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div
                  className={`relative rounded-lg border-2 border-dashed p-4 transition-colors ${
                    isDragOver
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    id="avatar-upload"
                  />
                  <div className="text-center">
                    <Upload className="text-muted-foreground mx-auto mb-2 h-5 w-5" />
                    <p className="text-muted-foreground text-sm">
                      <span className="text-primary font-medium">Click to upload</span> or drag and
                      drop
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground text-sm font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={
                  errors.name ? 'border-destructive focus-visible:ring-destructive/20' : ''
                }
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-destructive text-sm font-medium">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground text-sm font-medium">
                Role / Position *
              </Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer, Designer"
                className={
                  errors.role ? 'border-destructive focus-visible:ring-destructive/20' : ''
                }
                aria-invalid={!!errors.role}
              />
              {errors.role && <p className="text-destructive text-sm font-medium">{errors.role}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-foreground text-sm font-medium">
                  Joined Year *
                </Label>
                <Input
                  id="year"
                  name="year"
                  type="date"
                  value={formData.year}
                  onChange={handleChange}
                  className={
                    errors.year ? 'border-destructive focus-visible:ring-destructive/20' : ''
                  }
                  aria-invalid={!!errors.year}
                />
                {errors.year && (
                  <p className="text-destructive text-sm font-medium">{errors.year}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground text-sm font-medium">Status</Label>
                <Select value={formData.status} onValueChange={handleStatusChangeWrapper}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value="INACTIVE">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                        Inactive
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="border-border/50 space-y-4 border-t pt-4">
              <Label className="text-foreground text-sm font-medium">Social Media Links</Label>

              <div className="space-y-2">
                <Label htmlFor="linkedinUrl" className="text-muted-foreground text-sm font-medium">
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl || ''}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  type="url"
                />
                {/* Render link only if safe */}
                {safeLinkedinUrl && (
                  <a
                    href={safeLinkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary mt-1 block text-xs underline"
                  >
                    View LinkedIn Profile
                  </a>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discordUrl" className="text-muted-foreground text-sm font-medium">
                  Discord Link
                </Label>
                <Input
                  id="discordUrl"
                  name="discordUrl"
                  value={formData.discordUrl || ''}
                  onChange={handleChange}
                  placeholder="username#1234"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagramUrl" className="text-muted-foreground text-sm font-medium">
                  Instagram Profile
                </Label>
                <Input
                  id="instagramUrl"
                  name="instagramUrl"
                  value={formData.instagramUrl || ''}
                  onChange={handleChange}
                  placeholder="https://instagram.com/username"
                  type="url"
                />
                {/* Render link only if safe */}
                {safeInstagramUrl && (
                  <a
                    href={safeInstagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary mt-1 block text-xs underline"
                  >
                    View Instagram Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-border/50 bg-muted/30 flex items-center justify-end gap-3 border-t p-6 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isSaving} className="min-w-20">
            Cancel
          </Button>
          {member ? (
            <Button onClick={handleEdit} disabled={isSaving} className="min-w-24">
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating…
                </span>
              ) : (
                'Update Member'
              )}
            </Button>
          ) : (
            <Button onClick={handleSave} disabled={isSaving} className="min-w-24">
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating…
                </span>
              ) : (
                'Create Member'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
