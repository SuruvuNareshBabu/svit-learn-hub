import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, FileText, Upload, Download, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';

const Assignments = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const assignments = [
    {
      id: 1,
      title: 'Binary Search Tree Implementation',
      subject: 'Data Structures and Algorithms',
      description: 'Implement a complete Binary Search Tree with insertion, deletion, and traversal operations.',
      assignedDate: '2024-01-10',
      dueDate: '2024-01-20',
      status: 'submitted',
      grade: 85,
      maxGrade: 100,
      submittedDate: '2024-01-18',
      feedback: 'Good implementation with proper error handling. Consider optimizing the deletion algorithm.',
      attachments: ['bst_implementation.cpp', 'test_cases.txt'],
      priority: 'high'
    },
    {
      id: 2,
      title: 'Responsive Web Portfolio',
      subject: 'Web Technologies',
      description: 'Create a responsive personal portfolio website using HTML5, CSS3, and JavaScript.',
      assignedDate: '2024-01-12',
      dueDate: '2024-01-25',
      status: 'in-progress',
      submittedDate: null,
      attachments: [],
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Database Normalization Analysis',
      subject: 'Database Management Systems',
      description: 'Analyze the given database schema and normalize it to 3NF. Provide detailed explanation.',
      assignedDate: '2024-01-08',
      dueDate: '2024-01-22',
      status: 'submitted',
      grade: 92,
      maxGrade: 100,
      submittedDate: '2024-01-20',
      feedback: 'Excellent analysis and clear documentation. Well done!',
      attachments: ['normalization_report.pdf'],
      priority: 'high'
    },
    {
      id: 4,
      title: 'Linear Regression Model',
      subject: 'Machine Learning',
      description: 'Build and evaluate a linear regression model using Python and scikit-learn.',
      assignedDate: '2024-01-15',
      dueDate: '2024-01-30',
      status: 'pending',
      submittedDate: null,
      attachments: [],
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Software Requirements Document',
      subject: 'Software Engineering',
      description: 'Create a comprehensive SRS document for the given project scenario.',
      assignedDate: '2024-01-14',
      dueDate: '2024-01-28',
      status: 'overdue',
      submittedDate: null,
      attachments: [],
      priority: 'high'
    },
    {
      id: 6,
      title: 'Network Security Protocols',
      subject: 'Computer Networks',
      description: 'Research and compare different network security protocols. Prepare a detailed report.',
      assignedDate: '2024-01-16',
      dueDate: '2024-02-05',
      status: 'pending',
      submittedDate: null,
      attachments: [],
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'overdue':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = parseISO(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (selectedFilter === 'all') return true;
    return assignment.status === selectedFilter;
  });

  const stats = {
    total: assignments.length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    pending: assignments.filter(a => a.status === 'pending').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
    inProgress: assignments.filter(a => a.status === 'in-progress').length
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
          <p className="text-muted-foreground">Manage and track your course assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Submit Assignment
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.submitted}</p>
            <p className="text-sm text-muted-foreground">Submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedFilter} className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{assignment.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{assignment.subject}</span>
                      <Badge className={getPriorityColor(assignment.priority)} variant="secondary">
                        {assignment.priority} priority
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(assignment.status)} variant="secondary">
                      {getStatusIcon(assignment.status)}
                      <span className="ml-1 capitalize">{assignment.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
                
                {/* Dates and Progress */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Assigned: {format(parseISO(assignment.assignedDate), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Due: {format(parseISO(assignment.dueDate), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {assignment.status === 'overdue' ? (
                      <span className="text-red-600 font-medium">
                        {Math.abs(getDaysRemaining(assignment.dueDate))} days overdue
                      </span>
                    ) : assignment.status === 'submitted' ? (
                      <span className="text-green-600 font-medium">
                        Submitted {assignment.submittedDate ? format(parseISO(assignment.submittedDate), 'MMM dd') : ''}
                      </span>
                    ) : (
                      <span className={getDaysRemaining(assignment.dueDate) <= 3 ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                        {getDaysRemaining(assignment.dueDate)} days remaining
                      </span>
                    )}
                  </div>
                </div>

                {/* Grade Display for Submitted Assignments */}
                {assignment.status === 'submitted' && assignment.grade !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Grade</span>
                      <span className="text-lg font-bold">
                        {assignment.grade}/{assignment.maxGrade}
                      </span>
                    </div>
                    <Progress 
                      value={(assignment.grade / assignment.maxGrade) * 100} 
                      className="h-2"
                    />
                    {assignment.feedback && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">Feedback:</p>
                        <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Attachments */}
                {assignment.attachments && assignment.attachments.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Attachments:</p>
                    <div className="flex flex-wrap gap-2">
                      {assignment.attachments.map((file, index) => (
                        <Button key={index} variant="outline" size="sm">
                          <FileText className="mr-2 h-3 w-3" />
                          {file}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  {assignment.status === 'pending' || assignment.status === 'in-progress' ? (
                    <>
                      <Button variant="default">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Work
                      </Button>
                      <Button variant="outline">View Details</Button>
                    </>
                  ) : assignment.status === 'submitted' ? (
                    <>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Submission
                      </Button>
                      <Button variant="outline">View Feedback</Button>
                    </>
                  ) : (
                    <Button variant="destructive">
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Late
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAssignments.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No assignments found</h3>
                <p className="text-muted-foreground">
                  {selectedFilter === 'all' 
                    ? 'You have no assignments at the moment.' 
                    : `No ${selectedFilter.replace('-', ' ')} assignments found.`
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assignments;