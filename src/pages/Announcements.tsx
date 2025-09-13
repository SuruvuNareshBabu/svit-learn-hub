import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Bell, Calendar, User, Pin, Search, Filter, ExternalLink, Download } from 'lucide-react';
import { format, parseISO, isToday, isYesterday, isThisWeek } from 'date-fns';

const Announcements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  const announcements = [
    {
      id: 1,
      title: 'Mid-Semester Examinations Schedule Released',
      content: 'The mid-semester examination schedule for all courses has been published. Students are advised to check their respective timetables and prepare accordingly. Exam hall allotments will be shared 24 hours before each exam.',
      category: 'academic',
      priority: 'high',
      author: 'Academic Office',
      publishDate: '2024-01-16T09:00:00Z',
      pinned: true,
      read: false,
      attachments: ['mid_sem_schedule.pdf', 'exam_guidelines.pdf'],
      tags: ['examinations', 'schedule', 'important']
    },
    {
      id: 2,
      title: 'Workshop on Machine Learning and AI',
      content: 'Join us for an exciting 3-day workshop on Machine Learning and Artificial Intelligence conducted by industry experts from Google and Microsoft. Registration is mandatory and seats are limited.',
      category: 'events',
      priority: 'medium',
      author: 'CSE Department',
      publishDate: '2024-01-15T14:30:00Z',
      pinned: true,
      read: true,
      attachments: ['workshop_details.pdf'],
      tags: ['workshop', 'machine learning', 'AI', 'registration'],
      registrationLink: 'https://svit.edu/workshop-registration'
    },
    {
      id: 3,
      title: 'Library Hours Extended During Exam Period',
      content: 'To facilitate better preparation for upcoming examinations, the library will remain open 24/7 from January 20th to February 10th. Students need to show their ID cards for after-hours access.',
      category: 'facility',
      priority: 'medium',
      author: 'Library Administration',
      publishDate: '2024-01-14T11:15:00Z',
      pinned: false,
      read: true,
      attachments: [],
      tags: ['library', 'extended hours', 'exam period']
    },
    {
      id: 4,
      title: 'Internship Opportunities at TechCorp',
      content: 'TechCorp is offering summer internship positions for final year students in Computer Science and Information Technology. Apply before January 25th with your resume and academic transcripts.',
      category: 'placement',
      priority: 'high',
      author: 'Placement Cell',
      publishDate: '2024-01-13T16:45:00Z',
      pinned: false,
      read: false,
      attachments: ['techcorp_internship.pdf', 'application_form.pdf'],
      tags: ['internship', 'placement', 'techcorp', 'deadline'],
      applicationLink: 'https://techcorp.com/internships'
    },
    {
      id: 5,
      title: 'Student Council Elections - Nominations Open',
      content: 'Nominations for Student Council positions are now open. Interested candidates can submit their applications along with required documents to the Student Affairs office by January 22nd.',
      category: 'student-life',
      priority: 'medium',
      author: 'Student Affairs',
      publishDate: '2024-01-12T10:20:00Z',
      pinned: false,
      read: true,
      attachments: ['nomination_form.pdf', 'election_guidelines.pdf'],
      tags: ['student council', 'elections', 'nominations']
    },
    {
      id: 6,
      title: 'New Course: Cloud Computing with AWS',
      content: 'A new elective course on Cloud Computing with AWS is being introduced for the next semester. Students can register for this course during the pre-registration period.',
      category: 'academic',
      priority: 'low',
      author: 'CSE Department',
      publishDate: '2024-01-11T13:30:00Z',
      pinned: false,
      read: true,
      attachments: ['course_syllabus.pdf'],
      tags: ['new course', 'cloud computing', 'AWS', 'elective']
    },
    {
      id: 7,
      title: 'Campus WiFi Maintenance Scheduled',
      content: 'The campus WiFi network will undergo maintenance on January 18th from 2:00 AM to 6:00 AM. Internet services may be intermittent during this period.',
      category: 'maintenance',
      priority: 'medium',
      author: 'IT Services',
      publishDate: '2024-01-10T17:00:00Z',
      pinned: false,
      read: true,
      attachments: [],
      tags: ['wifi', 'maintenance', 'IT services']
    },
    {
      id: 8,
      title: 'Blood Donation Camp - January 20th',
      content: 'The NSS unit is organizing a blood donation camp on January 20th in the college auditorium. Students and faculty are encouraged to participate and contribute to this noble cause.',
      category: 'events',
      priority: 'low',
      author: 'NSS Unit',
      publishDate: '2024-01-09T12:00:00Z',
      pinned: false,
      read: true,
      attachments: ['blood_donation_info.pdf'],
      tags: ['blood donation', 'NSS', 'social service']
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'events':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'placement':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'facility':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'student-life':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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

  const getRelativeTime = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    if (isThisWeek(date)) return format(date, 'EEEE');
    return format(date, 'MMM dd, yyyy');
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
    const matchesReadStatus = !showOnlyUnread || !announcement.read;
    
    return matchesSearch && matchesCategory && matchesReadStatus;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.pinned);

  const stats = {
    total: announcements.length,
    unread: announcements.filter(a => !a.read).length,
    pinned: announcements.filter(a => a.pinned).length,
    highPriority: announcements.filter(a => a.priority === 'high').length
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Announcements</h1>
          <p className="text-muted-foreground">Stay updated with the latest news and updates from SVIT</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            variant={showOnlyUnread ? "default" : "outline"}
            onClick={() => setShowOnlyUnread(!showOnlyUnread)}
          >
            <Bell className="mr-2 h-4 w-4" />
            {showOnlyUnread ? 'Show All' : 'Unread Only'}
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.unread}</p>
            <p className="text-sm text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.pinned}</p>
            <p className="text-sm text-muted-foreground">Pinned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements, tags, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="placement">Placement</TabsTrigger>
            <TabsTrigger value="facility">Facility</TabsTrigger>
            <TabsTrigger value="student-life">Student Life</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Pin className="h-5 w-5 text-primary" />
            Pinned Announcements
          </h2>
          <div className="space-y-4">
            {pinnedAnnouncements.map((announcement) => (
              <Card key={announcement.id} className={`border-l-4 border-l-primary ${!announcement.read ? 'bg-muted/30' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(announcement.category)} variant="secondary">
                          {announcement.category.replace('-', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(announcement.priority)} variant="secondary">
                          {announcement.priority} priority
                        </Badge>
                        {!announcement.read && (
                          <Badge variant="default">New</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mb-1">{announcement.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {announcement.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {getRelativeTime(announcement.publishDate)}
                        </span>
                      </CardDescription>
                    </div>
                    <Pin className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{announcement.content}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {announcement.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Attachments */}
                  {announcement.attachments && announcement.attachments.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {announcement.attachments.map((file, index) => (
                          <Button key={index} variant="outline" size="sm">
                            <Download className="mr-2 h-3 w-3" />
                            {file}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Links */}
                  <div className="flex gap-2">
                    {announcement.registrationLink && (
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Register Now
                      </Button>
                    )}
                    {announcement.applicationLink && (
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Apply Now
                      </Button>
                    )}
                    {!announcement.read && (
                      <Button variant="outline" size="sm">
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular Announcements */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
        <div className="space-y-4">
          {regularAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={`hover:shadow-sm transition-shadow ${!announcement.read ? 'bg-muted/30' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getCategoryColor(announcement.category)} variant="secondary">
                        {announcement.category.replace('-', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(announcement.priority)} variant="secondary">
                        {announcement.priority}
                      </Badge>
                      {!announcement.read && (
                        <Badge variant="default">New</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mb-1">{announcement.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {announcement.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {getRelativeTime(announcement.publishDate)}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{announcement.content}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {announcement.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Attachments and Actions */}
                {(announcement.attachments?.length > 0 || announcement.registrationLink || announcement.applicationLink || !announcement.read) && (
                  <div className="flex flex-wrap gap-2">
                    {announcement.attachments?.map((file, index) => (
                      <Button key={index} variant="outline" size="sm">
                        <Download className="mr-2 h-3 w-3" />
                        {file}
                      </Button>
                    ))}
                    {announcement.registrationLink && (
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Register
                      </Button>
                    )}
                    {announcement.applicationLink && (
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Apply
                      </Button>
                    )}
                    {!announcement.read && (
                      <Button variant="outline" size="sm">
                        Mark as Read
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {filteredAnnouncements.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No announcements found</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? `No announcements match your search "${searchQuery}"`
                : showOnlyUnread 
                  ? 'You have no unread announcements'
                  : 'No announcements available at the moment'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Announcements;