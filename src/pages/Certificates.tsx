import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Download, Eye, Upload, Calendar, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format, parseISO } from 'date-fns';

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const certificates = [
    {
      id: 1,
      title: 'Python Programming Certification',
      issuer: 'NPTEL',
      category: 'academic',
      issueDate: '2024-01-15',
      expiryDate: null,
      credentialId: 'NPTEL24CS1001',
      description: 'Successfully completed 12-week online certification course in Python Programming.',
      skills: ['Python', 'Data Structures', 'Object-Oriented Programming', 'File Handling'],
      verified: true,
      certificateUrl: 'https://nptel.ac.in/certificates/24cs1001',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Machine Learning Internship',
      issuer: 'TechCorp Solutions',
      category: 'internship',
      issueDate: '2023-12-20',
      expiryDate: null,
      credentialId: 'TCS-ML-2023-456',
      description: '3-month internship focusing on machine learning model development and deployment.',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Data Analysis', 'Model Deployment'],
      verified: true,
      certificateUrl: null,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Full Stack Web Development',
      issuer: 'Coursera - Meta',
      category: 'online',
      issueDate: '2023-11-10',
      expiryDate: '2026-11-10',
      credentialId: 'META-FSWD-789',
      description: 'Professional Certificate in Full Stack Web Development using modern technologies.',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'HTML/CSS'],
      verified: true,
      certificateUrl: 'https://coursera.org/verify/META-FSWD-789',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'Cybersecurity Fundamentals',
      issuer: 'IBM Security',
      category: 'professional',
      issueDate: '2023-10-05',
      expiryDate: '2025-10-05',
      credentialId: 'IBM-SEC-2023-101',
      description: 'Comprehensive training in cybersecurity principles and best practices.',
      skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Security Protocols'],
      verified: true,
      certificateUrl: 'https://ibm.com/training/verify/SEC-101',
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'Database Design and SQL',
      issuer: 'Oracle Academy',
      category: 'academic',
      issueDate: '2023-09-15',
      expiryDate: null,
      credentialId: 'ORA-DB-2023-202',
      description: 'Advanced certification in database design principles and SQL optimization.',
      skills: ['SQL', 'Database Design', 'Oracle DB', 'Performance Tuning', 'Data Modeling'],
      verified: true,
      certificateUrl: 'https://oracle.com/academy/verify/DB-202',
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      title: 'Mobile App Development Project',
      issuer: 'SVIT Project Lab',
      category: 'project',
      issueDate: '2023-08-30',
      expiryDate: null,
      credentialId: 'SVIT-PROJ-2023-MAD',
      description: 'Successfully completed and deployed a mobile application project.',
      skills: ['React Native', 'Mobile UI/UX', 'API Integration', 'App Store Deployment'],
      verified: true,
      certificateUrl: null,
      image: '/api/placeholder/300/200'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'internship':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'online':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'professional':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'project':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date() > parseISO(expiryDate);
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: certificates.length,
    verified: certificates.filter(c => c.verified).length,
    academic: certificates.filter(c => c.category === 'academic').length,
    professional: certificates.filter(c => c.category === 'professional').length,
    expired: certificates.filter(c => c.expiryDate && isExpired(c.expiryDate)).length
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Certificates & Achievements</h1>
          <p className="text-muted-foreground">Manage and showcase your academic and professional certifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Portfolio
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Certificate
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Certificates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
            <p className="text-sm text-muted-foreground">Verified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.academic}</p>
            <p className="text-sm text-muted-foreground">Academic</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.professional}</p>
            <p className="text-sm text-muted-foreground">Professional</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search certificates, issuers, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="internship">Internships</TabsTrigger>
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="project">Projects</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-primary" />
                    {certificate.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Verified
                      </Badge>
                    )}
                    {certificate.expiryDate && isExpired(certificate.expiryDate) && (
                      <Badge variant="destructive">Expired</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight mb-1">{certificate.title}</CardTitle>
                  <CardDescription>{certificate.issuer}</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Category and Date */}
              <div className="flex justify-between items-center">
                <Badge className={getCategoryColor(certificate.category)} variant="secondary">
                  {certificate.category}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  <Calendar className="inline h-3 w-3 mr-1" />
                  {format(parseISO(certificate.issueDate), 'MMM yyyy')}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">{certificate.description}</p>

              {/* Skills */}
              <div>
                <p className="text-sm font-medium mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {certificate.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {certificate.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{certificate.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Credential ID */}
              {certificate.credentialId && (
                <div className="text-xs text-muted-foreground">
                  Credential ID: {certificate.credentialId}
                </div>
              )}

              {/* Expiry Date */}
              {certificate.expiryDate && (
                <div className={`text-xs ${isExpired(certificate.expiryDate) ? 'text-red-600' : 'text-muted-foreground'}`}>
                  {isExpired(certificate.expiryDate) ? 'Expired' : 'Expires'}: {format(parseISO(certificate.expiryDate), 'MMM dd, yyyy')}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="mr-2 h-3 w-3" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="mr-2 h-3 w-3" />
                  Download
                </Button>
                {certificate.certificateUrl && (
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? `No certificates match your search "${searchQuery}"`
                : 'Start building your portfolio by uploading your first certificate'
              }
            </p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Certificate
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Upload Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
          <CardDescription>Tips for adding certificates to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Accepted Formats:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• PDF documents (preferred)</li>
                <li>• High-resolution images (PNG, JPG)</li>
                <li>• Maximum file size: 10MB</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Include credential verification URL</li>
                <li>• Add relevant skills and competencies</li>
                <li>• Keep descriptions concise and clear</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Certificates;