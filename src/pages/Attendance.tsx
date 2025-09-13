import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckCircle, XCircle, Clock, AlertTriangle, Download } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';

const Attendance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock attendance data
  const attendanceData = {
    overall: {
      totalClasses: 240,
      attendedClasses: 216,
      percentage: 90,
      requiredPercentage: 75
    },
    subjects: [
      {
        name: 'Data Structures and Algorithms',
        code: 'CSE301',
        totalClasses: 48,
        attendedClasses: 45,
        percentage: 93.75,
        lastClass: '2024-01-15',
        status: 'Present'
      },
      {
        name: 'Web Technologies',
        code: 'CSE302', 
        totalClasses: 42,
        attendedClasses: 40,
        percentage: 95.24,
        lastClass: '2024-01-14',
        status: 'Present'
      },
      {
        name: 'Database Management Systems',
        code: 'CSE303',
        totalClasses: 45,
        attendedClasses: 42,
        percentage: 93.33,
        lastClass: '2024-01-13',
        status: 'Present'
      },
      {
        name: 'Machine Learning',
        code: 'CSE304',
        totalClasses: 38,
        attendedClasses: 32,
        percentage: 84.21,
        lastClass: '2024-01-12',
        status: 'Absent'
      },
      {
        name: 'Software Engineering',
        code: 'CSE305',
        totalClasses: 40,
        attendedClasses: 35,
        percentage: 87.50,
        lastClass: '2024-01-11',
        status: 'Present'
      },
      {
        name: 'Computer Networks',
        code: 'CSE306',
        totalClasses: 27,
        attendedClasses: 22,
        percentage: 81.48,
        lastClass: '2024-01-10',
        status: 'Absent'
      }
    ],
    recentAttendance: [
      { date: '2024-01-15', subject: 'Data Structures', status: 'Present', time: '09:00 AM' },
      { date: '2024-01-15', subject: 'Web Technologies', status: 'Present', time: '10:00 AM' },
      { date: '2024-01-14', subject: 'Database Management', status: 'Present', time: '11:30 AM' },
      { date: '2024-01-14', subject: 'Machine Learning', status: 'Absent', time: '02:00 PM' },
      { date: '2024-01-13', subject: 'Software Engineering', status: 'Present', time: '03:00 PM' },
      { date: '2024-01-13', subject: 'Computer Networks', status: 'Absent', time: '04:00 PM' },
      { date: '2024-01-12', subject: 'Data Structures', status: 'Present', time: '09:00 AM' },
      { date: '2024-01-12', subject: 'Web Technologies', status: 'Present', time: '10:00 AM' }
    ]
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 90) return { status: 'Excellent', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
    if (percentage >= 80) return { status: 'Good', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' };
    if (percentage >= 75) return { status: 'Average', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
    return { status: 'Poor', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Attendance</h1>
          <p className="text-muted-foreground">Track your class attendance and maintain required percentage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>Request Leave</Button>
        </div>
      </div>

      {/* Overall Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Attendance</p>
                <p className="text-2xl font-bold text-foreground">{attendanceData.overall.percentage}%</p>
              </div>
              <div className={`p-3 rounded-full ${getAttendanceStatus(attendanceData.overall.percentage).color.includes('green') ? 'bg-green-100 dark:bg-green-900' : attendanceData.overall.percentage >= 75 ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-red-100 dark:bg-red-900'}`}>
                <CheckCircle className="h-6 w-6 text-current" />
              </div>
            </div>
            <div className="mt-4">
              <Progress 
                value={attendanceData.overall.percentage} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {attendanceData.overall.attendedClasses}/{attendanceData.overall.totalClasses} classes attended
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Classes Attended</p>
                <p className="text-2xl font-bold text-foreground">{attendanceData.overall.attendedClasses}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Classes Missed</p>
                <p className="text-2xl font-bold text-foreground">{attendanceData.overall.totalClasses - attendanceData.overall.attendedClasses}</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge className={getAttendanceStatus(attendanceData.overall.percentage).color}>
                  {getAttendanceStatus(attendanceData.overall.percentage).status}
                </Badge>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                {attendanceData.overall.percentage < attendanceData.overall.requiredPercentage ? (
                  <AlertTriangle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                ) : (
                  <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
          <CardDescription>Attendance breakdown for each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.subjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{subject.name}</h4>
                      <p className="text-xs text-muted-foreground">{subject.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{subject.percentage.toFixed(1)}%</p>
                      <Badge className={getAttendanceStatus(subject.percentage).color} variant="secondary">
                        {getAttendanceStatus(subject.percentage).status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 mr-4">
                      <Progress 
                        value={subject.percentage} 
                        className="h-2"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {subject.attendedClasses}/{subject.totalClasses}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Last class: {format(new Date(subject.lastClass), 'MMM dd')}
                    </div>
                    <div className="flex items-center gap-1">
                      {subject.status === 'Present' ? (
                        <>
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Present
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 text-red-500" />
                          Absent
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Your attendance for the last few classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceData.recentAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${record.status === 'Present' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                    {record.status === 'Present' ? (
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{record.subject}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(record.date), 'MMM dd, yyyy')}
                      <Clock className="h-3 w-3 ml-2" />
                      {record.time}
                    </div>
                  </div>
                </div>
                <Badge 
                  className={record.status === 'Present' ? 
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }
                  variant="secondary"
                >
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Requirements Alert */}
      {attendanceData.overall.percentage < attendanceData.overall.requiredPercentage && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h4 className="font-semibold text-destructive mb-1">Attendance Warning</h4>
                <p className="text-sm text-muted-foreground">
                  Your overall attendance is {attendanceData.overall.percentage}%, which is below the required {attendanceData.overall.requiredPercentage}%. 
                  You need to attend {Math.ceil((attendanceData.overall.requiredPercentage * (attendanceData.overall.totalClasses + 10) / 100) - attendanceData.overall.attendedClasses)} more classes without absence to meet the requirement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Attendance;