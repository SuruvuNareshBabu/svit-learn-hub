import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserName = () => {
    if (!user) return 'Guest';
    return (user.profile as any)?.name || 'User';
  };

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case 'admin':
        return 'bg-destructive text-destructive-foreground';
      case 'faculty':
        return 'bg-secondary text-secondary-foreground';
      case 'student':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 shadow-soft">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        
        <div className="flex items-center gap-3">
          <img 
            src="https://tse3.mm.bing.net/th/id/OIP.eCjG-5y-26449bki6guTRQHaG_?pid=Api&P=0&h=180" 
            alt="SVIT Logo" 
            className="h-10 w-10 rounded-lg object-cover" 
          />
          <div>
            <h1 className="text-xl font-bold text-primary">SVIT LMS</h1>
            <p className="text-sm text-muted-foreground">Sri Venkateswara Institute of Technology</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src={(user?.profile as any)?.profileImage} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {getInitials(getUserName())}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{getUserName()}</span>
                <Badge className={`text-xs ${getRoleBadgeColor()}`}>
                  {user?.role?.toUpperCase()}
                </Badge>
              </div>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
