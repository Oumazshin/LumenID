export function Terms() {
  return (
    <div className="page-shell">
      <div className="page-container-narrow">
        <div className="space-y-6">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: February 19, 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using LumenID, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>
            
            {/* ... Other sections follow same pattern ... */}

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at legal@lumenid.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
