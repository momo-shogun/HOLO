import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { Badge } from "../ui/badge";

function Header() {
  return (
    <div className="px-36 py-2 flex items-center justify-between ">
      <div className="flex items-center gap-3">
        <a className="text-4xl font-bold">HOLO</a>
        <Badge variant="outline" className="font-bold text-md bg-slate-600">
          v1.0
        </Badge>
      </div>
      <div>
        <div className="flex gap-3">
          <ModeToggle></ModeToggle>
          <Button variant="ghost" className="flex gap-3">
            <Github className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;