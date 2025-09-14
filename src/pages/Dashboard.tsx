import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  Users,
  FileText,
  Bell
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getDashboardData = () => {
    if (!user) return null;

    switch (user.role) {
      case 'student':
        return {
          stats: [
            { title: 'Current Semester', value: '6', icon: BookOpen, color: 'text-primary' },
            { title: 'Attendance', value: '92%', icon: TrendingUp, color: 'text-success' },
            { title: 'Assignments', value: '8/10', icon: FileText, color: 'text-secondary' },
            { title: 'Certificates', value: '3', icon: Award, color: 'text-warning' },
          ],
          recentActivity: [
            'Submitted Web Technologies Assignment',
            'Attended Data Structures Lab',
            'New announcement in Algorithms course',
            'Certificate uploaded for NPTEL course'
          ]
        };
      case 'faculty':
        return {
          stats: [
            { title: 'My Courses', value: '3', icon: BookOpen, color: 'text-primary' },
            { title: 'Students', value: '120', icon: Users, color: 'text-success' },
            { title: 'Assignments', value: '15', icon: FileText, color: 'text-secondary' },
            { title: 'Classes Today', value: '4', icon: Clock, color: 'text-warning' },
          ],
          recentActivity: [
            'Posted new assignment for Web Technologies',
            'Updated attendance for CSE-A section',
            'Graded Data Structures lab reports',
            'Scheduled extra class for Algorithms'
          ]
        };
      case 'admin':
        return {
          stats: [
            { title: 'Total Students', value: '2,450', icon: Users, color: 'text-primary' },
            { title: 'Faculty', value: '85', icon: Users, color: 'text-success' },
            { title: 'Courses', value: '120', icon: BookOpen, color: 'text-secondary' },
            { title: 'Active Sessions', value: '45', icon: Clock, color: 'text-warning' },
          ],
          recentActivity: [
            'New batch of students enrolled',
            'Faculty performance reports generated',
            'System maintenance completed',
            'New course curriculum approved'
          ]
        };
      default:
        return null;
    }
  };

  const dashboardData = getDashboardData();
  
  if (!dashboardData) return null;

  const getUserName = () => {
    return (user?.profile as any)?.name || 'User';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {getGreeting()}, {getUserName()}!
        </h1>
        <p className="text-white/90">
          Welcome to your SVIT LMS dashboard. Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule - Student specific */}
        {user?.role === 'student' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                Today's Classes
              </CardTitle>
              <CardDescription>
                Your schedule for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Data Structures</p>
                    <p className="text-sm text-muted-foreground">Dr.Ravi Kumar</p>
                  </div>
                  <Badge variant="secondary">9:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Web Technologies Lab</p>
                    <p className="text-sm text-muted-foreground">Prof. mahesh</p>
                  </div>
                  <Badge variant="secondary">2:00 PM</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Algorithms</p>
                    <p className="text-sm text-muted-foreground">Dr. Lakshmi Devi</p>
                  </div>
                  <Badge variant="secondary">4:00 PM</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions - Faculty/Admin */}
        {(user?.role === 'faculty' || user?.role === 'admin') && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.role === 'faculty' ? (
                  <>
                    <div className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 cursor-pointer transition-smooth">
                      <p className="font-medium text-primary">Create Assignment</p>
                    </div>
                    <div className="p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 cursor-pointer transition-smooth">
                      <p className="font-medium text-secondary">Mark Attendance</p>
                    </div>
                    <div className="p-3 bg-success/10 rounded-lg hover:bg-success/20 cursor-pointer transition-smooth">
                      <p className="font-medium text-success">Post Announcement</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 cursor-pointer transition-smooth">
                      <p className="font-medium text-primary">Add New Student</p>
                    </div>
                    <div className="p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 cursor-pointer transition-smooth">
                      <p className="font-medium text-secondary">Generate Reports</p>
                    </div>
                    <div className="p-3 bg-success/10 rounded-lg hover:bg-success/20 cursor-pointer transition-smooth">
                      <p className="font-medium text-success">System Settings</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Progress Section - Student specific */}
      {user?.role === 'student' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Academic Progress
            </CardTitle>
            <CardDescription>
              Your performance across subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Data Structures</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Web Technologies</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Algorithms</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;