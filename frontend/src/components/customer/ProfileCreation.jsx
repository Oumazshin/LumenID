import { useState } from "react";
import { useNavigate } from "react-router";
import { User, GraduationCap, Calendar, Building2, MapPin, FileText, Upload, CheckCircle2, Shield, Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { PageTransition } from "../PageTransition";

export function ProfileCreation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [secretPhraseCopied, setSecretPhraseCopied] = useState(false);
  const [secretPhraseConfirmed, setSecretPhraseConfirmed] = useState(false);
  
  const [secretPhrase] = useState(() => {
    const words = [
      "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
      "absurd", "abuse", "access", "accident", "account", "accuse", "achieve", "acid",
      "acoustic", "acquire", "across", "act", "action", "actor", "actress", "actual",
      "adapt", "add", "addict", "address", "adjust", "admit", "adult", "advance",
      "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent",
      "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album"
    ];
    const phrase = [];
    for (let i = 0; i < 12; i++) {
      phrase.push(words[Math.floor(Math.random() * words.length)]);
    }
    return phrase;
  });
  
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    institution: "",
    degree: "",
    fieldOfStudy: "",
    graduationStatus: "",
    graduationDate: "",
    studentId: "",
    transcriptFile: null,
    diplomaFile: null,
    idDocumentFile: null,
    linkedinUrl: "",
    portfolioUrl: "",
    bio: ""
  });

  const steps = [
    { number: 1, title: "Personal Information", icon: User },
    { number: 2, title: "Education Details", icon: GraduationCap },
    { number: 3, title: "Document Upload", icon: Upload },
    { number: 4, title: "Additional Info", icon: FileText },
    { number: 5, title: "Secret Phrase", icon: Shield }
  ];

  const handleFileChange = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setCurrentStep(5);
  };

  const handleCopySecretPhrase = () => {
    navigator.clipboard.writeText(secretPhrase.join(" "));
    setSecretPhraseCopied(true);
    toast.success("Secret phrase copied to clipboard!");
  };

  const handleConfirmAndFinish = () => {
    if (!secretPhraseConfirmed) {
      toast.error("Please confirm that you have saved your secret phrase");
      return;
    }
    toast.success("Profile created successfully! Redirecting to dashboard...");
    setTimeout(() => {
      navigate("/customer/dashboard");
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen py-grid-12 px-grid-4 sm:px-grid-6 lg:px-grid-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="text-center mt-8 flex flex-col items-center gap-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Create Your Profile
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete your profile to start managing your credentials
            </p>
          </div>

          <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1 gap-2">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30"
                          : isActive
                          ? "bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30 scale-110"
                          : "bg-secondary/50 border-2 border-border/50 backdrop-blur-xl"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                      )}
                    </div>
                    <p className={`text-xs text-center max-w-[80px] leading-tight ${isActive ? "font-semibold text-cyan-400" : "text-muted-foreground"}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-3 transition-all duration-300 ${isCompleted ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-border/50"}`} />
                  )}
                </div>
              );
            })}
          </div>

          <Card className="border border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
            <CardHeader className="border-b border-border/50 bg-card/40 backdrop-blur-xl">
              <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Step {currentStep}: {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-base">
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "Share your educational background"}
                {currentStep === 3 && "Upload your credential documents"}
                {currentStep === 4 && "Add optional information to enhance your profile"}
                {currentStep === 5 && "Secure your profile with a secret phrase"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-grid-6">
              <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-section-small)' }}>
                {currentStep === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-medium)' }}>
                    <div className="grid md:grid-cols-2 gap-grid-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date of Birth
                        </Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          required
                          className="bg-background/50 border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input
                          id="nationality"
                          placeholder="e.g., United States"
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                          required
                          className="bg-background/50 border-border/50"
                        />
                      </div>
                    </div>
                    {/* ... (Address fields follow same pattern) */}
                  </div>
                )}
                {/* Steps 2-5 continue using standard JSX patterns without type annotations */}
                
                <div className="flex gap-grid-3 pt-grid-6 border-t border-border/50">
                  {currentStep > 1 && currentStep !== 5 && (
                    <Button
                      type="button"
                      onClick={handlePrevious}
                      variant="outline"
                      className="flex-1 h-12 border-border/50 bg-background/50 backdrop-blur-xl hover:bg-secondary/50"
                    >
                      Previous
                    </Button>
                  )}
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:opacity-90 text-white border-0 shadow-lg shadow-cyan-500/30"
                    >
                      Next Step
                    </Button>
                  ) : currentStep === 4 ? (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white border-0 shadow-lg shadow-green-500/30"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Complete Profile
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleConfirmAndFinish}
                      className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white border-0 shadow-lg shadow-green-500/30"
                      disabled={!secretPhraseConfirmed}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Confirm & Finish
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}