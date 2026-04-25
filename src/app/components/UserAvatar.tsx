import React, { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";

interface UserAvatarProps {
  email: string;
  name: string;
  avatar?: string;
  onLogout: () => void;
  onProfileClick?: () => void;
}

export function UserAvatar({ email, name, avatar, onLogout, onProfileClick }: UserAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-600 text-white font-medium text-xs hover:bg-orange-700 transition-colors ring-2 ring-offset-2 ring-orange-600 overflow-hidden"
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          getInitials(name)
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{email}</p>
            <p className="text-xs text-gray-500 mt-0.5">{name}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => {
                onProfileClick?.();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <User className="w-4 h-4 mr-3 text-gray-500" />
              Profile
            </button>
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
