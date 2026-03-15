import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  StatusBadge,
  PriorityBadge,
} from "../../utils/badge";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  Share2,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { PageTransition, StaggerContainer, StaggerItem } from "../PageTransition";
import { mockCredentials } from "../../data/mockData";


export function CustomerDashboard() {
  const navigate = useNavigate();
  const [selectedCredential, setSelectedCredential] = useState(null);
  
  const [credentials] = useState(mockCredentials);

  import { StatusBadge } from '../../utils/badge.js';

  // Remove getStatusBadge - use StatusBadge component


  const stats = {
    total: credentials.length,
    verified: credentials.filter(c => c.status === "active").length,
    pending: credentials.filter(c => c.status === "pending").length,
    rejected: credentials.filter(c => c.status === "revoked").length
  };

  return (
    <PageTransition>
      <div className="page-shell">
        <div className="page-container flex flex-col gap-8">
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Customer Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your digital credentials and identity vault
            </p>
          </div>

          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StaggerItem>
                <Card className="border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total Credentials</p>
                  </CardContent>
                </Card>
              </StaggerItem>
              {/* Additional stat cards would follow same pattern */}
            </div>
          </StaggerContainer>

          <Card className="border">
            <CardHeader>
              <CardTitle>Recent Credentials</CardTitle>
              <CardDescription>Track the status of your submitted credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {credentials.map((credential) => (
                  <Card key={credential.id} className="border hover:border-primary/30 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h4 className="font-semibold">{credential.type}</h4>
                            <StatusBadge status={credential.status} />
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{credential.issuer}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button variant="outline" size="sm" onClick={() => setSelectedCredential(credential)}>View</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Credential Details Dialog */}
        <Dialog open={!!selectedCredential} onOpenChange={() => setSelectedCredential(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border">
            {selectedCredential && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedCredential.type}</DialogTitle>
                  <DialogDescription>Issued by {selectedCredential.issuer}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Issued Date</p>
                      <p className="font-semibold">{selectedCredential.issuedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <StatusBadge status={selectedCredential.status} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Claims</h4>
                    <div className="p-4 border rounded-lg bg-secondary/30">
                      <pre className="text-sm whitespace-pre-wrap font-mono">
                        {JSON.stringify(selectedCredential.claims, null, 2)}
                      </pre>
                    </div>
                  </div>
                  {selectedCredential.hash && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Blockchain Hash</h4>
                      <p className="font-mono text-sm break-all text-muted-foreground">{selectedCredential.hash}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedCredential(null)}>Close</Button>
                  <Button>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
