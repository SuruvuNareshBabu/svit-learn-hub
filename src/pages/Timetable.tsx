import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, User, Calendar as CalendarIcon } from 'lucide-react';

const Timetable = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const timetableData = {
    current: {
      monday: [
        { time: '09:00-10:00', subject: 'Data Structures', instructor: 'Dr. Priya Kumar', room: 'CSE-101', type: 'Lecture' },
        { time: '10:00-11:00', subject: 'Web Technologies', instructor: 'Prof. Rajesh Sharma', room: 'CSE-102', type: 'Practical' },
        { time: '11:30-12:30', subject: 'Database Management', instructor: 'Dr. Anitha Reddy', room: 'CSE-103', type: 'Lecture' },
        { time: '02:00-03:00', subject: 'Machine Learning', instructor: 'Dr. Venkat Krishna', room: 'CSE-104', type: 'Lecture' },
        { time: '03:00-04:00', subject: 'Software Engineering', instructor: 'Prof. Suresh Kumar', room: 'CSE-105', type: 'Tutorial' }
      ],
      tuesday: [
        { time: '09:00-10:00', subject: 'Web Technologies Lab', instructor: 'Prof. Rajesh Sharma', room: 'CSE-Lab1', type: 'Practical' },
        { time: '10:00-11:00', subject: 'Web Technologies Lab', instructor: 'Prof. Rajesh Sharma', room: 'CSE-Lab1', type: 'Practical' },
        { time: '11:30-12:30', subject: 'Data Structures', instructor: 'Dr. Priya Kumar', room: 'CSE-101', type: 'Tutorial' },
        { time: '02:00-03:00', subject: 'Database Management', instructor: 'Dr. Anitha Reddy', room: 'CSE-103', type: 'Practical' },
        { time: '03:00-04:00', subject: 'Machine Learning', instructor: 'Dr. Venkat Krishna', room: 'CSE-104', type: 'Tutorial' }
      ],
      wednesday: [
        { time: '09:00-10:00', subject: 'Software Engineering', instructor: 'Prof. Suresh Kumar', room: 'CSE-105', type: 'Lecture' },
        { time: '10:00-11:00', subject: 'Data Structures', instructor: 'Dr. Priya Kumar', room: 'CSE-101', type: 'Lecture' },
        { time: '11:30-12:30', subject: 'Machine Learning Lab', instructor: 'Dr. Venkat Krishna', room: 'CSE-Lab2', type: 'Practical' },
        { time: '12:30-01:30', subject: 'Machine Learning Lab', instructor: 'Dr. Venkat Krishna', room: 'CSE-Lab2', type: 'Practical' },
        { time: '02:00-03:00', subject: 'Web Technologies', instructor: 'Prof. Rajesh Sharma', room: 'CSE-102', type: 'Lecture' }
      ],
      thursday: [
        { time: '09:00-10:00', subject: 'Database Management', instructor: 'Dr. Anitha Reddy', room: 'CSE-103', type: 'Lecture' },
        { time: '10:00-11:00', subject: 'Software Engineering', instructor: 'Prof. Suresh Kumar', room: 'CSE-105', type: 'Tutorial' },
        { time: '11:30-12:30', subject: 'Data Structures Lab', instructor: 'Dr. Priya Kumar', room: 'CSE-Lab3', type: 'Practical' },
        { time: '12:30-01:30', subject: 'Data Structures Lab', instructor: 'Dr. Priya Kumar', room: 'CSE-Lab3', type: 'Practical' },
        { time: '02:00-03:00', subject: 'Machine Learning', instructor: 'Dr. Venkat Krishna', room: 'CSE-104', type: 'Lecture' }
      ],
      friday: [
        { time: '09:00-10:00', subject: 'Web Technologies', instructor: 'Prof. Rajesh Sharma', room: 'CSE-102', type: 'Lecture' },
        { time: '10:00-11:00', subject: 'Database Management Lab', instructor: 'Dr. Anitha Reddy', room: 'CSE-Lab4', type: 'Practical' },
        { time: '11:00-12:00', subject: 'Database Management Lab', instructor: 'Dr. Anitha Reddy', room: 'CSE-Lab4', type: 'Practical' },
        { time: '02:00-03:00', subject: 'Software Engineering', instructor: 'Prof. Suresh Kumar', room: 'CSE-105', type: 'Lecture' },
        { time: '03:00-04:00', subject: 'Project Work', instructor: 'All Faculty', room: 'CSE-106', type: 'Project' }
      ],
      saturday: [
        { time: '09:00-10:00', subject: 'Seminar', instructor: 'Various', room: 'Auditorium', type: 'Seminar' },
        { time: '10:00-11:00', subject: 'Project Presentation', instructor: 'All Faculty', room: 'CSE-106', type: 'Presentation' },
        { time: '11:30-12:30', subject: 'Industry Expert Talk', instructor: 'Guest Speaker', room: 'Auditorium', type: 'Guest Lecture' }
      ]
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'practical':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'tutorial':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'project':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'seminar':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'presentation':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'guest lecture':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCurrentDayIndex = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1; // Convert Sunday=0 to Saturday=6, Monday=1 to Monday=0, etc.
  };

  const todaysClasses = timetableData.current[days[getCurrentDayIndex()] as keyof typeof timetableData.current] || [];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Timetable</h1>
          <p className="text-muted-foreground">View your class schedule and upcoming sessions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>View Exam Schedule</Button>
        </div>
      </div>

      {/* Today's Classes Quick View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Today's Classes - {dayNames[getCurrentDayIndex()]}
          </CardTitle>
          <CardDescription>Your schedule for today</CardDescription>
        </CardHeader>
        <CardContent>
          {todaysClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todaysClasses.map((class_, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm">{class_.subject}</h4>
                    <Badge className={getTypeColor(class_.type)}>
                      {class_.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {class_.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {class_.instructor}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {class_.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No classes scheduled for today</p>
          )}
        </CardContent>
      </Card>

      {/* Weekly Timetable */}
      <Tabs value={selectedWeek} onValueChange={setSelectedWeek}>
        <TabsList>
          <TabsTrigger value="current">Current Week</TabsTrigger>
          <TabsTrigger value="next">Next Week</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {days.map((day, dayIndex) => (
              <Card key={day} className={getCurrentDayIndex() === dayIndex ? 'ring-2 ring-primary' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {dayNames[dayIndex]}
                    {getCurrentDayIndex() === dayIndex && (
                      <Badge variant="default">Today</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(timetableData.current[day as keyof typeof timetableData.current] || []).map((class_, index) => (
                      <div key={index} className="p-3 border rounded-lg space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{class_.subject}</h4>
                          <Badge className={getTypeColor(class_.type)} variant="secondary">
                            {class_.type}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {class_.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {class_.instructor}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {class_.room}
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!timetableData.current[day as keyof typeof timetableData.current] || 
                      timetableData.current[day as keyof typeof timetableData.current].length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-4">No classes scheduled</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="next">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Next Week's Schedule</h3>
              <p className="text-muted-foreground">Next week's timetable will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Class Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['Lecture', 'Practical', 'Tutorial', 'Project', 'Seminar', 'Presentation', 'Guest Lecture'].map((type) => (
              <Badge key={type} className={getTypeColor(type)} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timetable;