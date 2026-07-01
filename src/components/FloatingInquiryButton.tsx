import { useState } from "react";
import { MessageCircle, Users, Briefcase, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const FloatingInquiryButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleFormSelect = (formType: "job-openings" | "required-guards") => {
    setIsOpen(false);
    if (formType === "job-openings") {
      navigate("/job-openings");
    } else {
      navigate("/required-guards");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl hover:scale-110 transition-all duration-300"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className="sr-only">Open inquiry form</span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Need help? Contact us!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent className="sm:max-w-[500px] max-w-[95vw]">
          <DialogHeader>
            <DialogTitle>How can we help you?</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-muted-foreground text-center mb-6">
              Choose the type of inquiry you'd like to make:
            </p>
            
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-accent"
                onClick={() => handleFormSelect("job-openings")}
              >
                <Briefcase className="h-8 w-8 text-primary" />
                <div className="text-center">
                  <h3 className="font-semibold">Job Openings</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply for security guard positions
                  </p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-accent"
                onClick={() => handleFormSelect("required-guards")}
              >
                <Users className="h-8 w-8 text-primary" />
                <div className="text-center">
                  <h3 className="font-semibold">Required Guards</h3>
                  <p className="text-sm text-muted-foreground">
                    Request security services for your organization
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingInquiryButton;