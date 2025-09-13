import React, { useState } from 'react';
import { useAuth, StudentProfile } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Heart,
  CreditCard,
  Users,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>({});
  const { toast } = useToast();

  if (!user || user.role !== 'student') {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p>Profile access is only available for students.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profile = user.profile as StudentProfile;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = async () => {
    const success = await updateProfile(editedProfile);
    if (success) {
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({});
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const currentProfile = isEditing ? editedProfile : profile;

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-hero" />
        <CardContent className="relative p-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16">
            <Avatar className="h-24 w-24 border-4 border-background shadow-strong">
              <AvatarImage src={profile.profileImage} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                  <p className="text-muted-foreground">{profile.branch}</p>
                </div>
                
                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline" size="sm">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm" className="bg-success text-success-foreground">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{profile.course}</Badge>
                <Badge>{`Semester ${profile.semester}`}</Badge>
                <Badge variant="outline">{`Year ${profile.year}`}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                {isEditing ? (
                  <Input
                    value={currentProfile.name || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                {isEditing ? (
                  <Input
                    value={currentProfile.gender || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, gender: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.gender}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={currentProfile.dob || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, dob: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.dob}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Nationality</Label>
                {isEditing ? (
                  <Input
                    value={currentProfile.nationality || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, nationality: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.nationality}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Religion</Label>
                {isEditing ? (
                  <Input
                    value={currentProfile.religion || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, religion: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.religion}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-destructive" />
                  Blood Group
                </Label>
                {isEditing ? (
                  <Input
                    value={currentProfile.bloodGroup || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, bloodGroup: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.bloodGroup}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Information */}
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Academic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Admission Number</Label>
                <p className="text-sm text-muted-foreground">{profile.admissionNo}</p>
              </div>

              <div className="space-y-2">
                <Label>Roll Number</Label>
                <p className="text-sm text-muted-foreground">{profile.rollNo}</p>
              </div>

              <div className="space-y-2">
                <Label>Course</Label>
                <p className="text-sm text-muted-foreground">{profile.course}</p>
              </div>

              <div className="space-y-2">
                <Label>Branch</Label>
                <p className="text-sm text-muted-foreground">{profile.branch}</p>
              </div>

              <div className="space-y-2">
                <Label>10th Marks</Label>
                <p className="text-sm text-muted-foreground">{profile.tenthMarks} CGPA</p>
              </div>

              <div className="space-y-2">
                <Label>Intermediate Marks</Label>
                <p className="text-sm text-muted-foreground">{profile.interMarks}</p>
              </div>

              <div className="space-y-2">
                <Label>Entrance Type</Label>
                <p className="text-sm text-muted-foreground">{profile.entranceType}</p>
              </div>

              {profile.eamcetRank && (
                <div className="space-y-2">
                  <Label>EAMCET Rank</Label>
                  <p className="text-sm text-muted-foreground">{profile.eamcetRank}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Last Studied</Label>
                <p className="text-sm text-muted-foreground">{profile.lastStudied}</p>
              </div>

              <div className="space-y-2">
                <Label>Joining Date</Label>
                <p className="text-sm text-muted-foreground">{profile.joiningDate}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={currentProfile.email || ''}
                      onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      value={currentProfile.phoneNumber || ''}
                      onChange={(e) => setEditedProfile({...editedProfile, phoneNumber: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.phoneNumber}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Present Address
                  </Label>
                  {isEditing ? (
                    <Textarea
                      value={currentProfile.presentAddress || ''}
                      onChange={(e) => setEditedProfile({...editedProfile, presentAddress: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.presentAddress}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Permanent Address
                  </Label>
                  {isEditing ? (
                    <Textarea
                      value={currentProfile.permanentAddress || ''}
                      onChange={(e) => setEditedProfile({...editedProfile, permanentAddress: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.permanentAddress}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Bank Account
                  </Label>
                  <p className="text-sm text-muted-foreground">{profile.bankAccount}</p>
                </div>

                <div className="space-y-2">
                  <Label>Ration Card</Label>
                  <p className="text-sm text-muted-foreground">{profile.rationCard}</p>
                </div>

                <div className="space-y-2">
                  <Label>Aadhaar Card</Label>
                  <p className="text-sm text-muted-foreground">{profile.aadhaarCard}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Family Information */}
        <TabsContent value="family" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Family Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Father's Name</Label>
                {isEditing ? (
                  <Input
                    value={currentProfile.fatherName || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, fatherName: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.fatherName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Mother's Name</Label>
                {isEditing ? (
                  <Input
                    value={currentProfile.motherName || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, motherName: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.motherName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Parent Contact</Label>
                {isEditing ? (
                  <Input
                    value={currentProfile.parentContact || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, parentContact: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.parentContact}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Parent Occupation</Label>
                {isEditing ? (
                  <Input
                    value={currentProfile.parentOccupation || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, parentOccupation: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.parentOccupation}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Annual Income</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={currentProfile.annualIncome || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, annualIncome: Number(e.target.value)})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">₹ {profile.annualIncome?.toLocaleString('en-IN')}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;