import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, FileText, Upload, Download, CheckCircle, AlertCircle, XCircle, Clock as ClockIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface AssignmentType {
  id: number;
  title: string;
  subject: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'submitted' | 'overdue';
  grade?: number;
  maxGrade?: number;
  submittedDate?: string | null;
  feedback?: string;
  attachments: string[];
  priority: 'low' | 'medium' | 'high';
}

const Assignments = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [assignments, setAssignments] = useState<AssignmentType[]>([
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
      status: 'pending',
      submittedDate: null,
      attachments: [],
      priority: 'high'
    }
  ]);

  // ---------------- Handlers ----------------

  // Download all assignments
  const handleDownloadAll = () => {
    const content = assignments.map(a => `${a.title} - ${a.status}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'all_assignments.txt';
    link.click();
  };

  // Submit a new assignment (updates first pending assignment)
  const handleSubmitAssignment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = () => {
      if (input.files) {
        const files = Array.from(input.files).map(f => f.name);
        // Update first pending assignment
        setAssignments(prev =>
          prev.map(a => {
            if ((a.status === 'pending' || a.status === 'in-progress') && !a.submittedDate) {
              return {
                ...a,
                status: 'submitted',
                submittedDate: new Date().toISOString(),
                attachments: [...a.attachments, ...files],
                grade: Math.floor(Math.random() * 20 + 80), // simulate grade 80-100
                maxGrade: 100,
                feedback: 'Well done! Keep it up.'
              };
            }
            return a;
          })
        );
        alert(`Files submitted: ${files.join(', ')}`);
      }
    };
    input.click();
  };

  // Submit work for a specific assignment
  const handleSubmitWork = (assignmentId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = () => {
      if (input.files) {
        const files = Array.from(input.files).map(f => f.name);
        setAssignments(prev =>
          prev.map(a => {
            if (a.id === assignmentId) {
              return {
                ...a,
                status: 'submitted',
                submittedDate: new Date().toISOString(),
                attachments: [...a.attachments, ...files],
                grade: Math.floor(Math.random() * 20 + 80),
                maxGrade: 100,
                feedback: 'Great submission!'
              };
            }
            return a;
          })
        );
        alert(`Files submitted for assignment: ${files.join(', ')}`);
      }
    };
    input.click();
  };

  // ---------------- Helpers ----------------

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <ClockIcon className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'overdue': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = parseISO(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAssignments = assignments.filter(a => selectedFilter === 'all' ? true : a.status === selectedFilter);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
          <p className="text-muted-foreground">Manage and track your course assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadAll}>
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
          <Button onClick={handleSubmitAssignment}>
            <Upload className="mr-2 h-4 w-4" />
            Submit Assignment
          </Button>
        </div>
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
          {filteredAssignments.map(a => (
            <Card key={a.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{a.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{a.subject}</span>
                      <Badge className={getPriorityColor(a.priority)}>{a.priority} priority</Badge>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(a.status)}>
                    {getStatusIcon(a.status)}
                    <span className="ml-1 capitalize">{a.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{a.description}</p>

                {/* Dates */}
                <div className="flex gap-4 text-sm">
                  <span><Calendar className="h-4 w-4" /> {format(parseISO(a.assignedDate), 'MMM dd, yyyy')}</span>
                  <span><Clock className="h-4 w-4" /> {format(parseISO(a.dueDate), 'MMM dd, yyyy')}</span>
                </div>

                {/* Grade & Feedback */}
                {a.status === 'submitted' && a.grade !== undefined && (
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span>Grade</span>
                      <span>{a.grade}/{a.maxGrade}</span>
                    </div>
                    <Progress value={(a.grade / (a.maxGrade || 100)) * 100} className="h-2 mt-1" />
                    {a.feedback && <p className="mt-1 text-sm text-muted-foreground">{a.feedback}</p>}
                  </div>
                )}

                {/* Attachments */}
                {a.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {a.attachments.map((file, idx) => (
                      <Button key={idx} variant="outline" size="sm">
                        <FileText className="mr-1 h-3 w-3" /> {file}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  {(a.status === 'pending' || a.status === 'in-progress') && (
                    <Button variant="default" onClick={() => handleSubmitWork(a.id)}>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Work
                    </Button>
                  )}
                  {a.status === 'submitted' && (
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Submission
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
                    : `No ${selectedFilter.replace('-', ' ')} assignments found.`}
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
