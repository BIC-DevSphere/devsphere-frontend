import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { X, Upload, User } from "lucide-react";
import { useMemberForm } from "@/hooks/useMemberForm";

export interface MemberData {
  name: string;
  role: string;
  year: string;
  status: "ACTIVE" | "INACTIVE";
  avatar?: File;
  avatarUrl?: string;
}

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (data: MemberData) => void;
  onSave: (data: MemberData) => void;
  member?: MemberData | null;
}

const MemberModal: React.FC<MemberModalProps> = ({ isOpen, onClose, onEdit, onSave, member }) => {
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
  const [preview, setPreview] = useState<string>("")

  useEffect(() => {
    if (member) {
      setMemberData(member);
      if (member.avatarUrl) {
        setPreview(member.avatarUrl);
      }
    } else {
      resetForm();
      setPreview("");
    }
  }, [member, isOpen, setMemberData, resetForm]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  const handleStatusChangeWrapper = (value: string) => {
    handleStatusChange(value as "ACTIVE" | "INACTIVE");
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
    console.log("File : ", file)
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
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
      console.error("Failed to save member data:", error);
      alert("An error occurred while saving. Please try again.");
    }
  }

  const handleEdit = () => {
    if (!validateForm()) {
      return;
    }
    try {
      onEdit(formData)
    } catch (error) {
      console.error("Failed to save member data:", error);
      alert("An error occurred while saving. Please try again.");
    }
  }



  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
          <div>
            <h2 id="modal-title" className="text-xl font-semibold text-foreground font-heading">
              {member ? "Edit Member" : "Add New Member"}
            </h2>
            <p id="modal-description" className="text-sm text-muted-foreground mt-1">
              {member ? "Update member information" : "Add a new team member to your organization"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground h-8 w-8 shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Avatar Upload Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Profile Picture</Label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-border bg-muted overflow-hidden">
                  {preview ? (
                    <img
                      src={preview ?? formData.avatarUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="avatar-upload"
                  />
                  <div className="text-center">
                    <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">Click to upload</span> or drag and
                      drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={errors.name ? "border-destructive focus-visible:ring-destructive/20" : ""}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive font-medium">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-foreground">
                Role / Position *
              </Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer, Designer"
                className={errors.role ? "border-destructive focus-visible:ring-destructive/20" : ""}
                aria-invalid={!!errors.role}
              />
              {errors.role && (
                <p className="text-sm text-destructive font-medium">{errors.role}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-foreground">
                  Joined Year *
                </Label>
                <Input
                  id="year"
                  name="year"
                  type="date"
                  value={formData.year}
                  onChange={handleChange}
                  className={errors.year ? "border-destructive focus-visible:ring-destructive/20" : ""}
                  aria-invalid={!!errors.year}
                />
                {errors.year && (
                  <p className="text-sm text-destructive font-medium">{errors.year}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Status</Label>
                <Select value={formData.status} onValueChange={handleStatusChangeWrapper}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value="INACTIVE">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        Inactive
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-border/50 bg-muted/30">
          <Button variant="outline" onClick={onClose} className="min-w-20">
            Cancel
          </Button>
          {member ?
            <Button onClick={handleEdit} className="min-w-20">Update Member</Button>
            : <Button onClick={handleSave} className="min-w-20">Create Member</Button>
          }
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
