import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // or the relevant icon component from ShadCN or your icon library

export function PrivateKeyDisplay({ privateKey }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex justify-between space-y-4">
      <div className="space-y-1">
        <p className="text-lg font-medium">Private Key: </p>
        <p>
          {isVisible
            ? privateKey
            : "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "}
        </p>
      </div>
      <button onClick={toggleVisibility} className="text-white ">
        {isVisible ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
        <span className="sr-only">Toggle visibility</span>
      </button>
    </div>
  );
}
