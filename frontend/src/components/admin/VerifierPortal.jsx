import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Eye,
  Download,
  AlertTriangle,
  ShieldAlert,
  Filter,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "../PageTransition";
import { useSubmissions } from "../../hooks/useSubmissions";
import { twTransitions } from "../../styles/animations";

export function VerifierPortal() {
  const { submissions, isLoading, error, approveSubmission, rejectSubmission } = useSubmissions();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [verificationNotes, setVerificationNotes] = useState("");

  const filteredSubmissions = useMemo(() => submissions.filter(
    (sub) =>
      sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.credentialType.toLowerCase().includes(searchTerm.toLowerCase())
  ), [submissions, searchTerm]);

  const pendingSubmissions = useMemo(() => submissions.filter(s => s.status === "pending"), [submissions]);

  const handleReview = (credential) => {
    setSelectedCredential(credential);
    setReviewDialogOpen(true);
    setRejectionReason("");
    setVerificationNotes("");
  };

  const handleApprove = () => {
    if (selectedCredential) {
      approveSubmission(selectedCredential.id);
      toast.success(`Credential ${selectedCredential.id} verified heavily on-chain.`);
      setReviewDialogOpen(false);
      setSelectedCredential(null);
    }
  };

  const handleReject = () => {
    if (selectedCredential && rejectionReason) {
      rejectSubmission(selectedCredential.id, rejectionReason);
      toast.error(`Credential ${selectedCredential.id} successfully rejected.`);
      setReviewDialogOpen(false);
      setSelectedCredential(null);
      setRejectionReason("");
    } else {
      toast.error("A valid rejection reason is required for compliance.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 px-3 py-1 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30 px-3 py-1 text-xs">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Pending Action
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/30 px-3 py-1 text-xs">
            <XCircle className="w-3.5 h-3.5 mr-1.5" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/30 text-xs px-2.5 font-bold uppercase tracking-wider">High</Badge>;
      case "normal":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs px-2.5 font-bold uppercase tracking-wider">Normal</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-slate-500/10 text-slate-400 border-slate-500/30 text-xs px-2.5 font-bold uppercase tracking-wider">Low</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Loading verification queue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertTriangle className="w-12 h-12 text-destructive" />
        <p className="text-lg font-bold text-destructive">Error Loading Data</p>
        <p className="text-sm font-medium text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-8 w-full pb-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/40 border border-border/50 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-sm">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Verification Portal
            </h1>
            <p className="text-base text-muted-foreground max-w-xl">
              Cryptographically review and process incoming credential submissions with zero-trust architecture.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
             <div className="flex items-center gap-3 bg-card/60 border border-border/50 rounded-xl p-1.5 backdrop-blur-md">
                 <div className="px-4 py-2 flex flex-col items-center border-r border-border/50">
                    <span className="text-xl font-bold text-emerald-400 leading-none mb-1">{pendingSubmissions.length}</span>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Pending</span>
                 </div>
                 <div className="px-4 py-2 flex flex-col items-center">
                    <span className="text-xl font-bold text-foreground leading-none mb-1">{submissions.length}</span>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Total</span>
                 </div>
             </div>
          </div>
        </div>

        {/* High Priority Alerts */}
        {pendingSubmissions.some(s => s.priority === "high") && (
          <div className="flex items-center justify-between gap-5 p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-500/20 rounded-full flex items-center justify-center shrink-0 text-rose-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-rose-500 mb-0.5">High Priority Items Pending</h3>
                <p className="text-sm font-medium text-rose-500/80">
                  {pendingSubmissions.filter(s => s.priority === "high").length} submissions require strict and immediate attention.
                </p>
              </div>
            </div>
            <Button variant="outline" className="hidden sm:flex border-rose-500/30 text-rose-500 hover:bg-rose-500/10">
              View Priority Queue
            </Button>
          </div>
        )}

        {/* Data Table Card */}
        <Card className="border border-border/50 bg-card/40 backdrop-blur-xl shadow-sm rounded-[2rem] overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-5 pt-8 px-6 sm:px-8 bg-card/30">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-bold text-foreground">Verification Queue</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Manage and resolve pending credential issues</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 bg-background/50 border-border/50 focus-visible:ring-primary rounded-xl"
                />
              </div>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl shrink-0">
                <Filter className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-card/30">
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="pl-6 sm:pl-8 h-12 text-xs font-semibold tracking-wider uppercase">Submission ID</TableHead>
                    <TableHead className="h-12 text-xs font-semibold tracking-wider uppercase">Subject</TableHead>
                    <TableHead className="h-12 text-xs font-semibold tracking-wider uppercase">Credential Type</TableHead>
                    <TableHead className="h-12 text-xs font-semibold tracking-wider uppercase">Origin Institution</TableHead>
                    <TableHead className="h-12 text-xs font-semibold tracking-wider uppercase">Submitted</TableHead>
                    <TableHead className="h-12 text-xs font-semibold tracking-wider uppercase">Priority</TableHead>
                    <TableHead className="h-12 text-xs font-semibold tracking-wider uppercase">State</TableHead>
                    <TableHead className="pr-6 sm:pr-8 h-12 text-xs font-semibold tracking-wider uppercase text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length === 0 ? (
                     <TableRow>
                       <TableCell colSpan={8} className="h-32 text-center text-muted-foreground font-medium">
                         No submissions found matching your search.
                       </TableCell>
                     </TableRow>
                  ) : filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id} className="hover:bg-white/5 border-border/50 transition-colors group">
                      <TableCell className="pl-6 sm:pl-8 font-mono text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{submission.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-foreground mb-0.5">{submission.customerName}</span>
                          <span className="text-xs text-muted-foreground">{submission.customerEmail}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{submission.credentialType}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{submission.institution}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{submission.submittedDate}</TableCell>
                      <TableCell>{getPriorityBadge(submission.priority)}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="pr-6 sm:pr-8 text-right">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleReview(submission)}
                          className={`rounded-lg bg-secondary/50 hover:bg-primary hover:text-primary-foreground shadow-none ${twTransitions.base}`}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review File
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Review Dialog */}
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent className="max-w-3xl border border-white/10 bg-background/95 backdrop-blur-3xl p-0 overflow-hidden shadow-2xl rounded-3xl sm:rounded-[2rem]">
            {selectedCredential && (
              <>
                <div className="p-6 sm:p-10 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-b border-white/5 relative">
                  <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                     {getPriorityBadge(selectedCredential.priority)}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 shadow-inner border border-emerald-500/20 backdrop-blur-md">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <DialogTitle className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight text-foreground">Review Submission</DialogTitle>
                  <DialogDescription className="text-base sm:text-lg">
                    Carefully review the cryptographic artifacts for {selectedCredential.id} before proceeding.
                  </DialogDescription>
                </div>

                <div className="p-6 sm:p-10 space-y-10 overflow-y-auto max-h-[60vh] custom-scrollbar">
                  
                  {/* Customer Information Block */}
                  <div className="space-y-4">
                     <h4 className="text-xs font-bold tracking-widest text-muted-foreground/80 uppercase">Subject Identity</h4>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-black/20 border border-white/5">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-muted-foreground uppercase">Name</span>
                          <span className="font-bold text-sm truncate">{selectedCredential.customerName}</span>
                        </div>
                        <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                          <span className="text-xs font-semibold text-muted-foreground uppercase">Email Address</span>
                          <span className="font-bold text-sm truncate text-primary">{selectedCredential.customerEmail}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-muted-foreground uppercase">Credential Type</span>
                          <span className="font-bold text-sm truncate">{selectedCredential.credentialType}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-muted-foreground uppercase">Origin</span>
                          <span className="font-bold text-sm truncate">{selectedCredential.institution}</span>
                        </div>
                     </div>
                  </div>

                  {/* Documents Block */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold tracking-widest text-muted-foreground/80 uppercase">Attached Proofs</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedCredential.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center text-primary/80">
                               <FileText className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold">{doc}</span>
                          </div>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input Areas */}
                  <div className="grid gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-bold tracking-widest text-muted-foreground/80 uppercase">Auditor Notes (Optional)</label>
                      <Textarea
                        placeholder="Attach any cryptographic resolution notes or internal auditing data here..."
                        value={verificationNotes}
                        onChange={(e) => setVerificationNotes(e.target.value)}
                        className="min-h-[100px] resize-none bg-black/20 border-white/10 focus-visible:ring-emerald-500 rounded-xl px-4 py-3"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold tracking-widest text-rose-500/80 uppercase flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5"/>
                        Revocation Justification (Required if Rejecting)
                      </label>
                      <Textarea
                        placeholder="Provide explicit failure codes or rejection rationale for logging purposes..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="min-h-[100px] resize-none bg-rose-500/5 focus-visible:ring-rose-500 border-rose-500/20 rounded-xl px-4 py-3 text-rose-400 placeholder:text-rose-500/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 p-5 sm:px-10 border-t border-white/5 flex flex-col-reverse sm:flex-row justify-end gap-3 backdrop-blur-xl">
                  <Button 
                    variant="ghost" 
                    onClick={() => setReviewDialogOpen(false)} 
                    className={`sm:w-auto w-full rounded-xl h-11 hover:bg-white/10 ${twTransitions.buttonHover}`}
                  >
                    Cancel Audit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleReject}
                    disabled={!rejectionReason || selectedCredential.status !== "pending"}
                    className={`sm:w-auto w-full rounded-xl h-11 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20 ${twTransitions.buttonHover}`}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Claim
                  </Button>
                  <Button
                    onClick={handleApprove}
                    disabled={selectedCredential.status !== "pending"}
                    className={`bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 sm:w-auto w-full text-white shadow-lg shadow-emerald-500/20 rounded-xl h-11 px-8 font-semibold ${twTransitions.buttonHover}`}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Cryptographically Approve
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