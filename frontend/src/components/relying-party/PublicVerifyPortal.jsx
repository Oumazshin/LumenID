import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Search,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { motion } from "motion/react";
import { IntegrityIcon, AuthenticityIcon, ValidityIcon, VerifierIcon } from "../icons/LumenIcons";
import { VerificationResult } from "./VerificationResult";

// Mock API Call
const verifyDID = async (did) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate an invalid credential if it starts with 'INV' or is empty
      if (did.toUpperCase().startsWith("INV") || did === "000") {
        resolve(null);
      } else {
        // Simulate a successful verification listing multiple credentials
        resolve({
          did: did.startsWith("DID:") ? did : `DID:LUMEN:${did}`,
          studentName: "Alex Mercer",
          credentials: [
            {
              id: "VC-001",
              program: "Master of Science in Computer Science",
              issueDate: "May 15, 2025",
              issuer: "Lumen University",
              status: "authentic",
              hash: "0x8f9a...3b2c",
              file: {
                name: "diploma.pdf",
                type: "pdf",
                url: "https://images.unsplash.com/photo-1758270703329-71ad465663eb?w=1080&q=80"
              }
            },
            {
              id: "VC-002",
              program: "Blockchain Developer Certification",
              issueDate: "August 22, 2024",
              issuer: "Web3 Institute",
              status: "authentic",
              hash: "0x1a2b...9c8d",
              file: {
                name: "certificate.jpg",
                type: "jpg",
                url: "https://images.unsplash.com/photo-1559588501-59a118c47e59?w=1080&q=80"
              }
            },
            {
              id: "VC-003",
              program: "Academic Transcript",
              issueDate: "May 10, 2025",
              issuer: "Lumen University",
              status: "authentic",
              hash: "0x5e6f...7g8h",
              file: {
                name: "transcript.png",
                type: "png",
                url: "https://images.unsplash.com/photo-1618349131765-99f84a166364?w=1080&q=80"
              }
            }
          ]
        });
      }
    }, 1500); // 1.5 second delay to show loading state
  });
};

export function PublicVerifyPortal() {
  const [searchParams, setSearchParams] = useSearchParams();

  const idFromUrl = searchParams.get("id");
  const [inputId, setInputId] = useState(idFromUrl || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  // Verification Stages for UI feedback
  const [stage, setStage] = useState(0);

  // Auto-verify if ID is in URL on mount or URL change
  useEffect(() => {
    if (idFromUrl) {
      handleVerify(idFromUrl);
    }
  }, [idFromUrl]);

  const stageIntervalRef = useRef(null);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (stageIntervalRef.current) {
        clearInterval(stageIntervalRef.current);
      }
    };
  }, []);

  const handleVerify = async (idToVerify) => {
    if (!idToVerify.trim()) return;

    // Update URL to match current search
    setSearchParams({ id: idToVerify });
    setLoading(true);
    setResult(null);
    setSearched(true);
    setStage(1); // Connecting to network

    if (stageIntervalRef.current) clearInterval(stageIntervalRef.current);

    // Fake stages progression for web3 feel
    stageIntervalRef.current = setInterval(() => {
      setStage((prev) => (prev < 3 ? prev + 1 : prev));
    }, 400);

    try {
      const data = await verifyDID(idToVerify);
      if (stageIntervalRef.current) {
        clearInterval(stageIntervalRef.current);
      }
      setStage(4); // Complete
      setResult(data);
    } catch (error) {
      console.error(error);
      if (stageIntervalRef.current) {
        clearInterval(stageIntervalRef.current);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    handleVerify(inputId);
  };

  const resetSearch = () => {
    setResult(null);
    setSearched(false);
    setInputId("");
    setSearchParams({});
    setStage(0);
  };



  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center pt-24 pb-20 px-4">
      {/* Cosmic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 space-y-8">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-2">
            <VerifierIcon className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            DID Verification
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Search a decentralized identifier (DID) to cryptographically verify a user's academic credentials and view their records.
          </p>
        </div>

        {/* Input Form */}
        {(!searched || (!result && !loading)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto"
          >
            <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl">
              <CardContent className="pt-6">
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div className="space-y-2 text-center">
                    <Label htmlFor="did-search" className="text-sm font-medium text-muted-foreground">
                      Enter User DID
                    </Label>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="did-search"
                          value={inputId}
                          onChange={(e) => setInputId(e.target.value)}
                          placeholder="e.g., DID:LUMEN:12345..."
                          className="pl-10 h-12 bg-background/50 border-border/50 focus:border-cyan-500/50 text-center"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={!inputId.trim()}
                        className="h-12 px-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:opacity-90 text-white border-0"
                      >
                        Verify Identity
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Try searching any DID to see user credentials, or use a DID starting with "INV" for an invalid result.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Loading / Verification Progress State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl mx-auto"
          >
            <Card className="border-2 border-cyan-500/30 bg-card/60 backdrop-blur-xl shadow-cyan-500/10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{ width: `${(stage / 3) * 100}%` }} />
              <CardContent className="p-8 md:p-12 text-center space-y-8">
                <div className="relative flex justify-center items-center h-24">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-dashed border-2 border-cyan-500/30 w-24 h-24 mx-auto"
                  />
                  <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {stage === 1 && "Connecting to Network..."}
                    {stage === 2 && "Checking DID Integrity..."}
                    {stage === 3 && "Fetching User Credentials..."}
                    {stage >= 4 && "Finalizing Proofs..."}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Cryptographically validating user identity and records
                  </p>
                </div>

                <div className="flex justify-center gap-8 pt-4">
                  <div className="flex flex-col items-center gap-2">
                    <IntegrityIcon size={24} className="text-cyan-400" verified={stage > 1} pending={stage === 1} />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Network</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AuthenticityIcon size={24} className="text-cyan-400" verified={stage > 2} pending={stage === 2} />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Identity</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ValidityIcon size={24} className="text-cyan-400" verified={stage > 3} pending={stage === 3} />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Records</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results State */}
        {searched && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={resetSearch} className="hover:bg-white/5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Search Another DID
              </Button>
            </div>

            <VerificationResult result={result} inputId={inputId} />
          </motion.div>
        )}

      </div>
    </div>
  );
}