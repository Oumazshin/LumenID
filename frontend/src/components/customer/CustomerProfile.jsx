import { useState, useEffect } from "react";
import userService from "../../api/userService";
import { Loader2, AlertCircle, UserCircle, Mail, Phone, MapPin, GraduationCap, Globe, ShieldCheck, Wallet, Calendar, Linkedin, ExternalLink, Milestone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { PageTransition } from "../PageTransition";
import { twTransitions } from "../../styles/animations";

export function CustomerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    institution: "",
    degree: "",
    fieldOfStudy: "",
    graduationDate: "",
    studentId: "",
    linkedinUrl: "",
    portfolioUrl: "",
    bio: "",
    did: "",
    walletAddress: "",
    verifiedStatus: "",
    memberSince: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await userService.getProfile();
        setFormData(prev => ({ ...prev, ...data }));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await userService.updateProfile(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Changes cancelled");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-destructive font-bold">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }


  return (
    <PageTransition>
      <div className="flex flex-col gap-12 pb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Left Column: Digital Identity & Quick Status */}
            <div className="lg:col-span-1 space-y-8">
              <Card className={`group relative border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden ${twTransitions.base}`}>
                {/* mesh gradient header */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 -z-10" />
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <ShieldCheck className="w-12 h-12 text-primary" />
                </div>
                
                <CardContent className="relative pt-12 p-8">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="w-24 h-24 rounded-full bg-background/80 border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden relative">
                        <UserCircle className="w-16 h-16 text-muted-foreground/30" />
                        {/* Status ring */}
                        <div className="absolute inset-0 border-2 border-emerald-500/40 rounded-full" />
                      </div>
                    </div>

                    <div className="text-center space-y-1 mb-6">
                      <h2 className="text-2xl font-black tracking-tight">
                        {isEditing ? (
                          <Input 
                            name="fullName"
                            value={formData.fullName} 
                            onChange={handleInputChange}
                            className="bg-background/40 border-border/50 text-center font-black h-9"
                          />
                        ) : formData.fullName}
                      </h2>
                      <p className="text-xs font-bold text-primary/80 uppercase tracking-[0.2em]">{formData.fieldOfStudy}</p>
                    </div>

                    <div className="w-full space-y-4 px-2">
                       <div className="flex flex-col gap-1 p-3 rounded-2xl bg-white/5 border border-white/10">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Identity Tier</span>
                         <div className="flex items-center justify-between">
                           <span className="text-sm font-bold text-emerald-400">Verified {formData.verifiedStatus}</span>
                           <ShieldCheck className="w-4 h-4 text-emerald-500" />
                         </div>
                       </div>

                       <div className="flex flex-col gap-2 p-1 pt-4">
                        <div className="flex items-center justify-between text-[11px] font-medium px-1">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Wallet className="w-3.5 h-3.5" /> Wallet ID
                          </span>
                          <span className="font-mono text-primary/90">{formData.walletAddress}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-medium px-1">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" /> Registry Date
                          </span>
                          <span>{formData.memberSince}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blockchain ID Card */}
              <Card className="border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden relative group">
                {/* Decorative scanning line animation effect */}
                <div className="absolute inset-x-0 h-[1px] bg-primary/20 top-0 group-hover:top-full transition-all duration-[2000ms] pointer-events-none" />
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Milestone className="w-4 h-4 text-primary" />
                    <CardTitle className="text-xs font-bold uppercase tracking-widest">Decentralized ID</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="p-4 rounded-xl bg-black/20 border border-white/5 break-all font-mono text-[10px] text-primary/70 leading-relaxed shadow-inner">
                    {formData.did}
                  </div>
                </CardContent>
              </Card>
            </div>

          {/* Right Column: Detailed Sections */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-border/50 bg-card/40 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <UserCircle className="w-6 h-6 text-primary" />
                    <CardTitle>Personal Profile</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Full Legal Name</Label>
                    <Input name="fullName" value={formData.fullName} onChange={handleInputChange} disabled={!isEditing} className="bg-background/40 border-border/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Email Address</Label>
                    <Input name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className="bg-background/40 border-border/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Phone Number</Label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} className="bg-background/40 border-border/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Nationality</Label>
                    <Input name="nationality" value={formData.nationality} onChange={handleInputChange} disabled={!isEditing} className="bg-background/40 border-border/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Bio / Professional Summary</Label>
                  <Textarea name="bio" value={formData.bio} onChange={handleInputChange} disabled={!isEditing} className="bg-background/40 border-border/50 min-h-[100px]" />
                </div>
              </CardContent>
            </Card>

            {/* Academic History Card */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <CardTitle>Academic Credentials</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg">{formData.institution}</h4>
                      <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">ACTIVE</span>
                    </div>
                    <p className="text-foreground/80">{formData.degree} in {formData.fieldOfStudy}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Graduating {formData.graduationDate}</span>
                      <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> ID: {formData.studentId}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Online Presence Card */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Globe className="w-6 h-6 text-primary" />
                  <CardTitle>Professional Presence</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center justify-between p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-[#0077B5]" />
                    <span className="text-sm font-medium">LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
                <a href={formData.portfolioUrl} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center justify-between p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 hover:bg-purple-500/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium">Personal Portfolio</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}