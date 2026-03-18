import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { mockCredentials } from "../../data/mockData";

export function DetailedRecords() {
  const mainCredential = mockCredentials[0];
  const [disclosureSettings, setDisclosureSettings] = useState({
    fullName: true,
    program: true,
    gpa: true,
    honors: true,
    skills: true,
    graduationDate: false,
  });

  const toggleDisclosure = (field) => {
    setDisclosureSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-xl bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Detailed Records</CardTitle>
        <p className="text-sm text-muted-foreground">
          Selective Disclosure Engine - Control what information you share
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-indigo-400">
            Toggle individual fields to control what information is included in your Verifiable Presentation. Hidden
            fields use Zero-Knowledge Proofs to protect your privacy.
          </p>
        </div>

        {/* Disclosure Controls */}
        <div className="space-y-3">
          {/* Full Name */}
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border">
            <div className="flex items-center gap-3">
              {disclosureSettings.fullName ? (
                <Eye className="w-4 h-4 text-green-400" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <Label className="font-medium">Full Name</Label>
                <p className="text-sm text-muted-foreground">{mainCredential.claims.fullName}</p>
              </div>
            </div>
            <Switch
              checked={disclosureSettings.fullName}
              onCheckedChange={() => toggleDisclosure("fullName")}
            />
          </div>

          {/* Program */}
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border">
            <div className="flex items-center gap-3">
              {disclosureSettings.program ? (
                <Eye className="w-4 h-4 text-green-400" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <Label className="font-medium">Program</Label>
                <p className="text-sm text-muted-foreground">{mainCredential.claims.program}</p>
              </div>
            </div>
            <Switch
              checked={disclosureSettings.program}
              onCheckedChange={() => toggleDisclosure("program")}
            />
          </div>

          {/* GPA */}
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border">
            <div className="flex items-center gap-3">
              {disclosureSettings.gpa ? (
                <Eye className="w-4 h-4 text-green-400" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <Label className="font-medium">GPA</Label>
                <p className="text-sm text-muted-foreground">{mainCredential.claims.gpa}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!disclosureSettings.gpa && (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                  Protected by ZKP
                </Badge>
              )}
              <Switch
                checked={disclosureSettings.gpa}
                onCheckedChange={() => toggleDisclosure("gpa")}
              />
            </div>
          </div>

          {/* Honors */}
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border">
            <div className="flex items-center gap-3">
              {disclosureSettings.honors ? (
                <Eye className="w-4 h-4 text-green-400" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <Label className="font-medium">Honors</Label>
                <p className="text-sm text-muted-foreground">{mainCredential.claims.honors}</p>
              </div>
            </div>
            <Switch
              checked={disclosureSettings.honors}
              onCheckedChange={() => toggleDisclosure("honors")}
            />
          </div>

          {/* Skills */}
          {mainCredential.claims.skills && (
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border">
              <div className="flex items-center gap-3">
                {disclosureSettings.skills ? (
                  <Eye className="w-4 h-4 text-green-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <Label className="font-medium">Skills</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mainCredential.claims.skills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Switch
                checked={disclosureSettings.skills}
                onCheckedChange={() => toggleDisclosure("skills")}
              />
            </div>
          )}

          {/* Graduation Date */}
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border">
            <div className="flex items-center gap-3">
              {disclosureSettings.graduationDate ? (
                <Eye className="w-4 h-4 text-green-400" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <Label className="font-medium">Graduation Date</Label>
                <p className="text-sm text-muted-foreground">{mainCredential.claims.graduationDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!disclosureSettings.graduationDate && (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                  Protected by ZKP
                </Badge>
              )}
              <Switch
                checked={disclosureSettings.graduationDate}
                onCheckedChange={() => toggleDisclosure("graduationDate")}
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-secondary/50 rounded-lg p-4 mt-4 border">
          <p className="text-sm">
            <span className="font-semibold">
              {Object.values(disclosureSettings).filter(Boolean).length}
            </span>{" "}
            of {Object.keys(disclosureSettings).length} fields will be shared
          </p>
        </div>
      </CardContent>
    </Card>
  );
}