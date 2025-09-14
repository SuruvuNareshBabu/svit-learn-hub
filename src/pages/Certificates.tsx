import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Download, Eye, Upload, Calendar, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format, parseISO } from 'date-fns';
import jsPDF from 'jspdf';

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
      certificateUrl: '/certificates/python.pdf', // store in public/certificates
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
      certificateUrl: '/certificates/ml-internship.pdf',
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
      certificateUrl: '/certificates/fullstack.pdf',
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
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  // Download Portfolio as PDF
  const downloadPortfolio = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Certificates Portfolio', 20, 20);
    doc.setFontSize(11);

    certificates.forEach((cert, index) => {
      doc.text(`${index + 1}. ${cert.title} (${cert.issuer})`, 20, 40 + index * 10);
    });

    doc.save('Certificates-Portfolio.pdf');
  };

  // Download individual certificate file
  const handleDownload = (cert: any) => {
    if (cert.certificateUrl) {
      const link = document.createElement('a');
      link.href = cert.certificateUrl;
      link.download = `${cert.title}.pdf`;
      link.click();
    } else {
      alert('Certificate file not available for download');
    }
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
          <Button variant="outline" onClick={downloadPortfolio}>
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
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDownload(certificate)}
                >
                  <Download className="mr-2 h-3 w-3" />
                  Download
                </Button>
                {certificate.certificateUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={certificate.certificateUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
