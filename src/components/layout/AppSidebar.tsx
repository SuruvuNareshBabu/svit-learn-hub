import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  BookOpen,
  Calendar,
  FileText,
  Award,
  Bell,
  BarChart3,
  Users,
  Settings,
  GraduationCap,
  Monitor,
  Code,
  Database,
  Globe,
  Calculator
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

const studentMenuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'My Profile', url: '/profile', icon: User },
  { title: 'My Courses', url: '/courses', icon: BookOpen },
  { title: 'Timetable', url: '/timetable', icon: Calendar },
  { title: 'Attendance', url: '/attendance', icon: BarChart3 },
  { title: 'Assignments', url: '/assignments', icon: FileText },
  { title: 'Certificates', url: '/certificates', icon: Award },
  { title: 'Announcements', url: '/announcements', icon: Bell },
];

const facultyMenuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'My Profile', url: '/profile', icon: User },
  { title: 'My Courses', url: '/courses', icon: BookOpen },
  { title: 'Students', url: '/students', icon: Users },
  { title: 'Attendance', url: '/attendance', icon: BarChart3 },
  { title: 'Assignments', url: '/assignments', icon: FileText },
  { title: 'Announcements', url: '/announcements', icon: Bell },
];

const adminMenuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Students', url: '/students', icon: Users },
  { title: 'Faculty', url: '/faculty', icon: GraduationCap },
  { title: 'Courses', url: '/courses', icon: BookOpen },
  { title: 'Reports', url: '/reports', icon: BarChart3 },
  { title: 'Announcements', url: '/announcements', icon: Bell },
  { title: 'Settings', url: '/settings', icon: Settings },
];

const learningLinks = [
  { title: 'Java', url: 'https://developers.google.com/learn/topics/java', icon: Code, external: true },
  { title: 'Python', url: 'https://developers.google.com/edu/python', icon: Code, external: true },
  { title: 'C Programming', url: 'https://www.coursera.org/learn/c-programming', icon: Code, external: true },
  { title: 'C++', url: 'https://www.coursera.org/learn/c-plus-plus-a', icon: Code, external: true },
  { title: 'SQL', url: 'https://www.coursera.org/learn/intro-sql', icon: Database, external: true },
  { title: 'Git', url: 'https://www.coursera.org/learn/introduction-git-github', icon: Monitor, external: true },
  { title: 'Excel', url: 'https://www.coursera.org/learn/excel-basics-data-analysis-ibm', icon: Calculator, external: true },
  { title: 'Machine Learning', url: 'https://developers.google.com/machine-learning/crash-course', icon: Monitor, external: true },
  { title: 'Free Courses Hub', url: 'https://www.coursera.org/courses?query=free', icon: Globe, external: true },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent hover:text-accent-foreground transition-smooth";

  const getMenuItems = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'student':
        return studentMenuItems;
      case 'faculty':
        return facultyMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return studentMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-primary font-semibold">
            {!collapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Learning Resources - Only for students */}
        {user?.role === 'student' && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-secondary font-semibold">
              {!collapsed && 'Learning Resources'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {learningLinks.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-secondary/10 hover:text-secondary transition-smooth"
                        title={collapsed ? item.title : undefined}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}