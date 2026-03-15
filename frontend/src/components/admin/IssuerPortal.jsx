import { Card } from "../ui/card";
import { mockInstitutionDID } from "../../data/mockData";
import { PageTransition } from "../PageTransition";
import { IssuerIcon } from "../icons/LumenIcons";

export function IssuerPortal() {
  return (
    <PageTransition>
      <div className="page-shell">
        <div className="page-container flex flex-col gap-8">
          <Card className="border border-border/50 bg-card/60 backdrop-blur-xl hover:border-primary/30 transition-all shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 flex-shrink-0">
                  <IssuerIcon size={28} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-1">
                    {mockInstitutionDID.name}
                  </h1>
                  <p className="text-sm text-muted-foreground font-mono truncate">{mockInstitutionDID.id}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}