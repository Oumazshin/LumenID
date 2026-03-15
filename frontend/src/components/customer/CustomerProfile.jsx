import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { UserCircle, Mail, Phone, MapPin, GraduationCap, Globe } from "lucide-react";
import { PageTransition } from "../PageTransition";

export function CustomerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-05-15",
    nationality: "United States",
    address: "123 Main Street",
    city: "San Francisco",
    country: "USA",
    postalCode: "94102",
    institution: "Stanford University",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    graduationDate: "2024-05-20",
    studentId: "STU987654",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    portfolioUrl: "https://johndoe.com",
    bio: "Passionate CS graduate interested in AI and machine learning."
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Changes cancelled");
  };


  return (
    <PageTransition>
      <div className="page-shell">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                My Profile
              </h1>
              <p className="text-muted-foreground">Manage your personal information and credentials</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="h-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  <Button onClick={handleSave} className="h-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">Save Changes</Button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <UserCircle className="w-6 h-6 text-primary" />
                  <CardTitle>Personal Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={formData.fullName} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={formData.email} disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* ... (Address, Education, and Presence cards follow standard JSX input patterns) */}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}