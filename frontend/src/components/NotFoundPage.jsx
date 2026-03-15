import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center py-12 md:py-24">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative">
          <div className="text-[12rem] md:text-[16rem] font-extrabold leading-none bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent opacity-20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full border border-primary/30 flex items-center justify-center">
              <Search className="w-16 h-16 md:w-20 md:h-20 text-primary/60" />
            </div>
          </div>
        </div>

        <div className="space-y-4 -mt-8">
          <h1 className="text-3xl md:text-4xl font-bold">Page Not Found</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full sm:w-auto min-w-[180px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:opacity-90 text-white border-0"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm w-full max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={() => navigate("/auth/customer/login")}
              className="flex-1 text-primary hover:text-primary/80 transition-colors font-medium hover:bg-primary/10"
            >
              Customer Login
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/auth/verifier/login")}
              className="flex-1 text-primary hover:text-primary/80 transition-colors font-medium hover:bg-primary/10"
            >
              Verifier Login
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/auth/role-selection")}
              className="flex-1 text-primary hover:text-primary/80 transition-colors font-medium hover:bg-primary/10 sm:col-span-2"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}